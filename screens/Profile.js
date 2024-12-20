import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import AuthContext from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import * as Camera from 'expo-camera';
import { updateUserProfile } from "../controllers/userController";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const [profilePicture, setProfilePicture] = useState(user.profilePicture || "");
  const [username, setUsername] = useState(user.username);

  // Solicitar permisos para acceder a la cámara y a la galería
  useEffect(() => {
    const askPermissions = async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync();

      if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
        alert('Lo siento, necesitamos permisos para acceder a la cámara y a la galería de fotos.');
      }
    };

    askPermissions();
  }, []);

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permiso denegado", "Necesitamos acceso a tu galería para seleccionar una imagen.");
      return;
    }

    // Launch the image picker to select a photo
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaType: 'images', // Only allow photos
      allowsEditing: true, // Optional: allows cropping the image
      aspect: [4, 3], // Optional: aspect ratio for cropping
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri); // Store selected image
    } else {
      Alert.alert("Error", "No se seleccionó ninguna imagen.");
    }
  };

  const handleSave = async () => {
    const userData = { username, profilePicture };

    try {
      await updateUserProfile(userData);
      alert("Perfil actualizado correctamente.");
    } catch (error) {
      alert("Error al actualizar perfil.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {profilePicture ? (
        <Image source={{ uri: profilePicture }} style={styles.profileImage} />
      ) : (
        <Text style={styles.profileText}>No se ha establecido una foto de perfil.</Text>
      )}

      <TouchableOpacity onPress={handleImagePick} style={styles.changeImageButton}>
        <Text style={styles.changeImageText}>Cambiar Foto de Perfil</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholder="Nombre de usuario"
      />
      
      <View style={styles.buttonContainer}>
        <Button title="Guardar" onPress={handleSave} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Cerrar sesión" onPress={handleLogout} color="red" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  profileText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    width: "100%",
    marginVertical: 10,
  },
  changeImageButton: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  changeImageText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Profile;
