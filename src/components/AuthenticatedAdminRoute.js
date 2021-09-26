import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

export default function AuthenticatedAdminRoute({ component: Component, appProps, ...rest }) {

const currentUser = AuthService.getCurrentUser();
  return (
    <Route
      {...rest}
      render={props =>
        appProps.isAuthenticated && currentUser.roles.includes("ROLE_ADMIN")
          ?
          (<Component {...props} {...appProps} />)
          : (<Redirect to="/"/>)}
      />
  );
}