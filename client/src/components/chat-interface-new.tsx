import { useState, useRef, useEffect } from "react";
import { Send, Circle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (!aiName) {
    return (
      <div className="glass-panel p-6 animate-fade-in mt-6">
        <div className="text-center text-gray-400">
          <h3 className="font-orbitron text-lg mb-2">COMMUNICATION INTERFACE</h3>
          <p className="text-sm">Configure AI identity to enable chat</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel animate-fade-in mt-6">
      <div className="border-b border-cyber-blue/20 p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-orbitron text-lg">NEURAL INTERFACE</h3>
          <div className="text-sm font-roboto-mono text-gray-400">
            <Circle className="inline w-2 h-2 mr-2 text-neon-green fill-current" />
            CONNECTED TO {aiName.toUpperCase()}
          </div>
        </div>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30"
                    : "bg-gray-800/50 text-white border border-gray-700"
                }`}
              >
                <div className="text-xs font-roboto-mono mb-1 opacity-60">
                  {message.sender === "user" ? "USER" : aiName.toUpperCase()} • {formatTime(message.timestamp)}
                </div>
                <div className="font-rajdhani">{message.content}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-gray-800/50 text-white border border-gray-700 max-w-xs px-4 py-3 rounded-lg">
              <div className="text-xs font-roboto-mono mb-1 opacity-60">
                {aiName.toUpperCase()} • COMPOSING...
              </div>
              <div className="flex space-x-1">
                <motion.div
                  className="w-2 h-2 bg-cyber-blue rounded-full"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 bg-cyber-blue rounded-full"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                />
                <motion.div
                  className="w-2 h-2 bg-cyber-blue rounded-full"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
                />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-cyber-blue/20 p-4">
        <div className="flex space-x-3">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 bg-black/30 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 font-rajdhani resize-none focus:border-cyber-blue focus:outline-none"
            rows={2}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="px-4 py-2 bg-cyber-blue text-black font-roboto-mono text-sm font-bold rounded-lg hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Send size={16} />
            <span>SEND</span>
          </button>
        </div>
      </div>
    </div>
  );
}