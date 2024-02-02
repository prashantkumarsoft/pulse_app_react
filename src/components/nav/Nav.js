import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import "./nav.css"
import enTranslations from '../json_files/en.json';
import esTranslations from '../json_files/es.json';
import { useLanguage } from '../../context/LanguageContext';


const Nav = () => {

  const { language } = useLanguage();
  const translations = language === 'es' ? esTranslations : enTranslations;


  return (
    <AppBar position="static">
        <Toolbar variant="dense"  style={{backgroundColor: "white"}} >
          <IconButton
            edge="start"
            color="black"
            aria-label="menu"
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4"  style={{color: "black",  fontWeight: "bold"}} component="div">
          {translations['navbar.title']}
          </Typography>
        </Toolbar>
      </AppBar>
  )
}

export default Nav






