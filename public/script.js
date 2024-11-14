// Function to add a message to the chat box
function addMessage(text, sender) {
  const chatBox = document.getElementById("chat-box");
  const message = document.createElement("div");
  message.className = `message ${sender}`;
  message.innerText = text;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
  return message;
}

// Function to send the message to the backend
async function sendMessage() {
  const userInput = document.getElementById("user-input");
  const question = userInput.value.trim();

  if (!question) return;

  addMessage(question, "user");
  userInput.value = "";

  // Add a loading message
  const loadingMessage = addMessage("Thinking...", "bot");

  try {
    const response = await fetch("http://localhost:3000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();
    const answer = data.answer || "Sorry, I couldn't get a response.";

    // Remove the loading message and add the actual response
    loadingMessage.remove();
    addMessage(answer, "bot");

    // Refresh history automatically
    loadHistory();
  } catch (error) {
    console.error("Error fetching response:", error);
    loadingMessage.remove();
    addMessage("Error: Could not connect to the server.", "bot");
  }
}

// Function to load and display history
async function loadHistory() {
  const historyBox = document.getElementById("history-box");
  historyBox.innerHTML = ""; // Clear any existing content

  try {
    const response = await fetch("http://localhost:3000/history");
    const conversations = await response.json();

    conversations.forEach((conversation) => {
      const historyEntry = document.createElement("div");
      historyEntry.className = "history-entry";

      // Add question and answer
      const question = document.createElement("div");
      question.className = "history-question";
      question.innerText = `Q: ${conversation.question}`;
      historyEntry.appendChild(question);

      const answer = document.createElement("div");
      answer.className = "history-answer";
      answer.innerText = `A: ${conversation.answer}`;
      historyEntry.appendChild(answer);

      // Add delete button
      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-button";
      deleteButton.innerText = "Delete";
      deleteButton.onclick = () => deleteHistory(conversation._id);
      historyEntry.appendChild(deleteButton);

      historyBox.appendChild(historyEntry);
    });
  } catch (error) {
    console.error("Error loading history:", error);
    historyBox.innerHTML = "Failed to load history.";
  }
}

// Function to delete a specific conversation from history
async function deleteHistory(conversationId) {
  try {
    const response = await fetch(
      `http://localhost:3000/history/${conversationId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      loadHistory(); // Reload history after deletion
    } else {
      console.error("Failed to delete conversation.");
    }
  } catch (error) {
    console.error("Error deleting conversation:", error);
  }
}

// Enable sending message with Enter key
document
  .getElementById("user-input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

// Automatically load history on page load
window.onload = loadHistory;
