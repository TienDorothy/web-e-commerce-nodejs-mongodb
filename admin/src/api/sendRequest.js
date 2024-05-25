import api from "./api";

const sendRequest = async (method, url, data = null) => {
  try {
    const response = await api({
      method: method,
      url: url,
      data: data,
    });
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    // Network error
    if (!error.response) {
      console.error("Network error:", error.message);
      throw new Error("Network error. Please check your internet connection.");
    }

    // Server error
    console.error("Server error:", error.response.data);
    throw error.response.data;
  }
};

export default sendRequest;
