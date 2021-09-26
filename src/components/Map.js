/*global google*/
import React, { useEffect, useState } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

import { makeStyles } from '@material-ui/core/styles';

import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import TrainIcon from '@material-ui/icons/Train';

import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import TramIcon from '@material-ui/icons/Tram';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import { Button } from '@material-ui/core';
import AuthService from "../services/auth.service";

import PlansService from "../services/plans.service";
import Reservation from './Reservation'
import Attractions from './Attractions'
import Alert from '@material-ui/lab/Alert';


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
    const [, setIsGeocodingError] = useState(false);
    const [addressInput, setAddressInput] = useState('');
    const [, setLoading] = useState(true);
    const [distance, setDistance] = useState(0);
    const [shortTransport, setShortTransport] = useState("");
    const [longTransport, setLongTransport] = useState("");
    const [disable, setDisable] = useState(true);
    const [firstLoad, setFirstLoad] = useState(true);
    const classes = useStyles();


    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);

    const currentUser = AuthService.getCurrentUser();

    const [reservation, setReservation] = useState({});
    const [transport, setTransport] = useState({});
    const [attractions, setAttractions] = useState({});

    const [center, setCenter] = useState({ lat: userLocation.lat, lng: userLocation.lng, });
    const [mapLoaded, setMapLoaded] = useState(false);

    const onMapLoad = () => {
        //zapytaj o udostępnianie lokalizacji??
        setMapLoaded(true);

    }
    useEffect(() => {
        if (mapLoaded) {
            console.log("map loaded");
            if (firstLoad) {
                    console.log("first load" + firstLoad)
                    navigator.geolocation.getCurrentPosition(
                    position => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude })
                    //setCenter({ lat: userLocation.lat, lng: userLocation.lng });
                            setLoading(false);
                            //setFirstLoad(false);
                }
                );
            }
                
            
            
            const directionsService = new google.maps.DirectionsService();
            const origin = { lat: userLocation.lat, lng: userLocation.lng };
            const destination = { lat: 51.10430767042046, lng: 17.074593965353543 };
            setCenter({ lat: ((userLocation.lat - 51.10430767042046)/2), lng: ((userLocation.lng - 51.10430767042046)/2) });
            directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    setDirections(result);
                let totalDist = 0;
                let route = result.routes[0];
                for (let i = 0; i < route.legs.length; i++) {
                    totalDist += route.legs[i].distance.value;
                }
                    setDistance(totalDist / 1000);
    
                } else {
                console.error(`error fetching directions ${result}`);
                }
            }
            );
        }
        /*if (mapLoaded && firstLoad) {
            console.log("first load!");
            navigator.geolocation.getCurrentPosition(
            position => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                    setLoading(false);
            },
                () => {
                    setLoading(false);
            }
            );
        }*/
        
        /*const directionsService = new google.maps.DirectionsService();
        const origin = { lat: userLocation.lat, lng: userLocation.lng };
        const destination = { lat: 51.10430767042046, lng: 17.074593965353543 };
        setCenter({ lat: ((userLocation.lat - 51.10430767042046)/2), lng: ((userLocation.lng - 51.10430767042046)/2) });
        directionsService.route(
        {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                setDirections(result);
            let totalDist = 0;
            let route = result.routes[0];
            for (let i = 0; i < route.legs.length; i++) {
                totalDist += route.legs[i].distance.value;
            }
                setDistance(totalDist / 1000);
   
            } else {
            console.error(`error fetching directions ${result}`);
            }
        }
        );*/
    }, [firstLoad, mapLoaded, userLocation.lat, userLocation.lng]);

    useEffect(() => {
        setTransport({
            shortTransport: shortTransport,
            longTransport: longTransport,
        })
    }, [shortTransport, longTransport]);
    
  const changeReservation = (value) => {
    setReservation(value);
    }
    
   const changeAttractions = (value) => {
    setAttractions(value);
    }
    
    const handleCreatePlan = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);
        setSuccessful(false);

    PlansService.createPlan(currentUser.id, reservation, transport, attractions).then(
      (response) => {
        setLoading(false);
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setMessage(resMessage);
        setSuccessful(false);
      }
    );

  };


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
        <Reservation changeReservation={changeReservation}></Reservation>
          <GoogleMap
            center={center}
            zoom={8}
            onLoad={onMapLoad}
            mapContainerStyle={{ height: "400px", width: "800px" }}
        >
        <DirectionsRenderer
            directions={directions}
        />
        </GoogleMap>
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
          <Attractions changeAttractions={changeAttractions}></Attractions>
          
        <Button onClick={handleCreatePlan}>
            Create Plan
          </Button>
          {message && successful && (
                <div className={classes.alert}>
                    <Alert severity="success" >{message}</Alert>
                </div>
            )}
            {message && !successful && (
                <div className={classes.alert}>
                    <Alert severity="error" >{message}</Alert>
                </div>
            )}
    </div>
  );
};

export default Map;