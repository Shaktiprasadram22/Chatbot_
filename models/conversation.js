// models/conversation.js
const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Conversation', conversationSchema);
