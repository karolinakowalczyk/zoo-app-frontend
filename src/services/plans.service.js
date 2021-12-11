import api from "./api";

const getUserPlans = (userId) => {
  return api.get(`/plans/getUserPlans?userId=${userId}`);
};

const createPlan = async (owner, reservation, transport, attractions) => {
  return api.post("/plans/createPlan", {
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