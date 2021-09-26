import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = async (username, password) => {
  const response = await axios
        .post(API_URL + "signin", {
            username,
            password,
        });
    if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
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
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
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