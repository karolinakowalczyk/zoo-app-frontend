/*global google*/
import React, { useEffect, useState } from "react";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";

const Map = () => {
    const [directions, setDirections] = useState();
    const [userLocation, setUserLocation] = useState({ lat: 52.229004552708055, lng: 21.003209269628638 });
    const [isGeocodingError, setIsGeocodingError] = useState(false);
    const [addressInput, setAddressInput] = useState('');
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
    }, [userLocation]);

   

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
    };

    const onAddressInput = (e) => {
    setAddressInput(e.target.value);
  };

  return (
      <div>
          
        <GoogleMapExample
          containerElement={<div style={{ height: `50vh`, width: "50vw" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        <div>
            <div>
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

            </div>
            <div>
                <button onClick={handleAddressSubmit}>
                    Search route
                </button>
            </div>
        </div>
    </div>
  );
};

export default Map;
