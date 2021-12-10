//import axios from "axios";
import api from "./api";
//const API_URL = "http://localhost:8080/api/reservations/";

const getUserReservations = (userId) => {
  return api.get(`/reservations/getUserReservations?userId=${userId}`);
};

const createReservation = async (userId, name, date, expirationDate, quantity) => {
  return api.post("/reservations/createReservation", {
    userId,
    name,
    date,
    expirationDate,
    quantity
  });
}

const reservationsService = {
  getUserReservations,
  createReservation
};

export default reservationsService;