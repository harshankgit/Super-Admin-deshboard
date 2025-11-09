# Super Admin Dashboard

A complete React + TypeScript frontend application with Material UI, Tailwind CSS, Formik, Yup, and Axios integration for a customer management system.

## Features

- **Authentication**: Login, Forgot Password, Reset Password
- **Dashboard**: Key metrics and customer overview
- **Customer Management**: List, Add, Edit, and View customers
- **File Uploads**: With previews and management
- **Responsive Design**: Works on desktop and mobile
- **Form Validation**: Using Formik and Yup
- **API Integration**: With JWT token handling
- **Notifications**: Toast notifications for user feedback

## Tech Stack

- React + TypeScript
- Material UI
- Tailwind CSS
- Formik + Yup
- Axios
- React Router v6
- React Context API
- React Toastify

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## API Configuration

The application is configured to connect to a backend API at `http://10.0.4.233:3001/api/`. The application includes mock API implementations that will be used if the real API is not available.

## Authentication

To log in during development, use:
- Email: `admin@example.com`
- Password: `Password123!`

## Project Structure

```
src/
├── components/          # Reusable UI components
├── context/             # React context providers
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── services/            # API services
├── utils/               # Utility functions
└── App.tsx              # Main application component
```

## Environment Configuration

The application uses a `.env` file for environment variables. Create a `.env` file in the root directory with the following:

```
VITE_API_BASE_URL=http://10.0.4.233:3001/api
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Key Functionality

1. **Authentication Flow**:
   - Login with email/password
   - Forgot password functionality
   - Password reset via token
   - JWT token management in localStorage

2. **Dashboard**:
   - Key metrics display
   - Recent customers table
   - Responsive layout

3. **Customer Management**:
   - Create, read, update, delete (CRUD) operations
   - Search and filter functionality
   - File uploads with previews
   - Status management

4. **Security**:
   - Protected routes
   - JWT token auto-attach to requests
   - Token expiration handling

## Mock API Implementation

This application includes mock API implementations that will be used when the real backend is not available. This allows for full frontend development and testing without a backend server.

## File Upload

The application supports file uploads with previews. Supported formats include images, PDFs, and document files. Files are managed with preview and removal capabilities during the editing process.