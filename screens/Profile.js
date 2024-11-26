import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture || "");
  const [username, setUsername] = useState(user.username);

  const handleSave = async () => {
    try {
      // Envía la actualización al backend
      // Similar a los servicios anteriores.
    } catch (error) {
      alert("Error al actualizar perfil.");
    }
  };

  return (
    <div>
      <img src={profilePicture} alt="Foto de perfil" />
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <button onClick={handleSave}>Guardar</button>
    </div>
  );
};

export default Profile;
