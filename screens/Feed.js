import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView, Modal, TextInput, Button } from "react-native";
import PostContext from "../context/PostContext";
import { MaterialIcons } from 'react-native-vector-icons';
import AuthContext from "../context/AuthContext";
import {IP} from "../IP";

const Feed = () => {
  const { user } = useContext(AuthContext);
  const { posts = [], loading, error, addLike, removeLike, addComment, fetchComment } = useContext(PostContext);

  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [currentPostId, setCurrentPostId] = useState(null); // Track which post's modal is open
  const [commentText, setCommentText] = useState(""); // Track comment text
  const [postComments, setPostComments] = useState(null);
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (currentPostId) {
      const fetchCommentsForPost = async () => {
        const post = posts.find(post => post._id === currentPostId);
        if (post && Array.isArray(post.comments)) {
          try {
            const fetchedComments = await Promise.all(post.comments.map(comment => fetchComment(comment)));
            setPostComments(fetchedComments); // Store resolved comments
          } catch (error) {
            console.error("Error fetching comments:", error);
          }
        }
      };

      fetchCommentsForPost();
    }
  }, [currentPostId]);


  const isLikedByUser = (likes) => {
    const userId = user._id;
    return likes.includes(userId);
  };

  const handleCommentPress = (post) => {
    setCurrentPostId(post._id);
    setIsModalVisible(true);
    setPost(post);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      addComment(currentPostId, commentText);
      setCommentText("");
      setIsModalVisible(false);
      setCurrentPostId(null);
      setPostComments(null);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {posts.length > 0 && posts.map((post) => {
        const imageUrl = post.imageUrl.replace(/\\/g, "/");
        const avatarUrl = post.user.profilePicture
          ? `http://${IP}:3001/${post.user.profilePicture}`
          : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';

        const isLiked = isLikedByUser(post.likes);

        return (
          <View key={post._id} style={styles.postContainer}>
            {/* Post Header */}
            <View style={styles.header}>
              <Image source={avatarUrl} style={styles.avatar} />
              <Text style={styles.username}>{post.user.username}</Text>
            </View>

            {/* Post Image */}
            <Image source={{ uri: `http://${IP}:3001/${imageUrl}`}} style={styles.postImage} />
            {/* Post Actions */}
            <View style={styles.actions}>
              <TouchableOpacity onPress={isLiked ? () => removeLike(post._id) : () => addLike(post._id)} style={styles.likeButton}>
                <Text style={styles.likeText}>
                  <MaterialIcons name={isLiked ? 'favorite' : 'favorite-border'} color={isLiked ? 'red' : ''} size={20} />
                  {Array.isArray(post.likes) ? post.likes.length : 0}
                </Text>
              </TouchableOpacity>

              {/* Comment Button */}
              <TouchableOpacity onPress={() => handleCommentPress(post)}>
                <Text style={styles.likeText}>
                  <MaterialIcons name="comment" size={20} /> {Array.isArray(post.comments) ? post.comments.length : 0}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Post Caption */}
            <Text style={styles.caption}>{post.caption}</Text>
          </View>
        );
      })}

      {/* Modal for Comment */}
      <Modal visible={isModalVisible} animationType="slide" onRequestClose={() => { setIsModalVisible(false); setCurrentPostId(null); setPostComments(null) }}>
        {/* <View style={styles.container}>
          <Button title="Volver" onPress={() => handleNavegation()} />
          <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
          <Text style={styles.caption}>{post.caption}</Text>
          <Text style={styles.likes}>Likes: {post.likes.length}</Text>
        </View> */}
        {postComments && postComments.map(comment => <Text key={comment._id}>{comment.content}</Text>)}
        <View style={styles.modalContainer}>

          <Text style={styles.modalTitle}>Add Comment</Text>
          <TextInput
            style={styles.commentInput}
            placeholder="Write your comment..."
            value={commentText}
            onChangeText={setCommentText}
            multiline
          />
          <View style={styles.modalActions}>
            <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
            <Button title="Submit" onPress={handleCommentSubmit} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  postContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  postImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeText: {
    fontSize: 18,
    marginLeft: 5,
    fontWeight: "bold",
    alignItems: "center",
  },
  caption: {
    paddingHorizontal: 10,
    marginTop: 5,
    fontSize: 14,
    color: "#333",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  commentInput: {
    height: 150,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default Feed;
