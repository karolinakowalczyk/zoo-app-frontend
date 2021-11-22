import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import { Container, Typography, Button, CircularProgress, Alert, Grid } from '@mui/material/';
import useFormStyles from "../styles/useFormStyles";
import EmailIcon from '@mui/icons-material/Email';
import AuthService from "../services/auth.service";
import { useHistory } from "react-router-dom";
import required from "../helpers/requiredField";
import validEmail from "../helpers/validEmail";

const RequestResetPassword = () => {
  const classes = useFormStyles();

  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);


  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handleResetPassword = (e) => {

    e.preventDefault();

    setMessage("");
    
    form.current.validateAll();
    
    if (checkBtn.current.context._errors.length === 0) {
      setLoading(true);
      AuthService.requestResetPassword(email).then(
        (response) => {
          setLoading(false);
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setMessage(resMessage);
          setSuccessful(false);   
        }
      );
    }
  };
  const history = useHistory();
  const goToPage = (path) =>{ 
    history.push(path);
  }

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <EmailIcon sx={{ color: 'primary.main', fontSize: '8rem'}} />
        <Typography className={classes.h1} component="h1" variant="h5">
          Request Reset Password
        </Typography>
            <Form className={classes.form} onSubmit={handleResetPassword} ref={form}>
                  {!successful && (
                      <div>
                          <Input
                              className={classes.input}
                              name="email"
                              value={email}
                              onChange={onChangeEmail}
                              placeholder="Email"
                              validations={[required, validEmail]}
                          />
                          <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                              className={classes.submit}
                              disabled={loading}
                          >
                              {loading && (
                                  <CircularProgress color="primary" />
                              )}
                              <span className={classes.buttonText}>Send email</span>
                          </Button>
                      </div>
                  )}
                  {message && successful && (
                      <Grid
                        container
                        direction="row"
                        justifyContent="center"
                      >
                        <div className={classes.alert}>
                          <Alert severity="success" >{message}</Alert>
                          <Button variant="contained" color="primary" className={classes.submit} sx={{color: 'primary.white'}} onClick={() => goToPage(`/`)}>
                            Back to main site
                          </Button>            
                        </div>
                      </Grid> 
                    )}
                  {message && !successful && (
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                      >
                        <div className={classes.alert}>
                          <Alert severity="error" >{message}</Alert>
                        </div>
                      </Grid> 
                    )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </Container>
  );
};

export default RequestResetPassword;