import React from 'react';
import { LoadScript } from '@react-google-maps/api';
import Map from '../components/Map';

const lib = ['places', 'geometry'];
const key = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
const sensor = false;
const RenderMap = ()  => {
  
  return (
    <LoadScript googleMapsApiKey={key} libraries={lib} sensor={sensor}>
      <Map />
    </LoadScript>
  );
}

export default RenderMap;