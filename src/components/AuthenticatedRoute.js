import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function AuthenticatedRoute({ component: Component, appProps, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        appProps.isAuthenticated
              ?
              (<Component {...props} {...appProps} />)
          : <Redirect
              to={`/login?redirect=${props.location.pathname}${props.location.search}`}
            />}
    />
  );
}

/*import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function AuthenticatedRoute({ element: Element, appProps, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        appProps.isAuthenticated
              ?
              (<Element {...props} {...appProps} />)
          : <Redirect
              to={`/login?redirect=${props.location.pathname}${props.location.search}`}
            />}
    />
  );
}*/