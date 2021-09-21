import axios from "axios";

const API_URL = "http://localhost:8080/api/plans/";

const getUserPlans = (userId) => {
  return axios.get(API_URL + `getUserPlans?userId=${userId}`);
};

const createPlan = async (owner, reservation, transport, attractions) => {
  return axios.post(API_URL + "createPlan", {
    owner,
    reservation,
    transport,
    attractions
  });
}

const plansService = {
  getUserPlans,
  createPlan
};

export default plansService;