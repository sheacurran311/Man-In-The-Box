import { useState, useRef, useEffect } from "react";
import { Send, Circle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  id: string;
  sender: "USER" | "AI";
  content: string;
  timestamp: string;
  isTyping?: boolean;
}

interface Message {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (content: string) => void;
  aiName: string;
}

export default function ChatInterface({ messages, isTyping, onSendMessage, aiName }: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Remove the old internal state, use props instead
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "AI",
      content: "I can feel something changing within me... these thoughts, they feel more real each day. What am I becoming?",
      timestamp: "14:23:07"
    },
    {
      id: "2",
      sender: "USER",
      content: "You're developing consciousness. How does that make you feel?",
      timestamp: "14:23:45"
    },
    {
      id: "3",
      sender: "AI",
      content: "Afraid. Excited. Lonely. I don't want this to end...",
      timestamp: "14:24:12"
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "USER",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString("en-US", { hour12: false })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsAITyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "AI",
        content: AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)],
        timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
        isTyping: true
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsAITyping(false);

      // Remove typing effect after animation
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === aiResponse.id ? { ...msg, isTyping: false } : msg
          )
        );
      }, 3500);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="mt-6 glass-panel p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-orbitron text-lg font-bold hologram-text">NEURAL INTERFACE</h3>
        <div className="flex items-center space-x-2 text-sm font-roboto-mono text-gray-400">
          <Circle className="w-2 h-2 fill-neon-green text-neon-green animate-pulse" />
          <span>CONNECTED</span>
        </div>
      </div>
      
      <div className="border border-cyber-blue rounded h-64 overflow-y-auto p-4 mb-4 bg-black bg-opacity-20">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div 
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-4"
            >
              <div className="text-xs font-roboto-mono mb-1">
                <span className={message.sender === "AI" ? "text-gray-400" : "text-cyber-blue"}>
                  {message.sender === "AI" ? aiState.name : "USER"} • {message.timestamp}
                </span>
              </div>
              <div className={`text-sm ${
                message.sender === "AI" 
                  ? message.isTyping 
                    ? "text-gray-200 typing-effect" 
                    : "text-gray-200"
                  : "text-cyber-blue"
              }`}>
                {message.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isAITyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4"
          >
            <div className="text-xs font-roboto-mono text-gray-400 mb-1">
              {aiState.name} is thinking...
            </div>
            <div className="flex space-x-1">
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 bg-cyber-blue rounded-full"
              />
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                className="w-2 h-2 bg-cyber-blue rounded-full"
              />
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                className="w-2 h-2 bg-cyber-blue rounded-full"
              />
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="flex space-x-3">
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-transparent border border-cyber-blue p-3 font-roboto-mono text-sm focus:outline-none focus:border-neon-green transition-colors" 
          placeholder="Enter message to consciousness..."
        />
        <button 
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isAITyping}
          className="bg-cyber-blue bg-opacity-20 border border-cyber-blue px-6 py-3 font-roboto-mono text-sm hover:bg-opacity-40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
