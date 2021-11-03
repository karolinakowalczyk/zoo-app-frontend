import React from "react";


import "./Home.css";

import { Button, Box } from '@mui/material/';


const Home = () => {
 
  return (
    <Box>
      <Box className="container">
        <Box className="text-background">
            <h3>Welcome to the</h3>
            <h1>ZOO</h1>
            <h1>WITH THE MOST</h1>
            <h1>AMAZING ANIMALS</h1>
            <Button
              sx={{
                background: '#FFF',
                '&:hover': {
                 background: "#777777",
                },
                fontFamily: '"Montserrat", Arial, sans-serif',
                fontSize: '1.5rem',
                
                "@media (min-width: 100rem)": {
                  marginTop: '4rem',
                },
                "@media (min-width: 56rem) and (max-width: 100rem)": {
                  marginTop: '2rem',
                },
                "@media (min-width: 48rem) and (max-width: 56rem)": {
                  marginTop: '1rem',
                },
                "@media (min-width: 16rem) and (max-width: 48rem)": {
                  marginTop: '3rem',
                },
                "@media (max-width: 16rem)": {
                  marginTop: '1rem',
                  fontSize: '0.5rem',
                },
              }}
            >
              GET STARTED
            </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;