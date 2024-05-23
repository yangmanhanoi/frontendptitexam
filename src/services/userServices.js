import axios from "axios";

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get("http://localhost:9999/api/students");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to delete user:", error);
    return [];
  }
};

export async function deleteUser(userId) {
  try {
    const response = await axios.delete(
      `http://localhost:9999/api/users/${userId}/delete`
    );
    return response.data; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to delete user:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}

export async function updateUser(userId, userRequest) {
  try {
    const response = await axios.put(
      `http://localhost:9999/api/users/${userId}/update`,
      userRequest
    );
    return response.data;
    // return response; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to update user:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}
