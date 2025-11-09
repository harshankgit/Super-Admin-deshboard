import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Container,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useToast } from "../context/ToastContext";
import { useNavigate, useParams } from "react-router-dom";
import { customerAPI } from "../services/apiService";

interface Customer {
  _id: string;
  name: string;
  email: string;
  companyName: string;
  phoneNo: string;
  profileImage?: string;
  gender: string;
  country: string;
  isSubscribed: boolean;
  address: string;
  documents: string[];
  status: string;
  createdAt: string;
}

const CustomerView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  // Mapping country codes to full names
  const countryCodes: Record<string, string> = {
    US: 'United States',
    CA: 'Canada',
    UK: 'United Kingdom',
    AU: 'Australia',
    DE: 'Germany',
    FR: 'France',
    IN: 'India',
    CN: 'China',
    JP: 'Japan',
  };

  const getCountryName = (code: string) => {
    // Handle cases where the code might already be the full name (to prevent duplication)
    if (Object.values(countryCodes).some(value => value === code)) {
      return code;
    }
    return countryCodes[code] || code;
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = async () => {
    try {
      const data = await customerAPI.getCustomerById(parseInt(id || "1"));
      setCustomer(data);
    } catch (error) {
      console.error("Error fetching customer:", error);
      showError("Failed to fetch customer details");
      navigate("/customers");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await customerAPI.deleteCustomer(parseInt(id || "1"));
        showSuccess("Customer deleted successfully");
        navigate("/customers");
      } catch (error) {
        console.error("Error deleting customer:", error);
        showError("Failed to delete customer");
      }
    }
  };

  const handleStatusChange = async (newStatus: "active" | "inactive") => {
    if (
      window.confirm(
        `Are you sure you want to change this customer's status to ${newStatus}?`
      )
    ) {
      try {
        await customerAPI.changeCustomerStatus(parseInt(id || "1"), newStatus);
        setCustomer({ ...customer!, status: newStatus });
        showSuccess(`Customer status updated to ${newStatus}`);
      } catch (error) {
        console.error("Error updating customer status:", error);
        showError("Failed to update customer status");
      }
    }
  };

  if (loading || !customer) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1, mt: 4 }}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Grid>
            <Typography variant="h4" component="h1">
              Customer Details
            </Typography>
          </Grid>
          <Grid>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => navigate(`/customers/edit/${id}`)}
              sx={{ mr: 1 }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              sx={{ mr: 1 }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color={customer.status === "active" ? "error" : "success"}
              onClick={() =>
                handleStatusChange(
                  customer.status === "active" ? "inactive" : "active"
                )
              }
            >
              {customer.status === "active" ? "Deactivate" : "Activate"}
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* Customer Info Card */}
          <Grid xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid xs={12} container alignItems="center">
                      {customer.profileImage ? (
                        <img
                          src={customer.profileImage}
                          alt="Customer"
                          style={{
                            width: 100,
                            height: 100,
                            borderRadius: "50%",
                            marginRight: 16,
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: 100,
                            height: 100,
                            borderRadius: "50%",
                            backgroundColor: "gray",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: 2,
                          }}
                        >
                          <PersonIcon sx={{ fontSize: 60, color: "white" }} />
                        </Box>
                      )}
                      <Box>
                        <Typography variant="h5">{customer.name}</Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          Company: {customer.companyName}
                        </Typography>
                        <Chip
                          label={
                            customer.status.charAt(0).toUpperCase() +
                            customer.status.slice(1)
                          }
                          color={
                            customer.status === "active" ? "success" : "error"
                          }
                          size="small"
                          sx={{ mt: 1 }}
                        />
                      </Box>
                    </Grid>

                    <Grid xs={12}>
                      <Divider />
                    </Grid>

                    <Grid xs={12} sm={6}>
                      <Box display="flex" alignItems="center">
                        <EmailIcon sx={{ mr: 1, color: "action.active" }} />
                        <Typography variant="body1">
                          <strong>Email:</strong> {customer.email}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid xs={12} sm={6}>
                      <Box display="flex" alignItems="center">
                        <PhoneIcon sx={{ mr: 1, color: "action.active" }} />
                        <Typography variant="body1">
                          <strong>Phone:</strong> {customer.phoneNo}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid xs={12}>
                      <Box display="flex" alignItems="center">
                        <LocationIcon sx={{ mr: 1, color: "action.active" }} />
                        <Typography variant="body1">
                          <strong>Address:</strong> {customer.address}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Country:</strong> {getCountryName(customer.country)}
                      </Typography>
                    </Grid>

                    <Grid xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Gender:</strong> {customer.gender}
                      </Typography>
                    </Grid>

                    <Grid xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Newsletter Subscription:</strong>{" "}
                        {customer.isSubscribed ? "Yes" : "No"}
                      </Typography>
                    </Grid>

                    <Grid xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Created Date:</strong>{" "}
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Paper>
          </Grid>

          {/* Sidebar with additional info */}
          <Grid xs={12} md={4}>
            {/* Documents Section */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Attached Documents
              </Typography>
              {customer.documents && customer.documents.length > 0 ? (
                <Box>
                  {customer.documents.map((doc, index) => (
                    <Box
                      key={index}
                      sx={{ mb: 1, display: "flex", alignItems: "center" }}
                    >
                      <Typography variant="body2" component="div">
                        <a href={doc} target="_blank" rel="noopener noreferrer">
                          {doc.split("/").pop()}
                        </a>
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No documents attached
                </Typography>
              )}
            </Paper>

            {/* Actions */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Actions
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate(`/customers/edit/${id}`)}
                sx={{ mb: 1 }}
              >
                Edit Customer
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={handleDelete}
                sx={{ mb: 1 }}
              >
                Delete Customer
              </Button>
              <Button
                fullWidth
                variant="contained"
                color={customer.status === "active" ? "error" : "success"}
                onClick={() =>
                  handleStatusChange(
                    customer.status === "active" ? "inactive" : "active"
                  )
                }
              >
                {customer.status === "active"
                  ? "Deactivate Customer"
                  : "Activate Customer"}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CustomerView;
