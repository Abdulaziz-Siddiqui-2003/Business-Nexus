import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
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

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Mock data storage
const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');

// Auth APIs
export const authAPI = {
  register: async (userData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if user already exists
    const existingUser = mockUsers.find(user => user.email === userData.email);
    if (existingUser) {
      throw { response: { data: { message: 'User already exists' } } };
    }
    
    // Create new user
    const newUser = {
      _id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Save to mock storage
    mockUsers.push(newUser);
    localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
    
    // Generate mock token
    const token = 'mock_token_' + Date.now();
    
    return {
      data: {
        message: 'User registered successfully',
        user: { ...newUser, password: undefined },
        token
      }
    };
  },
  
  login: async (credentials) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find user
    const user = mockUsers.find(u => u.email === credentials.email);
    if (!user || user.password !== credentials.password) {
      throw { response: { data: { message: 'Invalid credentials' } } };
    }
    
    // Generate mock token
    const token = 'mock_token_' + Date.now();
    
    return {
      data: {
        message: 'Login successful',
        user: { ...user, password: undefined },
        token
      }
    };
  },
};

// Profile APIs
export const profileAPI = {
  getProfile: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    const user = mockUsers.find(u => u._id === id);
    if (!user) throw { response: { status: 404, data: { message: 'User not found' } } };
    return { data: { ...user, password: undefined } };
  },
  updateProfile: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    const userIndex = mockUsers.findIndex(u => u._id === data._id);
    if (userIndex === -1) throw { response: { status: 404, data: { message: 'User not found' } } };
    
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...data };
    localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
    return { data: { ...mockUsers[userIndex], password: undefined } };
  },
  getEntrepreneurs: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    const entrepreneurs = mockUsers.filter(u => u.role === 'entrepreneur').map(u => ({ ...u, password: undefined }));
    return { data: entrepreneurs };
  },
  getInvestors: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    const investors = mockUsers.filter(u => u.role === 'investor').map(u => ({ ...u, password: undefined }));
    return { data: investors };
  },
};

// Mock requests storage
const mockRequests = JSON.parse(localStorage.getItem('mockRequests') || '[]');
const mockMessages = JSON.parse(localStorage.getItem('mockMessages') || '[]');

// Collaboration Requests APIs
export const requestAPI = {
  sendRequest: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newRequest = {
      _id: Date.now().toString(),
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    mockRequests.push(newRequest);
    localStorage.setItem('mockRequests', JSON.stringify(mockRequests));
    return { data: newRequest };
  },
  getRequests: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { data: mockRequests };
  },
  updateRequest: async (id, status) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const requestIndex = mockRequests.findIndex(r => r._id === id);
    if (requestIndex === -1) throw { response: { status: 404, data: { message: 'Request not found' } } };
    mockRequests[requestIndex].status = status;
    localStorage.setItem('mockRequests', JSON.stringify(mockRequests));
    return { data: mockRequests[requestIndex] };
  },
};

// Chat APIs
export const chatAPI = {
  getMessages: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const userMessages = mockMessages.filter(m => m.senderId === userId || m.receiverId === userId);
    return { data: userMessages };
  },
};

export default api; 