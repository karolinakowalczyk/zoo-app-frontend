import axios from "axios";

const API_URL = "http://localhost:8080/api/reservations/";

const getUserReservations = (userId) => {
  return axios.get(API_URL + `getUserReservations?userId=${userId}`);
};

const createReservation = async (userId, name, date, expirationDate, quantity) => {
  return axios.post(API_URL + "createReservation", {
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