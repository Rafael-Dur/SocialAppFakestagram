import React, { useState, useEffect, useContext } from "react";
import { getFeed, likePost } from "../services/postService";
import AuthContext from "../context/AuthContext";

const Feed = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const data = await getFeed(user.token);
        setPosts(data);
      } catch (err) {
        setError("No se pudo cargar el feed.");
      }
    };
    fetchFeed();
  }, [user.token]);

  const handleLike = async (postId) => {
    try {
      await likePost(postId, user.token);
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? { ...post, likes: post.likes.includes(user._id) 
                  ? post.likes.filter((id) => id !== user._id)
                  : [...post.likes, user._id] 
              }
            : post
        )
      );
    } catch (err) {
      setError("No se pudo registrar el like.");
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {posts.map((post) => (
        <div key={post._id}>
          <img
            src={`http://localhost:3001/${post.imageUrl}`}
            alt={post.caption}
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <p>{post.caption}</p>
          <button onClick={() => handleLike(post._id)}>
            ❤️ {post.likes.length}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Feed;
