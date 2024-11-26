import React, { useState, useContext } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { loginUser } from "../services/authService";
import AuthContext from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const { setUser } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Por favor completa todos los campos");
      return;
    }
    try {
      const userData = await loginUser(formData);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigation.navigate("Feed"); // Usamos navigation.navigate en lugar de navigate("/feed")
    } catch (error) {
      setError("Credenciales incorrectas o error de conexión");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <TextInput
        name="password"
        type="password"
        placeholder="Contraseña"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
        secureTextEntry
      />
      <Button title="Iniciar Sesión" onPress={handleSubmit} />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
};

export default Login;
