import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Grid,
  Pagination,
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Add as AddIcon, Search as SearchIcon, Edit as EditIcon, Visibility as VisibilityIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

// Mock data for products
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
  {
    id: 'p6',
    productId: 'PRD006',
    productName: 'Desk Lamp',
    traderName: 'John Smith',
    description: 'Adjustable LED desk lamp with touch controls',
    category: 'Home & Office',
    retailPrice: 45.99,
    netPrice: 35.99,
    quantity: 60,
    createdDate: '2023-10-22',
  },
  {
    id: 'p7',
    productId: 'PRD007',
    productName: 'Water Bottle',
    traderName: 'Sarah Johnson',
    description: 'Insulated stainless steel water bottle',
    category: 'Lifestyle',
    retailPrice: 24.99,
    netPrice: 19.99,
    quantity: 200,
    createdDate: '2023-09-30',
  },
  {
    id: 'p8',
    productId: 'PRD008',
    productName: 'Backpack',
    traderName: 'Emily Davis',
    description: 'Water-resistant backpack with laptop compartment',
    category: 'Fashion',
    retailPrice: 59.99,
    netPrice: 49.99,
    quantity: 75,
    createdDate: '2023-11-05',
  },
];

const ProductsManagement: React.FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTrader, setSelectedTrader] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const navigate = useNavigate();
  const { showError } = useToast();
  const theme = useTheme();

  // Filter products based on search and filters
  useEffect(() => {
    let result = mockProducts;
    
    // Filter by role - traders can only see their own products
    if (user?.role === 'trader') {
      result = result.filter(product => product.traderName === user.name);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.productName.toLowerCase().includes(term) ||
        product.productId.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
      );
    }
    
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    if (selectedTrader !== 'all') {
      result = result.filter(product => product.traderName === selectedTrader);
    }
    
    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedCategory, selectedTrader, user]);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Get unique categories and traders for filter dropdowns
  const categories = Array.from(new Set(mockProducts.map(product => product.category)));
  const traders = Array.from(new Set(mockProducts.map(product => product.traderName)));

  const handleViewProduct = (id: string) => {
    navigate(`/products/${id}`);
  };

  const handleEditProduct = (id: string) => {
    navigate(`/products/${id}/edit`);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // In a real app, this would call an API
      setProducts(prev => prev.filter(product => product.id !== id));
      setFilteredProducts(prev => prev.filter(product => product.id !== id));
      showError('Product deleted successfully');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Products Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to="/products/create"
          sx={{ backgroundColor: 'primary.main', color: 'white' }}
        >
          Add New Product
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search by Product Name, Category, etc."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: <SearchIcon color="action" />
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as string)}
                label="Category"
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map(category => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {user?.role === 'admin' && (
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Trader</InputLabel>
                <Select
                  value={selectedTrader}
                  onChange={(e) => setSelectedTrader(e.target.value as string)}
                  label="Trader"
                >
                  <MenuItem value="all">All Traders</MenuItem>
                  {traders.map(trader => (
                    <MenuItem key={trader} value={trader}>{trader}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>
      </Paper>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="products table">
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell>Product Name</TableCell>
              {user?.role === 'admin' && <TableCell>Trader Name</TableCell>}
              <TableCell>Category</TableCell>
              <TableCell>Retail Price</TableCell>
              <TableCell>Net Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.productId}
                  </TableCell>
                  <TableCell>{product.productName}</TableCell>
                  {user?.role === 'admin' && <TableCell>{product.traderName}</TableCell>}
                  <TableCell>
                    <Chip 
                      label={product.category} 
                      size="small"
                      sx={{ 
                        backgroundColor: theme.palette.grey[300], 
                        color: theme.palette.grey[800] 
                      }}
                    />
                  </TableCell>
                  <TableCell>${product.retailPrice.toFixed(2)}</TableCell>
                  <TableCell>${product.netPrice.toFixed(2)}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{new Date(product.createdDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Tooltip title="View Product">
                      <IconButton onClick={() => handleViewProduct(product.id)} size="small">
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Product">
                      <IconButton onClick={() => handleEditProduct(product.id)} size="small">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Product">
                      <IconButton onClick={() => handleDeleteProduct(product.id)} size="small">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={user?.role === 'admin' ? 9 : 8} align="center">
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default ProductsManagement;