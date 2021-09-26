import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function AuthenticatedRoute({ component: Component, appProps, ...rest }) {
  console.log('Auth route ' + appProps.isAuthenticated);
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