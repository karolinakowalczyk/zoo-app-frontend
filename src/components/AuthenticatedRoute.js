import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function AuthenticatedRoute({ component: Component, appProps, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        appProps.isAuthenticated
              ?
              (<div>
                  <h2>auth</h2>
                <Component {...props} {...appProps} />
              </div>)
          : <Redirect
              to={`/login?redirect=${props.location.pathname}${props.location.search}`}
            />}
    />
  );
}