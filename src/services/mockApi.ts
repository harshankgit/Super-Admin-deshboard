// Mock API implementation for testing
export const mockRegister = async (
  email: string,
  password: string,
  name: string
) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Basic validation
  if (!email || !password || !name) {
    throw new Error("All fields are required");
  }

  if (!email.includes("@")) {
    throw new Error("Invalid email format");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  // Return mock success response
  return {
    success: true,
    message: "Registration successful",
    data: {
      user: {
        id: 1,
        email: email,
        name: name,
      },
    },
  };
};

export const mockLogin = async (email: string, password: string) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock validation
  if (email === "admin@example.com" && password === "Password123!") {
    return {
      token: "mock-jwt-token-for-testing",
      user: {
        id: 1,
        email: "admin@example.com",
        name: "Super Admin",
      },
    };
  } else {
    throw new Error("Invalid credentials");
  }
};

export const mockForgotPassword = async (email: string) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Simulate success regardless of email
  return { message: "Password reset link sent" };
};

export const mockResetPassword = async (token: string, newPassword: string) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Simulate success
  return { message: "Password reset successful" };
};

export const mockGetCustomers = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      _id: "690b1a2b4e7e8d12345abcde1",
      name: "John Doe",
      email: "john@example.com",
      companyName: "Tech Solutions Inc.",
      phoneNo: "+1 (555) 123-4567",
      profileImage: "https://via.placeholder.com/100",
      gender: "male",
      country: "us",
      isSubscribed: true,
      address: "123 Tech St, San Francisco, CA",
      documents: [
        "https://via.placeholder.com/150",
        "https://example.com/document.pdf",
      ],
      status: "active",
      createdAt: "2025-01-15T10:30:00.000Z",
    },
    {
      _id: "690b1a2b4e7e8d12345abcde1",
      name: "John Doe",
      email: "john@example.com",
      companyName: "Tech Solutions Inc.",
      phoneNo: "+1 (555) 123-4567",
      profileImage: "https://via.placeholder.com/100",
      gender: "male",
      country: "us",
      isSubscribed: true,
      address: "123 Tech St, San Francisco, CA",
      documents: [
        "https://via.placeholder.com/150",
        "https://example.com/document.pdf",
      ],
      status: "active",
      createdAt: "2025-01-15T10:30:00.000Z",
    },
    {
      _id: "690b1a2b4e7e8d12345abcde1",
      name: "John Doe",
      email: "john@example.com",
      companyName: "Tech Solutions Inc.",
      phoneNo: "+1 (555) 123-4567",
      profileImage: "https://via.placeholder.com/100",
      gender: "male",
      country: "us",
      isSubscribed: true,
      address: "123 Tech St, San Francisco, CA",
      documents: [
        "https://via.placeholder.com/150",
        "https://example.com/document.pdf",
      ],
      status: "active",
      createdAt: "2025-01-15T10:30:00.000Z",
    },
    
    {
      _id: "690b1a2b4e7e8d12345abcde1",
      name: "John Doe",
      email: "john@example.com",
      companyName: "Tech Solutions Inc.",
      phoneNo: "+1 (555) 123-4567",
      profileImage: "https://via.placeholder.com/100",
      gender: "male",
      country: "us",
      isSubscribed: true,
      address: "123 Tech St, San Francisco, CA",
      documents: [
        "https://via.placeholder.com/150",
        "https://example.com/document.pdf",
      ],
      status: "active",
      createdAt: "2025-01-15T10:30:00.000Z",
    },
    {
      _id: "690b1a2b4e7e8d12345abcde2",
      name: "Jane Smith",
      email: "jane@example.com",
      companyName: "Global Marketing Co.",
      phoneNo: "+1 (555) 987-6543",
      profileImage: "https://via.placeholder.com/100",
      gender: "female",
      country: "us",
      isSubscribed: false,
      address: "456 Market Ave, New York, NY",
      documents: ["https://via.placeholder.com/150"],
      status: "inactive",
      createdAt: "2025-01-20T11:45:00.000Z",
    },
    {
      _id: "690b1a2b4e7e8d12345abcde3",
      name: "Robert Johnson",
      email: "robert@example.com",
      companyName: "Innovative Designs LLC",
      phoneNo: "+1 (555) 456-7890",
      profileImage: "https://via.placeholder.com/100",
      gender: "other",
      country: "in",
      isSubscribed: true,
      address: "789 Design Blvd, Los Angeles, CA",
      documents: [],
      status: "active",
      createdAt: "2025-02-01T09:15:00.000Z",
    },
  ];
};

export const mockGetCustomerById = async (id: number) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const customers = await mockGetCustomers();
  return (
    customers.find((customer) => customer._id.includes(id.toString())) ||
    customers[0]
  );
};

export const mockCreateCustomer = async (formData: FormData) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Extract values from FormData
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const companyName = formData.get("companyName") as string;
  const phoneNo = formData.get("phoneNo") as string;
  const gender = formData.get("gender") as string;
  const country = formData.get("country") as string;
  const isSubscribed = formData.get("isSubscribed") === "true";
  const address = formData.get("address") as string;

  return {
    success: true,
    message: "Customer added successfully",
    data: {
      _id: `690b1a2b4e7e8d12345${Date.now()}`,
      name,
      email,
      companyName,
      phoneNo,
      gender,
      country,
      isSubscribed,
      address,
      profileImage: "uploads/profileImage/download.jpeg",
      documents: ["uploads/documents/download.jpeg"],
      status: "active",
      createdAt: new Date().toISOString(),
    },
  };
};

export const mockUpdateCustomer = async (id: number, formData: FormData) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Extract values from FormData
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const companyName = formData.get("companyName") as string;
  const phoneNo = formData.get("phoneNo") as string;
  const gender = formData.get("gender") as string;
  const country = formData.get("country") as string;
  const isSubscribed = formData.get("isSubscribed") === "true";
  const address = formData.get("address") as string;

  return {
    success: true,
    message: "Customer updated successfully",
    data: {
      _id: `690b1a2b4e7e8d12345abcde${id}`,
      name,
      email,
      companyName,
      phoneNo,
      gender,
      country,
      isSubscribed,
      address,
      profileImage: "uploads/profileImage/download.jpeg",
      documents: ["uploads/documents/download.jpeg"],
      status: "active",
      createdAt: new Date().toISOString(),
    },
  };
};

export const mockDeleteCustomer = async (id: number) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    message: "Customer deleted successfully",
  };
};

export const mockChangeCustomerStatus = async (
  id: number,
  status: "active" | "inactive"
) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    message: "Customer status updated successfully",
    data: {
      id,
      status,
    },
  };
};
