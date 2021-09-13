import React, { useState, useEffect } from "react";
import AttractionsService from "../services/attractions.service";
import createUUID from "../helpers/createUUID";
import { Button } from '@material-ui/core';

const Attractions = (props) => {
  const [attractionsData, setAttractionsData] = useState([]);
  useEffect(() => {
    AttractionsService.getAttractions().then(
      (response) => {
        setAttractionsData(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setAttractionsData(_content);
      }
    );
  }, []);

  const convertMinsToTime = (mins) => {
    let hours = Math.floor(mins / 60);
    let minutes = mins % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours ? `${hours}:` : ''}${minutes}`;
  }

const displayAttractions = attractionsData.map((attraction, index) =>
  <div key={index}>
    <li key={attraction.name}>{attraction.name}</li>
    <ul>
        {attraction.hours.map((hour) => (
            <li key={createUUID(hour)}>{convertMinsToTime(hour)}</li>
        ))}
    </ul>
    {props.user &&
        <Button>Add to plan</Button>}
  </div>
);

  return (
    <div>
      <h2>attractions</h2>
      <ul>
        {displayAttractions}
      </ul>
      
    </div>
  );
};

export default Attractions;