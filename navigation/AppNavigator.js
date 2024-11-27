import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import FeedScreen from "../screens/Feed";
import UploadScreen from "../screens/UploadScreen";
import ProfileScreen from "../screens/Profile";
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import AuthContext from "../context/AuthContext";
import PostDetails from "../screens/PostDetails";
import Feed from "../screens/Feed";

const Tab = createBottomTabNavigator();

// Tabs para usuarios autenticados
const AppTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Feed" component={FeedScreen} />
    <Tab.Screen name="Subir Imagen" component={UploadScreen} />
    <Tab.Screen name="Perfil" component={ProfileScreen} />
  </Tab.Navigator>
);


const Stack = createStackNavigator();

// Crear un RootStack para manejar las pantallas de inicio de sesión y registro
const RootStack = createStackNavigator();

const RootNavigator = () => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    <RootStack.Screen name="AppTabs" component={AppTabs} />
    <RootStack.Screen name="PostDetails" component={PostDetails} options={{ title: "Detalles del Post" }} />
    <RootStack.Screen name="Feed" component={Feed} options={{ title: "Feed" }} />
  </RootStack.Navigator>
);

const AppNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? (
        // Si el usuario está autenticado, navegar a los Tabs
        <RootNavigator />
      ) : (
        // Si el usuario no está autenticado, mostrar las pantallas de login y registro
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
