import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet,Button,SafeAreaView,Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;
const PostDetails = ({ route, navigation}) => {
  const { post } = route.params;

    const handleNavegation = () => {
        navigation.navigate('Feed')
    }

  if (!post) return <Text>Loading...</Text>;

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            <Button title="Volver" onPress={() => handleNavegation()} />  
            <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
            <Text style={styles.caption}>{post.caption}</Text>
            <Text style={styles.likes}>Likes: {post.likes.length}</Text>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "white",
      paddingTop: screenHeight*0.05
    },
    container: {
      flex: 1,
      padding: 10,
    },
    header: {
      paddingTop: 10,
      paddingBottom: 10,
      alignItems: "flex-start",
    },
    postImage: {
      width: "100%",
      height: 200,
      resizeMode: "contain",
    },
    caption: {
      marginTop: 10,
      fontSize: 16,
    },
    likes: {
      marginTop: 5,
      fontSize: 14,
      color: "gray",
    },
  });

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   postImage: {
//     width: "100%",
//     height: 200,
//     resizeMode: "contain",
//   },
//   caption: {
//     marginTop: 10,
//     fontSize: 16,
//   },
//   likes: {
//     marginTop: 5,
//     fontSize: 14,
//     color: "gray",
//   },
// });

export default PostDetails;
