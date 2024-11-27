import React, { useContext } from "react";
import { View, Text, Button, Image, StyleSheet, ActivityIndicator } from "react-native";
import PostContext from "../context/PostContext";

const Feed = () => {
  const { posts = [], loading, error, addLike } = useContext(PostContext);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {posts.map((post) => (
        <View key={post._id} style={styles.postContainer}>
          <Image source={{ uri: `http://localhost:3001/${post.imageUrl}` }} style={styles.postImage} />
          <Text>{post.caption}</Text>
          <Button
            title={`❤️ ${Array.isArray(post.likes) ? post.likes.length : 0}`}
            onPress={() => addLike(post._id)}
          />
        </View>
      ))}
    </View>
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
