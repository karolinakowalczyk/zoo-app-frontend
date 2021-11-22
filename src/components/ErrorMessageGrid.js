import React from "react";
import { Alert, Grid } from '@mui/material/';
import useFormStyles from "../styles/useFormStyles";

const ErrorMessageGrid = (props) => {
  const classes = useFormStyles();

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
        >
            <div className={classes.alert}>
                <Alert severity="error" >{props.message}</Alert>
            </div>
        </Grid>
    );
}

export default ErrorMessageGrid;