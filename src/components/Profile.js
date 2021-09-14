import React, { useState, useRef } from "react";
import AuthService from "../services/auth.service";
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';

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
  }
}));

const Profile = () => {
  const classes = useStyles();
  const currentUser = AuthService.getCurrentUser();

  const [disable, setDisable] = useState(true);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const form = useRef();

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
  const onChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleEditButton = (e) => {
    setDisable(!disable);
  }

  const handleEdit = (e) => {
    e.preventDefault();

    form.current.validateAll();
    
    }
  return (
    <Box className={classes.mainBox}>
      <Box className={classes.childBox}>
        <h1 className={classes.title}> {currentUser.username} Profile </h1>
        <Form className={classes.form} onSubmit={handleEdit} ref={form}>
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
            <label htmlFor="phonenumber">Phone Number</label>
            <Input
              className={classes.input}
              type="text" disabled={disable}
              placeholder={currentUser.phonenumber}
              value={phoneNumber}
              onChange={onChangePhoneNumber}
              name="phonenumber"
            />
          </div>
          <Button type="button" onClick={handleEditButton}>
            {disable ? <EditIcon /> : <CancelIcon />}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary">
          SAVE CHANGES
        </Button>
        </Form>
      </Box>
    </Box>
  );
};

export default Profile;