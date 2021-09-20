/*global google*/
import React, { useEffect, useState } from "react";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";

import { makeStyles } from '@material-ui/core/styles';

import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import TrainIcon from '@material-ui/icons/Train';

import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import TramIcon from '@material-ui/icons/Tram';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    transportButton: {
      background: '#FFF',
        '&:focus': {
        background: "#777777",
    },
   
  },
}));

const Map = (props) => {
    const [directions, setDirections] = useState();
    const [userLocation, setUserLocation] = useState({ lat: 52.229004552708055, lng: 21.003209269628638 });
    const [isGeocodingError, setIsGeocodingError] = useState(false);
    const [addressInput, setAddressInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [distance, setDistance] = useState(0);
    //const [time, setTime] = useState(0);
    const [shortTransport, setShortTransport] = useState("");
    const [longTransport, setLongTransport] = useState("");
    const [disable, setDisable] = useState(true);
    //50.663284796426524, 17.93085360027239
    //52.229004552708055, 21.003209269628638
    const classes = useStyles();

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
                //let route = result.routes[0];
            //var summaryPanel = document.getElementById("directions_panel");
            //summaryPanel.innerHTML = "";
            // For each route, display summary information.
            
            let totalDist = 0;
            //let totalTime = 0;
            let route = result.routes[0];
            for (let i = 0; i < route.legs.length; i++) {
                totalDist += route.legs[i].distance.value;
                //totalTime += myroute.legs[i].duration.value;
            }
                //totalDist = totalDist / 1000.
                //totalTime = (totalTime / 60).toFixed(2)
                setDistance(totalDist / 1000);
                //setTime((totalTime / 60).toFixed(2));
   
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

    const carButtonClicked = () => {
        setDisable(true);
        setLongTransport("car");
        setShortTransport("");
    };
    const trainButtonClicked = () => {
        setDisable(false);
        setLongTransport("train");
        setShortTransport("");
    };
    const shortTramButtonClicked = () => {
        setShortTransport("tram");
    }
    const shortBusButtonClicked = () => {
        setShortTransport("bus");
    }

    const bikeButtonClicked = () => {
        setShortTransport("bike");
        setLongTransport("")
    }
    const tramButtonClicked = () => {
        setShortTransport("tram");
        setLongTransport("");
    }

    const busButtonClicked = () => {
        setShortTransport("bus");
        setLongTransport("")
    }

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
            <div>
                <h2>Parameters of your route</h2>
                <p>Total distance: {distance} km</p>
                {/*<p>Total time: {convertMinsToTime(time)} </p>*/}
            </div>
            <div>
                <p>long transport: {longTransport}</p>
                <p>short transport: {shortTransport}</p>
            {distance <= 20 ?
                <div>
                    <Button
                        className={classes.transportButton}
                        onClick={bikeButtonClicked}
                    >
                        <DirectionsBikeIcon />  
                    </Button>
                    <Button
                        className={classes.transportButton}
                        onClick={tramButtonClicked}
                    >
                        <TramIcon/>
                    </Button>
                    <Button
                        className={classes.transportButton}
                        onClick={busButtonClicked}
                    >
                        <DirectionsBusIcon/>
                    </Button>
                </div>
                :
                <div>
                    <Button
                        className={classes.transportButton}
                        onClick={carButtonClicked}
                    >
                        <DirectionsCarIcon />  
                    </Button>
                    <Button
                        className={classes.transportButton}
                        onClick={trainButtonClicked}
                    >
                        <TrainIcon/>
                    </Button>
                    <h2>And from Main Station: </h2>
                    <Button
                        disabled={disable}
                        className={classes.transportButton}
                        onClick={shortTramButtonClicked}
                    >
                        <TramIcon />
                        <span>Number 2, 16</span>
                    </Button>
                    <Button
                        disabled={disable}
                        className={classes.transportButton}
                        onClick={shortBusButtonClicked}
                    >
                        <DirectionsBusIcon />
                        <span>Number 145, 146</span>
                    </Button>
                </div>
            }            
            </div>
        </div>
    </div>
  );
};

export default Map;
