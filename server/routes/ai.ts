import { Router, Request, Response } from 'express';
import multer from 'multer';
import { createAIOrchestrator } from '../services/ai-orchestrator';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });
const aiOrchestrator = createAIOrchestrator();

// Health check endpoint for AI services
router.get('/health', async (req: Request, res: Response) => {
  try {
    const healthStatus = await aiOrchestrator.healthCheck();
    res.json({
      status: 'ok',
      services: healthStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to check AI services health',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Process voice input with emotional analysis
router.post('/voice/process', upload.single('audio'), async (req: MulterRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        error: 'No audio file provided' 
      });
    }

    const voiceInput = {
      audioData: req.file.buffer,
      format: req.body.format || 'wav' as const
    };

    const response = await aiOrchestrator.processVoiceWithEmotion(voiceInput);
    
    res.json({
      success: true,
      data: response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Voice processing error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Process text conversation
router.post('/conversation', async (req: Request, res: Response) => {
  try {
    const { userId, message, sessionData } = req.body;
    
    if (!userId || !message) {
      return res.status(400).json({
        error: 'userId and message are required'
      });
    }

    const response = await aiOrchestrator.processConversation(userId, message, sessionData);
    
    res.json({
      success: true,
      data: response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Conversation processing error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Generate avatar response
router.post('/avatar/generate', async (req: Request, res: Response) => {
  try {
    const { text, emotionalContext } = req.body;
    
    if (!text) {
      return res.status(400).json({
        error: 'Text is required for avatar generation'
      });
    }

    const response = await aiOrchestrator.generateAvatarResponse(text, emotionalContext);
    
    res.json({
      success: true,
      data: response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Avatar generation error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Update character memory
router.post('/memory/update', async (req: Request, res: Response) => {
  try {
    const { userId, memoryData } = req.body;
    
    if (!userId || !memoryData) {
      return res.status(400).json({
        error: 'userId and memoryData are required'
      });
    }

    const success = await aiOrchestrator.updateCharacterMemory(userId, memoryData);
    
    res.json({
      success,
      message: success ? 'Memory updated successfully' : 'Failed to update memory',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Memory update error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;