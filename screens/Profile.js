import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView } from "react-native";
import AuthContext from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native"; 

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const [profilePicture, setProfilePicture] = useState(user.profilePicture || "");
  const [username, setUsername] = useState(user.username);

  const handleSave = async () => {
    try {
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
});

export default Profile;
