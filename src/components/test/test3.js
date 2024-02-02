
// Header.js
import "./Header.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../config";
import { useFormik } from "formik";
import * as Yup from "yup";

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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { lightBlue } from "@mui/material/colors";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import SearchIcon from "@mui/icons-material/Search";
const Header = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      role: "",
      gender: "",
      age: 0,
      dateOfBirth: "",
      Image: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      role: Yup.string().required("Role is required"),
      gender: Yup.string().required("Gender is required"),
      dateOfBirth: Yup.string().required("Date of Birth is required"),
      Image: Yup.mixed().required("Image is required"),
    }),
    onSubmit: (values) => {
      const addMemberData = new FormData();
      addMemberData.append("[member][first_name]", values.firstName);
      addMemberData.append("[member][last_name]", values.lastName);
      addMemberData.append("[member][gender]", values.gender);
      addMemberData.append("[member][age]", values.age);
      addMemberData.append("[member][role]", values.gender);
      addMemberData.append("[member][avatar]", values.Image);
      axios
      .post(`${baseUrl}/members`, addMemberData, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((response) => {
        console.log("success", response);
      })
      .catch((error) => {
        console.error("error", error);
      });

    //      // calculate Age ------
    // if (fieldName === "dateOfBirth") {
    //   const birthDate = new Date(value);
    //   const currentDate = new Date();
    //   const age = currentDate.getFullYear() - birthDate.getFullYear();
    //   setFormData((prevFormData) => ({
    //     ...prevFormData,
    //     age,
    //   }));
    // }

    alert("Form submitted successfully");
    setModalOpen(false);


  },
});

const handleImageChange = (event) => {
  formik.setFieldValue("Image", event.currentTarget.files[0]);
};

  useEffect(()=>{

    const handleSearch = () => {
      axios
      .post(`${baseUrl}/opportunities/search`, {searchQuery})
      .then((response) => {
        console.log("success", response.data.data);
      })
      .catch((error) => {
        console.error("error", error);
      });
    }
    handleSearch()
  },  [searchQuery]); 
    
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  }





  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <h1>Patients</h1>
          <div className="navbar-buttons">
            <button className="add-member-btn" onClick={openModal}>
              Add Member
            </button>
            <Box display={"flex"}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "220px",
                }}
              >
                <SearchIcon
                  style={{
                    color: "gray",
                    position: "absolute",
                    marginLeft: "5px",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  style={{
                    width: "100%",
                    padding: "8px 30px",
                    borderRadius: "30px",
                    border: "1px solid #ccc",
                  }}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </Box>
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
            
            />
            {formik.values.Image  ? (
              <>
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                >
                  <Box>
                    <Avatar
                      src={URL.createObjectURL(formik.values.Image)}
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
                  <Box sx={{ mr: 40, mt: 1 }}>
                    <Typography> Succussfully Uploaded</Typography>
                  </Box>
                </Box>
              </>
            ) : (
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
              >
                <Box>
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
                </Box>
                <Box sx={{ mr: 42, mt: 1 }}>
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
              {...formik.getFieldProps("firstName")}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              {...formik.getFieldProps("lastName")}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <FormControl variant="outlined">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                label="Role"
                labelId="role-label"
                {...formik.getFieldProps("role")}
                error={formik.touched.role && Boolean(formik.errors.role)}
                helperText={formik.touched.role && formik.errors.role}
              >
                <MenuItem value="doctor">Doctor</MenuItem>
                <MenuItem value="patient">Patient</MenuItem>
              </Select>
            
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    label="Gender"
                    labelId="gender-label"
                    {...formik.getFieldProps("gender")}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                helperText={formik.touched.gender && formik.errors.gender}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  type="date"
                  fullWidth
                  {...formik.getFieldProps("dateOfBirth")}
                  error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                  helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
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
              onClick={formik.handleSubmit}
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
