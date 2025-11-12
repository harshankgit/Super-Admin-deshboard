// apiClient.ts - API client that uses either real API or mock API based on environment
import axios from 'axios';
import mockAPIService from './mockAPIService';

// Determine if we're using mock API (e.g., when VITE_USE_MOCK_API is set to 'true')
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';

// Real API client setup
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const realApiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include JWT token in headers
realApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
realApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token might be expired, redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API service that uses either real API or mock API
export const apiService = {
  auth: USE_MOCK_API ? mockAPIService.auth : {
    login: (email: string, password: string) => 
      realApiClient.post('/auth/login', { email, password }),
    register: (userData: any) => 
      realApiClient.post('/auth/register', userData),
    forgotPassword: (email: string) => 
      realApiClient.post('/auth/forgot-password', { email }),
    resetPassword: (token: string, newPassword: string) => 
      realApiClient.post(`/auth/reset-password/${token}`, { newPassword }),
    getProfile: () => 
      realApiClient.get('/auth/me'),
  },
  
  traders: USE_MOCK_API ? mockAPIService.traders : {
    getAll: (params?: any) => 
      realApiClient.get('/traders', { params }),
    getById: (id: string) => 
      realApiClient.get(`/traders/${id}`),
    create: (traderData: any) => 
      realApiClient.post('/traders', traderData),
    update: (id: string, traderData: any) => 
      realApiClient.patch(`/traders/${id}`, traderData),
    updateStatus: (id: string, status: string) => 
      realApiClient.patch(`/traders/${id}/status`, { status }),
    delete: (id: string) => 
      realApiClient.delete(`/traders/${id}`),
  },
  
  files: USE_MOCK_API ? mockAPIService.files : {
    getAll: (params?: any) => 
      realApiClient.get('/files', { params }),
    getById: (id: string) => 
      realApiClient.get(`/files/${id}`),
    upload: (file: File, traderId?: string) => {
      const formData = new FormData();
      formData.append('file', file);
      if (traderId) {
        formData.append('traderId', traderId);
      }
      return realApiClient.post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    extractProducts: (id: string) => 
      realApiClient.post(`/files/extract/${id}`),
    updateStatus: (id: string, status: string) => 
      realApiClient.patch(`/files/${id}/status`, { status }),
    incrementViews: (id: string) => 
      realApiClient.patch(`/files/${id}/views`),
    delete: (id: string) => 
      realApiClient.delete(`/files/${id}`),
  },
  
  products: USE_MOCK_API ? mockAPIService.products : {
    getAll: (params?: any) => 
      realApiClient.get('/products', { params }),
    getById: (id: string) => 
      realApiClient.get(`/products/${id}`),
    create: (productData: any) => 
      realApiClient.post('/products', productData),
    update: (id: string, productData: any) => 
      realApiClient.patch(`/products/${id}`, productData),
    delete: (id: string) => 
      realApiClient.delete(`/products/${id}`),
  }
};

export default realApiClient;