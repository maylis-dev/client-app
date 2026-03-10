import { useEffect, useState } from "react";
import axios from "axios";

function CommentsSection({ productId }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("authToken");

  const getComments = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/comments`);
      const filtered = res.data.filter((c) => String(c.product) === String(productId));
      setComments(filtered);
    } catch (e) {
      console.log(e);
    }
  };

  // Refetch comments whenever productId changes
  useEffect(() => {
    if (productId) getComments();
  }, [productId]);

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/comments`,
        { content: commentText, productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Only add the comment if it belongs to this product
      if (String(res.data.product) === String(productId)) {
        setComments((prev) => [...prev, res.data]);
      }

      setCommentText("");
      setIsModalOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h3>Comments ({comments.length})</h3>
      {comments.map((c) => (
        <div key={c._id}>
          <b>{c.username?.username || "User"}:</b> {c.content}
        </div>
      ))}

      <button onClick={() => setIsModalOpen(true)}>Write a Comment</button>

      {isModalOpen && (
        <div>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          <button onClick={handleAddComment}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default CommentsSection;