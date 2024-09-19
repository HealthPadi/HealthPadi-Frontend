//This is the axios configuration file that sets up the base URL and headers for the axios instance. It also sets up interceptors to add the auth token to the headers of all requests. This file is used to make requests to the backend API.

import axios from "axios";

const axiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosConfig.interceptors.request.use(
  function (config) {
    //Getting the auth token that was persisted by zustand
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
    } else {
      console.error("Network or other error occurred", err);
      // Handle errors where no response is received (e.g., network issues)
    }
    return Promise.reject(err);
  }
);

export default axiosConfig;
