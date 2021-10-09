import api from "./api";


const getPublicContent = () => {
  return api.get('/test/all');
};

const getUserBoard = () => {
  return api.get('/test/user');
};


const getAdminBoard = () => {
  return api.get('/test/admin');
};

const userService = {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
};

export default userService;