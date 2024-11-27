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

  const fetchProfile = async (userId) => {
    try {
      const profileData = await getUserProfile(userId);
      setProfile(profileData);
      await AsyncStorage.setItem("profile", JSON.stringify(profileData));
    } catch (error) {
      console.error("Error al obtener perfil:", error);
    }
  };

  const updateProfile = async (userData) => {
    try {
      const updatedProfile = await updateUserProfile(userData);
      setProfile(updatedProfile);
      await AsyncStorage.setItem("profile", JSON.stringify(updatedProfile));
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
