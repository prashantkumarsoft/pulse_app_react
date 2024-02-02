

// Header.js
import "./Header.css";
import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Modal,
  Box,
  Typography,
  Container,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  Grid,
  Avatar,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { lightBlue } from "@mui/material/colors";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import SearchIcon from "@mui/icons-material/Search";
const Header = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    gender: "",
    age: 0,
    dateOfBirth: "",
    Image: null,
  });
  // const [selectedImage, setSelectedImage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData((prevFormData) => ({
      ...prevFormData,
      Image: null,
      firstName: "",
      lastName: "",
      role: "",
      gender: "",
      age: 0,
      dateOfBirth: "",

    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    // Validate image file
    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        Image: file,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        Image: null,
      }));
    }

    // // Update the selectedImage
    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   selectedImage: file,
    // }));
  };

  const handleFieldChange = (fieldName, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));

    // Clear validation error when the field changes
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: null,
    }));

    // calculate Age ------
    if (fieldName === "dateOfBirth") {
      const birthDate = new Date(value);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - birthDate.getFullYear();
      setFormData((prevFormData) => ({
        ...prevFormData,
        age,
      }));
    }
  };

  const handleSave = () => {

    // let addMemberData = new FormData();
    // addMemberData.append("[member][first_name]", formData.firstName);
    // addMemberData.append("[member][last_name]", formData.lastName);
    // addMemberData.append("[member][gender]", formData.gender);
    // addMemberData.append("[member][age]", formData.age);
    // addMemberData.append("[member][role]", formData.gender);
    // addMemberData.append("[member][avatar]", formData.selectedImage, "file");

    // axios
    //   .post("https://0f82-115-246-60-213.ngrok-free.app/members", addMemberData)
    //   .then((response) => {
    //     console.log("success", response);
    //   })
    //   .catch((error) => {
    //     console.error("error", error);
    //   });

    // console.log("Form Data:", addMemberData);
    // ********************************************************************
    // setModalOpen(false);

    // setFormData({
    //   firstName: '',
    //   lastName: '',
    //   role: '',
    //   gender: '',
    //   age: 0,
    // selectedImage: null

    // });

    // Validation logic
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }

    if (!formData.role) {
      errors.role = "Role is required";
    }

    if (!formData.gender) {
      errors.gender = "Gender is required";
    }

    if (!formData.dateOfBirth) {
      errors.dateOfBirth = "Date of Birth is required";
    }

    if (!formData.Image) {
      errors.Image = "Image is required";
    }

    // Set validation errors and return if there are errors
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    console.log(formData);

    alert("Form submitted successfully");
    closeModal();
    
  };

  return (
    <>
      {/* <Box>
        <h2 style={{marginLeft: "20px"}}>Patients</h2>
      </Box>
      <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
        <Button className="add-member-btn" onClick={openModal}> Add Member</Button>
      </Box> */}
      <nav className="navbar">
        <div className="navbar-container">
          <h1>Patients</h1>
          <div className="navbar-buttons">
            <button className="add-member-btn" onClick={openModal}>
              Add Member
            </button>
            <div className="search-container">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search..."
                className="search-bar"
              />
            </div>
            {/* <TextField
              variant="outlined"
              fullWidth
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton size="small">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            /> */}
          </div>
        </div>
      </nav>

      {/* Material-UI Modal */}
      <Modal open={isModalOpen} onClose={closeModal}>
        <Container
          maxWidth="sm"
          sx={{ mt: 1, p: 1, bgcolor: "background.paper", borderRadius: 2 }}
        >
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mb: -2, mr: -2 }}
          >
            <IconButton onClick={closeModal} size="large">
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="h5" gutterBottom>
            Add Member
          </Typography>

          <hr />

          <InputLabel htmlFor="upload-image" style={{ cursor: "pointer" }}>
            <input
              type="file"
              id="upload-image"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
              error={Boolean(validationErrors.Image)}
              helperText={validationErrors.Image}
            />
            {formData.Image ? (
              <>
                <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                  <Box>
                    <Avatar
                      src={URL.createObjectURL(formData.Image)}
                      alt="Uploaded Image"
                      sx={{
                        height: "50px",
                        width: "50px",
                        bgcolor: lightBlue[500],
                        borderRadius: "50%",
                        margin: "auto",
                        mb: 2,
                        ml: 0,
                        cursor: "pointer",
                      }}
                    />
                  </Box>
                  <Box sx={{mr: 40, mt: 1}}>
                    <Typography> Succussfully Uploaded</Typography>
                  </Box>
                </Box>
              </>
            ) : (
              <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                <Box >
                  <PersonAddRoundedIcon
                    sx={{
                      fontSize: 40,
                      bgcolor: lightBlue[500],
                      borderRadius: "50%",
                      color: "#fff",
                      margin: "auto",
                      mb: 2,
                      cursor: "pointer",
                    }}
                  />
                </Box >
                <Box sx={{mr: 42, mt: 1}}>
                  <Typography> Click to Upload Image</Typography>
                </Box>
              </Box>
            )}
          </InputLabel>

          {/* Form groups for First Name, Last Name, Role, Gender, and Date of Birth */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="First Name"
              variant="outlined"
              onChange={(e) => handleFieldChange("firstName", e.target.value)}
              error={Boolean(validationErrors.firstName)}
              helperText={validationErrors.firstName}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              onChange={(e) => handleFieldChange("lastName", e.target.value)}
              error={Boolean(validationErrors.lastName)}
              helperText={validationErrors.lastName}
            />
            <FormControl variant="outlined">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                label="Role"
                labelId="role-label"
                onChange={(e) => handleFieldChange("role", e.target.value)}
                error={Boolean(validationErrors.role)}
              >
                <MenuItem value="doctor">Doctor</MenuItem>
                <MenuItem value="patient">Patient</MenuItem>
              </Select>
              {validationErrors.role && (
                <div style={{ color: "red", fontSize: "0.75rem" }}>
                  {validationErrors.role}
                </div>
              )}
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    label="Gender"
                    labelId="gender-label"
                    onChange={(e) =>
                      handleFieldChange("gender", e.target.value)
                    }
                    error={Boolean(validationErrors.gender)}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                  {validationErrors.gender && (
                    <div style={{ color: "red", fontSize: "0.75rem" }}>
                      {validationErrors.gender}
                    </div>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  type="date"
                  fullWidth
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    handleFieldChange("dateOfBirth", e.target.value)
                  }
                  error={Boolean(validationErrors.dateOfBirth)}
                  helperText={validationErrors.dateOfBirth}
                />
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <Button
              variant="contained"
              className="save_member"
              onClick={handleSave}
              sx={{ mr: 1 }}
            >
              Save
            </Button>
          </Box>
        </Container>
      </Modal>
    </>
  );
};

export default Header;
