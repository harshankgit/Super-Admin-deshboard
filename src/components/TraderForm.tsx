import React from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';

interface TraderFormProps {
  formData: any;
  errors: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
  submitButtonText?: string;
}

const TraderForm: React.FC<TraderFormProps> = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
  isSubmitting = false,
  submitButtonText = 'Save Trader'
}) => {
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="phone"
            name="phone"
            label="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="tradingTier"
            name="tradingTier"
            label="Trading Tier"
            select
            value={formData.tradingTier}
            onChange={handleChange}
            error={!!errors.tradingTier}
            helperText={errors.tradingTier}
          >
            <MenuItem value="Basic">Basic</MenuItem>
            <MenuItem value="Silver">Silver</MenuItem>
            <MenuItem value="Gold">Gold</MenuItem>
            <MenuItem value="Platinum">Platinum</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="riskCategory"
            name="riskCategory"
            label="Risk Category"
            select
            value={formData.riskCategory}
            onChange={handleChange}
            error={!!errors.riskCategory}
            helperText={errors.riskCategory}
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="status"
            name="status"
            label="Status"
            select
            value={formData.status}
            onChange={handleChange}
            error={!!errors.status}
            helperText={errors.status}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="creditLimit"
            name="creditLimit"
            label="Credit Limit"
            type="number"
            value={formData.creditLimit}
            onChange={handleChange}
            error={!!errors.creditLimit}
            helperText={errors.creditLimit}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="address"
            name="address"
            label="Address"
            multiline
            rows={3}
            value={formData.address}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={{ mr: 1 }}
        >
          {submitButtonText}
        </Button>
        <Button
          variant="outlined"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default TraderForm;