import React, { useEffect, useState, useContext } from 'react';
import { LoadScript } from '@react-google-maps/api';
import StoreMap from './StoreMap';
import { AuthContext } from "../App";
import { Button, Grid, Card, CardMedia, Typography, Avatar, TextField, InputAdornment, Alert, Box } from '@mui/material/';
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

  useEffect(() => {
    if (accessToken === null) return;
    const fetchPets = async () => {
      const petResults = await fetch(
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
      setLoading(true);
    };
    fetchPets();
  }, [accessToken]);
  if (results === null) return null;

  const fetchNewPets = async () => {
     /*const petResults = await fetch(
        `https://api.petfinder.com/v2/animals?location=${zipCode}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
    );
    
    const json = await petResults.json();
    console.log(json);
    
    setResults(json.animals);*/
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

  /*const displayResults = results.map((result, index) =>
   
    <Grid item xs={10} sm={4} key={index}>
      <Card key={createUUID(result.id)} style={{ height: '100%' }}>
        {result.photos.length > 0 ?
          <CardMedia
          component="img"
          src={result.photos[0].medium}
          alt={result.name}
            /> :
          <CardMedia>
            <div >
            <Avatar style={{ height: '10em', width: '10em', display: 'block', margin: '0 auto', textAlign: 'center'}}>
              <NoPhotographyIcon style={{ height: '7em', width: '7em', marginTop: '0.5em' }}></NoPhotographyIcon>
            </Avatar>
            </div>
          </CardMedia>    
          }
        
        <Typography gutterBottom variant="h5" component="div" sx={{ marginLeft: "0.5rem"}} key={createUUID(result.name)}>
          {result.name} 
        </Typography>
      </Card>
    </Grid>
);*/
  
  return (
    <div sx={{ marginTop: '8rem' }}>
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
      justifyContent="center"
      >
    {results && results.map((result, index) =>
    <Grid item xs={10} sm={4} key={index} sx={{marginBottom: "2rem"}}>
      <Card key={createUUID(result.id)} style={{ height: '100%', marginLeft: "1rem", marginRight: "1rem" }}>
        {result.photos.length > 0 ?
          <CardMedia
          component="img"
          src={result.photos[0].medium}
          alt={result.name}
            /> :
          <CardMedia>
            <div >
            <Avatar style={{ height: '10em', width: '10em', display: 'block', margin: '0 auto', textAlign: 'center'}}>
              <NoPhotographyIcon style={{ height: '7em', width: '7em', marginTop: '0.5em' }}></NoPhotographyIcon>
            </Avatar>
            </div>
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