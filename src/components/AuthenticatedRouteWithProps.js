import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function AuthenticatedRouteWithProps({ element: Element, appProps, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        appProps.isAuthenticated
              ?
              (<Element {...props} {...appProps} />)
          : (<Redirect to="/"/>)}
    />
  );
}