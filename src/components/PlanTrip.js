import React, { useState, useRef,  useCallback} from "react";
import { Container  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import 'react-calendar/dist/Calendar.css';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 51.10425449729486,
  lng: 17.074223549135013,
};

const useStyles = makeStyles((theme) => ({
  
}));


const PlanTrip = (props) => {
const classes = useStyles();

const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBrr30UaRvX5w5wWWbw5cR-E7qnWSa9yxA",
    libraries,
  });
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";


    return (
        <div>
            <h2>plan trip</h2>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={16}
                center={center}
            >

            </GoogleMap>
        </div>
    );
}

export default PlanTrip;