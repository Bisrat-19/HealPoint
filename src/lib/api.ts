import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Django backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('hms_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 401 Unauthorized (token expired or invalid)
        if (error.response && error.response.status === 401) {
            // Clear local storage and redirect to login if needed
            // We'll handle the redirect in the AuthContext or component
            // localStorage.removeItem('hms_token');
            // localStorage.removeItem('hms_user');
        }
        return Promise.reject(error);
    }
);

export default api;
