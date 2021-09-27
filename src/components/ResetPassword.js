import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import { Container, Typography, Button, CircularProgress, Link, Alert  } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import EmailIcon from '@mui/icons-material/Email';
import AuthService from "../services/auth.service";
import { useParams } from "react-router-dom";

const required = (value) => {
  if (!value) {
    return (
      <div>
        <p style={{color: "red", margin: "0"}}>This field is required!</p>
      </div>
    );
  }
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: '3rem',
    border: '0.01rem solid #81B214',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: '0.25rem',
    backgroundColor: '#fafafa',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(1),
    width: "101.25%",
    '&:hover': {
      background: "#777777",
    },
  },
  alert: {
    marginTop: theme.spacing(1),
  },
  h1: {
    color: '#000'
  },
  buttonText: {
    color: '#FFF',
  },
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
    color: "#FFF",
  }
}));

const ResetPassword = (props) => {
  const classes = useStyles();
  
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
    console.log(hash);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
        AuthService.resetPassword(hash, password).then(
          //jak wziąć z linku token i userId???
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

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
          <EmailIcon sx={{ color: '#81B214', fontSize: '36px'}} />
        <Typography className={classes.h1} component="h1" variant="h5">
          Request Reset Password
        </Typography>
            <Form className={classes.form} onSubmit={handleResetPassword} ref={form}>
                  {!successful && (
                      <div>
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
                              <span className={classes.buttonText}>Change password</span>
                          </Button>
                      </div>
                  )}
                  {message && successful && (   
                      <div className={classes.alert}>
                            <Alert severity="success" >{message}</Alert>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}>
                                <Link className={classes.link} href={"/login"} variant="body2">
                                {"Login with new password"}
                                </Link>
                            </Button>
                        </div>
                    )}
                    {message && !successful && (
                        <div className={classes.alert}>
                        <Alert severity="error" >{message}</Alert>
                        </div>
                    )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </Container>
  );
};

export default ResetPassword;