/*global google*/
import React, {useState, useEffect, useCallback} from "react";

import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

let coords = [];
const ShelterMap =() => {
  /*state = {
    center: { lat: -33.867, lng: 151.195 },
    coordsResult: []
  };*/
  const [center, setCenter] = useState({ lat: 52.229004552708055, lng: 21.00320926962863 });
  const [userLocation, setUserLocation] = useState({ lat: 52.229004552708055, lng: 21.003209269628638 });
  const [coordsResult, setCordsResult] = useState([]);
  const [addressInput, setAddressInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);

  const [mapVariable, setMapVariable] = useState();

  const onMapLoad = useCallback((map) => {
    //console.log("MAP" + map);
    setMapVariable(map);
    const place = new google.maps.LatLng(userLocation.lat, userLocation.lng);
    console.log("user loc in map load " + userLocation.lat);
    var request = {
      location: place,
      radius: '30000', //30km
      type: ['pet_store']
    };


    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          //console.log(i + " " + results[i].name);
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
      console.log("jest mapa" + mapVariable.center);
      //console.log("przed " + coordsResult[0].names);
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          //50.66782964076724, 17.922259267598527
          setUserLocation({ lat: latitude, lng: longitude })
          //setUserLocation({ lat: 50.66782964076724, lng: longitude })
          //console.log(latitude, longitude)
          setCenter({ lat: userLocation.lat, lng: userLocation.lng });
          //setCenter({ lat: 50.66782964076724, lng: 17.922259267598527 });
          setLoading(false);
        },
        () => {
          setLoading(false);
        }
      );
      onMapLoad(mapVariable);
      //console.log("po " + coordsResult[0].name)
      
      
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
