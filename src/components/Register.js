import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Container, Typography, Button, CircularProgress, Alert  } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AuthService from "../services/auth.service";
import { useHistory } from "react-router-dom";

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
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    borderRadius: '0.25rem',
    backgroundColor: '#fafafa',
  },
  form: {
    width: '100%',
    marginTop: 1,
  },
  submit: {
    marginTop: 1,
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

const required = (value) => {
  if (!value) {
    return (
      <div>
        <p style={{color: "red", margin: "0"}}>This field is required!</p>
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div>
        <p style={{color: "red", margin: "0"}}>This is not a valid email.</p>
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div>
        <p style={{color: "red", margin: "0"}}>The username must be between 3 and 20 characters.</p>
      </div>
    );
  }
};

const vpassword = (value) => {
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
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
  /*if (value.length < 6 || value.length > 40) {
    return (
      <div>
        <p style={{color: "red", margin: "0"}}>The password must be between 6 and 40 characters.</p>
      </div>
    );
  }*/
};

const Register = (props) => {
  const classes = useStyles();

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
        <AccountCircleIcon sx={{ color: '#81B214', fontSize: '36px'}} />
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
            </div>
          )}

          {message && successful && (
            <div className={classes.alert}>
              <Alert severity="success" >{message}</Alert>
              <Button onClick={() => goToPage(`login`)}>
                LOGIN
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

export default Register;