import React from "react";
import { Alert  } from '@mui/material/';
import useFormStyles from "../styles/useFormStyles";

const ErrorMessage = (props) => {
  const classes = useFormStyles();

    return (
        <div className={classes.alert}>
            <Alert severity="error">{props.message}</Alert>
        </div>
    );
}

export default ErrorMessage;