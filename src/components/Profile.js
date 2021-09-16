import React, { useState, useRef } from "react";
import AuthService from "../services/auth.service";
import { Box, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import Alert from '@material-ui/lab/Alert';
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
  //const userData = AuthService.getCurrentUser();
  //const [currentUser, setcurrentUser] = useState(AuthService.getCurrentUser());

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
  const [isEdited, setIsEdited] = useState(false);

  const [saveName, setSaveName] = useState("");
  const [saveSurname, setSaveSurname] = useState("");
  const [saveAddress, setSaveAddress] = useState("");
  const [savePostalCode, setSavePostalCode] = useState("");
  const [saveCity, setSaveCity] = useState("");
  const [savePhoneNumber, setSavePhoneNumber] = useState("");

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

  const setEntryData = (currentName, currentSurname, currentAddress, currentPostalCode, currentCity, currentPhoneNumber) => {
    setSaveName(currentName);
    setSaveSurname(currentSurname);
    setSaveAddress(currentAddress);
    setSavePostalCode(currentPostalCode);
    setSaveCity(currentCity);
    setSavePhoneNumber(currentPhoneNumber);

  }

  const handleEditButton = (e) => {
    setDisable(!disable);
    if (disable === false) {
      if (isEdited === false) {
        setName(currentUser.name || '');
        setSurname(currentUser.surname || '');
        setAddress(currentUser.address || '');
        setPostalCode(currentUser.postalCode || '');
        setCity(currentUser.city || '');
        setPhoneNumber(currentUser.phonenumber || '');
      }
      else {
        setName(saveName);
        setSurname(saveSurname);
        setAddress(saveAddress);
        setPostalCode(savePostalCode);
        setCity(saveCity);
        setPhoneNumber(savePhoneNumber);
      }
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
      AuthService.editProfile(currentUser.email, name, surname, address, postalCode, city, phoneNumber).then(
        (response) => {
          setIsEdited(true);
          setLoading(false);
          setMessage(response.data.message);
          setSuccessful(true);
          setEntryData(name, surname, address, postalCode, city, phoneNumber);
          setDisable(true);
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
                placeholder={currentUser.name}
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
                placeholder={currentUser.surname}
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
                placeholder={currentUser.address}
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
                placeholder={currentUser.postalCode}
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
                placeholder={currentUser.city}
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
                placeholder={currentUser.phonenumber}
                value={phoneNumber}
                onChange={onChangePhoneNumber}
                //value={disable ? (currentUser.phoneNumber || '') : phoneNumber }
                //onChange={disable ? setEntryPhoneNumber : onChangePhoneNumber }
                name="phonenumber"
              />
            </div>
            <Button type="button" onClick={handleEditButton}>
              {disable ? <EditIcon /> : <CancelIcon />}
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