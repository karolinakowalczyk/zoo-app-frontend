import React from "react";
import { Container, Button, Alert  } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: 20,
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
    marginTop: 2,
    marginBottom: 2,
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
    marginTop: 1,
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

const LoginRequired = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const goToLoginPage = () =>{ 
    let path = `login`; 
    history.push(path);
  }

    return (
        <Container component="main" maxWidth="sm">
            <div className={classes.paper}>
                <div className={classes.alert}>
            <Alert severity="success" >You must log in to make a reservation</Alert>
           
            <Button variant="contained" color="primary" onClick={goToLoginPage}>
              Login
            </Button>
                   
          </div>
        </div>
      </Container>
    );
}

export default LoginRequired;