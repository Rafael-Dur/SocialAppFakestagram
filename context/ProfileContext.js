import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserProfile, updateUserProfile } from "../controllers/userController";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  // Cargar perfil desde AsyncStorage al iniciar
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedProfile = await AsyncStorage.getItem("profile");
        if (storedProfile) {
          setProfile(JSON.parse(storedProfile));
        }
      } catch (err) {
        console.error("Error al cargar el perfil:", err);
      }
    };
    loadProfile();
  }, []);

  // Obtener perfil desde la API
  const fetchProfile = async (userId) => {
    try {
      const profileData = await getUserProfile(userId);  // Llama a la API para obtener el perfil
      setProfile(profileData);
      await AsyncStorage.setItem("profile", JSON.stringify(profileData));  // Guarda el perfil en AsyncStorage
    } catch (error) {
      console.error("Error al obtener perfil:", error);
    }
  };

  // Actualizar el perfil
  const updateProfile = async (userData) => {
    try {
      const updatedProfile = await updateUserProfile(userData);  // Llama a la API para actualizar el perfil
      setProfile(updatedProfile);
      await AsyncStorage.setItem("profile", JSON.stringify(updatedProfile));  // Guarda el perfil actualizado en AsyncStorage
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile, fetchProfile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
