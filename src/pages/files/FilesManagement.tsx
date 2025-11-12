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

// Mock data for files
const mockFiles = [
  {
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
  },
  {
    id: 'f2',
    number: 2,
    fileName: 'Inventory List.csv',
    createdDate: '2023-09-20',
    lastUpdatedDate: '2023-09-22',
    itemsCount: 180,
    uploadedBy: 'Sarah Johnson',
    security: 'Public',
    fileLink: 'https://example.com/file2',
    totalViews: 28,
    status: 'Active',
  },
  {
    id: 'f3',
    number: 3,
    fileName: 'Summer Products.xlsx',
    createdDate: '2023-08-05',
    lastUpdatedDate: '2023-08-05',
    itemsCount: 320,
    uploadedBy: 'Michael Brown',
    security: 'Protected',
    fileLink: 'https://example.com/file3',
    totalViews: 15,
    status: 'Archived',
  },
  {
    id: 'f4',
    number: 4,
    fileName: 'Winter Collection.xlsx',
    createdDate: '2023-11-01',
    lastUpdatedDate: '2023-11-01',
    itemsCount: 150,
    uploadedBy: 'Emily Davis',
    security: 'Protected',
    fileLink: 'https://example.com/file4',
    totalViews: 8,
    status: 'Active',
  },
  {
    id: 'f5',
    number: 5,
    fileName: 'Electronics Inventory.csv',
    createdDate: '2023-07-12',
    lastUpdatedDate: '2023-10-30',
    itemsCount: 420,
    uploadedBy: 'Robert Wilson',
    security: 'Public',
    fileLink: 'https://example.com/file5',
    totalViews: 65,
    status: 'Active',
  },
];

const FilesManagement: React.FC = () => {
  const { user } = useAuth();
  const [files, setFiles] = useState(mockFiles);
  const [filteredFiles, setFilteredFiles] = useState(mockFiles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSecurity, setSelectedSecurity] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 10;
  const navigate = useNavigate();
  const { showError } = useToast();
  const theme = useTheme();

  // Filter files based on search and filters
  useEffect(() => {
    let result = mockFiles;
    
    // Filter by role - traders can only see their own files
    if (user?.role === 'trader') {
      result = result.filter(file => file.uploadedBy === user.name);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(file => 
        file.fileName.toLowerCase().includes(term) ||
        file.uploadedBy.toLowerCase().includes(term)
      );
    }
    
    if (selectedStatus !== 'all') {
      result = result.filter(file => file.status === selectedStatus);
    }
    
    if (selectedSecurity !== 'all') {
      result = result.filter(file => file.security === selectedSecurity);
    }
    
    setFilteredFiles(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedStatus, selectedSecurity, user]);

  // Pagination
  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = filteredFiles.slice(indexOfFirstFile, indexOfLastFile);
  const totalPages = Math.ceil(filteredFiles.length / filesPerPage);

  // Get unique statuses and security types for filter dropdowns
  const statuses = Array.from(new Set(mockFiles.map(file => file.status)));
  const securityTypes = Array.from(new Set(mockFiles.map(file => file.security)));

  const handleViewFile = (id: string) => {
    navigate(`/files/${id}`);
  };

  const handleEditFile = (id: string) => {
    navigate(`/files/${id}/edit`);
  };

  const handleDeleteFile = (id: string) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      // In a real app, this would call an API
      setFiles(prev => prev.filter(file => file.id !== id));
      setFilteredFiles(prev => prev.filter(file => file.id !== id));
      showError('File deleted successfully');
    }
  };

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

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Files Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to="/files/upload"
          sx={{ backgroundColor: 'primary.main', color: 'white' }}
        >
          Upload New File
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search by File Name or Item Name"
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
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as string)}
                label="Status"
              >
                <MenuItem value="all">All Statuses</MenuItem>
                {statuses.map(status => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Security Type</InputLabel>
              <Select
                value={selectedSecurity}
                onChange={(e) => setSelectedSecurity(e.target.value as string)}
                label="Security Type"
              >
                <MenuItem value="all">All Types</MenuItem>
                {securityTypes.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="files table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>File Name</TableCell>
              {user?.role === 'admin' && <TableCell>Uploaded By</TableCell>}
              <TableCell>Created Date</TableCell>
              <TableCell>Last Updated Date</TableCell>
              <TableCell>Items Count</TableCell>
              <TableCell>Security</TableCell>
              <TableCell>File Link</TableCell>
              <TableCell>Total Views</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentFiles.length > 0 ? (
              currentFiles.map((file) => (
                <TableRow
                  key={file.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {file.number}
                  </TableCell>
                  <TableCell>{file.fileName}</TableCell>
                  {user?.role === 'admin' && <TableCell>{file.uploadedBy}</TableCell>}
                  <TableCell>{new Date(file.createdDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(file.lastUpdatedDate).toLocaleDateString()}</TableCell>
                  <TableCell>{file.itemsCount}</TableCell>
                  <TableCell>
                    <Chip 
                      label={file.security} 
                      color={getSecurityColor(file.security) as 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined" 
                      size="small"
                      href={file.fileLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </Button>
                  </TableCell>
                  <TableCell>{file.totalViews}</TableCell>
                  <TableCell>
                    <Chip 
                      label={file.status} 
                      color={getStatusColor(file.status) as 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View File">
                      <IconButton onClick={() => handleViewFile(file.id)} size="small">
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit File">
                      <IconButton onClick={() => handleEditFile(file.id)} size="small">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete File">
                      <IconButton onClick={() => handleDeleteFile(file.id)} size="small">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={user?.role === 'admin' ? 11 : 10} align="center">
                  No files found
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

export default FilesManagement;