import React, { useState, useContext } from "react";
import { View, Text, Button, Image, TextInput, StyleSheet, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from 'expo-image-picker'; // Import expo-image-picker
import PostContext from "../context/PostContext";

const PostScreen = () => {
  const { addPost, loading } = useContext(PostContext);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const handleSelectImage = async () => {
    // Request permission for photo library (for Expo-managed workflow)
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
      setImage(result.assets[0]); // Store selected image
    } else {
      Alert.alert("Error", "No se seleccionó ninguna imagen.");
    }
  };

  const handleUpload = async () => {
    if (!image) {
      Alert.alert("Error", "Por favor selecciona una imagen antes de subirla.");
      return;
    }

    // Use FormData to append the image file URI directly
    const formData = new FormData();
    
    formData.append("image", {
      uri: image.uri,
      name: image.fileName,
      type: image.mimeType,
    });
    
    formData.append("caption", caption);
    
    try {
      // Call the function to send the post
      await addPost(formData);

      Alert.alert("Éxito", "Post subido correctamente");
      setImage(null);
      setCaption("");
    } catch (err) {
      console.error("Upload failed:", err);
      Alert.alert("Error", "No se pudo subir el post.");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Seleccionar Imagen" onPress={handleSelectImage} />
      {image && <Image source={{ uri: image.uri }} style={styles.imagePreview} />}
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
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginBottom: 20,
  },
});

export default PostScreen;
