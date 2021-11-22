/*global google*/
import React, { useEffect, useState, useCallback } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

import { makeStyles } from '@mui/styles';
import useFormStyles from "../styles/useFormStyles";

import useInfoStyles from "../styles/useInfoStyles";

import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TrainIcon from '@mui/icons-material/Train';

import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import TramIcon from '@mui/icons-material/Tram';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { Button, Alert, Grid, TextField, InputAdornment, Box } from '@mui/material/';
import SearchIcon from '@mui/icons-material/Search';
import AuthService from "../services/auth.service";

import PlansService from "../services/plans.service";
import Reservation from '../pages/Reservation'
import Attractions from '../pages/Attractions'

import SuccessMessageGrid from "./SuccessMessageGrid";
import ErrorMessageGrid from "./ErrorMessageGrid";


const useStyles = makeStyles((theme) => ({
    transportButton: {
      background: theme.palette.primary.white,
        '&:focus': {
        background: theme.palette.secondary.main,
        },
        width: '50%'
    },
    alert: {
        marginTop: 1,
    },
}));

const Map = (props) => {
    const [directions, setDirections] = useState();
    const [userLocation, setUserLocation] = useState({ lat: 52.229004552708055, lng: 21.003209269628638 });
    const [isGeocodingError, setIsGeocodingError] = useState(false);
    const [addressInput, setAddressInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [distance, setDistance] = useState(0);
    const [shortTransport, setShortTransport] = useState("");
    const [longTransport, setLongTransport] = useState("");
    const [disable, setDisable] = useState(true);
    const [firstLoad, setFirstLoad] = useState(true);

    const classes = useStyles();
    const infoclasses = useInfoStyles();
    const formclasses = useFormStyles();

    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);

    const currentUser = AuthService.getCurrentUser();

    const [reservation, setReservation] = useState({});
    const [transport, setTransport] = useState({});
    const [attractions, setAttractions] = useState({});

    const [center, ] = useState({ lat: userLocation.lat, lng: userLocation.lng, });
    const [mapLoaded, setMapLoaded] = useState(false);
    const [mapVariable, setMapVariable] = useState();

    const onMapLoad = useCallback(async (map) => {
        const origin = { lat: userLocation.lat, lng: userLocation.lng };
        const destination = { lat: 51.10430767042046, lng: 17.074593965353543 };
        //let wait = false;
        const data = await new Promise (resolve => new google.maps.DirectionsService().route(
            {
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    resolve(result);
                }
                else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
        
                }

                else {

                    setMessage(`error fetching directions ${result}`);
                }
            }
        ));
        setDirections(data);
        let totalDist = 0;
        let route = data.routes[0];
        for (let i = 0; i < route.legs.length; i++) {
            totalDist += route.legs[i].distance.value;
        }
        setDistance(totalDist / 1000);
        setMapVariable(map);
        setMapLoaded(true);
        //setMapVariable(map);
        //setMapLoaded(true);
   }, [userLocation.lat, userLocation.lng]);
    
    
    useEffect(() => {
        let isMounted = true;
        
        if (firstLoad) {
                new Promise((resolve) => {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        return resolve(position.coords);
                    }
                    );
                    
                }).then((data) => {
                    if (isMounted) {
                        const { latitude, longitude } = data;
                        setUserLocation({ lat: latitude, lng: longitude });
                        onMapLoad(mapVariable);
                        setFirstLoad(false);
                        setLoading(false);
                    }
                    
                });
        }
       
        onMapLoad(mapVariable);
        
        /*if (mapLoaded) {
            if (firstLoad) {
                new Promise(function (resolve, reject) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        return resolve(position.coords);
                    }
                    );
                    
                }).then((data) => {
                    if (isMounted) {
                        const { latitude, longitude } = data;
                        setUserLocation({ lat: latitude, lng: longitude });
                        onMapLoad(mapVariable);
                        setLoading(false);
                    }
                    
                });
            }
        }*/
        return () => { isMounted = false};
    }, [firstLoad, mapVariable, onMapLoad]);
    /*firstLoad, mapLoaded, mapVariable, onMapLoad*/

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
      <Box>
          <Reservation changeReservation={changeReservation}></Reservation>
          <h1 className={infoclasses.greyTitle}>Check transport</h1>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            sx={{mb: '2rem'}}>
          <GoogleMap
            center={center}
            zoom={8}
            onLoad={map => onMapLoad(map)}
            mapContainerStyle={{ height: "40rem", width: "100%" }}
        >
        <DirectionsRenderer
            directions={directions}
        />
        </GoogleMap>
        </Grid>
            <div>
                <div style={{textAlign: 'center', marginBottom: '3rem', marginTop: '3rem'}}>
                    <TextField
                        sx={{ marginTop: "0.5rem", marginBottom: "0.5rem"}}
                        id="reservationName"
                        label="Your address"
                        variant="outlined"
                        onChange={onAddressInput}
                        value={addressInput}
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <SearchIcon />
                            </InputAdornment>
                        ),
                        }}
                        />    
                    <Button onClick={handleAddressSubmit} sx={{height: '3.5rem', marginTop: '0.5rem', marginLeft: '1rem',  backgroundColor: 'primary.main', color: 'primary.white', paddingLeft: '1rem', paddingRight: '1rem', '&:hover': { backgroundColor: 'secondary.main',} }}>
                        Search route
                    </Button>
                </div>
              {isGeocodingError && (
                <div className={classes.alert}>
                    <Alert severity="error" >There were problems retrieving the address</Alert>
                </div>
              )}
            <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{mb: '2rem'}}>
            
                <h2>Parameters of your route: </h2>
                <p>Total distance: <span style={{fontWeight: 'bold'}}>{distance}</span> km</p>
           
                <p>Long transport: <span style={{fontWeight: 'bold'}}>{longTransport}</span></p>
                <p>Short transport: <span style={{fontWeight: 'bold'}}>{shortTransport}</span></p>
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
                    <p>From Main Station you can go by: </p>
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
            </Grid>
          </div>
         
          <Attractions changeAttractions={changeAttractions}></Attractions>
          <div style={{textAlign: 'center'}}>
            <Button onClick={handleCreatePlan} className={formclasses.submit}>
                <span className={formclasses.buttonText}>Create Plan</span>
            </Button>
          </div>
          {message && successful && (
               <SuccessMessageGrid message={message}></SuccessMessageGrid>
            )}
          {message && !successful && (
              <ErrorMessageGrid message={message}></ErrorMessageGrid>
            )}
    </Box>
  );
};

export default Map;