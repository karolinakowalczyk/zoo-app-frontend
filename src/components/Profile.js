import React, { useState, useRef } from "react";
import AuthService from "../services/auth.service";
import { Box, Button, CircularProgress, Alert, InputLabel, Grid  } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckButton from "react-validation/build/button";
import useFormStyles from "../styles/useFormStyles";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    backgroundColor: theme.palette.primary.main,
    padding: '3rem',
    display:"flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: 'center'
  },
  input: {
    width: '100%',
    height: '2rem',
    paddingLeft: '0.5rem',
    borderRadius: '0.25rem',
    border: 'none',
    backgroundColor: 'theme.palette.secondary.verylight',
  },
  title: {
    marginBottom: '2rem',
  },
}));

const Profile = () => {
  const classes = useStyles();
  const formclasses = useFormStyles();
  const currentUser = AuthService.getCurrentUser();

  const [disable, setDisable] = useState(true);
  const [name, setName] = useState(currentUser.name || '');
  const [surname, setSurname] = useState(currentUser.surname || '');
  const [address, setAddress] = useState(currentUser.address || '');
  const [postalCode, setPostalCode] = useState(currentUser.postalCode || '');
  const [city, setCity] = useState(currentUser.city || '');
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phonenumber || '');
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const form = useRef();
  const checkBtn = useRef();

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeSurname = (e) => {
    setSurname(e.target.value);
  };
  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  const onChangePostalCode = (e) => {
    setPostalCode(e.target.value);
  };
  const onChangeCity = (e) => {
    setCity(e.target.value);
  };
  const onChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleEditButton = (e) => {
    setDisable(!disable);
    if (disable === false) {
      setName(currentUser.name || '');
      setSurname(currentUser.surname || '');
      setAddress(currentUser.address || '');
      setPostalCode(currentUser.postalCode || '');
      setCity(currentUser.city || '');
      setPhoneNumber(currentUser.phonenumber || '');
    }
  }

  const handleEdit = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);
    setSuccessful(false);

    form.current.validateAll();
    setLoading(false);

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.editProfile(currentUser.id, currentUser.email, name, surname, address, postalCode, city, phoneNumber).then(
        (response) => {
          setLoading(false);
          setMessage(response.data.message);
          setSuccessful(true);
          setDisable(true);
          const data = ({
            id: currentUser.id,
            username: currentUser.username,
            email: currentUser.email,
            name: name,
            surname: surname,
            address: address,
            postalCode: postalCode,
            city: city,
            phonenumber: phoneNumber,
            roles: currentUser.roles,
            accessToken: currentUser.accessToken
          });
          AuthService.updateCurrentUser(data);
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
  }
  return (
    <Box className={classes.mainBox}>
      <Box className={classes.childBox}>
        <h1 className={classes.title}> {currentUser.username} Profile </h1>
        <Form className={classes.form} onSubmit={handleEdit} ref={form}>
          <div>
            <div>
              <InputLabel htmlFor="email" sx={{pb: 0.5, pl: 1}}>Email</InputLabel>
              <Input
                className={classes.input}
                type="text" disabled={true}
                placeholder={currentUser.email}
                name="email"
              />
            </div>
            <div>
              <InputLabel htmlFor="name" sx={{pt: 1, pb: 0.5, pl: 1}}>Name</InputLabel>
              <Input
                className={classes.input}
                type="text" disabled={disable}
                value={name}
                onChange={onChangeName}
                name="name"
              />
            </div>
            <div>
              <InputLabel htmlFor="surname" sx={{pt: 1, pb: 0.5, pl: 1}}>Surname</InputLabel>
              <Input
                className={classes.input}
                type="text"
                disabled={disable}
                value={surname}
                onChange={onChangeSurname}
                name="surname"
              />
            </div>
            <div>
              <InputLabel htmlFor="address" sx={{pt: 1, pb: 0.5, pl: 1}}>Address</InputLabel>
              <Input
                className={classes.input}
                type="text" disabled={disable}
                value={address}
                onChange={onChangeAddress}
                name="address"
              />
            </div>
            <div>
              <InputLabel htmlFor="postalCode" sx={{pt: 1, pb: 0.5, pl: 1}}>Postal Code</InputLabel>
              <Input
                className={classes.input}
                type="text" disabled={disable}
                value={postalCode}
                onChange={onChangePostalCode}
                name="postalCode"
              />
            </div>
            <div>
              <InputLabel htmlFor="city" sx={{pt: 1, pb: 0.5, pl: 1}}>City</InputLabel>
              <Input
                className={classes.input}
                type="text" disabled={disable}
                value={city}
                onChange={onChangeCity}
                name="city"
              />
            </div>
            <div>
              <InputLabel htmlFor="phonenumber" sx={{pt: 1, pb: 0.5, pl: 1}}>Phone Number</InputLabel>
              <Input
                className={classes.input}
                type="text" disabled={disable}
                value={phoneNumber}
                onChange={onChangePhoneNumber}
                name="phonenumber"
              />
            </div>
            <Box sx={{mt: 2}}>
            <Button type="button" onClick={handleEditButton} sx={{p: 1, mb: 2}}>
              {disable ? <EditIcon sx={{ color: 'secondary.verylight',}}/> : <CancelIcon sx={{color: 'secondary.verylight',}}/>}
            </Button>
            <Button
              type="submit"
              variant="contained"
              className={classes.submit}
              disabled={(loading || disable)}
              sx={{
                backgroundColor: 'secondary.verylight',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'secondary.main',
                },
                p: 1,
                mb: 2
              }}
            >
                {loading && (
                  <CircularProgress color="primary.main" />
                )}
                <span className={classes.buttonText}>SAVE CHANGES</span>
            </Button>
            </Box>
          </div>
          {message && successful && (
            <Grid
              container
              direction="row"
              justifyContent="center"
              >
              <div className={formclasses.alert}>
                  <Alert severity="success" >{message}</Alert>
              </div>
            </Grid>
          )}
          {message && !successful && (
            <Grid
              container
              direction="row"
              justifyContent="center"
              >
              <div className={formclasses.alert}>
                  <Alert severity="error" >{message}</Alert>
              </div>
            </Grid>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </Box>
    </Box>
  );
};

export default Profile;