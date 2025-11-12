// apiService.ts - API service for backend integration
import axios from 'axios';

// Define enums
export enum Roles {
  SUPER_ADMIN = 1,
  TRADER = 2,
}

export enum Status {
  INACTIVE = 0,
  ACTIVE = 1,
}

export enum TradingTier {
  BASIC = 1,
  SILVER = 2,
  GOLD = 3,
  PLATINUM = 4,
}

export enum ProductCategory {
  ELECTRONICS = "electronics",
  FASHION = "fashion",
  FOOD = "food",
  BEAUTY = "beauty",
  HOME = "home",
}

export enum RiskCategory {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
}

export interface User {
  email: string;
  name: string;
  role: Roles;
  password: string;
  resetPasswordToken: string | null;
  resetPasswordExpires: Date | null;
}

export interface Trader {
  traderName: string;
  status: Status;
  phoneNo: string;
  tradingTier: TradingTier;
  city: string;
  accountBalance: number;
  address: string;
  riskCategory: RiskCategory;
  creditLimit: number;
  isDeleted: boolean;
}

// Get the base API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include JWT token in headers
apiClient.interceptors.request.use(
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
apiClient.interceptors.response.use(
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

// Authentication APIs
export const authAPI = {
  login: (email: string, password: string) => 
    apiClient.post('/auth/login', { email, password }),
    
  register: (userData: any) => 
    apiClient.post('/auth/register', userData),
    
  forgotPassword: (email: string) => 
    apiClient.post('/auth/forgot-password', { email }),
    
  resetPassword: (token: string, newPassword: string) => 
    apiClient.post(`/auth/reset-password/${token}`, { newPassword }),
    
  getProfile: () => 
    apiClient.get('/auth/me'),
};

// Trader APIs
export const traderAPI = {
  getAll: (params?: any) => 
    apiClient.get('/traders', { params }),
    
  getById: (id: string) => 
    apiClient.get(`/traders/${id}`),
    
  create: (traderData: any) => 
    apiClient.post('/traders', traderData),
    
  update: (id: string, traderData: any) => 
    apiClient.patch(`/traders/${id}`, traderData),
    
  updateStatus: (id: string, status: string) => 
    apiClient.patch(`/traders/${id}/status`, { status }),
    
  delete: (id: string) => 
    apiClient.delete(`/traders/${id}`),
};

// Customer APIs
export const customerAPI = {
  getCustomers: (params?: any) =>
    apiClient.get('/customers', { params }),

  getCustomerById: (id: string | number) =>
    apiClient.get(`/customers/${id}`),

  createCustomer: (customerData: any) =>
    apiClient.post('/customers', customerData),

  updateCustomer: (id: string | number, customerData: any) =>
    apiClient.patch(`/customers/${id}`, customerData),

  changeCustomerStatus: (id: string | number, status: string) =>
    apiClient.patch(`/customers/${id}/status`, { status }),

  deleteCustomer: (id: string | number) =>
    apiClient.delete(`/customers/${id}`),
};

// File APIs
export const fileAPI = {
  getAll: (params?: any) => 
    apiClient.get('/files', { params }),
    
  getById: (id: string) => 
    apiClient.get(`/files/${id}`),
    
  upload: (file: File, traderId?: string) => {
    const formData = new FormData();
    formData.append('file', file);
    if (traderId) {
      formData.append('traderId', traderId);
    }
    return apiClient.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  extractProducts: (id: string) => 
    apiClient.post(`/files/extract/${id}`),
    
  updateStatus: (id: string, status: string) => 
    apiClient.patch(`/files/${id}/status`, { status }),
    
  incrementViews: (id: string) => 
    apiClient.patch(`/files/${id}/views`),
    
  delete: (id: string) => 
    apiClient.delete(`/files/${id}`),
};

// Product APIs
export const productAPI = {
  getAll: (params?: any) => 
    apiClient.get('/products', { params }),
    
  getById: (id: string) => 
    apiClient.get(`/products/${id}`),
    
  create: (productData: any) => 
    apiClient.post('/products', productData),
    
  update: (id: string, productData: any) => 
    apiClient.patch(`/products/${id}`, productData),
    
  delete: (id: string) => 
    apiClient.delete(`/products/${id}`),
};

// Aggregate named export for compatibility with existing imports that expect `apiService`
export const apiService = {
  auth: authAPI,
  traders: traderAPI,
  customers: customerAPI,
  files: fileAPI,
  products: productAPI,
};

export default apiClient;