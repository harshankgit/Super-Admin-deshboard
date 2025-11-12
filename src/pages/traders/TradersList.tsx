import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Grid,
  Pagination,
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Add as AddIcon, Edit as EditIcon, Visibility as VisibilityIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useToast } from '../../context/ToastContext';
import DataTable from '../../components/DataTable';
import SearchFilters from '../../components/SearchFilters';
import { Status, TradingTier } from '../../services/apiService';

// Mock data for traders
const mockTraders = [
  {
    id: '1',
    traderId: 'TRD001',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    status: 'Active',
    joinedDate: '2023-05-15',
    tradingTier: 'Gold',
    region: 'New York',
    totalFiles: 12,
  },
  {
    id: '2',
    traderId: 'TRD002',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 987-6543',
    status: 'Active',
    joinedDate: '2023-06-20',
    tradingTier: 'Silver',
    region: 'California',
    totalFiles: 8,
  },
  {
    id: '3',
    traderId: 'TRD003',
    name: 'Michael Brown',
    email: 'm.brown@example.com',
    phone: '+1 (555) 456-7890',
    status: 'Inactive',
    joinedDate: '2023-07-10',
    tradingTier: 'Basic',
    region: 'Texas',
    totalFiles: 5,
  },
  {
    id: '4',
    traderId: 'TRD004',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '+1 (555) 321-0987',
    status: 'Active',
    joinedDate: '2023-08-05',
    tradingTier: 'Platinum',
    region: 'Florida',
    totalFiles: 20,
  },
  {
    id: '5',
    traderId: 'TRD005',
    name: 'Robert Wilson',
    email: 'rob.w@example.com',
    phone: '+1 (555) 654-3210',
    status: 'Active',
    joinedDate: '2023-09-12',
    tradingTier: 'Gold',
    region: 'Washington',
    totalFiles: 15,
  },
];

const TradersList: React.FC = () => {
  const [traders, setTraders] = useState(mockTraders);
  const [filteredTraders, setFilteredTraders] = useState(mockTraders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const tradersPerPage = 10;
  const navigate = useNavigate();
  const { showError } = useToast();
  const theme = useTheme();

  // Filter traders based on search and filters
  useEffect(() => {
    let result = mockTraders;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(trader => 
        trader.name.toLowerCase().includes(term) ||
        trader.email.toLowerCase().includes(term) ||
        trader.traderId.toLowerCase().includes(term) ||
        trader.region.toLowerCase().includes(term)
      );
    }
    
    if (selectedTier !== 'all') {
      result = result.filter(trader => trader.tradingTier === selectedTier);
    }
    
    if (selectedRegion !== 'all') {
      result = result.filter(trader => trader.region === selectedRegion);
    }
    
    setFilteredTraders(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedTier, selectedRegion]);

  // Pagination
  const indexOfLastTrader = currentPage * tradersPerPage;
  const indexOfFirstTrader = indexOfLastTrader - tradersPerPage;
  const currentTraders = filteredTraders.slice(indexOfFirstTrader, indexOfLastTrader);
  const totalPages = Math.ceil(filteredTraders.length / tradersPerPage);

  // Get unique tiers and regions for filter dropdowns
  const tradingTiers = Array.from(new Set(mockTraders.map(trader => trader.tradingTier)));
  const regions = Array.from(new Set(mockTraders.map(trader => trader.region)));

  const handleViewTrader = (id: string) => {
    navigate(`/traders/${id}`);
  };

  const handleEditTrader = (id: string) => {
    navigate(`/traders/${id}/edit`);
  };

  const handleDeleteTrader = (id: string) => {
    if (window.confirm('Are you sure you want to delete this trader?')) {
      // In a real app, this would call an API
      setTraders(prev => prev.filter(trader => trader.id !== id));
      setFilteredTraders(prev => prev.filter(trader => trader.id !== id));
      showError('Trader deleted successfully');
    }
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

  // Define columns for the data table
  const columns = [
    {
      key: 'traderId',
      label: 'Trader ID',
      width: '10%'
    },
    {
      key: 'name',
      label: 'Trader Name',
      width: '15%'
    },
    {
      key: 'email',
      label: 'Email',
      width: '20%'
    },
    {
      key: 'phone',
      label: 'Phone',
      width: '12%'
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string, row: any) => (
        <Chip 
          label={value} 
          color={getStatusColor(value) as 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'}
          size="small"
        />
      ),
      width: '8%'
    },
    {
      key: 'joinedDate',
      label: 'Joined Date',
      render: (value: string) => new Date(value).toLocaleDateString(),
      width: '10%'
    },
    {
      key: 'tradingTier',
      label: 'Trading Tier',
      render: (value: string) => (
        <Chip 
          label={value} 
          color={getTierColor(value) as 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'}
          size="small"
        />
      ),
      width: '10%'
    },
    {
      key: 'region',
      label: 'Region',
      width: '10%'
    },
    {
      key: 'totalFiles',
      label: 'Total Files',
      width: '5%'
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value: any, row: any) => (
        <>
          <Tooltip title="View Trader">
            <IconButton onClick={() => handleViewTrader(row.id)} size="small">
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Trader">
            <IconButton onClick={() => handleEditTrader(row.id)} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Trader">
            <IconButton onClick={() => handleDeleteTrader(row.id)} size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      ),
      width: '10%'
    }
  ];

  // Prepare filter options for the search filters component
  const filterOptions = [
    {
      key: 'tradingTier',
      label: 'Trading Tier',
      value: selectedTier,
      options: [
        { label: 'All Tiers', value: 'all' },
        ...tradingTiers.map(tier => ({ label: tier, value: tier }))
      ],
      onChange: setSelectedTier
    },
    {
      key: 'region',
      label: 'Region',
      value: selectedRegion,
      options: [
        { label: 'All Regions', value: 'all' },
        ...regions.map(region => ({ label: region, value: region }))
      ],
      onChange: setSelectedRegion
    }
  ];

  const handleSearchChange = (searchValue: string) => {
    setSearchTerm(searchValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Traders Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to="/traders/create"
          sx={{ backgroundColor: 'primary.main', color: 'white' }}
        >
          Add New Trader
        </Button>
      </Box>

      <SearchFilters
        searchValue={searchTerm}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search Traders"
        filters={filterOptions}
      />

      <DataTable
        columns={columns}
        data={currentTraders}
        emptyMessage="No traders found"
      />

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

export default TradersList;