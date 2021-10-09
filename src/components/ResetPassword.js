import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import { Container, Typography, Button, CircularProgress, Alert  } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import EmailIcon from '@mui/icons-material/Email';
import AuthService from "../services/auth.service";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

const required = (value) => {
  if (!value) {
    return (
      <div>
        <p style={{color: "red", margin: "0"}}>This field is required!</p>
      </div>
    );
  }
};

const vpassword = (value) => {
  const oneNumber = /^(?=.*[0-9])/;
  const oneSpecialCharacter = /^(?=.*[!@#$%^&*])/;
  const appropriateLength = /[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if (!appropriateLength.test(value)) {
    return (
      <div>
        <p style={{color: "red", margin: "0"}}>Password must be between 6 and 16 characters.</p>
      </div>
    );
  }
  else if (!oneNumber.test(value)) {
    return (
      <div>
        <p style={{color: "red", margin: "0"}}>Password should have at least one number.</p>
      </div>
    );
  }
  else if (!oneSpecialCharacter.test(value)) {
    return (
      <div>
        <p style={{color: "red", margin: "0"}}>Password should have at least one special character.</p>
      </div>
    );
  }
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: '10rem',
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
    marginTop: '2rem',
    marginBottom: '2rem',
    borderRadius: '0.25rem',
    backgroundColor: '#fafafa',
  },
  form: {
    width: '100%',
    marginTop: '1rem',
  },
  submit: {
    marginTop: '1rem',
    width: "101.25%",
    '&:hover': {
      background: "#777777",
    },
  },
  alert: {
    marginTop: '1rem',
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
          <EmailIcon sx={{ color: '#81B214', fontSize: '36px'}} />
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
                      <div className={classes.alert}>
                          <Alert severity="success" >{message}</Alert>
                          <Button variant="contained" color="primary" onClick={() => goToPage(`/login`)}>
                            Login with new password
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