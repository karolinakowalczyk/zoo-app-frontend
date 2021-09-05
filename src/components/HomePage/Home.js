import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";

import "./Home.css";

import { Button } from '@material-ui/core';

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    background: '#FFF',
    '&:hover': {
      background: "#777777",
    },
    fontFamily: '"Montserrat", Arial, sans-serif',
    fontSize: '1.5rem',
    marginTop: '3rem',
  },
});


const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);
   const classes = useStyles();
  return (
    <div className="container">
      <div className="text-background">
          <h3>Welcome to the</h3>
          <h1>ZOO</h1>
          <h1>WITH THE MOST</h1>
          <h1>AMAZING ANIMALS</h1>
          <Button className={classes.button} color="primary">GET STARTED</Button>
      </div>
      {/*<div className="animal-background">
        <img src={penguinBackground} alt="penguin_background" />
      </div>*/}
      
      {/*<h3>{content}</h3>*/}
    </div>
  );
};

export default Home;