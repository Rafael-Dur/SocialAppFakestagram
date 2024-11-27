import React, { useState, useContext } from "react";
import { View, Text, Button, Image, TextInput, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import PostContext from "../context/PostContext";

const PostScreen = () => {
  const { addPost, loading } = useContext(PostContext);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (!response.didCancel && response.assets) {
        const selectedImage = response.assets[0];
        if (selectedImage?.type?.startsWith("image/")) {
          setImage(selectedImage);
        } else {
          Alert.alert("Error", "Por favor selecciona un archivo de imagen válido.");
        }
      } else {
        Alert.alert("Error", "No se seleccionó ninguna imagen.");
      }
    });
  };

  const handleUpload = async () => {
    if (!image) {
      Alert.alert("Error", "Por favor selecciona una imagen antes de subirla.");
      return;
    }

    const formData = new FormData();
    formData.append("image", {
      uri: image.uri,
      name: image.fileName || `photo_${Date.now()}.jpg`,
      type: image.type,
    });
    formData.append("caption", caption);

    try {
      await addPost(formData);
      Alert.alert("Éxito", "Post subido correctamente");
      setImage(null);
      setCaption("");
    } catch (err) {
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
