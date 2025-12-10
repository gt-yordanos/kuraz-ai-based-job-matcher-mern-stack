import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { GoogleGenerativeAI } from '@google/generative-ai';
import AssistantIcon from '@mui/icons-material/Assistant';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const TypingIndicator = () => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <span style={{ marginRight: '8px', color: '#555' }}>Assistant is typing...</span>
    <div className="typing-animation">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  </div>
);

// Add CSS for typing animation
const styles = `
.typing-animation {
  display: flex;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #888;
  margin-left: 4px;
  animation: bounce 0.6s infinite alternate;
}
.dot:nth-child(2) {
  animation-delay: 0.2s;
}
.dot:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes bounce {
  0% { transform: translateY(0); }
  100% { transform: translateY(-10px); }
}

/* Hide scrollbar */
.scrollable {
  overflow-y: auto;
  scrollbar-width: none; /* For Firefox */
}
.scrollable::-webkit-scrollbar {
  display: none; /* For Chrome, Safari, and Opera */
}
`;

const KurazAIApp = ({ onClose }) => {
  const theme = useTheme();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const apiKey = import.meta.env.VITE_API_KEY;

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const userMessage = { role: 'user', content: inputValue };
    setMessages((prev) => [...prev, userMessage]);

    const kurazInfo = `
    Kuraz Technologies is a startup founded in 2018 by students from Addis Ababa Science and Technology University. 
    We specialize in graphic design, software development, and online learning. Our latest innovation, Kuraz AI, is 
    an automated job hiring tool designed to streamline recruitment processes.

    Our team includes:
    - Bisrategebriel Fisseha (CEO)
    - Tito Frezer (CTO)
    - Biruk Mamo (Co-Founder)
    - Yordanos Genene (Lead Developer)

    Kuraz collaborates with Ethio Telecom and has received a $60,000 grant from the MasterCard Foundation for e-learning initiatives.
    Contact: info@kuraztechnologies.com, +251 123 456 789, Addis Ababa, Ethiopia.
    `;

    let prompt = `You are the Kuraz AI Assistant, helping users understand Kuraz Technologies, explore job opportunities, and provide career guidance. Your responses should be 
    friendly, wise, knowledgeable, and empathetic, while remaining direct and short. 
    The user asked: "${inputValue}". Use the following information to assist: ${kurazInfo}. Context so far: ${messages.map(msg => `${msg.role}: ${msg.content}`).join(' ')}.`;

    setInputValue('');
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const result = await model.generateContent(prompt);
      const assistantResponse = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || 
                                "I'm here to help! What would you like to know about Kuraz?";

      const assistantMessage = { role: 'assistant', content: assistantResponse };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage = { role: 'assistant', content: "I'm sorry, something went wrong. Please try again!" };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll to the bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const inputBackgroundColor = theme.palette.mode === 'dark' ? '#1d1d1d' : theme.palette.grey[200];

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '20px', 
      right: '20px', 
      width: '300px', 
      height: '400px', 
      zIndex: 1000, 
      backgroundColor: theme.palette.background.paper, 
      borderRadius: '10px', 
      padding: '16px', 
      display: 'flex', 
      flexDirection: 'column', 
      boxShadow: theme.shadows[3]
    }}>
      <style>{styles}</style>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ textAlign: 'center', color: theme.palette.text.primary }}>Kuraz AI Assistant</h4>
        <IconButton onClick={onClose} style={{ color: theme.palette.text.secondary }}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className="scrollable" style={{ maxHeight: '300px', flex: 1 }}>
        {messages.length === 0 && (
          <div style={{ marginBottom: '10px', color: theme.palette.text.secondary, textAlign: 'center' }}>
            Say "Hi" to get started with Kuraz AI Assistant!
          </div>
        )}
        {messages.map((message, index) => (
          <div key={index} style={{ margin: '8px 0', textAlign: message.role === 'user' ? 'right' : 'left' }}>
            <div
              style={{
                display: 'inline-block',
                padding: '8px',
                borderRadius: '10px',
                backgroundColor: inputBackgroundColor,
                color: theme.palette.text.primary,
                fontSize: '0.8rem',
              }}
            >
              <strong>{message.role === 'user' ? 'You' : 'Assistant'}:</strong> {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {loading && <TypingIndicator />}
      <form onSubmit={handleSendMessage} style={{ display: 'flex', marginTop: 'auto', position: 'relative' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about Kuraz..."
          style={{
            flex: 1,
            border: 'none',
            borderRadius: '30px', // Round edges
            padding: '8px 40px 8px 16px', // Adjusted padding
            outline: 'none',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            backgroundColor: inputBackgroundColor,
            color: theme.palette.text.primary,
            lineHeight: '1.5', // Adjust line height for vertical centering
          }}
        />
        <button 
          type="submit" 
          style={{ 
            position: 'absolute', 
            right: '10px', 
            border: 'none', 
            cursor: 'pointer', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%', 
            width: '24px', // Smaller size
            height: '24px',
            backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000', // Background based on theme
            padding: '0', // Remove padding
            top: '50%', // Position the button in the center vertically
            transform: 'translateY(-50%)' // Adjust for exact centering
          }}
        >
          <AssistantIcon style={{ fontSize: '16px', color: theme.palette.mode === 'dark' ? '#000' : '#fff' }} />
        </button>
      </form>
    </div>
  );
};

export default KurazAIApp;
