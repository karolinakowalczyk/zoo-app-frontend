import React, { useEffect, useState, useContext } from 'react';
import { LoadScript } from '@react-google-maps/api';
import StoreMap from './StoreMap';
import shelterDog from '../assets/images/shlelterDog.jpg';
import { AuthContext } from "../App";
import { Button } from '@mui/material/';

const lib = ['places', 'geometry'];
const key = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
const sensor = false;

const AnimalHelper = () => {
  const [results, setResults] = useState(null);
  const [zipCode, setZipCode] = useState('90001');
  const accessToken = useContext(AuthContext);
  useEffect(() => {
    if (accessToken === null) return;
    const fetchPets = async () => {
      const petResults = await fetch(
        "https://api.petfinder.com/v2/animals?location=24558",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const json = await petResults.json();
      setResults(json.animals);
    };
    fetchPets();
  }, [accessToken]);
  if (results === null) return null;

  const fetchPets = async () => {
      const petResults = await fetch(
        `https://api.petfinder.com/v2/animals?location=${zipCode}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const json = await petResults.json();
      setResults(json.animals);
    };

  const findPets = () => {
    if (accessToken === null) return;
    fetchPets();
  }

  const displayResults = results.map((result, index) =>
    <div key={index}>
        <li key={result.type}>{result.name}</li>
    </div>
);
  
  return (
    <div style={{ marginTop: '20rem' }}>
      {results ? displayResults : <p>no results</p>}
      <Button onClick={findPets}>Find</Button>
        <LoadScript googleMapsApiKey={key} libraries={lib} sensor={sensor}>
            <StoreMap />
          </LoadScript>
      </div>   
  );
}

export default AnimalHelper;