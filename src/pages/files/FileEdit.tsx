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
  useTheme,
  InputAdornment
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon, Link as LinkIcon } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

// Mock data for file
const mockFile = {
  id: 'f1',
  number: 1,
  fileName: 'Product Catalog Q3.xlsx',
  createdDate: '2023-10-15',
  lastUpdatedDate: '2023-10-15',
  itemsCount: 250,
  uploadedBy: 'John Smith',
  security: 'Protected',
  fileLink: 'https://example.com/file1',
  totalViews: 42,
  status: 'Active',
  description: 'This is a quarterly product catalog with updated pricing and inventory.',
};

const FileEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const theme = useTheme();
  const [file, setFile] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    // In a real app, this would fetch data from the API
    setFile(mockFile);
    setFormData(mockFile);
  }, [id]);

  const handleBack = () => {
    navigate('/files');
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
    // In a real app, this would call an API to update the file
    showSuccess('File updated successfully');
    setTimeout(() => {
      navigate('/files');
    }, 1000);
  };

  if (!file) {
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
          Edit File
        </Typography>
      </Box>

      <Paper sx={{ p: 3, backgroundColor: theme.palette.background.paper, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                    File Information
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="File Number"
                        name="number"
                        value={formData.number || ''}
                        onChange={handleChange}
                        variant="outlined"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="File Name"
                        name="fileName"
                        value={formData.fileName || ''}
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
                        value={formData.description || ''}
                        onChange={handleChange}
                        variant="outlined"
                        multiline
                        rows={4}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="File Link"
                        name="fileLink"
                        value={formData.fileLink || ''}
                        onChange={handleChange}
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LinkIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Items Count"
                        name="itemsCount"
                        type="number"
                        value={formData.itemsCount || ''}
                        onChange={handleChange}
                        variant="outlined"
                        InputProps={{ inputProps: { min: 0 } }}
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
                    File Settings
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Created Date"
                        name="createdDate"
                        type="date"
                        value={formData.createdDate || ''}
                        onChange={handleChange}
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Last Updated Date"
                        name="lastUpdatedDate"
                        type="date"
                        value={formData.lastUpdatedDate || ''}
                        onChange={handleChange}
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Status</InputLabel>
                        <Select
                          name="status"
                          value={formData.status || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                          label="Status"
                        >
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Archived">Archived</MenuItem>
                          <MenuItem value="Draft">Draft</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Security</InputLabel>
                        <Select
                          name="security"
                          value={formData.security || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, security: e.target.value }))}
                          label="Security"
                        >
                          <MenuItem value="Public">Public</MenuItem>
                          <MenuItem value="Protected">Protected</MenuItem>
                          <MenuItem value="Private">Private</MenuItem>
                        </Select>
                      </FormControl>
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
                      Update File
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

export default FileEdit;