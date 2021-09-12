import axios from "axios";

const API_URL = "http://localhost:8080/api/attractions/";

const getAttractions = () => {
  return axios.get(API_URL + "getAttractions");
};

const attractionsService = {
  getAttractions,

};

export default attractionsService;