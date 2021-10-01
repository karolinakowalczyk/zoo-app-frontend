import React from 'react';
import { LoadScript } from '@react-google-maps/api';
import StoreMap from './StoreMap';
import { Card, Grid, CardMedia, Typography, Link, Button } from '@mui/material/';

const lib = ['places', 'geometry'];
const key = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
const sensor = false;

const AnimalHelper = ()  => {
  
  return (
    <Grid
    container
    spacing={4}
    justifyContent="center"
    //justify="center"
    //alignItems="center"
    //justifyItems="center"
    >
      <Grid item xs={12} sm={6}>
        <Card sx={{ marginLeft: "1rem", marginTop: "1rem" }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ marginLeft: "0.5rem"}}>
            Check where the nearest pet store is: 
          </Typography>
          <CardMedia style={{ display:'flex', justifyContent:'center' }}>
          <LoadScript googleMapsApiKey={key} libraries={lib} sensor={sensor}>
            <StoreMap />
          </LoadScript>
          </CardMedia>
          <Typography gutterBottom variant="h5" component="div" sx={{ marginLeft: "0.5rem"}}>
            You can buy there food, blankets or toys and take it to the nearest shelter.
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card sx={{ marginRight: "1rem", marginTop: "1rem" }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ marginLeft: "0.5rem"}}>
            Do you have a blanket that you don't need? 
          </Typography>
          <Typography component="p" sx={{ marginLeft: "0.5rem" }}>
            <Button sx={{backgroundColor: 'primary.main', color: 'secondary.light', '&:hover': { backgroundColor: 'secondary.main',} ,marginBottom: "0.5rem"}}>
              <Link sx={{color: 'secondary.light', '&:hover': { textDecoration: 'none',}}}href="https://otoz.pl/wykaz-schronisk-w-polsce/">Take it to the nearest shelter!</Link>
            </Button>
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card sx={{ marginLeft: "1rem", marginBottom: "1rem" }}>
          <h2>You can adopt animals in our ZOO. CHECK</h2>
        </Card>
      </Grid>     
      <Grid item xs={12} sm={6}>
        <Card sx={{ marginRight: "1rem", marginBottom: "1rem" }}>
          <h2>Would you like a pet? Find the closest ones in your area!</h2>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AnimalHelper;