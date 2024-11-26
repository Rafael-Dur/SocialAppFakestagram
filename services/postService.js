import axios from "axios";

const API_URL = "http://192.168.0.100:3001/api/posts"; // Endpoint base para publicaciones

export const uploadPost = async (postData, token) => {
  const response = await axios.post(`${API_URL}/upload`, postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getFeed = async (token) => {
  const response = await axios.get(`${API_URL}/feed`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const likePost = async (postId, token) => {
  const response = await axios.post(`${API_URL}/${postId}/like`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createComment = async (postId, comment, token) => {
  const response = await axios.post(
    `${API_URL}/${postId}/comments`,
    { content: comment },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
