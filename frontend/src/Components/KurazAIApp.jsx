import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, CircularProgress } from '@mui/material';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Chat } from '@mui/icons-material';

const KurazAIApp = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_API_KEY; // Google Generative AI API Key

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const userMessage = { role: 'user', content: inputValue };
    setMessages((prev) => [...prev, userMessage]);

    const prompt = `You are a Kuraz AI assistant. Provide information about Kuraz, its technology, the AI-based job hiring process, resume preparation, and interview tips. User asked: ${inputValue}. Context so far: ${messages.map(msg => `${msg.role}: ${msg.content}`).join(' ')}`;

    setInputValue('');
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(prompt);
      const assistantResponse = result?.response?.candidates?.[0]?.content.parts?.[0]?.text || "I'm sorry, I couldn't generate a response.";
      
      const assistantMessage = { role: 'assistant', content: assistantResponse };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: '20px', right: '20px', width: '300px', zIndex: 1000 }}>
      <Paper sx={{ padding: 2, maxHeight: '400px', overflowY: 'scroll', backgroundColor: '#f9f9f9' }}>
        <Typography variant="h6" align="center">Kuraz AI Assistant</Typography>
        {messages.map((message, index) => (
          <Box key={index} sx={{ margin: 1, textAlign: message.role === 'user' ? 'right' : 'left' }}>
            <Box
              sx={{
                display: 'inline-block',
                padding: 1,
                borderRadius: '10px',
                backgroundColor: message.role === 'user' ? '#d1e7dd' : '#f8d7da',
                color: '#333',
              }}
            >
              <strong>{message.role === 'user' ? 'You' : 'Assistant'}:</strong> {message.content}
            </Box>
          </Box>
        ))}
        {loading && <CircularProgress />}
        <form onSubmit={handleSendMessage} style={{ display: 'flex', marginTop: 10 }}>
          <TextField
            variant="outlined"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about Kuraz..."
            fullWidth
            sx={{ marginRight: 1 }}
          />
          <Button type="submit" variant="contained" color="primary">Send</Button>
        </form>
        <Button onClick={onClose} variant="outlined" sx={{ marginTop: 1, width: '100%' }}>Close</Button>
      </Paper>
    </Box>
  );
};

export default KurazAIApp;
