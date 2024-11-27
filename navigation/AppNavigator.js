import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import FeedScreen from "../screens/Feed";
import UploadScreen from "../screens/PostScreen";
import ProfileScreen from "../screens/Profile";
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import AuthContext from "../context/AuthContext";
import { MaterialIcons } from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * Tabs para usuarios autenticados.
 */
const AppTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Feed" component={FeedScreen} options={{
      tabBarIcon: ({ color, size }) => (
        <MaterialIcons name="home" color={color} size={size} />
      ),
      headerTitle: "Faketagram",
    }} />
    <Tab.Screen name="Subir Imagen" component={UploadScreen} options={{
      tabBarIcon: ({ color, size }) => (
        <MaterialIcons name="add" color={color} size={size} />
      ),
    }} />
    <Tab.Screen name="Perfil" component={ProfileScreen} options={{
      tabBarIcon: ({ color, size }) => (
        <MaterialIcons name="person" color={color} size={size} />
      ),
    }} />
  </Tab.Navigator>
);

/**
 * Root stack para usuarios autenticados.
 */
const RootNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AppTabs" component={AppTabs} />
  </Stack.Navigator>
);

/**
 * AppNavigator maneja la navegación global.
 */
const AppNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? (
        // Usuarios autenticados
        <RootNavigator />
      ) : (
        // Usuarios no autenticados
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
