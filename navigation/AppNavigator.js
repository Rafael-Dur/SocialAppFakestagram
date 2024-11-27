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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * Tabs para usuarios autenticados.
 */
const AppTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Feed" component={FeedScreen} />
    <Tab.Screen name="Subir Imagen" component={UploadScreen} />
    <Tab.Screen name="Perfil" component={ProfileScreen} />
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
