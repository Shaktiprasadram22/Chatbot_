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
    } catch (error) {
      console.error("Error fetching response:", error);
      loadingMessage.remove();
      addMessage("Error: Could not connect to the server.", "bot");
    }
  }
  
  // Enable sending message with Enter key
  document.getElementById("user-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
  