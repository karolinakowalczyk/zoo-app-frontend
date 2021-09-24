/*import React from 'react';
import { withScriptjs } from 'react-google-maps';
import Map from './Map';

const PlanTrip = () => {

  const MapLoader = withScriptjs(Map);
  return (
    <div>
      <h2>plan trip</h2>
      <MapLoader
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`}
        loadingElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

export default PlanTrip;*/


import React, { Component } from 'react';
import { render } from 'react-dom';
import { LoadScript } from '@react-google-maps/api';
import Map from './Map';

const lib = ['places', 'geometry'];
const key = 'AIzaSyBrr30UaRvX5w5wWWbw5cR-E7qnWSa9yxA'; // PUT GMAP API KEY HERE
const RenderMap = ()  => {
  
  return (
    <div>
      <h2>plan trip</h2>
      <LoadScript googleMapsApiKey={key} libraries={lib}>
        <Map />
      </LoadScript>
      </div>
    );
}

export default RenderMap;
