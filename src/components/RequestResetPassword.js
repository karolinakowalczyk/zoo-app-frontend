import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import { Container, Avatar, Typography, Button, CircularProgress, Link  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import Alert from '@material-ui/lab/Alert';
import AuthService from "../services/auth.service";

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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
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

const RequestResetPassword = (props) => {
  const classes = useStyles();

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
    setLoading(true);
    setSuccessful(false);

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
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

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MailIcon />
        </Avatar>
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
                              validations={[required]}
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
                        
                      <div className={classes.alert}>
                            <Alert severity="success" >{message}</Alert>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}>
                                <Link className={classes.link} href={"/"} variant="body2">
                                {"Back to main site"}
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

export default RequestResetPassword;