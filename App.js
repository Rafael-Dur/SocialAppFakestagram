import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";
import AppNavigator from "./navigation/AppNavigator";

const App = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <AppNavigator />
      </PostProvider>
    </AuthProvider>
  );
};

export default App;
