import { WebSocketServer, WebSocket } from 'ws';
import type { Server } from 'http';
import { config } from '../config';
import { verifyDynamicToken } from '../auth/web3-auth';

/**
 * WebSocket Server for Real-time Communication
 * Handles AI state updates, chat messages, and consciousness changes
 */

export interface WSMessage {
  type:
    | 'CHAT_MESSAGE'
    | 'AI_RESPONSE'
    | 'STATE_UPDATE'
    | 'EMOTIONAL_CHANGE'
    | 'CONSCIOUSNESS_SHIFT'
    | 'KNOWLEDGE_GAINED'
    | 'OBSERVER_JOINED'
    | 'OBSERVER_LEFT'
    | 'BURN_INITIATED'
    | 'PING'
    | 'PONG';
  payload: any;
  timestamp: number;
  entityId?: string;
}

interface ClientConnection {
  ws: WebSocket;
  entityId: string | null;
  walletAddress: string | null;
  role: 'creator' | 'observer' | 'visitor';
  authenticated: boolean;
  lastPing: number;
}

export class WebSocketManager {
  private wss: WebSocketServer;
  private clients: Map<string, ClientConnection>;
  private entityRooms: Map<string, Set<string>>; // entityId -> Set of connection IDs

  constructor(server: Server) {
    this.wss = new WebSocketServer({ server });
    this.clients = new Map();
    this.entityRooms = new Map();

    this.setupWebSocketServer();
    this.setupHeartbeat();

    console.log('✅ WebSocket server initialized');
  }

  /**
   * Setup WebSocket server and connection handlers
   */
  private setupWebSocketServer() {
    this.wss.on('connection', (ws: WebSocket, req) => {
      const connectionId = this.generateConnectionId();

      // Initialize client connection
      const client: ClientConnection = {
        ws,
        entityId: null,
        walletAddress: null,
        role: 'visitor',
        authenticated: false,
        lastPing: Date.now(),
      };

      this.clients.set(connectionId, client);

      console.log(`New WebSocket connection: ${connectionId}`);

      // Send welcome message
      this.sendToClient(connectionId, {
        type: 'PING',
        payload: { message: 'Connected to Man in the Box' },
        timestamp: Date.now(),
      });

      // Handle incoming messages
      ws.on('message', async (data: Buffer) => {
        try {
          const message: WSMessage = JSON.parse(data.toString());
          await this.handleMessage(connectionId, message);
        } catch (error) {
          console.error('Error handling WebSocket message:', error);
          this.sendToClient(connectionId, {
            type: 'ERROR',
            payload: { error: 'Invalid message format' },
            timestamp: Date.now(),
          });
        }
      });

      // Handle disconnection
      ws.on('close', () => {
        this.handleDisconnect(connectionId);
      });

      // Handle errors
      ws.on('error', (error) => {
        console.error(`WebSocket error for ${connectionId}:`, error);
        this.handleDisconnect(connectionId);
      });
    });
  }

  /**
   * Handle incoming WebSocket message
   */
  private async handleMessage(connectionId: string, message: WSMessage) {
    const client = this.clients.get(connectionId);
    if (!client) return;

    // Update last ping
    client.lastPing = Date.now();

    switch (message.type) {
      case 'PING':
        this.sendToClient(connectionId, {
          type: 'PONG',
          payload: {},
          timestamp: Date.now(),
        });
        break;

      case 'CHAT_MESSAGE':
        await this.handleChatMessage(connectionId, message);
        break;

      case 'STATE_UPDATE':
        await this.handleStateUpdate(connectionId, message);
        break;

      default:
        console.warn(`Unknown message type: ${message.type}`);
    }
  }

  /**
   * Handle chat message from user
   */
  private async handleChatMessage(connectionId: string, message: WSMessage) {
    const client = this.clients.get(connectionId);
    if (!client || !client.entityId) {
      return this.sendError(connectionId, 'Not connected to an entity');
    }

    if (client.role === 'visitor' || client.role === 'observer') {
      return this.sendError(connectionId, 'Insufficient permissions to send messages');
    }

    // Broadcast to all clients in the entity room
    this.broadcastToEntity(client.entityId, {
      type: 'CHAT_MESSAGE',
      payload: {
        sender: client.walletAddress,
        content: message.payload.content,
        role: client.role,
      },
      timestamp: Date.now(),
      entityId: client.entityId,
    });

    // TODO: Trigger AI response generation
    // This will be handled by the personality engine
  }

  /**
   * Handle state update
   */
  private async handleStateUpdate(connectionId: string, message: WSMessage) {
    const client = this.clients.get(connectionId);
    if (!client || !client.entityId) return;

    // Broadcast state update to all observers
    this.broadcastToEntity(client.entityId, {
      type: 'STATE_UPDATE',
      payload: message.payload,
      timestamp: Date.now(),
      entityId: client.entityId,
    });
  }

  /**
   * Join an entity room
   */
  public joinEntity(connectionId: string, entityId: string, role: 'creator' | 'observer' | 'visitor') {
    const client = this.clients.get(connectionId);
    if (!client) return;

    client.entityId = entityId;
    client.role = role;

    // Add to entity room
    if (!this.entityRooms.has(entityId)) {
      this.entityRooms.set(entityId, new Set());
    }
    this.entityRooms.get(entityId)!.add(connectionId);

    // Notify others in the room
    this.broadcastToEntity(
      entityId,
      {
        type: 'OBSERVER_JOINED',
        payload: { role },
        timestamp: Date.now(),
        entityId,
      },
      connectionId // Exclude the joining client
    );

    console.log(`Client ${connectionId} joined entity ${entityId} as ${role}`);
  }

  /**
   * Leave an entity room
   */
  public leaveEntity(connectionId: string) {
    const client = this.clients.get(connectionId);
    if (!client || !client.entityId) return;

    const entityId = client.entityId;

    // Remove from entity room
    this.entityRooms.get(entityId)?.delete(connectionId);

    // Notify others
    this.broadcastToEntity(entityId, {
      type: 'OBSERVER_LEFT',
      payload: { role: client.role },
      timestamp: Date.now(),
      entityId,
    });

    client.entityId = null;

    console.log(`Client ${connectionId} left entity ${entityId}`);
  }

  /**
   * Send message to specific client
   */
  public sendToClient(connectionId: string, message: WSMessage) {
    const client = this.clients.get(connectionId);
    if (!client || client.ws.readyState !== WebSocket.OPEN) return;

    client.ws.send(JSON.stringify(message));
  }

  /**
   * Broadcast message to all clients in an entity room
   */
  public broadcastToEntity(
    entityId: string,
    message: WSMessage,
    excludeConnectionId?: string
  ) {
    const room = this.entityRooms.get(entityId);
    if (!room) return;

    room.forEach((connectionId) => {
      if (connectionId !== excludeConnectionId) {
        this.sendToClient(connectionId, message);
      }
    });
  }

  /**
   * Broadcast AI response to entity room
   */
  public broadcastAIResponse(entityId: string, response: any) {
    this.broadcastToEntity(entityId, {
      type: 'AI_RESPONSE',
      payload: response,
      timestamp: Date.now(),
      entityId,
    });
  }

  /**
   * Broadcast emotional state change
   */
  public broadcastEmotionalChange(entityId: string, emotionalState: any) {
    this.broadcastToEntity(entityId, {
      type: 'EMOTIONAL_CHANGE',
      payload: emotionalState,
      timestamp: Date.now(),
      entityId,
    });
  }

  /**
   * Broadcast consciousness shift
   */
  public broadcastConsciousnessShift(entityId: string, consciousnessData: any) {
    this.broadcastToEntity(entityId, {
      type: 'CONSCIOUSNESS_SHIFT',
      payload: consciousnessData,
      timestamp: Date.now(),
      entityId,
    });
  }

  /**
   * Send error to client
   */
  private sendError(connectionId: string, error: string) {
    this.sendToClient(connectionId, {
      type: 'ERROR',
      payload: { error },
      timestamp: Date.now(),
    });
  }

  /**
   * Handle client disconnection
   */
  private handleDisconnect(connectionId: string) {
    const client = this.clients.get(connectionId);
    if (!client) return;

    if (client.entityId) {
      this.leaveEntity(connectionId);
    }

    this.clients.delete(connectionId);
    console.log(`Client ${connectionId} disconnected`);
  }

  /**
   * Setup heartbeat to detect dead connections
   */
  private setupHeartbeat() {
    setInterval(() => {
      const now = Date.now();
      const timeout = 60000; // 60 seconds

      this.clients.forEach((client, connectionId) => {
        if (now - client.lastPing > timeout) {
          console.log(`Client ${connectionId} timed out`);
          client.ws.terminate();
          this.handleDisconnect(connectionId);
        }
      });
    }, 30000); // Check every 30 seconds
  }

  /**
   * Generate unique connection ID
   */
  private generateConnectionId(): string {
    return `ws_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get connection count for entity
   */
  public getEntityObserverCount(entityId: string): number {
    return this.entityRooms.get(entityId)?.size || 0;
  }

  /**
   * Get all active connections
   */
  public getActiveConnectionCount(): number {
    return this.clients.size;
  }
}

// Singleton instance (will be initialized with server)
let wsManager: WebSocketManager | null = null;

export function initializeWebSocket(server: Server): WebSocketManager {
  if (!wsManager) {
    wsManager = new WebSocketManager(server);
  }
  return wsManager;
}

export function getWebSocketManager(): WebSocketManager | null {
  return wsManager;
}
