/*global google*/
import React, {useState, useEffect, useCallback} from "react";

import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

let coords = [];
const ShelterMap = () => {
  //add info window, adddres input, delete markers? and link to sites
  const [center, setCenter] = useState({ lat: 52.229004552708055, lng: 21.00320926962863 });
  const [userLocation, setUserLocation] = useState({ lat: 52.229004552708055, lng: 21.003209269628638 });
  const [coordsResult, setCordsResult] = useState([]);
  const [addressInput, setAddressInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);

  const [mapVariable, setMapVariable] = useState();

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
    </div>
  );
}

export default ShelterMap;