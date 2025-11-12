# Trading Platform Admin Panel

This is a comprehensive admin panel for managing traders, files, and products in a trading platform. The application includes role-based access control with different permissions for Super Admins and Traders.

## Features

### Traders Module
- **Super Admin**: Create, edit, view, and manage all traders
- **Trader**: Can log in but has restricted permissions
- Trader profiles include contact details, trading tier, risk category, and account information
- Search and filter traders by name, tier, or region

### Files Management Module
- **Super Admin**: View and manage all files uploaded by all traders
- **Trader**: View and manage only their own uploaded files
- Support for CSV and XLSX file uploads
- Real-time view count tracking
- File security settings (Public/Protected)

### Product Management Module
- **Super Admin**: View, edit, delete, or add any product
- **Trader**: View and manage only their own product data
- Automatic product extraction from uploaded files
- Product details include category, pricing, and inventory

## User Roles

| Role | Permissions |
|------|-------------|
| Super Admin | Full access to manage traders, all files, all products, and system settings |
| Trader | Manage only their own files and products; cannot view others' data |

## UI Components

The application includes several reusable components:
- DataTable: For displaying tabular data with filtering and sorting
- SearchFilters: For search and filter functionality
- TraderForm: For creating and editing trader profiles

## API Integration

The application includes a flexible API service layer that can work with either a real backend or mock data for development:

- Set `VITE_USE_MOCK_API=true` in your `.env` file to use mock data
- Set `VITE_API_URL` to point to your backend API
- The API service automatically includes JWT tokens in requests

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_USE_MOCK_API=true  # Set to 'false' when using real backend
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Testing Credentials

For testing purposes, you can use these mock credentials:
- Admin: `admin@example.com` / `password`
- Trader: `trader@example.com` / `password`

## File Structure

```
src/
├── components/           # Reusable UI components
│   ├── DataTable.tsx
│   ├── SearchFilters.tsx
│   ├── TraderForm.tsx
│   └── DashboardLayout.tsx
├── pages/                # Page components
│   ├── auth/             # Authentication pages
│   ├── traders/          # Trader management pages
│   ├── files/            # File management pages
│   └── products/         # Product management pages
├── context/              # React context providers
│   ├── AuthContext.tsx
│   └── ToastContext.tsx
├── services/             # API services
│   ├── apiClient.ts
│   └── mockAPIService.ts
└── AppRoutes.tsx         # Application routing
```