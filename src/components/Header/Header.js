// Header.js
import "./Header.css";
import React, { useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import { baseUrl } from "../../config";

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
  const [image,setImage]=useState("")
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
    setValidationErrors({});
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

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

  const handleSave = (values) => {
    let addMemberData = new FormData();
    console.log("formData===>",values)
    addMemberData.append("[member][first_name]", values.firstName);
    addMemberData.append("[member][last_name]", values.lastName);
    addMemberData.append("[member][gender]", values.gender);
    addMemberData.append("[member][age]", values.age);
    addMemberData.append("[member][role]", values.gender);
    // addMemberData.append("[member][avatar]", values.selectedImage, "file");  
    axios
      .post(`${baseUrl}/members`, addMemberData)
      .then((response) => {
        console.log("success", response);
      })
      .catch((error) => {
        console.error("error", error);
      });
    console.log("Form Data:", values);
 
  };

  const renderError = (errMsg) => {
    return (
      <span style={{ color: "red", fontSize: "12px", marginTop: "0px" }}>
        {" "}
        *{errMsg}
      </span>
    );
  };

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
                    marginLeft: "5px"
                 
                  }}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  value=""
                  style={{
                    width: "100%",
                    padding: "8px 30px", 
                    borderRadius: "30px",
                    border: "1px solid #ccc",

                  }}
                />
              
              </div>

            
            </Box>
      
          </div>
        </div>
      </nav>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          role: "",
          gender: "",
          dateOfBirth: "",
          Image: null,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = "Required";
          } else if (!values.lastName) {
            errors.lastName = "Required";
          } else if (!values.role) {
            errors.role = "Required";
          } else if (!values.gender) {
            errors.gender = "Required";
          } else if (!values.dateOfBirth) {
            errors.dateOfBirth = "Required";
          } else if (!values.Image) {
            errors.Image = "Required";
          }
          return errors;
        }}


        onSubmit={(values, { setSubmitting }) => {
          console.log("values",values)
          setFormData(values)
          setSubmitting(false);
          setTimeout(() => {
          handleSave(values)
          }, 200);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
          handleSubmit
        }) => (
          <Modal open={isModalOpen} onClose={closeModal}>
            <Container
              maxWidth="sm"
              sx={{ mt: 1, p: 1, bgcolor: "background.paper", borderRadius: 2 }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mb: -2,
                  mr: -2,
                }}
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
                  name="Image"
                  style={{ display: "none" }}
                  onChange={(event)=>{
                    console.log("??????????????????",event.target.files[0]);
                    const file = event.target.files[0];
                    setImage(event.target.files[0])
                    if (file) {
                      handleChange("Image")
                      console.log("file",file)
                    } else {
                      handleChange("Image")
                    }
                  }}
                  error={Boolean(validationErrors.Image)}
                  helperText={validationErrors.Image}
                />
                {image  ? (
                  <>
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                    >
                      <Box>
                        <Avatar
                          src={URL.createObjectURL(image)}
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
                  type="text"
                  name="firstName"
                  error={!!errors.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />
                {errors.firstName &&
                  touched.firstName &&
                  renderError(errors.firstName)}
                <TextField
                  label="Last Name"
                  variant="outlined"
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  error={!!errors.lastName}
                />
                {errors.lastName &&
                  touched.lastName &&
                  renderError(errors.lastName)}

                <FormControl variant="outlined">
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    label="Role"
                    labelId="role-label"
                    name="role"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.role}
                    error={!!errors.role}
                  >
                    <MenuItem value="doctor">Doctor</MenuItem>
                    <MenuItem value="patient">Patient</MenuItem>
                  </Select>
                  {errors.role && touched.role && renderError(errors.role)}
                </FormControl>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="gender-label">Gender</InputLabel>
                      <Select
                        label="Gender"
                        labelId="gender-label"
                        name="gender"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.gender}
                        error={!!errors.gender}
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </Select>
                      {errors.gender &&
                        touched.gender &&
                        renderError(errors.gender)}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      type="date"
                      name="dateOfBirth"
                      error={!!errors.dateOfBirth}
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.dateOfBirth}
                    />
                    {errors.dateOfBirth &&
                      touched.dateOfBirth &&
                      renderError(errors.dateOfBirth)}
                  </Grid>
                </Grid>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 2,
                }}
              >
                <Button
                  variant="contained"
                  className="save_member"
                  type="submit"
                  onClick={handleSubmit}
                  sx={{ mr: 1 }}
                >
                  Save
                </Button>
              </Box>
            </Container>
          </Modal>
        )}
      </Formik>
    </>
  );
};

export default Header;
