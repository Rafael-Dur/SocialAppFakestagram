import React, { createContext, useState, useEffect, useContext } from "react";
import { getFeed, likePost, uploadPost, createComment } from "../controllers/postController";
import AuthContext from "./AuthContext";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // Para acceder al token del usuario.
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar el feed inicial.
  useEffect(() => {
    if (user?.token) {
      fetchFeed();
    }
  }, [user?.token]);

  const fetchFeed = async () => {
    setLoading(true);
    try {
      const data = await getFeed(user.token);
      setPosts(data);
    } catch (err) {
      setError("No se pudo cargar el feed.");
    } finally {
      setLoading(false);
    }
  };

  const addLike = async (postId) => {
    try {
      await likePost(postId, user.token);
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: post.likes.includes(user._id)
                  ? post.likes.filter((id) => id !== user._id)
                  : [...post.likes, user._id],
              }
            : post
        )
      );
    } catch (err) {
      setError("No se pudo registrar el like.");
    }
  };

  const addPost = async (postData) => {
    setLoading(true);
    try {
      const newPost = await uploadPost(postData, user.token);
      setPosts((prev) => [newPost, ...prev]); // Agregar el nuevo post al inicio.
    } catch (err) {
      setError("No se pudo subir el post.");
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (postId, comment) => {
    try {
      const updatedPost = await createComment(postId, comment, user.token);
      setPosts((prev) =>
        prev.map((post) => (post._id === postId ? updatedPost : post))
      );
    } catch (err) {
      setError("No se pudo agregar el comentario.");
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        error,
        fetchFeed,
        addLike,
        addPost,
        addComment,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
