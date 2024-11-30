import React, { useState, useContext } from "react";
import { View, Text, Button, Image, TextInput, StyleSheet, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import PostContext from "../context/PostContext";

const PostScreen = () => {
  const { addPost, loading } = useContext(PostContext);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const handleTakeImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permiso denegado", "No podemos acceder a tu cámara.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleSelectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permiso denegado", "No podemos acceder a tu galería.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaType: "images" });
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      Alert.alert("Error", "Por favor selecciona una imagen antes de subirla.");
      return;
    }

    const formData = new FormData();
    formData.append("image", {
      uri: image?.uri || "",
      name: image?.fileName || "default.jpg",
      type: image?.mimeType || "image/jpeg",
    });
    formData.append("caption", caption);

    try {
      await addPost(formData);
      Alert.alert("Éxito", "Imagen subida correctamente.");
      setImage(null);
      setCaption("");
    } catch (err) {
      console.error("Upload failed:", err);
      Alert.alert("Error", "No se pudo subir la imagen.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <Button title="Seleccionar Imagen" onPress={handleSelectImage} />
        <View style={styles.spacer} />
        <Button title="Sacar foto" onPress={handleTakeImage} />
      </View>
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={styles.imagePreview}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Escribe un pie de foto..."
        value={caption}
        onChangeText={setCaption}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Subir Imagen" onPress={handleUpload} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  imagePreview: {
    width: 250,
    height: 250,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  buttonGroup: {
    marginBottom: 20,
    width: "100%",
  },
  spacer: {
    height: 10,
  },
});

export default PostScreen;
