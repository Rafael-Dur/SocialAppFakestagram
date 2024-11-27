import React, { useState, useEffect, useContext } from "react";
import {ScrollView, View, Text, Button, Image, StyleSheet } from "react-native";
import { getFeed, likePost } from "../controllers/postController";
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

  return (
    <ScrollView style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {posts.map((post) => (
        <View key={post._id} style={styles.postContainer}>
          <Image
            source={{ uri: post.imageUrl }}
            style={styles.postImage}
          />
          <Text>{post.caption}</Text>
          <Button
            title={`❤️ ${post.likes.length}`}
            onPress={() => handleLike(post._id)}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  postContainer: {
    marginBottom: 20,
  },
  postImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default Feed;
