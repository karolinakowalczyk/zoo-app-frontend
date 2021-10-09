import React from 'react';
import { LoadScript } from '@react-google-maps/api';
import Map from './Map';

const lib = ['places', 'geometry'];
const key = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
const sensor = false;
const RenderMap = ()  => {
  
  return (
    <div>
      <h2>plan trip</h2>
      <LoadScript googleMapsApiKey={key} libraries={lib} sensor={sensor}>
        <Map />
      </LoadScript>
      </div>
    );
}

export default RenderMap;