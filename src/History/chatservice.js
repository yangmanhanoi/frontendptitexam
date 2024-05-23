import axios from "axios";

export async function getChatBotAnswer(time, question) {
  try {
    const response = await axios.get(
      `https://sculpin-winning-feline.ngrok-free.app/rag/?time=${time}&q=${question}`
    );
    console.log(response);
    return response.data.result; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to fetch exams:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}