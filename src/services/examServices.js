import axios from "axios";

export async function fetchAllExams() {
  try {
    const response = await axios.get("http://localhost:9999/api/quizzes");
    return response.data; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to fetch exams:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}

export async function deleteExam(examId) {
  try {
    const response = await axios.delete(
      `http://localhost:9999/api/quizzes/${examId}`
    );
    return response; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to delete exams:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}

export async function updateExam(examId, examRequest) {
  console.log(examRequest);
  try {
    const response = await axios.put(
      `http://localhost:9999/api/quizzes/${examId}/update`,
      examRequest
    );
    return response;
    // return response; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to update exams:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}
