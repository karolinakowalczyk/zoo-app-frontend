import React from 'react';
import { LoadScript } from '@react-google-maps/api';
import ShelterMap from './ShelterMap';

const lib = ['places', 'geometry'];
const key = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
const RenderMap = ()  => {
  
    return (
      <LoadScript googleMapsApiKey={key} libraries={lib}>
        <ShelterMap />
      </LoadScript>
    );
}

export default RenderMap;