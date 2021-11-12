import React from "react";
import { Box } from '@mui/material/';
import useInfoStyles from "../styles/useInfoStyles";

const BoardUser = () => {
  const infoclasses = useInfoStyles();
  return (
    <Box className="container">
       <h1 className={infoclasses.greyTitle}>Welcome admin!</h1>
    </Box>
  );
};

export default BoardUser;