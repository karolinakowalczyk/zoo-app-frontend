import React, { useEffect, useState, useContext } from 'react';
import { LoadScript } from '@react-google-maps/api';
import StoreMap from '../components/StoreMap';
import { AuthContext } from "../App";
import { Button, Grid, Card, CardMedia, Typography, Avatar, TextField, InputAdornment, Box, LinearProgress } from '@mui/material/';
import createUUID from "../helpers/createUUID";
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import ErrorMessage from '../components/ErrorMessage';
const lib = ['places', 'geometry'];
const key = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
const sensor = false;

const AnimalHelper = () => {
  const [results, setResults] = useState(null);
  const [zipCode, setZipCode] = useState('');
  const accessToken = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [pageLoad, setPageLoad] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentZipCode, setCurrentZipCode] = useState('10001');

  useEffect(() => {
    setPageLoad(true);
    if (accessToken === null) return;
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
        .then(data => {
          setResults(data.animals)
          setTimeout(() => {
            setPageLoad(false);
        }, 1500)
        })
      .catch(err => { setErrorMessage(err) });
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
    setLoading(false);
  };
  const onZipCodeChange = (e) => {
    setZipCode(e.target.value);
  }

  const findPets = async () => {
    setCurrentZipCode(zipCode);
    if (zipCode === '') {
      setErrorMessage('You must type your address!');
      return;
    }
    setLoading(!loading);
    if (accessToken === null) return;
    await fetchNewPets();
    setErrorMessage('');
    
  }

  if (pageLoad) {
    return(
    <div style={{ marginTop: '10rem' }} >
      <p style={{ marginTop: '2rem', textAlign: 'center', color: '#777'}}>Loading</p>
      <LinearProgress color="success" />
    </div>)
  }
  else {
    return (
      <div sx={{ marginTop: '8rem' }} >
        <Box sx={{
          backgroundColor: 'primary.main',
          paddingLeft: '8rem',
          paddingBottom: '3rem',
          "@media (max-width: 48rem)": {
            paddingLeft: '2rem',
          },
        }}>
            <h3>See how</h3>
            <h1>YOU</h1>
            <h1>CAN HELP ANIMALS</h1>
        </Box>
        <Box sx={{
          backgroundColor: 'secondary.light',
          paddingLeft: '8rem',
          paddingBottom: '3rem',
          paddingTop: '3rem',
          "@media (max-width: 48rem)": {
            paddingLeft: '2rem',
            paddingRight: '2rem'
          },
        }}>
         <Typography gutterBottom variant="h3" component="div" color="primary.white">
          1. Check where the nearest pet store is. 
        </Typography>
        <Typography gutterBottom variant="h6" component="div" color="primary.white">
          You can buy there food, blankets or toys and take it to the nearest shelter!
        </Typography>
      </Box>
       <Box>
        <Box style={{marginLeft: "1rem", marginRight: "1rem", marginTop: "1.5rem", marginBottom: "3rem"}}>
          <LoadScript googleMapsApiKey={key} libraries={lib} sensor={sensor}>
            <StoreMap />
          </LoadScript>
          </Box>
      </Box>
        <Box sx={{
          backgroundColor: 'secondary.light',
          paddingLeft: '8rem',
          paddingBottom: '3rem',
          paddingTop: '3rem',
          "@media (max-width: 48rem)": {
            paddingLeft: '2rem',
            paddingRight: '2rem',
          },
        }}>
         <Typography gutterBottom variant="h3" component="div" color="primary.white">
          2. Look for an animal
        </Typography>
        <Typography gutterBottom variant="h6" component="div" color="primary.white">
          for adoption nearby!
        </Typography>
        </Box>
        <div style={{ textAlign: 'center', marginBottom: '3rem', marginTop: "3rem", }}>
        <TextField value={currentZipCode} label="Current zip code" disabled variant="outlined" sx={{ marginTop: "0.5rem", marginBottom: "0.5rem", marginLeft: "1rem"}}/>
        <TextField
          sx={{ marginTop: "0.5rem", marginBottom: "0.5rem", marginLeft: "1rem"}}
          id="zipCodeInput"
          label="Type your zip code"
          variant="outlined"
          onChange={onZipCodeChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      {loading ?
      <LoadingButton
        loading
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="outlined"
        sx={{
          height: '3.5rem',
          marginTop: '0.5rem',
          marginLeft: '1rem',
          backgroundColor: 'primary.main',
          color: 'primary.white',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          '&:hover':
            { backgroundColor: 'secondary.main', }
        }}
      >
        Find
      </LoadingButton> :  <Button onClick={findPets} sx={{height: '3.5rem', marginTop: '0.5rem', marginLeft: '1rem',  backgroundColor: 'primary.main', color: 'primary.white', paddingLeft: '1rem', paddingRight: '1rem', '&:hover': { backgroundColor: 'secondary.main',} }}>
        Find
      </Button>}  
        </div>
        {errorMessage && (
          <Grid
            container
            direction="row"
            justifyContent="center"
            >
          <ErrorMessage message={errorMessage}></ErrorMessage>
          </Grid>
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
          {result.contact.email}
        </Typography>
        <Typography variant="h8" component="div" sx={{ marginLeft: "0.5rem"}}> 
          {result.contact.phone}
        </Typography>
        <Typography variant="h8" component="div" sx={{ marginLeft: "0.5rem"}}> 
          {Math.round(result.distance * 1.60934 * 100) / 100 } km from you
        </Typography>
      </Card>
    </Grid>
          )}
        {!results && <p>No results.</p>}
        </Grid>
    </div>   
  );
  }
  
  
}

export default AnimalHelper;