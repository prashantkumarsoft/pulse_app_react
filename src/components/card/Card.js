import * as React from "react";
import Card from "@mui/material/Card";
import enTranslations from '../json_files/en.json';
import esTranslations from '../json_files/es.json';
import { useLanguage } from '../../context/LanguageContext';

import {
  Typography,
  Box,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from "@mui/material/colors";
import "./Card.css";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import { baseUrl } from "../../config";
import axios from "axios";

export default function RecipeReviewCard({data}) {
   console.log("newData====>0",data)
  const { language } = useLanguage();
  const translations = language === 'es' ? esTranslations : enTranslations;


  const [openPopup, setOpenPopup] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState('');
  const [updateData, setUpdateData] = React.useState({
    
      "procedure_name": "",
      "doctor_id": 0,
      "stage_history": [{"stage_name": "lead", "timestamp": new Date().toISOString()}]
  
  })

  const handleOpenPopup = (item) => {
    setOpenPopup(true);
    setUpdateData(item) 
  };


  const handleClosePopup = () => {
    setOpenPopup(false);
   
  };

  const handleUpdatePopup = (field, newValue) => {
    setUpdateData((prev)=> ({...prev, [field]: newValue}))
    axios
    .put(`${baseUrl}/opportunities/${updateData.id}`, updateData)
    .then((response) => {
      console.log("success", response);
    })
    .catch((error) => {
      console.error("error", error);
    });


    alert("Opportunity Updated successfully");
    handleClosePopup();
  };

  const handleNextButton=(item)=>{

      axios
      .patch(`${baseUrl}/opportunities/${item.id}/move_to_next_stage`)
      .then((response) => {
        console.log("success", response);
      })
      .catch((error) => {
        console.error("error", error);
      });
    
  }

  const handleDeleteButton = (item) => {
  
      axios
        .delete(`${baseUrl}/opportunities/${item.id}`)
        .then((response) => {

        })
        .catch((error) => {
          console.error("error", error);
        });
    
  };

  return (
    <>
    { data.length > 0 &&
    data.map((item) => (
   
      <Card sx={{ marginTop: "10px", maxWidth: 345, borderRadius: "8px", textTransform: "capitalize" }}>
        <Box display={"flex"} flexDirection={"row"}>
          <Avatar
            src={item.patient.avatar_url}
            alt="image"
            sx={{ bgcolor: red[500], marginLeft: "5px", marginTop: "5px" }}
            aria-label="recipe"
          >
           
          </Avatar>
          <Box
            display={"flex"}
            flexDirection={"column"}
            style={{ marginLeft: "10px" }}
          >
            <Typography variant="h6" style={{ fontSize: "14px" }} color="black">
              {item.patient.full_name}
            </Typography>
            <Typography variant="h6" style={{ fontSize: "14px" }} color="black">
            {item.patient.gender},  {item.patient.age} years old
            </Typography>
          </Box>
        </Box>

        <Box className="card-body">
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Box>
              <Typography
                variant="h6"
                style={{ fontSize: "14px" }}
                color="black"
              >
                Tommy Tuck
              </Typography>
              <Typography
                variant="h6"
                style={{ fontSize: "14px" }}
                color="black"
              >
                Dr. {item.doctor.full_name}
              </Typography>
              {item.stage_history && item.stage_history.map((stage)=>(
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  gap={0}
                >
                  <Typography style={{ fontSize: "12px" }}>{stage.stage_name} </Typography>
                  <Typography style={{ fontSize: "12px" , marginLeft: "2px"}}>
                    {moment(stage.timestamp).format('lll')}
                  </Typography>
                </Box>
              ))}

            </Box>
            <Box display={"flex"} flexDirection={"column"} gap={"5px 0px"}>
              <Avatar
                src={item.doctor.avatar_url}
                alt="image"
                sx={{ height: "30px", width: "30px", bgcolor: red[500] }}
                aria-label="recipe"
              >
                
              </Avatar>
              <SkipNextIcon onClick={()=> handleNextButton(item)} />
              <EditIcon  onClick={()=>handleOpenPopup(item)}/>
              <DeleteIcon  onClick={() => handleDeleteButton(item)}>  <CloseIcon /></DeleteIcon>
            </Box>
          </Box>
        </Box>
      </Card>
 ))}
      {/* Popup Dialog */}
      <Dialog open={openPopup} onClose={handleClosePopup}>
        <DialogTitle>
          <div className="popup-header">
            <Typography variant="h6">Opportunity Details</Typography>
            <IconButton
              aria-label="close"
              className="close-popup-btn"
              onClick={handleClosePopup}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <hr/>

        </DialogTitle>
        <DialogContent>
          <TextField
            sx={{ mt: 1 }}
            fullWidth
            label="Procedure Name"
            variant="outlined"
            value={updateData.procedure_name}
            onChange={(e) => setUpdateData({...updateData,procedure_name:e.target.value})}
          />
          <TextField
            sx={{ mb: 1, mt: 1 }}
            fullWidth
            label="Doctor Name"
            variant="outlined"
            value={updateData.doctor?.full_name}
            onChange={(e) => setUpdateData({...updateData, doctor:{...updateData.doctor,full_name:e.target.value}})}
          />
          <TextField
            variant="outlined"
            type="date"
            fullWidth
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        
        </DialogContent>
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleUpdatePopup} variant="contained">
            Update
          </Button>
        </Box>
      </Dialog>
    </>
  );
}
