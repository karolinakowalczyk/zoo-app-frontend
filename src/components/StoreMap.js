/*global google*/
import React, {useState, useEffect, useCallback} from "react";

import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { Alert } from '@mui/material/';
import { makeStyles } from '@mui/styles';

let coords = [];

const useStyles = makeStyles((theme) => ({
    
  alert: {
      marginTop: 1,
  },

}));

const StoreMap = () => {
  //add info window, adddres input, delete markers? and link to sites
  const [center, setCenter] = useState({ lat: 52.229004552708055, lng: 21.00320926962863 });
  const [userLocation, setUserLocation] = useState({ lat: 52.229004552708055, lng: 21.003209269628638 });
  const [isGeocodingError, setIsGeocodingError] = useState(false);
  const [coordsResult, setCordsResult] = useState([]);
  const [addressInput, setAddressInput] = useState('');
  const [, setLoading] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  const [mapVariable, setMapVariable] = useState();

  const classes = useStyles();

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
      console.log("map loaded")
      if (firstLoad) {
        console.log("firstLoad")
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude })
            setCenter({ lat: userLocation.lat, lng: userLocation.lng });
            setLoading(false);
          },
          () => {
            setLoading(false);
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
                setIsGeocodingError(false);
                setUserLocation({ lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() })
                return;
            }

            setIsGeocodingError(true);

        });
    };

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        geocodeAddress(addressInput);
        setFirstLoad(false);
    };

    const onAddressInput = (e) => {
    setAddressInput(e.target.value);
    };

  return (
    <div>
      <GoogleMap
        center={center}
        zoom={13}
        onLoad={map => onMapLoad(map)}
        mapContainerStyle={{ height: "400px", width: "800px" }}
      >
        {coordsResult !== [] &&
          coordsResult.map(function (results, i) {
            return (
              <Marker key={i} position={results.geometry.location}>
              </Marker>
            );
          })}
      </GoogleMap>
      <div>
        <label htmlFor="addressInput">Address</label>
            <input
                type="text"
                id="addressInput"
                value={addressInput}
                placeholder="Type your address"
                onChange={onAddressInput}
                required />
      </div>
      <div>
          <button onClick={handleAddressSubmit}>
              Search store
          </button>
      </div>
        {isGeocodingError && (
          <div className={classes.alert}>
              <Alert severity="error" >There were problems retrieving the address</Alert>
          </div>
      )}
    </div>
  );
}

export default StoreMap;