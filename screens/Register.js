import React, { useState, useContext } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { registerUser } from "../services/authService";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const { setUser } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    const { username, email, password } = formData;

    // Validación de campos vacíos
    if (!username || !email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    // Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("El formato del email es inválido");
      return;
    }

    try {
      const userData = await registerUser(formData);
      setUser(userData); // Guardar el usuario en el contexto
      localStorage.setItem("user", JSON.stringify(userData)); // Guardar en localStorage
      navigation.navigate("Login"); // Redirigir a la pantalla de inicio de sesión
    } catch (error) {
      setError(error.message || "Error al registrar el usuario");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Registrarse</Text>
      <TextInput
        name="username"
        placeholder="Nombre de usuario"
        value={formData.username}
        onChangeText={(text) => setFormData({ ...formData, username: text })}
        style={styles.input}
      />
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
