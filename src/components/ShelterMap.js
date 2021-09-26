/*global google*/
import React, {useState, useEffect, useCallback} from "react";

import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';


let coords = [];

const useStyles = makeStyles((theme) => ({
    
  alert: {
      marginTop: theme.spacing(1),
  },

}));

const ShelterMap = () => {
  //add info window, adddres input, delete markers? and link to sites
  const [center, setCenter] = useState({ lat: 52.229004552708055, lng: 21.00320926962863 });
  const [userLocation, setUserLocation] = useState({ lat: 52.229004552708055, lng: 21.003209269628638 });
  const [isGeocodingError, setIsGeocodingError] = useState(false);
  const [coordsResult, setCordsResult] = useState([]);
  const [addressInput, setAddressInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  const [mapVariable, setMapVariable] = useState();

  const classes = useStyles();

  const onMapLoad = useCallback((map) => {
    setMapVariable(map);
    const place = new google.maps.LatLng(userLocation.lat, userLocation.lng);
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
      onMapLoad(mapVariable);
    }
    
  }, [userLocation, mapLoaded, mapVariable, onMapLoad, coordsResult]);

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
      <h2>Check where the nearest pet store is: </h2>
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
              Search route
          </button>
      </div>
        {isGeocodingError && (
          <div className={classes.alert}>
              <Alert severity="error" >There were problems retrieving the address</Alert>
          </div>
      )}
      <h2>You can buy food, blankets or toys or </h2>
      <h2>do you have a blanket that you don't need? Take it to the nearest shelter!</h2>
      <h2>You can adopt animals in our ZOO. CHECK</h2>
      <h2>Would you like a pet? Find the closest ones in your area!</h2>
    </div>
  );
}

export default ShelterMap;