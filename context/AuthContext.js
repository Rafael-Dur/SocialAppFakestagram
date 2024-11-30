import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Cargar usuario desde AsyncStorage al iniciar
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error("Error al cargar el usuario:", err);
      }
    };
    loadUser();
  }, []);

  // Método para iniciar sesión y guardar usuario
  const login = async (userData) => {
    try {
      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      console.error("Error al guardar el usuario durante login:", err);
    }
  };

  // Método para registrar al usuario (se puede usar de referencia en el contexto global)
  const register = async (userData) => {
    try {
      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      console.error("Error al guardar el usuario durante registro:", err);
    }
  };

  // Cierra sesión y elimina datos del usuario
  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem("user");
    } catch (err) {
      console.error("Error al eliminar el usuario durante logout:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
