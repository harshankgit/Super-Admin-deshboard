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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Visibility as VisibilityIcon,
  Upload as UploadIcon,
  ArrowBack as ArrowBackIcon,
  FileUpload as FileUploadIcon
} from '@mui/icons-material';
import { useToast } from '../../context/ToastContext';
import { Status, TradingTier, RiskCategory } from '../../services/apiService';

// Mock data for trader
const mockTrader = {
  id: '1',
  traderId: 'TRD001',
  name: 'John Smith',
  email: 'john.smith@example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Main St, New York, NY 10001',
  status: 'Active',
  joinedDate: '2023-05-15',
  tradingTier: 'Gold',
  riskCategory: 'Low',
  accountBalance: 50000,
  creditLimit: 100000,
  totalTrades: 125,
  tradeVolume: 250000,
  lastActive: '2023-11-10',
  totalFiles: 12,
};

// Mock data for files associated with this trader
const mockFiles = [
  {
    id: 'f1',
    fileName: 'Product Catalog Q3.xlsx',
    createdDate: '2023-10-15',
    itemsCount: 250,
    security: 'Protected',
    fileLink: '#',
    totalViews: 42,
    status: 'Active',
  },
  {
    id: 'f2',
    fileName: 'Inventory List.csv',
    createdDate: '2023-09-20',
    itemsCount: 180,
    security: 'Public',
    fileLink: '#',
    totalViews: 28,
    status: 'Active',
  },
  {
    id: 'f3',
    fileName: 'Summer Products.xlsx',
    createdDate: '2023-08-05',
    itemsCount: 320,
    security: 'Protected',
    fileLink: '#',
    totalViews: 15,
    status: 'Archived',
  },
];

const TraderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const theme = useTheme();
  const [trader, setTrader] = useState<any>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch data from the API
    setTrader(mockTrader);
    setFiles(mockFiles);
  }, [id]);

  const handleBack = () => {
    navigate('/traders');
  };

  const handleEditTrader = () => {
    navigate(`/traders/${id}/edit`);
  };

  const handleDeactivateTrader = () => {
    if (window.confirm('Are you sure you want to deactivate this trader?')) {
      // In a real app, this would call an API
      showError('Trader deactivated');
    }
  };

  const handleDeleteTrader = () => {
    if (window.confirm('Are you sure you want to delete this trader? This action cannot be undone.')) {
      // In a real app, this would call an API
      navigate('/traders');
      showSuccess('Trader deleted successfully');
    }
  };

  const handleFileView = (fileId: string) => {
    navigate(`/files/${fileId}`);
  };

  const handleFileEdit = (fileId: string) => {
    navigate(`/files/${fileId}/edit`);
  };

  const handleFileDelete = (fileId: string) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      // In a real app, this would call an API
      setFiles(prev => prev.filter(file => file.id !== fileId));
      showSuccess('File deleted successfully');
    }
  };

  const handleUploadDialogOpen = () => {
    setOpenUploadDialog(true);
  };

  const handleUploadDialogClose = () => {
    setOpenUploadDialog(false);
    setSelectedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadFile = () => {
    if (!selectedFile) {
      showError('Please select a file to upload');
      return;
    }

    // Simulate file upload
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          handleUploadDialogClose();
          showSuccess('File uploaded successfully!');
          
          // Add the new file to the list
          const newFile = {
            id: `f${files.length + 1}`,
            fileName: selectedFile.name,
            createdDate: new Date().toISOString().split('T')[0],
            itemsCount: 0, // This would be populated after extraction
            security: 'Protected',
            fileLink: '#',
            totalViews: 0,
            status: 'Active',
          };
          setFiles(prev => [newFile, ...prev]);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'error';
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

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum':
        return 'default';
      case 'Gold':
        return 'warning';
      case 'Silver':
        return 'info';
      case 'Basic':
        return 'secondary';
      default:
        return 'default';
    }
  };

  if (!trader) {
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
            Trader Details
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={handleEditTrader}
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            startIcon={<UploadIcon />}
            onClick={handleUploadDialogOpen}
            sx={{ mr: 1 }}
          >
            Upload File
          </Button>
          <Button
            variant="outlined"
            color="warning"
            onClick={handleDeactivateTrader}
            sx={{ mr: 1 }}
          >
            Deactivate
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteTrader}
          >
            Delete
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Profile Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Trader ID</Typography>
                  <Typography variant="body1">{trader.traderId}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Full Name</Typography>
                  <Typography variant="body1">{trader.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Email</Typography>
                  <Typography variant="body1">{trader.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Phone</Typography>
                  <Typography variant="body1">{trader.phone}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Address</Typography>
                  <Typography variant="body1">{trader.address}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Status</Typography>
                  <Chip 
                    label={trader.status} 
                    color={getStatusColor(trader.status) as 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Trading Tier</Typography>
                  <Chip 
                    label={trader.tradingTier} 
                    color={getTierColor(trader.tradingTier) as 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Risk Category</Typography>
                  <Typography variant="body1">{trader.riskCategory}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Credit Limit</Typography>
                  <Typography variant="body1">${trader.creditLimit.toLocaleString()}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Account Balance</Typography>
                  <Typography variant="body1">${trader.accountBalance.toLocaleString()}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Activity Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Total Trades</Typography>
                  <Typography variant="body1">{trader.totalTrades}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Trade Volume</Typography>
                  <Typography variant="body1">${trader.tradeVolume.toLocaleString()}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Joined Date</Typography>
                  <Typography variant="body1">{new Date(trader.joinedDate).toLocaleDateString()}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Last Active</Typography>
                  <Typography variant="body1">{new Date(trader.lastActive).toLocaleDateString()}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Total Files Uploaded</Typography>
                  <Typography variant="body1">{trader.totalFiles}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Associated Files</Typography>
              <Button
                variant="outlined"
                startIcon={<FileUploadIcon />}
                size="small"
                onClick={handleUploadDialogOpen}
              >
                Upload New File
              </Button>
            </Box>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>File Name</TableCell>
                    <TableCell>Created Date</TableCell>
                    <TableCell>Items Count</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {files.length > 0 ? (
                    files.map((file) => (
                      <TableRow key={file.id}>
                        <TableCell>{file.fileName}</TableCell>
                        <TableCell>{new Date(file.createdDate).toLocaleDateString()}</TableCell>
                        <TableCell>{file.itemsCount}</TableCell>
                        <TableCell>
                          <Chip 
                            label={file.status} 
                            color={file.status === 'Active' ? 'success' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Tooltip title="View File">
                            <IconButton onClick={() => handleFileView(file.id)} size="small">
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit File">
                            <IconButton onClick={() => handleFileEdit(file.id)} size="small">
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete File">
                            <IconButton onClick={() => handleFileDelete(file.id)} size="small">
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No files uploaded yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                File Upload
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Upload CSV or Excel files to extract product data. Supported formats: CSV, XLSX, XLS.
              </Typography>
              <Button
                variant="contained"
                component="label"
                startIcon={<FileUploadIcon />}
                fullWidth
              >
                Choose File
                <input
                  type="file"
                  hidden
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileChange}
                />
              </Button>
              {selectedFile && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">Selected File: {selectedFile.name}</Typography>
                  {isUploading && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2">Uploading... {uploadProgress}%</Typography>
                    </Box>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* File Upload Dialog */}
      <Dialog open={openUploadDialog} onClose={handleUploadDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Upload New File</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <input
              accept=".csv,.xlsx,.xls"
              id="file-upload"
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<FileUploadIcon />}
                fullWidth
              >
                Choose CSV or Excel File
              </Button>
            </label>
            {selectedFile && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">Selected: {selectedFile.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {selectedFile.size} bytes
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUploadDialogClose}>Cancel</Button>
          <Button 
            onClick={handleUploadFile} 
            variant="contained" 
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TraderDetail;