import React, { useState, createContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider,  Box } from '@mui/material/';
import PetFinderService from "../src/services/petfinder.service";

import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/HomePage/Home";
import Profile from "./pages/Profile";
import BoardAdmin from "./pages/BoardAdmin";
import OpeningHours from "./pages/OpeningHours";
import Attractions from "./pages/Attractions";
import RequestResetPassword from "./pages/RequestResetPassword";
import ResetPassword from "./pages/ResetPassword";
import Reservation from "./pages/Reservation";
import LoginRequired from "./pages/LoginRequired";
import ReservationsList from "./pages/ReservationsList";
import PlanTrip from "./pages/PlanTrip";
import PlansList from "./pages/PlansList";
import AnimalHelper from "./pages/AnimalHelper";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute"
import AuthenticatedRoute from "./components/AuthenticatedRoute"
import AuthenticatedRouteWithProps from "./components/AuthenticatedRouteWithProps"
import AuthenticatedAdminRoute from "./components/AuthenticatedAdminRoute"
import NotFound from "./pages/NotFound"
import Tickets from "./pages/Tickets"
import Footer from "./components/Footer"
import ErrorMessage from "./components/ErrorMessage";

import AppTopBar from "./components/AppTopBar"

import theme from "./styles/theme"

export const AuthContext = createContext();

const App = () => {
  const [ , setAppReservation] = useState({});
  const [isAuthenticated] = useState(JSON.parse(window.localStorage.getItem('user')));
  const [message, setMessage] = useState('');

  const [accessToken, setAccessToken] = useState(null);


  const changeReservation = (value) => {
    setAppReservation(value);
  }

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
        <Switch>
          <Route exact path={["/"]} component={Home} />
          <Route exact path="/opening-hours" component={OpeningHours} />
          <Route exact path="/attractions" component={Attractions}></Route>
          <Route exact path="/help-animals" component={AnimalHelper}></Route>
          <Route exact path="/tickets" component={Tickets}></Route>

          <UnauthenticatedRoute
            path="/login"
            component={Login}
            appProps={{ isAuthenticated }}
          />
          <UnauthenticatedRoute
            path="/register"
            component={Register}
            appProps={{ isAuthenticated }}
          />
          <UnauthenticatedRoute
            path="/request-reset-password"
            component={RequestResetPassword}
            appProps={{ isAuthenticated }}
          />
          <UnauthenticatedRoute
            path="/reset-password/:hash"
            component={ResetPassword}
            appProps={{ isAuthenticated }}
          />
          <UnauthenticatedRoute
            path="/login-required"
            component={LoginRequired}
            appProps={{ isAuthenticated }}
          />   
          <AuthenticatedRoute
            path="/profile"
            component={Profile}
            appProps={{ isAuthenticated }}
          />
          <AuthenticatedRouteWithProps
            path="/reservation"
            element={Reservation}
            appProps={{ isAuthenticated, changeReservation }}
          />
          <AuthenticatedRoute
            path="/reservations-list"
            component={ReservationsList}
            appProps={{ isAuthenticated }}
          />
          <AuthenticatedRoute
            path="/plan-trip"
            component={PlanTrip}
            appProps={{ isAuthenticated }}
          />
          <AuthenticatedRoute
            path="/plans-list"
            component={PlansList}
            appProps={{ isAuthenticated }}
          />

          <AuthenticatedAdminRoute
            path="/admin"
            component={BoardAdmin}
            appProps={{ isAuthenticated }}
          />

          <Route component={NotFound} />
          </Switch>
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