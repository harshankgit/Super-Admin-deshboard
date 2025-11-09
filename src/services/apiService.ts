import apiClient from "./api";
import {
  mockLogin,
  mockForgotPassword,
  mockResetPassword,
  mockRegister,
  mockGetCustomers,
  mockGetCustomerById,
  mockCreateCustomer,
  mockUpdateCustomer,
  mockDeleteCustomer,
  mockChangeCustomerStatus,
} from "./mockApi";
import {
  getCustomers as getCustomersFromStorage,
  getCustomerById as getCustomerByIdFromStorage,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  changeCustomerStatus as changeCustomerStatusInStorage,
} from "./localStorageService";
import type { Customer } from "./localStorageService";

// Add a mock register function to the mock API imports list

// Authentication APIs
export const authAPI = {
  login: async (email: string, password: string) => {
    try {
      const response = await apiClient.post("/auth/login", { email, password });
      return response.data;
    } catch (error) {
      console.log("Using mock login API");
      return await mockLogin(email, password);
    }
  },

  register: async (email: string, password: string, name: string) => {
    try {
      const response = await apiClient.post("/auth/register", {
        email,
        password,
        name,
      });
      return response.data;
    } catch (error) {
      console.log("Using mock register API");
      return await mockRegister(email, password, name);
    }
  },

  forgotPassword: async (email: string) => {
    try {
      const response = await apiClient.post("/auth/forgot-password", {
        email,
        path: `${window.location.origin}/reset-password`,
      });
      return response.data;
    } catch (error) {
      console.log("Using mock forgot password API");
      return await mockForgotPassword(email);
    }
  },

  resetPassword: async (token: string, newPassword: string) => {
    try {
      const response = await apiClient.post(`/auth/reset-password/${token}`, {
        newPassword,
      });
      return response.data;
    } catch (error) {
      console.log("Using mock reset password API");
      return await mockResetPassword(token, newPassword);
    }
  },
};

// Customer APIs
export const customerAPI = {
  getCustomers: async () => {
    try {
      const response = await apiClient.get("/customers/list");
      return response.data;
    } catch (error) {
      console.log("API failed, trying mock data");
      try {
        return await mockGetCustomers();
      } catch (mockError) {
        console.log("Mock also failed, using localStorage data");
        return getCustomersFromStorage();
      }
    }
  },

  getCustomerById: async (id: number) => {
    try {
      const response = await apiClient.get(`/customers/${id}`);
      return response.data;
    } catch (error) {
      console.log("API failed, trying mock data");
      try {
        return await mockGetCustomerById(id);
      } catch (mockError) {
        console.log("Mock also failed, using localStorage data");
        const customer = getCustomerByIdFromStorage(id);
        if (!customer) {
          throw new Error("Customer not found");
        }
        return customer;
      }
    }
  },

  createCustomer: async (customerData: any) => {
    try {
      const response = await apiClient.post("/customers/add", customerData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log("API failed, trying mock");
      try {
        return await mockCreateCustomer(customerData);
      } catch (mockError) {
        console.log("Mock also failed, using localStorage fallback");
        // Convert form data to customer object
        const customerObj: Omit<Customer, "_id" | "createdAt"> = {
          name: customerData.get("name") || "",
          email: customerData.get("email") || "",
          companyName: customerData.get("companyName") || "",
          phoneNo: customerData.get("phoneNo") || "",
          gender: customerData.get("gender") || "male",
          country: customerData.get("country") || "IN",
          state: customerData.get("state") || "",
          isSubscribed: customerData.get("isSubscribed") === "true",
          address: customerData.get("address") || "",
          notes: customerData.get("notes") || "",
          documents: [],
          status: "active",
          profileImage: undefined, // Profile image handling would be more complex
        };

        return addCustomer(customerObj);
      }
    }
  },

  updateCustomer: async (id: number, customerData: any) => {
    try {
      const response = await apiClient.put(
        `/customers/update/${id}`,
        customerData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("API failed, trying mock");
      try {
        return await mockUpdateCustomer(id, customerData);
      } catch (mockError) {
        console.log("Mock also failed, using localStorage fallback");
        // Convert form data to customer object
        const customerObj: Partial<Customer> = {
          name: customerData.get("name") || undefined,
          email: customerData.get("email") || undefined,
          companyName: customerData.get("companyName") || undefined,
          phoneNo: customerData.get("phoneNo") || undefined,
          gender: customerData.get("gender") || undefined,
          country: customerData.get("country") || undefined,
          state: customerData.get("state") || undefined,
          isSubscribed: customerData.get("isSubscribed") === "true",
          address: customerData.get("address") || undefined,
          notes: customerData.get("notes") || undefined,
        };

        const result = updateCustomer(id, customerObj);
        if (!result) {
          throw new Error("Customer not found");
        }
        return result;
      }
    }
  },

  deleteCustomer: async (id: number) => {
    try {
      const response = await apiClient.delete(`/customers/delete/${id}`);
      return response.data;
    } catch (error) {
      console.log("API failed, trying mock");
      try {
        return await mockDeleteCustomer(id);
      } catch (mockError) {
        console.log("Mock also failed, using localStorage fallback");
        const success = deleteCustomer(id);
        if (!success) {
          throw new Error("Customer not found");
        }
        return { success: true, message: "Customer deleted successfully" };
      }
    }
  },

  changeCustomerStatus: async (id: number, status: "active" | "inactive") => {
    try {
      const response = await apiClient.patch(`/customers/change-status/${id}`, {
        status,
      });
      return response.data;
    } catch (error) {
      console.log("API failed, trying mock");
      try {
        return await mockChangeCustomerStatus(id, status);
      } catch (mockError) {
        console.log("Mock also failed, using localStorage fallback");
        const success = changeCustomerStatusInStorage(id, status);
        if (!success) {
          throw new Error("Customer not found");
        }
        return {
          success: true,
          message: "Customer status updated successfully",
          data: { id, status },
        };
      }
    }
  },
};

// Dashboard APIs
export const dashboardAPI = {
  getMetrics: async () => {
    try {
      const response = await apiClient.get("/dashboard/metrics");
      return response.data;
    } catch (error) {
      console.log("Using mock dashboard metrics API");
      // Mock data for implementation
      const mockMetrics = {
        totalCustomers: 1201,
        activeCustomers: 1100,
        inactiveCustomers: 122,
        recentCustomers: [
          {
            id: 1,
            name: "Joh Doe",
            email: "john@example.com",
            date: "2025-11-01",
          },
          {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            date: "2025-10-28",
          },
          {
            id: 3,
            name: "Robert Johnson",
            email: "robert@example.com",
            date: "2025-10-25",
          },
          {
            id: 4,
            name: "Emily Davis",
            email: "emily@example.com",
            date: "2025-10-20",
          },
          {
            id: 5,
            name: "Michael Brown",
            email: "michael@example.com",
            date: "2025-10-15",
          },
        ],
      };
      return mockMetrics;
    }
  },
};
