import axios from "axios";
import {IP} from "../IP";

const API_URL = `http://${IP}:3001/api/posts`;

export const uploadPost = async (postData, token) => {
  try {
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: postData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
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

export const removePostLike = async (postId, token) => {
  const response = await axios.delete(`${API_URL}/${postId}/like`, {
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

export const getComment = async (commentId, token) => {
  const response = await axios.get(`${API_URL}/comments/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
