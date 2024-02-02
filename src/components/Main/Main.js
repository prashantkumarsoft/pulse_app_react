import React, { useEffect, useState } from "react";
import axios from "axios";
import enTranslations from "../json_files/en.json";
import esTranslations from "../json_files/es.json";
import { useLanguage } from "../../context/LanguageContext";
// import {useApi} from '../../context/ApiContext'


import "./Main.css";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RecipeReviewCard from "../card/Card";
import { baseUrl } from "../../config";

const Main = () => {
  const { language } = useLanguage();

  const translations = language === "es" ? esTranslations : enTranslations;

  const [open, setOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const [opportunitiesData, setOpportunitiesData] = useState({});
  const [patientData, setPatientData] = useState({});
  const [doctorData, setDoctorData] = useState({});

   const loadNextApi = () => {
    axios
      .get(`${baseUrl}/opportunities`)
      .then((response) => {
        setOpportunitiesData(response.data);
      })
      .catch((error) => console.log(error, "opportunities error"));
    };

  useEffect(() => {
    loadNextApi()
  }, [opportunitiesData]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/members/doctors`)
      .then((response) => {
        setDoctorData(response.data);
      })
      .catch((error) => console.log(error, "doctor ID error"));
  }, []);

  useEffect(() => {
    axios
      .get(`${baseUrl}/members/patients`)
      .then((response) => {
        setPatientData(response.data);
      })
      .catch((error) => console.log(error, "Patient ID error"));
  }, []);

  const handleGetCardData = (cardType) => {
    let data = [];
    if (opportunitiesData.data && opportunitiesData.data.length > 0) {
      data = opportunitiesData.data.filter((stage) => stage.current_stage === cardType);
    }

    return data;
  };

  const [formData, setFormData] = useState({
    procedure_name: "",
    patient_id: "", // default value, you can change as needed
    doctor_id: "", // default value, you can change as needed
    stage_history: [
      {
        timestamp: new Date().toISOString(),
        stage_name: "lead",
      },
    ],
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData((prevFormData) => ({
      ...prevFormData,
      procedure_name: "",
      patient_id: "",
      doctor_id: "",
      stage_history: [
        {
          timestamp: new Date().toISOString(),
          stage_name: "Lead",
        },
      ],
    }));
  };

  const handleChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));

    // Clear validation error when the field changes
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [field]: null,
    }));
  };

  const handleSave = async () => { await
    axios
      .post(`${baseUrl}/opportunities`, formData)
      .then((response) => {
        console.log("success", response);

      })
      .catch((error) => {
        console.error("error", error);
      });

    console.log("Form Data:", formData);

    const errors = {};

    if (!formData.procedure_name.trim()) {
      errors.procedure_name = "Procedure Name is required";
    }

    if (!formData.patient_id) {
      errors.patient_id = "Patient ID is required";
    }

    if (!formData.doctor_id) {
      errors.doctor_id = "Doctor ID is required";
    }

    // Set validation errors and return if there are errors
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    handleClose();
  };

  return (
    <>
      <div className="horizontal-layout">
        {/* Content for the first section */}
        <div className="section">
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography>
              {" "}
              {translations["stage1.title"]}(
              {opportunitiesData.lead_stage_count})
            </Typography>
            <button className="add-opportunity-btn" onClick={handleOpen}>
              {translations["header.addOpportunity"]}
            </button>
          </Box>
          <RecipeReviewCard data={handleGetCardData("lead")} />
        </div>

        {/* Content for the second section */}
        <div className="section">
          <Typography>
            {" "}
            {translations["stage2.title"]}(
            {opportunitiesData.qualified_stage_count})
          </Typography>

          <RecipeReviewCard data={handleGetCardData("qualified")} />
        </div>

        {/* Content for the third section */}
        <div className="section">
          <Typography>
            {translations["stage3.title"]}(
            {opportunitiesData.booked_stage_count})
          </Typography>
          <RecipeReviewCard data={handleGetCardData("booked")} />
        </div>

        {/* Content for the fourth section */}
        <div className="section">
          <Typography>
            {translations["stage4.title"]}(
            {opportunitiesData.treated_stage_count})
          </Typography>
          <RecipeReviewCard data={handleGetCardData("treated")} />
        </div>
      </div>

      {/* Popup */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <div className="popup-header">
            <Typography variant="h6">Add Opportunity</Typography>
            <IconButton
              aria-label="close"
              className="close-popup-btn"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <hr />
        </DialogTitle>

        <DialogContent className="popup-content">
          {/* Fields for the popup content */}
          <br />
          <TextField
            fullWidth
            label="Procedure_Name"
            value={formData.procedure_name}
            onChange={(e) => handleChange("procedure_name", e.target.value)}
            error={Boolean(validationErrors.procedure_name)}
            helperText={validationErrors.procedure_name}
          />
          {/* <FormControl variant="outlined" > */}
          <InputLabel>Patient_ID</InputLabel>
          <Select
            value={formData.patient_id}
            onChange={(e) => handleChange("patient_id", e.target.value)}
            error={Boolean(validationErrors.patient_id)}
          >
            {patientData.length > 0 ? (
              patientData.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.full_name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No patients available</MenuItem>
            )}
          </Select>
          {validationErrors.patient_id && (
            <div style={{ color: "red", fontSize: "0.75rem" }}>
              {validationErrors.patient_id}
            </div>
          )}

          <InputLabel>Doctor_ID</InputLabel>
          <Select
            value={formData.doctor_id}
            onChange={(e) => handleChange("doctor_id", e.target.value)}
            error={Boolean(validationErrors.doctor_id)}
          >
            {doctorData.length > 0 ? (
              doctorData.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.full_name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No patients available</MenuItem>
            )}
          </Select>
          {validationErrors.doctor_id && (
            <div style={{ color: "red", fontSize: "0.75rem" }}>
              {validationErrors.doctor_id}
            </div>
          )}
          {/* </FormControl> */}
        </DialogContent>
        <DialogActions>
          {/* Additional actions if needed */}
          <Button
            onClick={handleSave}
            variant="contained"
            className="save_member"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Main;
