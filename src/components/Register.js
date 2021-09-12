import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Container, CssBaseline, Avatar, Typography, FormControlLabel, Checkbox, Button, Grid, Link, CircularProgress  } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import AuthService from "../services/auth.service";

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
  if (value.length < 6 || value.length > 40) {
    return (
      <div>
        <p style={{color: "red", margin: "0"}}>The password must be between 6 and 40 characters.</p>
      </div>
    );
  }
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

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
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
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}>
                <Link className={classes.link} href={"/login"} variant="body2">
                  {"Login"}
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

export default Register;