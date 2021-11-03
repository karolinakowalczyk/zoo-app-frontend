import React, { useEffect, useState, useContext } from 'react';
import { LoadScript } from '@react-google-maps/api';
import StoreMap from './StoreMap';
import { AuthContext } from "../App";
import { Button, Grid, Card, CardMedia, Typography, Avatar, TextField, InputAdornment, Alert, Box, LinearProgress } from '@mui/material/';
import createUUID from "../helpers/createUUID";
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import SearchIcon from '@mui/icons-material/Search';

const lib = ['places', 'geometry'];
const key = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
const sensor = false;

const AnimalHelper = () => {
  const [results, setResults] = useState(null);
  const [zipCode, setZipCode] = useState('');
  const accessToken = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageLoad, setPageLoad] = useState(true);

  useEffect(() => {
    if (accessToken === null) return;
    const displayPageLoader = async () => {
      await new Promise((resolve) => setTimeout(() => resolve(), 3000));
      return setPageLoad(false);
    };
    displayPageLoader();
    const fetchPets = async () => {
      await fetch(
        "https://api.petfinder.com/v2/animals?location=10001",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(res => res.json())
        .then(data => { setResults(data.animals) })
      .catch(err => { setErrorMessage(err) });
      //const json = await petResults.json();
      //setResults(json.animals);
      //setLoading(true);
    };
    
    fetchPets();
  }, [accessToken]);
  if (results === null) return null;

  const fetchNewPets = async () => {
    await fetch(
      `https://api.petfinder.com/v2/animals?location=${zipCode}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then(res => res.json())
      .then(data => setResults(data.animals))
      .catch(err => { setErrorMessage(err) });
    
  };
  const onZipCodeChange = (e) => {
    setZipCode(e.target.value);
  }

  const findPets = () => {
    if (zipCode === '') {
      console.log('you must type your addres');
      return;
    }
    if (accessToken === null) return;
    fetchNewPets();
  }

  if(pageLoad) { // if your component doesn't have to wait for an async action, remove this block 
    return <LinearProgress color="success" />; // render null when app is not ready
    //return null;
  }
  
  return (
    <div sx={{ marginTop: '8rem' }} >
      <Box sx={{ backgroundColor: 'primary.main', paddingLeft: '8rem', paddingBottom: '3rem',}}>
            <h3>See how</h3>
            <h1>YOU</h1>
            <h1>CAN HELP ANIMALS</h1>
      </Box>
      <Box sx={{ backgroundColor: 'secondary.light', paddingLeft: '8rem', paddingBottom: '3rem', paddingTop: '3rem' }}>
         <Typography gutterBottom variant="h3" component="div" color="primary.white">
          1. Check where the nearest pet store is. 
        </Typography>
        <Typography gutterBottom variant="h6" component="div" color="primary.white">
          You can buy there food, blankets or toys and take it to the nearest shelter!
        </Typography>
      </Box>
      
       <Box>
        <Box style={{marginLeft: "1rem", marginRight: "1rem", marginTop: "3rem"}}>
        <LoadScript googleMapsApiKey={key} libraries={lib} sensor={sensor}>
          <StoreMap />
        </LoadScript>
          </Box>
      </Box>
      <Box sx={{ backgroundColor: 'secondary.light', paddingLeft: '8rem', paddingBottom: '3rem', paddingTop: '3rem' }}>
         <Typography gutterBottom variant="h3" component="div" color="primary.white">
          2. Look for an animal
        </Typography>
        <Typography gutterBottom variant="h6" component="div" color="primary.white">
          for adoption nearby!
        </Typography>
      </Box>
      <TextField
          sx={{ marginTop: "0.5rem", marginBottom: "0.5rem", marginLeft: "1rem"}}
          id="zipCodeInput"
          label="Type your zip code"
          onChange={onZipCodeChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
      />
      <Button onClick={findPets}>Find</Button>
      {errorMessage && (
            <div>
              <Alert severity="error">{errorMessage}</Alert>
            </div>
          )}
      <Grid
      container
        spacing={4}
        columns={12}
      justifyContent="center"
      >
    {results && results.map((result, index) =>
    <Grid item xs={10} sm={4} md={3} key={index} sx={{marginBottom: "2rem"}}>
      <Card key={createUUID(result.id)} style={{ height: '100%', marginLeft: "1rem", marginRight: "1rem" }}>
        {result.photos.length > 0 ?
          <CardMedia
              component="img"
              style={{ height: '250px', width: '100%', objectFit: 'cover'}}
              src={result.photos[0].medium}
              alt={result.name}
            /> :
            <CardMedia
              >     
            <Avatar style={{ height: '50%', width: '50%', objectFit: 'cover', display: 'block', margin: '0 auto', textAlign: 'center', padding: '1em'}}>
              <NoPhotographyIcon style={{ height: '100%', width: '100%', objectFit: 'cover', marginTop: '0.5em' }}></NoPhotographyIcon>
            </Avatar>
          </CardMedia>    
          }
        
        <Typography gutterBottom variant="h5" component="div" sx={{ marginLeft: "0.5rem"}} key={createUUID(result.name)}>
          {result.name} 
        </Typography>
        <Typography variant="h8" component="div" sx={{ marginLeft: "0.5rem"}}> 
          {result.type}
        </Typography>
        <Typography variant="h8" component="div" sx={{ marginLeft: "0.5rem"}}> 
          {result.gender}
        </Typography>
        <Typography variant="h8" component="div" sx={{ marginLeft: "0.5rem"}}> 
          {Math.round(result.distance * 1.60934 * 100) / 100 } km from you
        </Typography>
      </Card>
    </Grid>
        )}
        {!results && <p>no results</p>}
      </Grid>  
    </div>   
  );
}

export default AnimalHelper;