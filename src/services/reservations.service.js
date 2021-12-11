import api from "./api";

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