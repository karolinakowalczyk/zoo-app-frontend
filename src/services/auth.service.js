import axios from "axios";
import api from "./api";
import TokenService from "./token.service";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password) => {
  return api.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = async (username, password) => {
  return api
    .post("/auth/signin", {
      username,
      password
    })
    .then(response => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
      }

      return response.data;
    });
};

const requestResetPassword = async (email) => {
  return axios.post(API_URL + "requestResetPassword", {
    email,
  });
}

const resetPassword = async (hash, password) => {
  return axios.post(API_URL + "resetPassword", {
    hash,
    password,
  });
}

const editProfile = async (id, email, name, surname, address, postalCode, city, phonenumber) => {
  return axios.put(API_URL + "editProfile", {
    id,
    email,
    name,
    surname,
    address,
    postalCode,
    city,
    phonenumber
  });
}

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return TokenService.getUser();
};

const updateCurrentUser = (data) => {
  localStorage.removeItem("user");
  localStorage.setItem("user", JSON.stringify(data));
}


const authService = {
  register,
  login,
  requestResetPassword,
  resetPassword,
  editProfile,
  logout,
  getCurrentUser,
  updateCurrentUser
};

export default authService;