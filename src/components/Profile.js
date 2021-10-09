import React, { useState, useRef } from "react";
import AuthService from "../services/auth.service";
import { Box, Button, CircularProgress, Alert } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckButton from "react-validation/build/button";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    backgroundColor: theme.palette.primary.main,
    paddingTop: theme.spacing(3),
    display:"flex",
    justifyContent:"center"
  },
  childBox: {
    width: '50%',
    "@media (max-width: 48rem)": {
      width: '100%',
    },
  },
  input: {
    width: '50%',
    height: '2rem',
  },
  title: {
    marginBottom: '2rem',
  },
  alert: {
    marginTop: theme.spacing(1),
  },
}));

const Profile = () => {
  const classes = useStyles();
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
              <label htmlFor="email">Email</label>
              <Input
                className={classes.input}
                type="text" disabled={true}
                placeholder={currentUser.email}
                name="email"
              />
            </div>
            <div>
              <label htmlFor="name">Name</label>
              <Input
                className={classes.input}
                type="text" disabled={disable}
                value={name}
                onChange={onChangeName}
                name="name"
              />
            </div>
            <div>
              <label htmlFor="surname">Surname</label>
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
              <label htmlFor="address">Address</label>
              <Input
                className={classes.input}
                type="text" disabled={disable}
                value={address}
                onChange={onChangeAddress}
                name="address"
              />
            </div>
            <div>
              <label htmlFor="postalCode">Postal Code</label>
              <Input
                className={classes.input}
                type="text" disabled={disable}
                value={postalCode}
                onChange={onChangePostalCode}
                name="postalCode"
              />
            </div>
            <div>
              <label htmlFor="city">City</label>
              <Input
                className={classes.input}
                type="text" disabled={disable}
                value={city}
                onChange={onChangeCity}
                name="city"
              />
            </div>
            <div>
              <label htmlFor="phonenumber">Phone Number</label>
              <Input
                className={classes.input}
                type="text" disabled={disable}
                value={phoneNumber}
                onChange={onChangePhoneNumber}
                name="phonenumber"
              />
            </div>
            <Button type="button" onClick={handleEditButton}>
              {disable ? <EditIcon sx={{ color: '#FFF',}}/> : <CancelIcon sx={{color: '#FFF',}}/>}
            </Button>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={(loading || disable)}
              >
                {loading && (
                  <CircularProgress color="primary" />
                )}
                <span className={classes.buttonText}>SAVE CHANGES</span>
            </Button>
          </div>
          {message && successful && (
            <div className={classes.alert}>
              <Alert severity="success" >{message}</Alert>
            </div>
          )}
          {message && !successful && (
            <div className={classes.alert}>
              <Alert severity="error" >{message}</Alert>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </Box>
    </Box>
  );
};

export default Profile;