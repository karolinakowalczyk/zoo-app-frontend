import React from 'react';
import { LoadScript } from '@react-google-maps/api';
import StoreMap from './StoreMap';

const lib = ['places', 'geometry'];
const key = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
const sensor = false;

const AnimalHelper = ()  => {
  
  return (
      <div>
      <h2>Check where the nearest pet store is: </h2>
      <LoadScript googleMapsApiKey={key} libraries={lib} sensor={sensor}>
        <StoreMap />
      </LoadScript>
      <h2>You can buy food, blankets or toys or </h2>
      <h2>do you have a blanket that you don't need? Take it to the nearest shelter!</h2>
      <h2>You can adopt animals in our ZOO. CHECK</h2>
      <h2>Would you like a pet? Find the closest ones in your area!</h2>
      </div>
    );
}

export default AnimalHelper;