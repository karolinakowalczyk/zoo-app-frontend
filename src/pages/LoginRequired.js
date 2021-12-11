import React from "react";
import { Container, Button, Alert  } from '@mui/material/';
import { makeStyles } from '@mui/styles';
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
  submit: {
    marginTop: '1rem',
    width: "101.25%",
    color: theme.palette.primary.white,
    '&:hover': {
      background: theme.palette.secondary.main,
    },
  },
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
            <div>
              <Alert severity="success" >You must log in to make a reservation</Alert>
              <Button variant="contained" color="primary" className={classes.submit} onClick={goToLoginPage}>
                Login
              </Button>      
          </div>
        </div>
      </Container>
    );
}

export default LoginRequired;