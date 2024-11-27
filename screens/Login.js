import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { loginUser } from "../services/authService";
import AuthContext from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext); // Usar el método `login` del contexto
  const navigation = useNavigation();

  const handleSubmit = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    try {
      const userData = await loginUser(formData); // Llamada al servicio de autenticación
      await login(userData); // Guardar usuario en el contexto y AsyncStorage
      console.log("Usuario autenticado:", userData);

      // Aquí se navega al feed después de guardar al usuario
      navigation.reset({
        index: 0,
        routes: [{ name: "Feed" }],
      });

    } catch (error) {
      setError("Credenciales incorrectas o error de conexión");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Iniciar Sesión</Text>
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
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        ¿No tienes cuenta?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Register")}
        >
          Regístrate
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

export default Login;
