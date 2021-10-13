import axios from "axios";

const API_URL = "http://localhost:8080/api/petfinder/";

const getAccessToken = () => {
  return axios.get(API_URL + "getAccessToken");
};

const petfinderService = {
  getAccessToken,

};

export default petfinderService;