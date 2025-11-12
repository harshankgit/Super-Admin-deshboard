import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  useTheme
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Visibility as VisibilityIcon,
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  FileDownload as FileDownloadIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import { useToast } from '../../context/ToastContext';

// Mock data for file
const mockFile = {
  id: 'f1',
  fileId: 'FL001',
  fileName: 'Product Catalog Q3.xlsx',
  createdDate: '2023-10-15',
  lastUpdatedDate: '2023-10-15',
  totalItems: 250,
  security: 'Protected',
  fileLink: 'https://example.com/file1',
  totalViews: 42,
  uploadedBy: 'John Smith',
  status: 'Active',
};

// Mock data for products extracted from the file
const mockProducts = [
  {
    id: 'p1',
    productId: 'PRD001',
    productName: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    category: 'Electronics',
    retailPrice: 199.99,
    netPrice: 159.99,
    quantity: 50,
  },
  {
    id: 'p2',
    productId: 'PRD002',
    productName: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking',
    category: 'Electronics',
    retailPrice: 299.99,
    netPrice: 249.99,
    quantity: 30,
  },
  {
    id: 'p3',
    productId: 'PRD003',
    productName: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe',
    category: 'Home Appliances',
    retailPrice: 89.99,
    netPrice: 69.99,
    quantity: 25,
  },
  {
    id: 'p4',
    productId: 'PRD004',
    productName: 'Yoga Mat',
    description: 'Non-slip eco-friendly yoga mat',
    category: 'Fitness',
    retailPrice: 29.99,
    netPrice: 24.99,
    quantity: 100,
  },
  {
    id: 'p5',
    productId: 'PRD005',
    productName: 'Bluetooth Speaker',
    description: 'Portable waterproof Bluetooth speaker',
    category: 'Electronics',
    retailPrice: 79.99,
    netPrice: 64.99,
    quantity: 40,
  },
];

const FileDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const theme = useTheme();
  const [file, setFile] = useState<any>(null);
  const [products, setProducts] = useState<any[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<any[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // In a real app, this would fetch data from the API
    setFile(mockFile);
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, [id]);

  const handleBack = () => {
    navigate('/files');
  };

  const handleEditFile = () => {
    navigate(`/files/${id}/edit`);
  };

  const handleDeleteFile = () => {
    if (window.confirm('Are you sure you want to delete this file? This action cannot be undone.')) {
      // In a real app, this would call an API
      navigate('/files');
      showSuccess('File deleted successfully');
    }
  };

  const handleProductView = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const handleProductEdit = (productId: string) => {
    navigate(`/products/${productId}/edit`);
  };

  const handleProductDelete = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // In a real app, this would call an API
      setProducts(prev => prev.filter(product => product.id !== productId));
      setFilteredProducts(prev => prev.filter(product => product.id !== productId));
      showSuccess('Product deleted successfully');
    }
  };

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const result = products.filter(product => 
        product.productName.toLowerCase().includes(term) ||
        product.productId.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
      );
      setFilteredProducts(result);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Archived':
        return 'default';
      default:
        return 'default';
    }
  };

  const getSecurityColor = (security: string) => {
    switch (security) {
      case 'Public':
        return 'success';
      case 'Protected':
        return 'warning';
      default:
        return 'default';
    }
  };

  if (!file) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1">
            File Details
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={handleEditFile}
            sx={{ mr: 1 }}
          >
            Edit File
          </Button>
          <Button
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            href={file.fileLink}
            download
            sx={{ mr: 1 }}
          >
            Download
          </Button>
          <Button
            variant="outlined"
            startIcon={<ShareIcon />}
            href={file.fileLink}
            target="_blank"
            sx={{ mr: 1 }}
          >
            Share Link
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteFile}
          >
            Delete File
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                File Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">File ID</Typography>
                  <Typography variant="body1">{file.fileId}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">File Name</Typography>
                  <Typography variant="body1">{file.fileName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Created Date</Typography>
                  <Typography variant="body1">{new Date(file.createdDate).toLocaleDateString()}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Last Updated Date</Typography>
                  <Typography variant="body1">{new Date(file.lastUpdatedDate).toLocaleDateString()}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Total Items</Typography>
                  <Typography variant="body1">{file.totalItems}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Security</Typography>
                  <Chip 
                    label={file.security} 
                    color={getSecurityColor(file.security) as 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">File Link</Typography>
                  <Button 
                    variant="outlined" 
                    size="small"
                    href={file.fileLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Access File
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Total Views</Typography>
                  <Typography variant="body1">{file.totalViews}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Status</Typography>
                  <Chip 
                    label={file.status} 
                    color={getStatusColor(file.status) as 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Uploaded By</Typography>
                  <Typography variant="body1">{file.uploadedBy}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Extracted Product List
              </Typography>
              <TextField
                fullWidth
                label="Search Products"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product ID</TableCell>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Retail Price</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredProducts.length > 0 ? (
                      filteredProducts.slice(0, 5).map((product) => ( // Show only first 5 for this view
                        <TableRow key={product.id}>
                          <TableCell>{product.productId}</TableCell>
                          <TableCell>{product.productName}</TableCell>
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
                          <TableCell>
                            <Tooltip title="View Product">
                              <IconButton onClick={() => handleProductView(product.id)} size="small">
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit Product">
                              <IconButton onClick={() => handleProductEdit(product.id)} size="small">
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Product">
                              <IconButton onClick={() => handleProductDelete(product.id)} size="small">
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          No products found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {filteredProducts.length > 5 && (
                <Button
                  variant="outlined"
                  component={Link}
                  to={`/products?file=${file.id}`}
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  View All Products ({filteredProducts.length} total)
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              All Extracted Products
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product ID</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Retail Price</TableCell>
                    <TableCell>Net Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.productId}</TableCell>
                        <TableCell>{product.productName}</TableCell>
                        <TableCell>{product.description}</TableCell>
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
                        <TableCell>
                          <Tooltip title="View Product">
                            <IconButton onClick={() => handleProductView(product.id)} size="small">
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit Product">
                            <IconButton onClick={() => handleProductEdit(product.id)} size="small">
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Product">
                            <IconButton onClick={() => handleProductDelete(product.id)} size="small">
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        No products extracted from this file
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FileDetail;