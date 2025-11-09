// localStorage service for customer data persistence
const CUSTOMER_STORAGE_KEY = 'customers';

// Define the customer type
export interface Customer {
  _id: string;
  name: string;
  email: string;
  companyName: string;
  phoneNo: string;
  profileImage?: string;
  gender: string;
  country: string;
  state: string;
  isSubscribed: boolean;
  address: string;
  notes: string;
  documents: string[];
  status: string;
  createdAt: string;
}

// Initialize with default data if no data exists
const initializeStorage = () => {
  if (!localStorage.getItem(CUSTOMER_STORAGE_KEY)) {
    const defaultCustomers: Customer[] = [
      {
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        companyName: 'Tech Solutions Inc.',
        phoneNo: '+1 (555) 123-4567',
        profileImage: 'https://via.placeholder.com/100',
        gender: 'male',
        country: 'us',
        state: 'CA',
        isSubscribed: true,
        address: '123 Tech St, San Francisco, CA',
        notes: 'Regular customer',
        documents: [],
        status: 'active',
        createdAt: new Date().toISOString(),
      },
      {
        _id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        companyName: 'Global Marketing Co.',
        phoneNo: '+1 (555) 987-6543',
        profileImage: 'https://via.placeholder.com/100',
        gender: 'female',
        country: 'us',
        state: 'NY',
        isSubscribed: false,
        address: '456 Market Ave, New York, NY',
        notes: 'VIP customer',
        documents: [],
        status: 'active',
        createdAt: new Date().toISOString(),
      },
      {
        _id: '3',
        name: 'Robert Johnson',
        email: 'robert@example.com',
        companyName: 'Innovative Designs LLC',
        phoneNo: '+1 (555) 456-7890',
        profileImage: 'https://via.placeholder.com/100',
        gender: 'other',
        country: 'in',
        state: 'MA',
        isSubscribed: true,
        address: '789 Design Blvd, Los Angeles, CA',
        notes: 'New customer',
        documents: [],
        status: 'inactive',
        createdAt: new Date().toISOString(),
      }
    ];
    localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(defaultCustomers));
  }
};

// Get all customers
export const getCustomers = (): Customer[] => {
  initializeStorage();
  const data = localStorage.getItem(CUSTOMER_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Get customer by ID
export const getCustomerById = (id: number): Customer | undefined => {
  initializeStorage();
  const customers = getCustomers();
  return customers.find(customer => parseInt(customer._id) === id);
};

// Add a new customer
export const addCustomer = (customer: Omit<Customer, '_id' | 'createdAt'>): Customer => {
  initializeStorage();
  const customers = getCustomers();
  const newCustomer: Customer = {
    ...customer,
    _id: (customers.length + 1).toString(),
    createdAt: new Date().toISOString(),
    status: 'active', // Default to active for new customers
  };
  customers.push(newCustomer);
  localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customers));
  return newCustomer;
};

// Update a customer
export const updateCustomer = (id: number, updatedData: Partial<Customer>): Customer | undefined => {
  initializeStorage();
  const customers = getCustomers();
  const customerIndex = customers.findIndex(customer => parseInt(customer._id) === id);
  
  if (customerIndex === -1) {
    return undefined;
  }
  
  const updatedCustomer = {
    ...customers[customerIndex],
    ...updatedData,
  };
  
  customers[customerIndex] = updatedCustomer;
  localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customers));
  return updatedCustomer;
};

// Delete a customer
export const deleteCustomer = (id: number): boolean => {
  initializeStorage();
  const customers = getCustomers();
  const initialLength = customers.length;
  const updatedCustomers = customers.filter(customer => parseInt(customer._id) !== id);
  
  if (updatedCustomers.length === initialLength) {
    // Customer with given ID was not found
    return false;
  }
  
  localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(updatedCustomers));
  return true;
};

// Change customer status
export const changeCustomerStatus = (id: number, status: 'active' | 'inactive'): boolean => {
  initializeStorage();
  return !!updateCustomer(id, { status });
};