import React, { useState, useEffect } from "react";
import ReservationsService from "../services/reservations.service";
import AuthService from "../services/auth.service";
import { Alert } from '@mui/material/';

const ReservationsList = () => {
  const [reservationsData, setReservationsData] = useState([]);
  const [successful, setSuccessful] = useState(true);
  const [message, setMessage] = useState("");
  const currentUser = AuthService.getCurrentUser();

    useEffect(() => {
    ReservationsService.getUserReservations(currentUser.id).then(
      (response) => {
        setReservationsData(response.data);
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
  }, [currentUser.id]);

const displayReservations = reservationsData.map((reservation, index) =>
    <div key={index}>
        <li key={reservation.id}>Reservation {index}</li>
        <li key={reservation.date}>{reservation.date}</li>
        <li key={reservation.expirationDate}>{reservation.expirationDate}</li>
    </div>
);

  return (
    <div>
      {!successful && (
        <div>
            <Alert severity="error" >{message}</Alert>
        </div>
       )}
      <h2>Your Reservations</h2>
      <ul>
        {displayReservations}
      </ul>
      
    </div>
  );
};

export default ReservationsList;