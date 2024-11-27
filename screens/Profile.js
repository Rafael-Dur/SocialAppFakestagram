import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet } from "react-native";
import AuthContext from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture || "");
  const [username, setUsername] = useState(user.username);

  const handleSave = async () => {
    try {
      // Aquí puedes agregar la lógica para actualizar el perfil en el backend.
      alert("Perfil actualizado correctamente.");
    } catch (error) {
      alert("Error al actualizar perfil.");
    }
  };

  return (
    <View style={styles.container}>
      {profilePicture ? (
        <Image source={{ uri: profilePicture }} style={styles.profileImage} />
      ) : (
        <Text>No se ha establecido una foto de perfil.</Text>
      )}
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholder="Nombre de usuario"
      />
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
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
  },
});

export default Profile;
