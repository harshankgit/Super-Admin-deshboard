import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
  useTheme,
  TablePagination,
  Toolbar,
  InputBase
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

import ConfirmationModal from '../components/ConfirmationModal';

interface Customer {
  _id: string;
  name: string;
  email: string;
  companyName: string;
  phoneNo: string;
  profileImage?: string;
  status: string;
  createdAt: string;
}

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState<'active' | 'inactive'>('active');
  const { showError, showSuccess } = useToast();
  const theme = useTheme();

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    // Filter customers based on search term and status
    const results = customers.filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            customer.companyName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
    setFilteredCustomers(results);
    setPage(0); // Reset to first page when filters change
  }, [customers, searchTerm, statusFilter]);

  const fetchCustomers = async () => {
    try {
      // Using mock data since customerAPI doesn't exist in the new service
      const mockCustomers: Customer[] = [
        {
          _id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          companyName: 'ABC Company',
          phoneNo: '+1234567890',
          status: 'active',
          createdAt: '2023-01-15'
        },
        {
          _id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          companyName: 'XYZ Corp',
          phoneNo: '+0987654321',
          status: 'inactive',
          createdAt: '2023-02-20'
        },
        {
          _id: '3',
          name: 'Robert Johnson',
          email: 'robert@example.com',
          companyName: 'Tech Solutions',
          phoneNo: '+1122334455',
          status: 'active',
          createdAt: '2023-03-10'
        },
        {
          _id: '4',
          name: 'Emily Davis',
          email: 'emily@example.com',
          companyName: 'Global Services',
          phoneNo: '+5566778899',
          status: 'active',
          createdAt: '2023-04-05'
        },
        {
          _id: '5',
          name: 'Michael Wilson',
          email: 'michael@example.com',
          companyName: 'Innovate Inc',
          phoneNo: '+9988776655',
          status: 'inactive',
          createdAt: '2023-05-12'
        }
      ];
      setCustomers(mockCustomers);
    } catch (error) {
      console.error('Error fetching customers:', error);
      showError('Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setSelectedCustomerId(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedCustomerId !== null) {
      try {
        // Mock delete
        setCustomers(customers.filter(customer => customer._id !== selectedCustomerId.toString()));
        showSuccess('Customer deleted successfully');
      } catch (error) {
        console.error('Error deleting customer:', error);
        showError('Failed to delete customer');
      } finally {
        setDeleteModalOpen(false);
        setSelectedCustomerId(null);
      }
    }
  };

  const handleStatusChange = async (id: number, newStatus: 'active' | 'inactive') => {
    setSelectedCustomerId(id);
    setNewStatus(newStatus);
    setStatusModalOpen(true);
  };

  const confirmStatusChange = async () => {
    if (selectedCustomerId !== null) {
      try {
        // Mock status update
        setCustomers(customers.map(customer =>
          customer._id === selectedCustomerId.toString() ? { ...customer, status: newStatus } : customer
        ));
        showSuccess(`Customer status updated to ${newStatus}`);
      } catch (error) {
        console.error('Error updating customer status:', error);
        showError('Failed to update customer status');
      } finally {
        setStatusModalOpen(false);
        setSelectedCustomerId(null);
      }
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get paginated data
  const paginatedCustomers = filteredCustomers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2 } }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Customer Management
      </Typography>

      <Paper sx={{ p: 2, mb: 3, backgroundColor: theme.palette.background.paper, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              label="Search customers"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              component={Link}
              to="/customers/add"
              size="large"
            >
              Add Customer
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{
        width: '100%',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2
      }}>
        <TableContainer>
          <Table sx={{ minWidth: { xs: 650, md: 900 } }} aria-label="customers table">
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100] }}>
                <TableCell sx={{ fontWeight: 600 }}>Customer ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Company</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Created Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCustomers.length > 0 ? (
                paginatedCustomers.map((customer) => (
                  <TableRow
                    key={customer._id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover
                      }
                    }}
                  >
                    <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                      {customer._id.substring(0, 8)}...
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {customer.profileImage ? (
                          <img
                            src={customer.profileImage}
                            alt="Customer"
                            style={{ width: 32, height: 32, borderRadius: '50%', marginRight: 8 }}
                          />
                        ) : (
                          <Box sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            backgroundColor: theme.palette.primary.main,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 1
                          }}>
                            <Typography variant="caption" color="white">
                              {customer.name.charAt(0).toUpperCase()}
                            </Typography>
                          </Box>
                        )}
                        {customer.name}
                      </Box>
                    </TableCell>
                    <TableCell>{customer.companyName}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phoneNo}</TableCell>
                    <TableCell>
                      <Chip
                        label={customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                        color={customer.status === 'active' ? 'success' : 'error'}
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell>{new Date(customer.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        startIcon={<ViewIcon />}
                        component={Link}
                        to={`/customers/view/${customer._id}`}
                        sx={{ mr: 1 }}
                        variant="outlined"
                      >
                        View
                      </Button>
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        component={Link}
                        to={`/customers/edit/${customer._id}`}
                        sx={{ mr: 1 }}
                        variant="outlined"
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        startIcon={<DeleteIcon />}
                        color="error"
                        onClick={() => handleDelete(parseInt(customer._id.slice(-6)))}
                        sx={{ mr: 1 }}
                        variant="outlined"
                      >
                        Delete
                      </Button>
                      <Button
                        size="small"
                        color={customer.status === 'active' ? 'error' : 'success'}
                        onClick={() => handleStatusChange(parseInt(customer._id.slice(-6)), customer.status === 'active' ? 'inactive' : 'active')}
                        variant="outlined"
                      >
                        {customer.status === 'active' ? 'Deactivate' : 'Activate'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="textSecondary">
                      No customers found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredCustomers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100]
          }}
        />
      </Paper>

      <ConfirmationModal
        isOpen={deleteModalOpen}
        title="Delete Customer"
        message="Are you sure you want to delete this customer? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
        confirmText="Delete"
        cancelText="Cancel"
      />

      <ConfirmationModal
        isOpen={statusModalOpen}
        title={newStatus === 'active' ? 'Activate Customer' : 'Deactivate Customer'}
        message={`Are you sure you want to ${newStatus} this customer?`}
        onConfirm={confirmStatusChange}
        onCancel={() => setStatusModalOpen(false)}
        confirmText={newStatus === 'active' ? 'Activate' : 'Deactivate'}
        cancelText="Cancel"
      />
    </Box>
  );
};

export default CustomerList;