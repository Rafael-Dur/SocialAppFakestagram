import React, { useState, useContext } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { registerUser } from "../services/authService";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const { setUser } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      setError("Por favor completa todos los campos");
      return;
    }
    try {
      const userData = await registerUser(formData);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigation.navigate("Login");
    } catch (error) {
      setError(error.message || "Error al registrar el usuario");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Registrarse</Text>
      <TextInput
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        style={styles.input}
      />
      <TextInput
        name="password"
        type="password"
        placeholder="Contraseña"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        style={styles.input}
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        ¿Ya tienes cuenta?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Login")}
        >
          Inicia sesión
        </Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  footerText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  link: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default Register;
