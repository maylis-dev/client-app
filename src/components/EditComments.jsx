import { useEffect, useState } from "react";
import axios from "axios";

function EditComments({ productId }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId"); // logged-in user's id

  // Fetch comments for this product
  const getComments = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/comments`);
      // Only comments for this product
      const filtered = res.data.filter((c) => String(c.product) === String(productId));
      setComments(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (productId) getComments();
  }, [productId]);

  const handleAddOrEditComment = async () => {
    if (!commentText.trim()) return;

    try {
      if (editingComment) {
        // Edit existing comment
        const res = await axios.put(
          `${import.meta.env.VITE_SERVER_URL}/api/comments/${editingComment._id}`,
          { content: commentText },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setComments((prev) =>
          prev.map((c) => (c._id === editingComment._id ? res.data : c))
        );
      } else {
        // Add new comment
        const res = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/comments`,
          { content: commentText, productId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Only append if it matches current product
        if (String(res.data.product) === String(productId)) {
          setComments((prev) => [...prev, res.data]);
        }
      }

      setCommentText("");
      setEditingComment(null);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  const startEditing = (comment) => {
    setEditingComment(comment);
    setCommentText(comment.content);
    setIsModalOpen(true);
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  return (
    <div className="comments-section">
      <h3>Comments ({comments.length})</h3>

      <div className="comments-list">
        {comments.map((c) => (
          <div key={c._id} className="comment-item">
            <strong>{c.username?.username || "User"}:</strong> {c.content}

            {/* Show edit/delete buttons only for the owner */}
          {String(c.user) === String(userId) && (
  <span className="comment-actions">
    <button onClick={() => startEditing(c)}>Edit</button>
    <button onClick={() => handleDelete(c._id)}>Delete</button>
  </span>
)}
          </div>
        ))}
      </div>

      <button onClick={() => setIsModalOpen(true)}>Write a Comment</button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>{editingComment ? "Edit Comment" : "Write a Comment"}</h4>
            <textarea
              rows={4}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>

            <div className="modal-actions">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingComment(null);
                  setCommentText("");
                }}
              >
                Cancel
              </button>
              <button onClick={handleAddOrEditComment}>
                {editingComment ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditComments;