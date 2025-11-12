import React, { useState, useEffect } from 'react';
import { Grid, Typography, Paper, Box, useTheme } from '@mui/material';
import { 
  People as PeopleIcon, 
  CheckCircle as ActiveIcon, 
  Cancel as InactiveIcon, 
  PersonAdd as NewIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  Avatar, 
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useToast } from '../context/ToastContext';

interface DashboardMetrics {
  totalCustomers: number;
  activeCustomers: number;
  inactiveCustomers: number;
  recentCustomers: any[];
}

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const { showError } = useToast();
  const theme = useTheme();



  // Mock data for initial implementation
  const mockMetrics: DashboardMetrics = {
    totalCustomers: 1201,
    activeCustomers: 1100,
    inactiveCustomers: 122,
    recentCustomers: [
      { id: 1, name: 'John Doe', email: 'john@example.com', date: '2025-11-01' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', date: '2025-10-28' },
      { id: 3, name: 'Robert Johnson', email: 'robert@example.com', date: '2025-10-25' },
      { id: 4, name: 'Emily Davis', email: 'emily@example.com', date: '2025-10-20' },
      { id: 5, name: 'Michael Brown', email: 'michael@example.com', date: '2025-10-15' },
    ]
  };

  const cardData = [
    {
      title: 'Total Customers',
      value: metrics ? metrics.totalCustomers : mockMetrics.totalCustomers,
      icon: <PeopleIcon />,
      color: 'primary',
      trend: '+12%',
      trendColor: 'success'
    },
    {
      title: 'Active Customers',
      value: metrics ? metrics.activeCustomers : mockMetrics.activeCustomers,
      icon: <ActiveIcon />,
      color: 'success',
      trend: '+5.2%',
      trendColor: 'success'
    },
    {
      title: 'Inactive Customers',
      value: metrics ? metrics.inactiveCustomers : mockMetrics.inactiveCustomers,
      icon: <InactiveIcon />,
      color: 'warning',
      trend: '-2.1%',
      trendColor: 'error'
    },
    {
      title: 'New This Month',
      value: 42,
      icon: <NewIcon />,
      color: 'info',
      trend: '+18%',
      trendColor: 'success'
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2 } }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(145deg, #1e1e1e, #2a2a2a)' 
                : 'linear-gradient(145deg, #ffffff, #f5f5f5)',
              boxShadow: theme.shadows[3],
              borderRadius: 2
            }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ 
                      bgcolor: theme.palette[card.color as 'primary'].main, 
                      mr: 1.5,
                      width: 50,
                      height: 50
                    }}>
                      {card.icon}
                    </Avatar>
                    <Box>
                      <Typography color="textSecondary" variant="body2" gutterBottom>
                        {card.title}
                      </Typography>
                      <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                        {card.value}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <TrendingUpIcon 
                      sx={{ 
                        color: card.trendColor === 'success' 
                          ? theme.palette.success.main 
                          : theme.palette.error.main,
                        fontSize: 24
                      }} 
                    />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: card.trendColor === 'success' 
                          ? theme.palette.success.main 
                          : theme.palette.error.main,
                        fontWeight: 600
                      }}
                    >
                      {card.trend}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ 
            p: 3, 
            display: 'flex', 
            flexDirection: 'column',
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            height: '100%'
          }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
              Recent Customers
            </Typography>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Date Added</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(metrics?.recentCustomers || mockMetrics.recentCustomers).map((customer) => (
                    <TableRow 
                      key={customer.id} 
                      sx={{ 
                        '&:last-child td, &:last-child th': { border: 0 },
                        '&:hover': { 
                          backgroundColor: theme.palette.action.hover 
                        }
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {customer.id}
                      </TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{new Date(customer.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Chip 
                          label="Active" 
                          color="success" 
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            p: 3, 
            display: 'flex', 
            flexDirection: 'column', 
            height: '100%',
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper
          }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
              Customer Status Overview
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              flex: 1
            }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
                  {metrics ? metrics.activeCustomers : mockMetrics.activeCustomers}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Active Customers
                </Typography>
              </Box>
              <Box sx={{ 
                height: 8, 
                width: '100%', 
                backgroundColor: theme.palette.grey[300], 
                borderRadius: 4, 
                mt: 2, 
                mb: 2,
                overflow: 'hidden'
              }}>
                <Box 
                  sx={{ 
                    height: '100%', 
                    width: `${((metrics ? metrics.activeCustomers : mockMetrics.activeCustomers) / 
                      (metrics ? metrics.totalCustomers : mockMetrics.totalCustomers)) * 100}%`, 
                    backgroundColor: theme.palette.success.main,
                    borderRadius: 4
                  }} 
                />
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="error" sx={{ fontWeight: 700 }}>
                  {metrics ? metrics.inactiveCustomers : mockMetrics.inactiveCustomers}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Inactive Customers
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;