import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://spice-it-up-backend.onrender.com/api',
  baseURL: 'http://localhost:5000/api',

  timeout: 10000, // 10 second timeout
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    // Get token from localStorage
    const authData = localStorage.getItem('auth');
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        const token = parsed.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {
        console.error('Error parsing auth data:', e);
      }
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status);
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - server might be down or slow');
    } else if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response error:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Test the backend connection
export const testBackendConnection = async () => {
  try {
    console.log('Testing backend connection...');
    const response = await api.get('/auth/test');
    console.log('Backend test response:', response.data);
    return true;
  } catch (error) {
    console.error('Backend connection test failed:', error);
    return false;
  }
};

export default api;