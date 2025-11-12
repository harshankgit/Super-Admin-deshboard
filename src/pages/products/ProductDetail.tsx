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
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

// Mock data for product
const mockProduct = {
  id: 'p1',
  productId: 'PRD001',
  productName: 'Wireless Headphones',
  traderName: 'John Smith',
  description: 'High-quality wireless headphones with noise cancellation, perfect for music lovers and professionals. Featuring deep bass, crystal clear highs, and comfortable over-ear design for extended listening sessions.',
  category: 'Electronics',
  retailPrice: 199.99,
  netPrice: 159.99,
  quantity: 50,
  createdDate: '2023-10-15',
  linkedFileId: 'FL001',
  linkedFileName: 'Product Catalog Q3.xlsx'
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const theme = useTheme();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    // In a real app, this would fetch data from the API
    setProduct(mockProduct);
  }, [id]);

  const handleBack = () => {
    navigate('/products');
  };

  const handleEditProduct = () => {
    navigate(`/products/${id}/edit`);
  };

  const handleDeleteProduct = () => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      // In a real app, this would call an API
      navigate('/products');
      showSuccess('Product deleted successfully');
    }
  };

  if (!product) {
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
            Product Details
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={handleEditProduct}
            sx={{ mr: 1 }}
          >
            Edit Product
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteProduct}
          >
            Delete Product
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Product Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Product ID</Typography>
                  <Typography variant="body1">{product.productId}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Product Name</Typography>
                  <Typography variant="h4" component="h2" sx={{ mt: 0 }}>{product.productName}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Description</Typography>
                  <Typography variant="body1">{product.description}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Category</Typography>
                  <Chip 
                    label={product.category} 
                    size="small"
                    sx={{ 
                      backgroundColor: theme.palette.grey[300], 
                      color: theme.palette.grey[800],
                      mt: 0.5
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Created Date</Typography>
                  <Typography variant="body1">{new Date(product.createdDate).toLocaleDateString()}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Retail Price</Typography>
                  <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                    ${product.retailPrice.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Net Price</Typography>
                  <Typography variant="h5" color="secondary" sx={{ fontWeight: 'bold' }}>
                    ${product.netPrice.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Quantity</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {product.quantity} units
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Status</Typography>
                  <Chip 
                    label={product.quantity > 0 ? "In Stock" : "Out of Stock"} 
                    color={product.quantity > 0 ? "success" : "error"}
                    size="small"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Linked File Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Linked File ID</Typography>
                  <Typography variant="body1">{product.linkedFileId}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">File Name</Typography>
                  <Typography variant="body1">{product.linkedFileName}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    variant="outlined" 
                    component={Link}
                    to={`/files/${product.linkedFileId}`}
                  >
                    View Linked File
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Additional Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Trader</Typography>
                  <Typography variant="body1">{product.traderName}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Profit Margin</Typography>
                  <Typography variant="body1">
                    {((product.retailPrice - product.netPrice) / product.retailPrice * 100).toFixed(2)}%
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Total Value</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    ${(product.netPrice * product.quantity).toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => navigate(`/products/${id}/edit`)}
                >
                  Edit Product
                </Button>
                <Button 
                  variant="outlined" 
                  color="secondary"
                  onClick={() => navigate(`/products/${id}/duplicate`)}
                >
                  Duplicate Product
                </Button>
                <Button 
                  variant="outlined" 
                  color="error"
                  onClick={handleDeleteProduct}
                >
                  Delete Product
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail;