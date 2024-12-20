import {IP} from "../IP";

const { getAuthToken } = require('./authController');

const USER_API_URL = `http://${IP}:3001/api/user`;

exports.getUserProfile = async (userId) => {
  const token = await getAuthToken();
  try {
    const response = await fetch(`${USER_API_URL}/profile/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al obtener perfil');
    return data;
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    throw error;
  }
};

exports.updateUserProfile = async (userData) => {
  const token = await getAuthToken();
  try {
    const response = await fetch(`${USER_API_URL}/profile/edit`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al actualizar perfil');
    return data;
  } catch (error) {
    console.error("Error al actualizar perfil:", error);
    throw error;
  }
};
