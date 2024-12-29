import "../scss/blogcard.scss";
import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import "../index.css";
import eventEmitter from "../utils/eventEmitter";

// Define the props interface for the BlogCard component
interface BlogCardProps {
  title: string;
  content: string;
  id: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, content, id }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteBlog = async () => {
    if (!user || !user.email) return;
    setError(null);

    try {
      setLoading(true);
      const response = await fetch(`https://dreamnote-go.onrender.com/v1/deleteBlog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user?.email, id }),
      });

      if (response.ok) {
        console.log("Deleted blog successfully...");
        eventEmitter.emit({ type: "DELETE_BLOG", id });
         // Notify the parent to remove the blog
        // Optionally, trigger a callback or refetch blogs here
      } else {
        console.error("Failed to delete blog");
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
      setError("Failed to delete blog.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <></>;
  }

  return (
    <>
      <div className="brutalist-card">
        <div className="brutalist-card__header">
          <div className="brutalist-card__icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
            </svg>
          </div>
          <div className="brutalist-card__alert">{title}</div>
        </div>
        <div
          className="brutalist-card__message"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {content}
        </div>
        <div className="brutalist-card__actions">
          <button
            className="brutalist-card__button brutalist-card__button--read"
            onClick={deleteBlog}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
    </>
  );
};

export default BlogCard;
