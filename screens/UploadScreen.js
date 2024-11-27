import React, { useState, useContext } from "react";
import { View, Text, Button, Image, TextInput, StyleSheet, Alert, ActivityIndicator} from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';
import { uploadImage } from "../controllers/uploadController";
import AuthContext from "../context/AuthContext";

const UploadScreen = () => {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (!response.didCancel && response.assets) {
        const selectedImage = response.assets[0];
        if (selectedImage.type.startsWith("image/")) {
          setImage(selectedImage);
        } else {
          Alert.alert("Error", "Por favor selecciona un archivo de imagen válido.");
        }
      }
    });
  };

  const handleUpload = async () => {
    if (!image) {
      Alert.alert("Error", "Por favor selecciona una imagen antes de subirla.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", {
      uri: image.uri,
      name: image.fileName || `photo_${Date.now()}.jpg`, // Uso seguro en caso de que falte `fileName`.
      type: image.type,
    });
    formData.append("caption", caption);

    try {
      await uploadImage(formData, user.token);
      Alert.alert("Éxito", "Imagen subida correctamente");
      setImage(null);
      setCaption("");
    } catch (error) {
      Alert.alert("Error", error.message || "No se pudo subir la imagen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Seleccionar Imagen" onPress={handleSelectImage} />
      {image && (
        <Image source={{ uri: image.uri }} style={styles.imagePreview} />
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

export default UploadScreen;
