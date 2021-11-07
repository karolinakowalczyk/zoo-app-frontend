import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import { Container, Typography, Button, CircularProgress, Alert, Grid } from '@mui/material/';
import EmailIcon from '@mui/icons-material/Email';
import AuthService from "../services/auth.service";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import useFormStyles from "../styles/useFormStyles";
import vpassword from "../helpers/vpassword";

const required = (value) => {
  if (!value) {
    return (
      <div>
        <p style={{color: "red", margin: "0"}}>This field is required!</p>
      </div>
    );
  }
};

const ResetPassword = (props) => {
  const classes = useFormStyles();
  
  const { hash } = useParams();
    
  const form = useRef();
  const checkBtn = useRef();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);


  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleResetPassword = (e) => {

    e.preventDefault();

    setMessage("");
    setLoading(true);
    setSuccessful(false);
    form.current.validateAll();
    setLoading(false);
    if (checkBtn.current.context._errors.length === 0) {
        AuthService.resetPassword(hash, password).then(
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
                                validations={[required, vpassword]}
                                placeholder="Password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={onChangePassword}
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
                              <span className={classes.buttonText}>Change password</span>
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
                          <Button variant="contained" color="primary" className={classes.submit} sx={{color: 'primary.white'}} onClick={() => goToPage(`/login`)}>
                            Login with new password
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

export default ResetPassword;