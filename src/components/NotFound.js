import React from "react";
import { Container } from '@mui/material/';
import 'react-calendar/dist/Calendar.css';
import ErrorMessage from "./ErrorMessage";
import useFormStyles from "../styles/useFormStyles";

const NotFound = () => {
    const classes = useFormStyles();
    return (
        <Container component="main" maxWidth="sm">
            <div className={classes.paper}>
                <ErrorMessage message="Not Found"></ErrorMessage>
            </div>
        </Container>
    );
}

export default NotFound;