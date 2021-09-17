import React from "react";
import { Container, Button, Link  } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import 'react-calendar/dist/Calendar.css';



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

const Register = (props) => {
    const classes = useStyles();


    return (
        <Container component="main" maxWidth="sm">
            <div className={classes.paper}>
                <div className={classes.alert}>
                    <Alert severity="success" >You must log in to make a reservation</Alert>
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
            </div>
        </Container>
    );
}

export default Register;