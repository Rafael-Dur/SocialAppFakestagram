import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext";
import AppNavigator from "./navigation/AppNavigator";

const App = () => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <AppNavigator />
      </ProfileProvider>
    </AuthProvider>
  );
};

export default App;
