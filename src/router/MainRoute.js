import React, { useState } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/HomePage/Home";
import Profile from "../pages/Profile";
import BoardAdmin from "../pages/BoardAdmin";
import OpeningHours from "../pages/OpeningHours";
import Attractions from "../pages/Attractions";
import RequestResetPassword from "../pages/RequestResetPassword";
import ResetPassword from "../pages/ResetPassword";
import Reservation from "../pages/Reservation";
import LoginRequired from "../pages/LoginRequired";
import ReservationsList from "../pages/ReservationsList";
import PlanTrip from "../pages/PlanTrip";
import PlansList from "../pages/PlansList";
import AnimalHelper from "../pages/AnimalHelper";
import UnauthenticatedRoute from "./UnauthenticatedRoute"
import AuthenticatedRoute from "./AuthenticatedRoute"
import AuthenticatedRouteWithProps from "./AuthenticatedRouteWithProps"
import AuthenticatedAdminRoute from "./AuthenticatedAdminRoute"
import NotFound from "../pages/NotFound"
import Tickets from "../pages/Tickets"
import { Switch, Route } from "react-router-dom";


const MainRoute = () => {
    const [ , setAppReservation] = useState({});
    const [isAuthenticated] = useState(JSON.parse(window.localStorage.getItem('user')));
    const changeReservation = (value) => {
        setAppReservation(value);
    }

    return (
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
    );
}

export default MainRoute;