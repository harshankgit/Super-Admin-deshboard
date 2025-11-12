// mockAPIService.ts - Mock API service for frontend development
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const mockTraders = [
  {
    id: '1',
    traderId: 'TRD001',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    status: 'Active',
    joinedDate: '2023-05-15',
    tradingTier: 'Gold',
    region: 'New York',
    totalFiles: 12,
  },
  {
    id: '2',
    traderId: 'TRD002',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 987-6543',
    status: 'Active',
    joinedDate: '2023-06-20',
    tradingTier: 'Silver',
    region: 'California',
    totalFiles: 8,
  },
  {
    id: '3',
    traderId: 'TRD003',
    name: 'Michael Brown',
    email: 'm.brown@example.com',
    phone: '+1 (555) 456-7890',
    status: 'Inactive',
    joinedDate: '2023-07-10',
    tradingTier: 'Basic',
    region: 'Texas',
    totalFiles: 5,
  },
  {
    id: '4',
    traderId: 'TRD004',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '+1 (555) 321-0987',
    status: 'Active',
    joinedDate: '2023-08-05',
    tradingTier: 'Platinum',
    region: 'Florida',
    totalFiles: 20,
  },
  {
    id: '5',
    traderId: 'TRD005',
    name: 'Robert Wilson',
    email: 'rob.w@example.com',
    phone: '+1 (555) 654-3210',
    status: 'Active',
    joinedDate: '2023-09-12',
    tradingTier: 'Gold',
    region: 'Washington',
    totalFiles: 15,
  },
];

const mockFiles = [
  {
    id: 'f1',
    number: 1,
    fileName: 'Product Catalog Q3.xlsx',
    createdDate: '2023-10-15',
    lastUpdatedDate: '2023-10-15',
    itemsCount: 250,
    uploadedBy: 'John Smith',
    security: 'Protected',
    fileLink: 'https://example.com/file1',
    totalViews: 42,
    status: 'Active',
  },
  {
    id: 'f2',
    number: 2,
    fileName: 'Inventory List.csv',
    createdDate: '2023-09-20',
    lastUpdatedDate: '2023-09-22',
    itemsCount: 180,
    uploadedBy: 'Sarah Johnson',
    security: 'Public',
    fileLink: 'https://example.com/file2',
    totalViews: 28,
    status: 'Active',
  },
  {
    id: 'f3',
    number: 3,
    fileName: 'Summer Products.xlsx',
    createdDate: '2023-08-05',
    lastUpdatedDate: '2023-08-05',
    itemsCount: 320,
    uploadedBy: 'Michael Brown',
    security: 'Protected',
    fileLink: 'https://example.com/file3',
    totalViews: 15,
    status: 'Archived',
  },
  {
    id: 'f4',
    number: 4,
    fileName: 'Winter Collection.xlsx',
    createdDate: '2023-11-01',
    lastUpdatedDate: '2023-11-01',
    itemsCount: 150,
    uploadedBy: 'Emily Davis',
    security: 'Protected',
    fileLink: 'https://example.com/file4',
    totalViews: 8,
    status: 'Active',
  },
  {
    id: 'f5',
    number: 5,
    fileName: 'Electronics Inventory.csv',
    createdDate: '2023-07-12',
    lastUpdatedDate: '2023-10-30',
    itemsCount: 420,
    uploadedBy: 'Robert Wilson',
    security: 'Public',
    fileLink: 'https://example.com/file5',
    totalViews: 65,
    status: 'Active',
  },
];

const mockProducts = [
  {
    id: 'p1',
    productId: 'PRD001',
    productName: 'Wireless Headphones',
    traderName: 'John Smith',
    description: 'High-quality wireless headphones with noise cancellation',
    category: 'Electronics',
    retailPrice: 199.99,
    netPrice: 159.99,
    quantity: 50,
    createdDate: '2023-10-15',
  },
  {
    id: 'p2',
    productId: 'PRD002',
    productName: 'Smart Watch',
    traderName: 'Sarah Johnson',
    description: 'Feature-rich smartwatch with health tracking',
    category: 'Electronics',
    retailPrice: 299.99,
    netPrice: 249.99,
    quantity: 30,
    createdDate: '2023-09-20',
  },
  {
    id: 'p3',
    productId: 'PRD003',
    productName: 'Coffee Maker',
    traderName: 'Michael Brown',
    description: 'Programmable coffee maker with thermal carafe',
    category: 'Home Appliances',
    retailPrice: 89.99,
    netPrice: 69.99,
    quantity: 25,
    createdDate: '2023-08-05',
  },
  {
    id: 'p4',
    productId: 'PRD004',
    productName: 'Yoga Mat',
    traderName: 'Emily Davis',
    description: 'Non-slip eco-friendly yoga mat',
    category: 'Fitness',
    retailPrice: 29.99,
    netPrice: 24.99,
    quantity: 100,
    createdDate: '2023-11-01',
  },
  {
    id: 'p5',
    productId: 'PRD005',
    productName: 'Bluetooth Speaker',
    traderName: 'Robert Wilson',
    description: 'Portable waterproof Bluetooth speaker',
    category: 'Electronics',
    retailPrice: 79.99,
    netPrice: 64.99,
    quantity: 40,
    createdDate: '2023-07-12',
  },
];

// Authentication APIs
export const mockAuthAPI = {
  login: async (email: string, password: string) => {
    await delay(500); // Simulate network delay
    
    // Mock authentication
    if (email === 'admin@example.com' && password === 'password') {
      return {
        data: {
          token: 'mock-jwt-token-admin',
          user: {
            id: '1',
            name: 'Admin User',
            email,
            role: 'admin'
          }
        }
      };
    } else if (email === 'trader@example.com' && password === 'password') {
      return {
        data: {
          token: 'mock-jwt-token-trader',
          user: {
            id: '2',
            name: 'Trader User',
            email,
            role: 'trader'
          }
        }
      };
    }
    
    throw new Error('Invalid credentials');
  },
  
  register: async (userData: any) => {
    await delay(500);
    return { data: { id: '6', ...userData, status: 'Active' } };
  },
  
  forgotPassword: async (email: string) => {
    await delay(500);
    return { data: { message: 'Password reset link sent to your email' } };
  },
  
  resetPassword: async (token: string, newPassword: string) => {
    await delay(500);
    return { data: { message: 'Password reset successfully' } };
  },
  
  getProfile: async () => {
    await delay(500);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return { data: user };
  },
};

// Trader APIs
export const mockTraderAPI = {
  getAll: async (params?: any) => {
    await delay(500);
    return { data: mockTraders };
  },
  
  getById: async (id: string) => {
    await delay(500);
    const trader = mockTraders.find(t => t.id === id);
    if (!trader) {
      throw new Error('Trader not found');
    }
    return { data: trader };
  },
  
  create: async (traderData: any) => {
    await delay(500);
    const newTrader = {
      id: `TRD${mockTraders.length + 1}`,
      ...traderData,
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
      totalFiles: 0,
    };
    mockTraders.push(newTrader);
    return { data: newTrader };
  },
  
  update: async (id: string, traderData: any) => {
    await delay(500);
    const index = mockTraders.findIndex(t => t.id === id);
    if (index !== -1) {
      mockTraders[index] = { ...mockTraders[index], ...traderData };
      return { data: mockTraders[index] };
    }
    throw new Error('Trader not found');
  },
  
  updateStatus: async (id: string, status: string) => {
    await delay(500);
    const index = mockTraders.findIndex(t => t.id === id);
    if (index !== -1) {
      mockTraders[index] = { ...mockTraders[index], status };
      return { data: mockTraders[index] };
    }
    throw new Error('Trader not found');
  },
  
  delete: async (id: string) => {
    await delay(500);
    const index = mockTraders.findIndex(t => t.id === id);
    if (index !== -1) {
      mockTraders.splice(index, 1);
      return { data: { message: 'Trader deleted successfully' } };
    }
    throw new Error('Trader not found');
  },
};

// File APIs
export const mockFileAPI = {
  getAll: async (params?: any) => {
    await delay(500);
    return { data: mockFiles };
  },
  
  getById: async (id: string) => {
    await delay(500);
    const file = mockFiles.find(f => f.id === id);
    if (!file) {
      throw new Error('File not found');
    }
    return { data: file };
  },
  
  upload: async (file: File, traderId?: string) => {
    await delay(1000); // Simulate file upload time
    const newFile = {
      id: `f${mockFiles.length + 1}`,
      number: mockFiles.length + 1,
      fileName: file.name,
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdatedDate: new Date().toISOString().split('T')[0],
      itemsCount: 0, // Will be populated after extraction
      uploadedBy: traderId || 'Current User',
      security: 'Protected',
      fileLink: `https://example.com/file${mockFiles.length + 1}`,
      totalViews: 0,
      status: 'Active',
    };
    mockFiles.push(newFile);
    return { data: newFile };
  },
  
  extractProducts: async (id: string) => {
    await delay(1000); // Simulate processing time
    const file = mockFiles.find(f => f.id === id);
    if (!file) {
      throw new Error('File not found');
    }
    
    // Update the file's items count to simulate product extraction
    file.itemsCount = Math.floor(Math.random() * 100) + 50;
    return { data: { message: 'Products extracted successfully', itemsCount: file.itemsCount } };
  },
  
  updateStatus: async (id: string, status: string) => {
    await delay(500);
    const file = mockFiles.find(f => f.id === id);
    if (!file) {
      throw new Error('File not found');
    }
    file.status = status;
    return { data: file };
  },
  
  incrementViews: async (id: string) => {
    await delay(500);
    const file = mockFiles.find(f => f.id === id);
    if (!file) {
      throw new Error('File not found');
    }
    file.totalViews += 1;
    return { data: file };
  },
  
  delete: async (id: string) => {
    await delay(500);
    const index = mockFiles.findIndex(f => f.id === id);
    if (index !== -1) {
      mockFiles.splice(index, 1);
      return { data: { message: 'File deleted successfully' } };
    }
    throw new Error('File not found');
  },
};

// Product APIs
export const mockProductAPI = {
  getAll: async (params?: any) => {
    await delay(500);
    return { data: mockProducts };
  },
  
  getById: async (id: string) => {
    await delay(500);
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return { data: product };
  },
  
  create: async (productData: any) => {
    await delay(500);
    const newProduct = {
      id: `p${mockProducts.length + 1}`,
      productId: `PRD${mockProducts.length + 1}`,
      ...productData,
      createdDate: new Date().toISOString().split('T')[0],
    };
    mockProducts.push(newProduct);
    return { data: newProduct };
  },
  
  update: async (id: string, productData: any) => {
    await delay(500);
    const index = mockProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      mockProducts[index] = { ...mockProducts[index], ...productData };
      return { data: mockProducts[index] };
    }
    throw new Error('Product not found');
  },
  
  delete: async (id: string) => {
    await delay(500);
    const index = mockProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      mockProducts.splice(index, 1);
      return { data: { message: 'Product deleted successfully' } };
    }
    throw new Error('Product not found');
  },
};

export default {
  auth: mockAuthAPI,
  traders: mockTraderAPI,
  files: mockFileAPI,
  products: mockProductAPI,
};