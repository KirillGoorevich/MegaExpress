import http from "./httpService";
import JWTDecode from "jwt-decode";
const apiUrl = process.env.REACT_APP_API_URL;

export const signup = user => http.post(`${apiUrl}/users/register`, user);
export const resetPassword = user => http.post(`${apiUrl}/users/reset`, user);

export const login = async user => {
  const {
    data: { token },
  } = await http.post(`${apiUrl}/users/login`, user);
  localStorage.setItem("token", token);
};

export const getCurrentUser = () => {
  try {
    const token = localStorage.getItem("token");
    return JWTDecode(token);
  } catch {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  return (window.location = "/");
};

export const getUsers = () => http.get(`${apiUrl}/users/users`);

export const getJWT = () => localStorage.getItem("token");

export const deleteUser = (userId) => http.delete(`${apiUrl}/users/${userId}`);

export const makeUserAdmin = (userId) => http.put(`${apiUrl}/users/${userId}`);

export const curUserInfo = () => http.get(`${apiUrl}/users/userInfo`);

export const changeProfilePic = (formData) => http.post(`${apiUrl}/users/changeProfilePic`, formData);

export const getProfilePic = (userId) =>http.get(`${apiUrl}/users/getProfilePic/${userId}`)

