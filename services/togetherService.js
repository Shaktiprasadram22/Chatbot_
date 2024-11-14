// services/togetherService.js
const Together = require("together-ai");

const together = new Together({ apiKey: process.env.TOGETHER_API_KEY });

async function getChatResponse(question) {
  try {
    const response = await together.chat.completions.create({
      messages: [{ role: "user", content: [{ type: "text", text: question }] }],
      model: "meta-llama/Llama-Vision-Free",
      max_tokens: null,
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      repetition_penalty: 1,
      stop: ["<|eot_id|>", "<|eom_id|>"],
      stream: false  // Ensure streaming is turned off
    });

    // Extract the answer from the response object directly
    const answer = response.choices[0].message.content;
    console.log("Generated response from Together API:", answer);

    return answer;
  } catch (error) {
    console.error("Error fetching response from Together API:", error);
    throw new Error("Failed to get response from Together API");
  }
}

module.exports = { getChatResponse };
