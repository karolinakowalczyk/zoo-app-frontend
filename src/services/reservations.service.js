import axios from "axios";

const API_URL = "http://localhost:8080/api/reservations/";

const getUserReservations = () => {
  return axios.get(API_URL + "getUserReservations");
};

const createReservation = async (userId, date, expirationDate, quantity) => {
  return axios.post(API_URL + "createReservation", {
    userId,
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