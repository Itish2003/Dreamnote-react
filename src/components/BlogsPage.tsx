import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { BlogDetails } from "../types/BlogDetails";
import { useUser } from "../context/UserContext";
import "../index.css";
import "../scss/blogpage.scss";
import eventEmitter from "../utils/eventEmitter";

export const BlogsPage: React.FC = () => {
  const { user } = useUser(); // Get user from context
  const [blogs, setBlogs] = useState<BlogDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Start with loading as false
  const [error, setError] = useState<string | null>(null); // Error state

  const fetchBlogs = async () => {
    if (!user || !user.email) return; // If user or email is not available, return early
    setLoading(true); // Set loading state to true
    setError(null); // Reset any previous error state

    try {
      console.log("Fetching blogs..."); // Debug log

      const response = await fetch(`https://dreamnote-go.onrender.com/v1/getBlogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }), // Send email in the request body
      });

      if (response.ok) {
        const data: BlogDetails[] = await response.json();
        console.log("Fetched blogs successfully:", data);
        setBlogs(data); // Set the fetched blogs to state
      } else {
        setError("Failed to fetch blogs.");
      }
    } catch (err) {
      console.error("Error fetching blogs:", err); // Error log
      setError("Failed to load blogs. Please try again later.");
    } finally {
      setLoading(false); // Set loading to false after the request is completed
    }
  };

  useEffect(() => {
    if (user && user.email) {
      fetchBlogs(); // Automatically fetch blogs when the user is available
    }
  }, [user]); // Effect will run when the user context changes

  useEffect(() => {
    const handleEvent = (event: { type: string; blog?: BlogDetails; id?: string }) => {
      if (event.type === "CREATE_BLOG" && event.blog) {
        // Add the new blog to the top
        fetchBlogs(); // Re-fetch all blogs to get the updated list
      } else if (event.type === "DELETE_BLOG" && event.id) {
        // Filter out the blog with the matching ID
        setBlogs((prevBlogs) => prevBlogs.filter((blog): blog is BlogDetails => blog.id !== event.id));
      }
    };
  
    eventEmitter.subscribe(handleEvent);
    return () => {
      eventEmitter.unsubscribe(handleEvent); // Clean up listener on unmount
    };
  }, [fetchBlogs]);
  

  if (!user) {
    return <></>; // Render nothing if the user is not logged in
  }

  return (
    <>
      <div className="outer-cont ">
        <div className="sma-cont">
          <div className="fetch-title bebas"><div>Blog</div><div>List</div></div>
          <div className="robo">All your blogs at your finger tips</div>
        </div>
        <div className="blog-design ">
          {error && <div>{error}</div>}{" "}
          {/* Show error message if there is an error */}
          {loading ? (
            <div>Loading...</div> // Loading state
          ) : blogs.length === 0 ? (
            <div>No blogs available.</div> // If no blogs exist
          ) : (
            blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                title={blog.title}
                content={blog.content}
                id={blog.id}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};
