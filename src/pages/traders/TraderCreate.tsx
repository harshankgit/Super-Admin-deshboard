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
import { useToast } from '../../context/ToastContext';
import { TradingTier, RiskCategory, Status } from '../../services/apiService';

const TraderCreate: React.FC = () => {
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const theme = useTheme();
  const [formData, setFormData] = useState({
    traderName: '',
    email: '',
    phoneNo: '',
    address: '',
    city: '',
    status: Status.ACTIVE.toString(),
    tradingTier: TradingTier.BASIC.toString(),
    riskCategory: RiskCategory.LOW.toString(),
    accountBalance: 0,
    creditLimit: 0
  });

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
    // In a real app, this would call an API to create the trader
    showSuccess('Trader created successfully');
    setTimeout(() => {
      navigate('/traders');
    }, 1000);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={handleBack} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          Create New Trader
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
                        label="Trader Name"
                        name="traderName"
                        value={formData.traderName}
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
                        value={formData.email}
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
                        value={formData.phoneNo}
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
                        value={formData.address}
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
                        value={formData.city}
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
                          value={formData.status}
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
                          value={formData.tradingTier}
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
                          value={formData.riskCategory}
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
                        value={formData.accountBalance}
                        onChange={handleChange}
                        variant="outlined"
                        InputProps={{ inputProps: { min: 0 } }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Credit Limit"
                        name="creditLimit"
                        type="number"
                        value={formData.creditLimit}
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
                      Create Trader
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

export default TraderCreate;