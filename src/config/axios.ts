import axios from "axios";

const axiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 10000, // Set timeout to 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.request.use(
  function (config) {
    // Getting the auth token that was persisted by zustand
    let authToken;
    const authStateString = localStorage.getItem("auth");
    if (authStateString) {
      const authObj = JSON.parse(authStateString);
      authToken = authObj?.state?.token;
    }

    // Only add authToken to headers if it exists
    if (authToken) {
      config.headers.Authorization = "Bearer " + authToken;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    // Check if err.response is defined before accessing its properties
    if (err.response) {
      if (err.response.status === 401) {
        // Handle unauthorized access, e.g., by redirecting to the login page
        // localStorage.removeItem("token");
        // window.location.href = "/login";
      }
    } else if (err.code === "ECONNABORTED") {
      console.error("Request timed out:", err);
      // Handle timeout error
    } else {
      console.error("Network or other error occurred", err);
      // Handle errors where no response is received (e.g., network issues)
    }
    return Promise.reject(err);
  }
);

export default axiosConfig;
