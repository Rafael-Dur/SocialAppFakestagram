import React, { createContext, useState, useEffect, useContext } from "react";
import { getFeed, likePost, removePostLike, uploadPost, createComment, getComment } from "../controllers/postController";
import AuthContext from "./AuthContext";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
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

  const removeLike = async (postId) => {
    try {
      await removePostLike(postId, user.token);
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
      setError("No se pudo quitar el like.");
    }
  };

  const addPost = async (postData) => {
    setLoading(true);
    try {
      const newPost = await uploadPost(postData, user.token);
      newPost.user = {_id: user._id, profilePicture: user.profilePicture, username: user.username}
      setPosts((prev) => [newPost, ...prev]);
    } catch (err) {
      console.log(err);
      setError("No se pudo subir el post.");
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (postId, comment) => {
    try {
      const updatedPost = await createComment(postId, comment, user.token);
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: [...post.comments, updatedPost._id],
              }
            : post
        )
      );
    } catch (err) {
      setError("No se pudo agregar el comentario.");
    }
  };

  const fetchComment = async (commentId) => {
    setLoading(true);
    try {
      const comment = await getComment(commentId, user.token);
      return comment;
    } catch (err) {
      setError("No se pudo cargar el comentario.");
    } finally {
      setLoading(false);
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
        removeLike,
        addPost,
        addComment,
        fetchComment
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
