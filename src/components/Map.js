/*global google*/
import React, { useEffect, useState } from "react";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";

const Map = () => {
    const [directions, setDirections] = useState(null);
    const [userLocation, setUserLocation] = useState({ lat: 52.229004552708055, lng: 21.003209269628638 });
    const [loading, setLoading] = useState(true);
    //50.663284796426524, 17.93085360027239
    //52.229004552708055, 21.003209269628638

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lng: longitude })
                setLoading(false);
        },
            () => {
                setLoading(false);
        }
        );
        const directionsService = new google.maps.DirectionsService();
        //const origin = { lat: 51.10430767042046, lng: 17.074593965353543 };
        const origin = { lat: userLocation.lat, lng: userLocation.lng };
        const destination = { lat: 51.10430767042046, lng: 17.074593965353543 };

        directionsService.route(
        {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                setDirections(result);
            } else {
            console.error(`error fetching directions ${result}`);
            }
        }
        );
    }, []);

    const center = {
        //lat: 40.756795,
        //lng: -73.954298,
        lat: 51.10430767042046,
        lng: 17.074593965353543,
        //51.10430767042046, 17.074593965353543
    };
    const GoogleMapExample = withGoogleMap(props => (
        <GoogleMap
            defaultCenter={center}
            defaultZoom={8}
        >
        <DirectionsRenderer
            directions={directions}
        />
        </GoogleMap>
    ));

  return (
    <div>
        <GoogleMapExample
          containerElement={<div style={{ height: `500px`, width: "500px" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
  );
};

export default Map;
