import axios from "axios";

export const loginUser = async (email, password) => {
  const response = await axios.post("/api/users/login", { email, password });
  localStorage.setItem("token", response.data.token);
  return response.data;
};

export const registerUser = async (formData) => {
  return await axios.post("/api/users/register", { formData });
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};
