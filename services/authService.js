import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.0.112:3001/api/auth";

// Guardar el token JWT en AsyncStorage
export const saveAuthToken = async (token) => {
  try {
    await AsyncStorage.setItem("jwt_token", token);
  } catch (error) {
    console.error("Error al guardar el token:", error);
    throw error;
  }
};

// Obtener el token JWT desde AsyncStorage
export const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem("jwt_token");
  } catch (error) {
    console.error("Error al obtener el token:", error);
    throw error;
  }
};

// Función para registrar usuario
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error en el registro");
    }
    await saveAuthToken(data.token); // Guardar el token si el registro es exitoso
    return data;
  } catch (error) {
    console.error("Error en el registro:", error);
    throw error;
  }
};

// Función para iniciar sesión
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error en el inicio de sesión");
    }
    await saveAuthToken(data.token); // Guardar el token si el login es exitoso
    return data;
  } catch (error) {
    console.error("Error en el login:", error);
    throw error;
  }
};
