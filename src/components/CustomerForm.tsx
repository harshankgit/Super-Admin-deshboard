import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Container,
  TextField as MuiTextField,
  Grid,
  InputAdornment,
  Card,
  CardContent,
  Divider,
  IconButton,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import {
  TextField,
  Checkbox as FormikCheckbox,
  Select as FormikSelect,
} from "formik-mui";
import { useToast } from "../context/ToastContext";
import { useNavigate, useParams } from "react-router-dom";
import { customerSchema } from "../utils/validators";
import { customerAPI } from "../services/apiService";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

interface Customer {
  _id?: string;
  name: string;
  email: string;
  companyName: string;
  phoneNo: string;
  profileImage?: string;
  gender: string;
  country: string;
  state: string;
  isSubscribed: boolean;
  address: string;
  notes: string;
  documents: string[];
  status: string;
  createdAt?: string;
}

interface CustomerFormValues {
  name: string;
  email: string;
  companyName: string;
  phoneNo: string;
  profileImage: FileList | null;
  gender: string;
  country: string;
  state: string;
  isSubscribed: boolean;
  address: string;
  notes: string;
  documents: FileList | null;
}

const CustomerForm: React.FC<{ mode: "add" | "edit" }> = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { showSuccess, showError } = useToast();
  const [selectedProfileImage, setSelectedProfileImage] = useState<File | null>(
    null
  );
  const [selectedDocuments, setSelectedDocuments] = useState<File[]>([]);
  const [existingDocuments, setExistingDocuments] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const countries = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "UK", name: "United Kingdom" },
    { code: "AU", name: "Australia" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "IN", name: "India" },
    { code: "CN", name: "China" },
    { code: "JP", name: "Japan" },
  ];

  const states = [
    { code: "CA", name: "California" },
    { code: "NY", name: "New York" },
    { code: "TX", name: "Texas" },
    { code: "FL", name: "Florida" },
    { code: "MA", name: "Maharashtra" },
    { code: "DL", name: "Delhi" },
    { code: "UP", name: "Uttar Pradesh" },
  ];

  const genders = [
    { code: "male", name: "Male" },
    { code: "female", name: "Female" },
    { code: "other", name: "Other" },
  ];

  const initialValues: CustomerFormValues = {
    name: "",
    email: "",
    companyName: "",
    phoneNo: "",
    profileImage: null,
    gender: "male",
    country: "IN",
    state: "",
    isSubscribed: false,
    address: "",
    notes: "",
    documents: null,
  };

  const [initialFormValues, setInitialFormValues] =
    useState<CustomerFormValues>(initialValues);

  useEffect(() => {
    if (mode === "edit" && id) {
      fetchCustomer();
    }
  }, [mode, id]);

  const fetchCustomer = async () => {
    try {
      const data = await customerAPI.getCustomerById(parseInt(id || "1"));
      setExistingDocuments(data.documents || []);

      setInitialFormValues({
        name: data.name || "",
        email: data.email || "",
        companyName: data.companyName || "",
        phoneNo: data.phoneNo || "",
        profileImage: null,
        gender: data.gender || "male",
        country: data.country || "IN",
        state: data.state || "",
        isSubscribed: data.isSubscribed || false,
        address: data.address || "",
        notes: data.notes || "",
        documents: null,
      });

      if (data.profileImage) {
        setImagePreview(data.profileImage);
      }
    } catch (error) {
      console.error("Error fetching customer:", error);
      showError("Failed to fetch customer details");
      navigate("/customers");
    }
  };

  const handleSubmit = async (values: CustomerFormValues) => {
    try {
      const formData = new FormData();

      // Add form fields
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("companyName", values.companyName);
      formData.append("phoneNo", values.phoneNo);
      formData.append("gender", values.gender);
      formData.append("country", values.country.toLowerCase());
      formData.append("state", values.state);
      formData.append("isSubscribed", values.isSubscribed.toString());
      formData.append("address", values.address);
      formData.append("notes", values.notes);

      // Add profile image if provided
      if (values.profileImage && values.profileImage.length > 0) {
        formData.append("profileImage", values.profileImage[0]);
      }

      // Add new documents if provided
      if (values.documents) {
        for (let i = 0; i < values.documents.length; i++) {
          formData.append("documents", values.documents[i]);
        }
      }

      if (mode === "add") {
        await customerAPI.createCustomer(formData);
        showSuccess("Customer added successfully");
      } else {
        await customerAPI.updateCustomer(parseInt(id || "1"), formData);
        showSuccess("Customer updated successfully");
      }

      navigate("/customers");
    } catch (error) {
      console.error(
        `Error ${mode === "add" ? "adding" : "updating"} customer:`,
        error
      );
      showError(`Failed to ${mode === "add" ? "add" : "update"} customer`);
    }
  };

  const handleProfileImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedProfileImage(file);
      setFieldValue("profileImage", e.target.files);

      // Create preview for profile image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedDocuments((prev) => [...prev, ...filesArray]);
      setFieldValue("documents", e.target.files);
    }
  };

  const handleRemoveDocument = (index: number) => {
    setSelectedDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingDocument = (index: number) => {
    setExistingDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  if (mode === "edit" && !initialFormValues.name && !initialFormValues.email) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}
        >
          <Typography variant="h6" component="div">
            Loading...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {mode === "add" ? "Add New Customer" : "Edit Customer"}
        </Typography>
      </Box>

      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
        <Formik
          initialValues={initialFormValues}
          validationSchema={customerSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              {/* Personal Information Section */}
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "primary.main", fontWeight: 600 }}
                  >
                    Personal Information
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        component={TextField}
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        id="name"
                        name="name"
                        label="Full Name *"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Field
                        component={TextField}
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        id="email"
                        name="email"
                        label="Email *"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Field
                        component={TextField}
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        id="companyName"
                        name="companyName"
                        label="Company Name *"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Field
                        component={TextField}
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        id="phoneNo"
                        name="phoneNo"
                        label="Phone Number *"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl margin="dense" variant="outlined">
                        {/* <InputLabel id="gender-label">Gender</InputLabel> */}
                        <Field
                          component={FormikSelect}
                          id="gender"
                          name="gender"
                          labelId="gender-label"
                          label="Gender"
                        >
                          {genders.map((gender) => (
                            <MenuItem key={gender.code} value={gender.code}>
                              {gender.name}
                            </MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Box
                          sx={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {imagePreview ? (
                            <img
                              src={imagePreview}
                              alt="Profile preview"
                              style={{
                                width: 60,
                                height: 60,
                                borderRadius: "50%",
                                marginRight: 8,
                              }}
                            />
                          ) : (
                            <Box
                              sx={{
                                width: 60,
                                height: 60,
                                borderRadius: "50%",
                                backgroundColor: "grey.200",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mr: 1,
                              }}
                            >
                              <Typography variant="caption">
                                No Image
                              </Typography>
                            </Box>
                          )}
                        </Box>
                        <Box sx={{ flex: 3 }}>
                          <input
                            accept="image/*"
                            id="profileImage"
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) =>
                              handleProfileImageChange(e, setFieldValue)
                            }
                          />
                          <label htmlFor="profileImage">
                            <Button
                              variant="outlined"
                              component="span"
                              fullWidth
                            >
                              Upload Profile Image
                            </Button>
                          </label>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Location Information Section */}
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "primary.main", fontWeight: 600 }}
                  >
                    Location Information
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth margin="dense" variant="outlined" style={{width:"100px"}}>
                        {/* <InputLabel id="country-label">Country</InputLabel> */}
                        <Field
                          component={FormikSelect}
                          id="country"
                          name="country"
                          labelId="country-label"
                          label="Country"
                        >
                          {countries.map((country) => (
                            <MenuItem key={country.code} value={country.code}>
                              {country.name}
                            </MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl
                        margin="dense"
                        variant="outlined"
                        style={{ width: "160px" }}
                      >
                        {/* <InputLabel id="state-label">State/Province</InputLabel> */}
                        <Field
                          component={FormikSelect}
                          id="state"
                          name="state"
                          labelId="state-label"
                          label="State/Province"
                        >
                          {states.map((state) => (
                            <MenuItem key={state.code} value={state.code}>
                              {state.name}
                            </MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        component={TextField}
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        id="address"
                        name="address"
                        label="Address *"
                        multiline
                        rows={3}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Additional Information Section */}
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "primary.main", fontWeight: 600 }}
                  >
                    Additional Information
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Field
                            component={FormikCheckbox}
                            type="checkbox"
                            id="isSubscribed"
                            name="isSubscribed"
                          />
                        }
                        label="Subscribe to Newsletter"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        component={TextField}
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        id="notes"
                        name="notes"
                        label="Notes"
                        multiline
                        rows={3}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>

                    {/* Document Upload */}
                    <Grid item xs={12}>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        sx={{ fontWeight: 500 }}
                      >
                        Supporting Documents
                      </Typography>

                      {/* Existing Documents */}
                      {existingDocuments.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="caption"
                            gutterBottom
                            sx={{ fontWeight: 500 }}
                          >
                            Current Documents:
                          </Typography>
                          <ul style={{ margin: 0, paddingLeft: "20px" }}>
                            {existingDocuments.map((doc, index) => (
                              <li key={index} style={{ fontSize: "0.875rem" }}>
                                {doc.split("/").pop()}
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() =>
                                    handleRemoveExistingDocument(index)
                                  }
                                  sx={{
                                    ml: 1,
                                    fontSize: "0.75rem",
                                    padding: "2px",
                                  }}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </li>
                            ))}
                          </ul>
                        </Box>
                      )}

                      <input
                        accept="image/*,.pdf,.doc,.docx,.txt,.xlsx,.xls,.ppt,.pptx"
                        id="documents"
                        multiple
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) =>
                          handleDocumentsChange(e, setFieldValue)
                        }
                      />
                      <label htmlFor="documents">
                        <Button
                          variant="outlined"
                          component="span"
                          startIcon={<CloudUploadIcon />}
                        >
                          Upload Documents
                        </Button>
                      </label>

                      {/* Selected Documents */}
                      {selectedDocuments.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                          <Typography
                            variant="caption"
                            sx={{ fontWeight: 500 }}
                          >
                            Selected Files:
                          </Typography>
                          <ul style={{ margin: 0, paddingLeft: "20px" }}>
                            {selectedDocuments.map((file, index) => (
                              <li key={index} style={{ fontSize: "0.875rem" }}>
                                {file.name}
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleRemoveDocument(index)}
                                  sx={{
                                    ml: 1,
                                    fontSize: "0.75rem",
                                    padding: "2px",
                                  }}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </li>
                            ))}
                          </ul>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Form Actions */}
              <Box
                sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="outlined"
                  onClick={() => navigate("/customers")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ px: 4 }}
                >
                  {mode === "add" ? "Save Customer" : "Update Customer"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default CustomerForm;
