import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Container, Typography, Button, CircularProgress, Alert, Grid  } from '@mui/material/';
import useFormStyles from "../styles/useFormStyles";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AuthService from "../services/auth.service";
import { useHistory } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

import required from "../helpers/requiredField";
import validEmail from "../helpers/validEmail";
import vpassword from "../helpers/vpassword";
import vusername from "../helpers/vusername";
const Register = () => {
  const classes = useFormStyles();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatpassword, setRepeatPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeRepeatPassword = (e) => {
    const repeatpassword = e.target.value;
    setRepeatPassword(repeatpassword);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);
    setSuccessful(false);

    form.current.validateAll();
    setLoading(false);
    if (password !== repeatpassword) {
      setMessage("Password's don't match!");
      setLoading(false);
      return;
    }

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password).then(
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
        <AccountCircleIcon sx={{ color: 'primary.main', fontSize: '8rem'}} />
        <Typography className={classes.h1} component="h1" variant="h5">
          Sign up
        </Typography>
        <Form className={classes.form} onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <Input
                type="text"
                className={classes.input}
                placeholder="User name"
                name="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required, vusername]}
              />
              <Input
                type="text"
                className={classes.input}
                placeholder="Email"
                name="email"
                value={email}
                onChange={onChangeEmail}
                validations={[required, validEmail]}
              />
              <Input
                type="password"
                className={classes.input}
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required, vpassword ]}
              />
              <Input
                type="password"
                className={classes.input}
                placeholder="Repeat password"
                name="repeatpassword"
                value={repeatpassword}
                onChange={onChangeRepeatPassword}
                validations={[required, vpassword ]}
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
                <span className={classes.buttonText}>Sign Up</span>
              </Button>
              <Button onClick={() => goToPage(`login`)}>
                Have an account? Login
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
              <Button variant="contained" color="primary" className={classes.submit} sx={{color: 'primary.white'}} onClick={() => goToPage(`login`)}>
                LOGIN
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
              <ErrorMessage message={message}></ErrorMessage>
          </Grid>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </Container>
  );
};

export default Register;