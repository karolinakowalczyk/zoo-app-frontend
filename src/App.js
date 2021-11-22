import React, { useState, createContext, useEffect } from "react";

import { ThemeProvider,  Box } from '@mui/material/';
import PetFinderService from "../src/services/petfinder.service";

import "./App.css";

import Footer from "./components/Footer"
import ErrorMessage from "./components/ErrorMessage";
import MainRoute from "./router/MainRoute"

import AppTopBar from "./components/AppTopBar"

import theme from "./styles/theme"

export const AuthContext = createContext();

const App = () => {
  // [ , setAppReservation] = useState({});
  //const [isAuthenticated] = useState(JSON.parse(window.localStorage.getItem('user')));
  const [message, setMessage] = useState('');

  const [accessToken, setAccessToken] = useState(null);


  /*const changeReservation = (value) => {
    setAppReservation(value);
  }*/

  useEffect(() => {
    const fetchAccessToken = async () => {
      PetFinderService.getAccessToken().then(
      (response) => {
          setAccessToken(response.data);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          setMessage(resMessage);
      }
    );
    };
    fetchAccessToken();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppTopBar/>
      <AuthContext.Provider value={accessToken}>
      <Box className="main-container">
        <MainRoute></MainRoute>
      {message && (
        <ErrorMessage message={message}></ErrorMessage>
      )}
      </Box>
      </AuthContext.Provider>
      <Footer/>
    </ThemeProvider>
  );
};

export default App;