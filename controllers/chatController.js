// controllers/chatController.js
const TogetherService = require("../services/togetherService");
const Conversation = require("../models/conversation");

// Function to handle sending a question and receiving an answer
exports.ask = async (req, res) => {
  const { question } = req.body;
  try {
    const answer = await TogetherService.getChatResponse(question);
    const conversation = new Conversation({ question, answer });
    await conversation.save();
    res.json({ answer });
  } catch (error) {
    console.error("Error in ask:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
};

// Function to retrieve conversation history
exports.history = async (req, res) => {
  try {
    const conversations = await Conversation.find();
    res.json(conversations);
  } catch (error) {
    console.error("Error in history:", error);
    res.status(500).json({ error: "Failed to retrieve history" });
  }
};

// Function to delete a specific conversation by ID
exports.deleteConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Conversation.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({ message: "Conversation deleted successfully" });
    } else {
      res.status(404).json({ error: "Conversation not found" });
    }
  } catch (error) {
    console.error("Error deleting conversation:", error);
    res.status(500).json({ error: "Failed to delete conversation" });
  }
};
