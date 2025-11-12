import React, { useState, useEffect } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useToast } from '../../context/ToastContext';
import { TradingTier, RiskCategory, Status } from '../../services/apiService';

// Mock data for trader
const mockTrader = {
  id: '1',
  traderId: 'TRD001',
  traderName: 'John Smith',
  email: 'john.smith@example.com',
  phoneNo: '+1 (555) 123-4567',
  address: '123 Main St, New York, NY 10001',
  status: Status.ACTIVE,
  joinedDate: '2023-05-15',
  tradingTier: TradingTier.GOLD,
  riskCategory: RiskCategory.LOW,
  accountBalance: 50000,
  creditLimit: 100000,
  city: 'New York'
};

const TraderEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const theme = useTheme();
  const [trader, setTrader] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    // In a real app, this would fetch data from the API
    setTrader(mockTrader);
    setFormData({
      ...mockTrader,
      status: mockTrader.status.toString(),
      tradingTier: mockTrader.tradingTier.toString(),
      riskCategory: mockTrader.riskCategory.toString()
    });
  }, [id]);

  const handleBack = () => {
    navigate('/traders');
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
    // In a real app, this would call an API to update the trader
    showSuccess('Trader updated successfully');
    setTimeout(() => {
      navigate('/traders');
    }, 1000);
  };

  if (!trader) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={handleBack} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          Edit Trader
        </Typography>
      </Box>

      <Paper sx={{ p: 3, backgroundColor: theme.palette.background.paper, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                    Profile Information
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Trader ID"
                        name="traderId"
                        value={formData.traderId || ''}
                        onChange={handleChange}
                        variant="outlined"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Trader Name"
                        name="traderName"
                        value={formData.traderName || ''}
                        onChange={handleChange}
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phoneNo"
                        value={formData.phoneNo || ''}
                        onChange={handleChange}
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Address"
                        name="address"
                        value={formData.address || ''}
                        onChange={handleChange}
                        variant="outlined"
                        multiline
                        rows={3}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="City"
                        name="city"
                        value={formData.city || ''}
                        onChange={handleChange}
                        variant="outlined"
                        required
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
                    Trader Settings
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Status</InputLabel>
                        <Select
                          name="status"
                          value={formData.status || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                          label="Status"
                        >
                          <MenuItem value={Status.ACTIVE.toString()}>Active</MenuItem>
                          <MenuItem value={Status.INACTIVE.toString()}>Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Trading Tier</InputLabel>
                        <Select
                          name="tradingTier"
                          value={formData.tradingTier || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, tradingTier: e.target.value }))}
                          label="Trading Tier"
                        >
                          <MenuItem value={TradingTier.BASIC.toString()}>Basic</MenuItem>
                          <MenuItem value={TradingTier.SILVER.toString()}>Silver</MenuItem>
                          <MenuItem value={TradingTier.GOLD.toString()}>Gold</MenuItem>
                          <MenuItem value={TradingTier.PLATINUM.toString()}>Platinum</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Risk Category</InputLabel>
                        <Select
                          name="riskCategory"
                          value={formData.riskCategory || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, riskCategory: e.target.value }))}
                          label="Risk Category"
                        >
                          <MenuItem value={RiskCategory.LOW.toString()}>Low</MenuItem>
                          <MenuItem value={RiskCategory.MEDIUM.toString()}>Medium</MenuItem>
                          <MenuItem value={RiskCategory.HIGH.toString()}>High</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Account Balance"
                        name="accountBalance"
                        type="number"
                        value={formData.accountBalance || ''}
                        onChange={handleChange}
                        variant="outlined"
                        InputProps={{ inputProps: { min: 0 } }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Credit Limit"
                        name="creditLimit"
                        type="number"
                        value={formData.creditLimit || ''}
                        onChange={handleChange}
                        variant="outlined"
                        InputProps={{ inputProps: { min: 0 } }}
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
                      Update Trader
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

export default TraderEdit;