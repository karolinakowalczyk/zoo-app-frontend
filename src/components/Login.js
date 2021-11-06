import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import { Container, Typography, Button, Grid, CircularProgress, Alert  } from '@mui/material/';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import AuthService from "../services/auth.service";

import useFormStyles from "../styles/useFormStyles";

import required from "../helpers/requiredField";

const Login = (props) => {
  const classes = useFormStyles();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
    
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {

    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          props.history.push("/profile");
          window.location.reload();
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
        }
      );
    } else {
      setLoading(false);
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
          Login
        </Typography>
        <Form className={classes.form} onSubmit={handleLogin} ref={form}>
         <div>
          <Input
            className={classes.input}
            validations={[required]}
            name="username"
            value={username}
            onChange={onChangeUsername}
            placeholder="User name"
          />
          <Input
            className={classes.input}
            validations={[required]}
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
            <span className={classes.buttonText}>Login</span>
          </Button>
         </div>
          <Grid container>
            <Grid item xs={6} container justifyContent="flex-start">
            <Button  onClick={() => goToPage(`request-reset-password`)}>
              Forgot password?
            </Button>
            </Grid>
            <Grid item xs={6} container justifyContent="flex-end">
              <Button onClick={() => goToPage(`register`)}>
                Don't have an account? Sign Up
              </Button>
            </Grid>
          </Grid>
          {message && (
            <div className={classes.alert}>
              <Alert severity="error">{message}</Alert>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </Container>
  );
};

export default Login;