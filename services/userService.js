import axios from "axios";

const API_URL = "http://192.168.0.100:3001/api/user"; // Endpoint base para usuarios

export const getUserProfile = async (userId, token) => {
  const response = await axios.get(`${API_URL}/profile/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const editUserProfile = async (profileData, token) => {
  const response = await axios.put(`${API_URL}/profile/edit`, profileData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getNotifications = async (token) => {
  const response = await axios.get(`${API_URL}/notifications`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
