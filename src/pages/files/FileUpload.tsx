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
  useTheme,
  LinearProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const FileUpload: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const theme = useTheme();
  const [formData, setFormData] = useState({
    fileName: '',
    description: '',
    security: 'Protected',
    status: 'Active',
    traderId: user?.id || ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const handleBack = () => {
    navigate('/files');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
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
    
    if (!selectedFile) {
      showError('Please select a file to upload');
      return;
    }

    // Simulate upload progress
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null) return 0;
        if (prev >= 95) {
          clearInterval(interval);
          return 95; // We'll complete it after the "upload"
        }
        return prev + 10;
      });
    }, 200);

    // Simulate upload completion
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      showSuccess('File uploaded successfully');
      setTimeout(() => {
        navigate('/files');
      }, 1000);
    }, 2500);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={handleBack} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          Upload New File
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
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="File Name"
                        name="fileName"
                        value={formData.fileName}
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
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <input
                        accept=".xlsx,.csv,.pdf,.doc,.docx"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        type="file"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="raised-button-file">
                        <Button
                          variant="outlined"
                          component="span"
                          startIcon={<CloudUploadIcon />}
                          fullWidth
                        >
                          {selectedFile ? selectedFile.name : 'Choose File'}
                        </Button>
                      </label>
                      {selectedFile && (
                        <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                          Selected: {selectedFile.name}
                        </Typography>
                      )}
                    </Grid>
                    {uploadProgress !== null && (
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress variant="determinate" value={uploadProgress} />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {uploadProgress}%
                          </Typography>
                        </Box>
                      </Grid>
                    )}
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
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Status</InputLabel>
                        <Select
                          name="status"
                          value={formData.status}
                          onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                          label="Status"
                        >
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Draft">Draft</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Security</InputLabel>
                        <Select
                          name="security"
                          value={formData.security}
                          onChange={(e) => setFormData(prev => ({ ...prev, security: e.target.value }))}
                          label="Security"
                        >
                          <MenuItem value="Public">Public</MenuItem>
                          <MenuItem value="Protected">Protected</MenuItem>
                          <MenuItem value="Private">Private</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Trader ID"
                        name="traderId"
                        value={formData.traderId}
                        onChange={handleChange}
                        variant="outlined"
                        disabled={user?.role !== 'admin'} // Only admins can select trader
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
                      disabled={!selectedFile || uploadProgress === 100}
                    >
                      Upload File
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

export default FileUpload;