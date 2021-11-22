/*global google*/
import React, {useState, useEffect, useCallback} from "react";

import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { TextField, InputAdornment, Button, Grid  } from '@mui/material/';
import SearchIcon from '@mui/icons-material/Search';
import ErrorMessage from './ErrorMessage';

let coords = [];

const StoreMap = () => {

  const [center, setCenter] = useState({ lat: parseFloat(52.229004552708055), lng: parseFloat(21.00320926962863) });
  const [userLocation, setUserLocation] = useState({ lat: parseFloat(52.229004552708055), lng: parseFloat(21.003209269628638) });
  const [coordsResult, setCordsResult] = useState([]);
  const [addressInput, setAddressInput] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [error, setError] = useState('');

  const [mapVariable, setMapVariable] = useState();
  const [markerId, setMarkerId] = useState('');

  const onMapLoad = useCallback((map) => {
    setMapVariable(map);
    const place = new google.maps.LatLng(parseFloat(userLocation.lat), parseFloat(userLocation.lng));
    var request = {
      location: place,
      radius: '30000', //30km
      type: ['pet_store']
    };


    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          coords.push(results[i]);
        }
        setCordsResult(coords);
        setCenter(results[0].geometry.location);
      }
    });
    setMapLoaded(true);
  }, [userLocation.lat, userLocation.lng]);


  useEffect(() => {
    if (mapLoaded) {
      if (firstLoad) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: parseFloat(latitude), lng: parseFloat(longitude) })
            setCenter({ lat: parseFloat(userLocation.lat), lng: parseFloat(userLocation.lng) });
          }
        );
      }
      onMapLoad(mapVariable);
    }
    
  }, [userLocation, mapLoaded, mapVariable, onMapLoad, coordsResult, firstLoad]);

  const geocodeAddress = (address) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, function handleResults(results, status) {

            if (status === google.maps.GeocoderStatus.OK) {
                setError('')
                setUserLocation({ lat: parseFloat(results[0].geometry.location.lat()), lng: parseFloat(results[0].geometry.location.lng()) })
                return;
            }
          setError('There were problems retrieving the address')

        });
    };

    const handleAddressSubmit = (e) => {
      if (!addressInput) {
        setError('Type your address!');
        return;
       }
        e.preventDefault();
        geocodeAddress(addressInput);
        setFirstLoad(false);
    };

    const onAddressInput = (e) => {
    setAddressInput(e.target.value);
  };
  
  const handleToggleOpen = (markerId) => {
    setMarkerId(markerId);
  };

  const handleToggleClose = () => {
    setMarkerId("");
  };

  return (
    <div>
      <div style={{textAlign: 'center', marginBottom: '3rem', marginTop: '3rem'}}>
      <TextField
        sx={{ marginTop: "0.5rem", marginBottom: "0.5rem"}}
        id="addressInput"
        value={addressInput}
        label="Type your address"
        variant="outlined"
        onChange={onAddressInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        />    
      <Button onClick={handleAddressSubmit} sx={{height: '3.5rem', marginTop: '0.5rem', marginLeft: '1rem',  backgroundColor: 'primary.main', color: 'primary.white', paddingLeft: '1rem', paddingRight: '1rem', '&:hover': { backgroundColor: 'secondary.main',} }}>
        Search store
        </Button>
        {error && (
          <ErrorMessage message={error}></ErrorMessage>
        )}
      </div>
       <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        sx={{mb: '2rem'}}>
      <GoogleMap
        center={center}
        zoom={13}
        onLoad={map => onMapLoad(map)}
        mapContainerStyle={{ height: "30rem", width: "100%" }}
      >
        {coordsResult !== [] &&
          coordsResult.map(function (results, i) {
            return (
              <Marker
                key={i}
                position={results.geometry.location}
                onClick={() => handleToggleOpen(i)}
              >
                {(markerId === i) &&
                  <InfoWindow position={results.geometry.location} onCloseClick={() => handleToggleClose()}>
                  <div>
                    <h4>{results.name}</h4>
                    <p>{results.vicinity}</p>
                    <p>Ocena: {results.rating}</p>
                  </div>
                  </InfoWindow>}
              </Marker>
            );
          })}
      </GoogleMap>
      </Grid>
    </div>
  );
}

export default StoreMap;