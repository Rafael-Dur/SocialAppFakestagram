import React from "react";

const PostCard = ({ post, onLike }) => {
  return (
    <div>
      <img src={post.imageUrl} alt={post.caption} />
      <p>{post.caption}</p>
      <button onClick={() => onLike(post._id)}>❤️ {post.likes}</button>
    </div>
  );
};

export default PostCard;
