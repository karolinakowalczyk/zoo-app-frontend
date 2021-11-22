import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthenticatedRoute = ({ component: Component, appProps, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        appProps.isAuthenticated
          ?
          (<Component {...props} {...appProps} />)
          : (<Redirect to="/"/>)}
      />
  );
}

export default AuthenticatedRoute;