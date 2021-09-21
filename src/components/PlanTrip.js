import React, {useState } from 'react';
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

export default PlanTrip;