import React from "react";
import { Alert, Grid } from '@mui/material/';
import useFormStyles from "../styles/useFormStyles";

const SuccessMessage = (props) => {
  const classes = useFormStyles();

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
        >
            <div className={classes.alert}>
                <Alert severity="success" >{props.message}</Alert>
            </div>
        </Grid>
    );
}

export default SuccessMessage;