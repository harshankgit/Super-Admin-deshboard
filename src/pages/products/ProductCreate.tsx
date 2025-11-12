import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  IconButton,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { ProductCategory } from '../../services/apiService';

const ProductCreate: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const theme = useTheme();
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    category: ProductCategory.ELECTRONICS,
    retailPrice: '',
    netPrice: '',
    quantity: '',
    traderName: user?.name || ''
  });

  const handleBack = () => {
    navigate('/products');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: any }>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to create the product
    showSuccess('Product created successfully');
    setTimeout(() => {
      navigate('/products');
    }, 1000);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={handleBack} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          Create New Product
        </Typography>
      </Box>

      <Paper sx={{ p: 3, backgroundColor: theme.palette.background.paper, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                    Product Information
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Product Name"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        variant="outlined"
                        multiline
                        rows={4}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Category</InputLabel>
                        <Select
                          name="category"
                          value={formData.category}
                          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as ProductCategory }))}
                          label="Category"
                        >
                          {Object.values(ProductCategory).map((category) => (
                            <MenuItem key={category} value={category}>
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Trader Name"
                        name="traderName"
                        value={formData.traderName}
                        onChange={handleChange}
                        variant="outlined"
                        disabled={user?.role !== 'admin'} // Only admins can change trader
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                    Pricing & Inventory
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Retail Price"
                        name="retailPrice"
                        type="number"
                        value={formData.retailPrice}
                        onChange={handleChange}
                        variant="outlined"
                        InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Net Price"
                        name="netPrice"
                        type="number"
                        value={formData.netPrice}
                        onChange={handleChange}
                        variant="outlined"
                        InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Quantity"
                        name="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={handleChange}
                        variant="outlined"
                        InputProps={{ inputProps: { min: 0 } }}
                        required
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                    Actions
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      size="large"
                    >
                      Create Product
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleBack}
                    >
                      Cancel
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default ProductCreate;