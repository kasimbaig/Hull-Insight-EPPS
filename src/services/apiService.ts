import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Use environment variable for base URL
const BASE_URL = import.meta.env.VITE_API_URL || 'https://hull-insights-api.ilizien-projects-cdf.in/';

// Check localStorage for existing auth data and extract token
const storedAuthData = localStorage.getItem('authData');
const parsedAuthData = storedAuthData ? JSON.parse(storedAuthData) : null;
const token = parsedAuthData?.access;

// Create an Axios instance for authenticated requests
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// If token exists, set the Authorization header
if (token) {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Add request interceptor to ensure token is always available
apiClient.interceptors.request.use(
  (config) => {
    // If no Authorization header is set, try to restore token from localStorage
    if (!config.headers.Authorization) {
      const token = getCurrentToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only handle 401 Unauthorized errors (token expiration/invalid)
    if (error.response && error.response.status === 401) {
      // Clear auth data from localStorage
      localStorage.removeItem('authData');
      // Remove auth header
      delete apiClient.defaults.headers.common['Authorization'];
      // Only redirect if we're not already on the landing page
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    } else if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
      // Handle network errors gracefully - don't redirect to login
      console.warn('Network error detected:', error.message);
    }
    // For all other errors (timeout, 500, etc.), just reject without redirecting
    return Promise.reject(error);
  }
);

// Function to update the token later (for example, after login)
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// Function to get current token from localStorage
export const getCurrentToken = () => {
  try {
    const storedAuthData = localStorage.getItem('authData');
    if (storedAuthData) {
      const authData = JSON.parse(storedAuthData);
      return authData.access;
    }
  } catch (error) {
    console.error('Error getting token from localStorage:', error);
  }
  return null;
};

// Function to restore token from localStorage (useful after page reload)
export const restoreTokenFromStorage = () => {
  const token = getCurrentToken();
  if (token) {
    setAuthToken(token);
    return true;
  }
  return false;
};

// Common GET request (with token if set)
export const getRequest = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data || response;
  } catch (error) {
    console.error('GET Request Error:', error.response?.data || error.message);
    throw error;
  }
};

// Common POST request (with token if set)
// Common POST request (with token if set)
export const postRequest = async (endpoint, data, isMultipart = false) => {
  try {
    const config = {
      headers: {
        'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
      }
    };

    const response = await apiClient.post(endpoint, data, config);
    return response; // Return full response to handle blobs, headers, etc.
  } catch (error) {
    console.error('POST Request Error:', error.response?.data || error.message);
    throw error;
  }
};


// Common PUT request
export const putRequest = async (endpoint, data) => {
  try {
    const response = await apiClient.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('PUT Request Error:', error.response?.data || error.message);
    throw error;
  }
};

// Login API Call using axios directly to return the full response (including status code)
export const loginUser = async (loginData) => {
  try {
    const res = await axios.post(`${BASE_URL}api/auth/token/`, loginData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // Use the access token from the response to set the auth header
    setAuthToken(res.data.access);
    // Save the full response (tokens and user details) to localStorage
    localStorage.setItem('authData', JSON.stringify(res.data));
    return res; // Return the full response including status code
  } catch (error) {
    console.error('Login Error:', error.response?.data || error.message);
    throw error;
  }
};

// Common GET request without token (No Auth)
export const getRequestNoAuth = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('GET (No Auth) Request Error:', error.response?.data || error.message);
    throw error;
  }
};

// Common POST request without token (No Auth)
export const postRequestNoAuth = async (endpoint, data) => {
  try {
    const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('POST (No Auth) Request Error:', error.response?.data || error.message);
    throw error;
  }
};

// utils/number-format.ts
export const formatINRCrore = (val) =>
  Number(val).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

// Common DELETE request (with token if set)
export const deleteRequest = async (endpoint) => {
  try {
    const response = await apiClient.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('DELETE Request Error:', error.response?.data || error.message);
    throw error;
  }
};

// Logout API Call
export const logoutUser = async (userId) => {
  try {
    const logoutPayload = {
      user_id: userId
    };
    
    const response = await postRequest('api/auth/logout/', logoutPayload);
    return response;
  } catch (error) {
    console.error('Logout Error:', error.response?.data || error.message);
    throw error;
  }
};

export default apiClient;
