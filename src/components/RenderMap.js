/*import React, {useRef} from 'react';
import { withScriptjs } from 'react-google-maps';
import ShelterMap from './ShelterMap';

const RenderMap = () => {

  const MapLoader = withScriptjs(ShelterMap);
  const renderMapRef = useRef();
  return (
    <div>
      <MapLoader
        ref={renderMapRef}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

export default RenderMap;*/

import React, { Component } from 'react';
import { render } from 'react-dom';
import { LoadScript } from '@react-google-maps/api';
import ShelterMap from './ShelterMap';

const lib = ['places', 'geometry'];
const key = 'AIzaSyBrr30UaRvX5w5wWWbw5cR-E7qnWSa9yxA'; // PUT GMAP API KEY HERE
const RenderMap = ()  => {
  
    return (
      <LoadScript googleMapsApiKey={key} libraries={lib}>
        <ShelterMap />
      </LoadScript>
    );
}

export default RenderMap;


/*import React, { Component } from 'react';
import ShelterMap from './ShelterMap';
    
const RenderMap = () => {
  
  return (
      <ShelterMap 
      id="myMap"
      options={{
        center: { lat: -33.8569, lng: 151.2152 },
        zoom: 8
      }}
    />
  );
}
  
export default RenderMap;*/


/*global google*/
/*import React from "react";
import { GoogleMap, useLoadScript } from "react-google-maps";
import Search from "./Search";

let service;
const libraries = ["places"];

const mapContainerStyle = {
  height: "100vh",
  width: "100vw"
};
const options = {
  disableDefaultUI: true,
  zoomControl: true
};
const center = {
  lat: 43.6532,
  lng: -79.3832
};

const RenderMap = () => {
  /*const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "YOUR_API_KEY",
    libraries
  });*/
  /*const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(12);
    let map = mapRef.current;

    let request = {
      location: { lat, lng },
      radius: "500",
      type: ["hospital"]
    };

    service = new google.maps.places.PlacesService(mapRef.current);
    service.nearbySearch(request, callback);
    function callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          let place = results[i];
          new google.maps.Marker({
            position: place.geometry.location,
            map
          });
        }
      }
    }
  }, []);

  return (
    <div>
      <Search panTo={panTo} />
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onLoad={onMapLoad}
      />
      <h2>rendermap</h2>
  </div>
  );
}

export default RenderMap;*/