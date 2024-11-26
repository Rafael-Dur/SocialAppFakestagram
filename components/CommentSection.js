import React, { useState } from "react";

const CommentSection = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    onAddComment(newComment);
    setNewComment("");
  };

  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>{comment.content}</li>
        ))}
      </ul>
      <input
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Añadir un comentario..."
      />
      <button onClick={handleAddComment}>Comentar</button>
    </div>
  );
};

export default CommentSection;
