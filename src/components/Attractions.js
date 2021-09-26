import React, { useState, useEffect } from "react";
import AttractionsService from "../services/attractions.service";
import createUUID from "../helpers/createUUID";
import { Button, Alert } from '@mui/material/';
import AuthService from "../services/auth.service";
import convertMinsToTime from "../helpers/convertMinsToTime";

const Attractions = (props) => {
  const [attractionsData, setAttractionsData] = useState([]);
  const [successful, setSuccessful] = useState(true);
  const [message, setMessage] = useState("");
  const currentUser = AuthService.getCurrentUser();
  const [addedAttractions, setAddedAttractions] = useState([]);

  useEffect(() => {
    AttractionsService.getAttractions().then(
      (response) => {
        setAttractionsData(response.data);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          setMessage(resMessage);
          setSuccessful(false); 
      }
    );
  }, []);

  useEffect(() => {
    if (currentUser) {
      props.changeAttractions(addedAttractions);
    }
  }, [addedAttractions, props, currentUser]);

  const addAttraction = (attraction) => {
    const conflictAttractionsList = addedAttractions.filter((attr) => ( ((attraction.hour >= attr.hour) && (attraction.hour <= attr.hour + attr.duration))) || (((attraction.hour + attraction.duration) >= attr.hour) && ((attraction.hour + attraction.duration) <= (attr.hour + attr.duration))) );
    if (conflictAttractionsList.length > 0) {
      setMessage("These event conflict with each other.");
      return
    }
    const actualAttractions = attractionsData.filter((attr) => attr !== attraction);
    setAttractionsData(actualAttractions);
    setAddedAttractions(addedAttractions.concat([attraction]))
    setMessage("");
  }

  

  const removeAttraction = (attraction) => {
    const actualAddedAttractions = addedAttractions.filter((attr) => attr !== attraction);
    setAddedAttractions(actualAddedAttractions);
    setAttractionsData(attractionsData.concat([attraction]));
    setMessage("");
  };

const displayAttractions = attractionsData.map((attraction, index) =>
  <div key={index}>
    <li key={attraction.name}>{attraction.name}</li>
    <li key={createUUID(attraction.hour)}>{convertMinsToTime(attraction.hour)}</li>
    {/*<ul>
        {attraction.hours.map((hour) => (
            <li key={createUUID(hour)}>{convertMinsToTime(hour)}</li>
        ))}
      </ul>*/}
    <li key={createUUID(attraction.name)}>Duration: {attraction.duration} min</li>
    {currentUser &&
        <Button onClick={() => addAttraction(attraction)}>Add to plan</Button>}
  </div>
  );
  
  const displayAddedAttractions = addedAttractions.map((attraction, index) =>
  <div key={index}>
      <li key={attraction.name}>{attraction.name}</li>
      <li key={createUUID(attraction.hour)}>{convertMinsToTime(attraction.hour)}</li>
      {/*<ul>
        {attraction.hours.map((hour) => (
            <li key={createUUID(hour)}>{convertMinsToTime(hour)}</li>
        ))}
        </ul>*/}
    <Button onClick={() => removeAttraction(attraction)}>Remove</Button>
  </div>
);

  return (
    <div>
      {!successful && (
        <div>
            <Alert severity="error" >{message}</Alert>
        </div>
       )}
      <h2>attractions</h2>
      <ul>
        {displayAttractions}
      </ul>
      {message && (
            <div>
              <Alert severity="error">{message}</Alert>
            </div>
          )}
      {currentUser &&
        <div>
          <h2>Added attractions</h2>
          <ul>
            {displayAddedAttractions}
          </ul>
        </div>
      }
    </div>
  );
};

export default Attractions;