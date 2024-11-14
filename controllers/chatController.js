// controllers/chatController.js
const TogetherService = require('../services/togetherService');
const Conversation = require('../models/conversation');

exports.ask = async (req, res) => {
  const { question } = req.body;
  try {
    const answer = await TogetherService.getChatResponse(question);
    const conversation = new Conversation({ question, answer });
    await conversation.save();
    res.json({ answer });
  } catch (error) {
    console.error('Error in ask:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
};

exports.history = async (req, res) => {
  try {
    const conversations = await Conversation.find();
    res.json(conversations);
  } catch (error) {
    console.error('Error in history:', error);
    res.status(500).json({ error: 'Failed to retrieve history' });
  }
};
