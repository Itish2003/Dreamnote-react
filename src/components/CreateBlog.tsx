import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../scss/blog.scss";
import "../index.css";
import { useUser } from "../context/UserContext"; // Assuming this is where the user context is defined
import { BlogDetails } from "../types/BlogDetails"; // Assuming BlogDetails interface exists
import eventEmitter from "../utils/eventEmitter"; // Import eventEmitter


export const CreateBlog = () => {
  const { user } = useUser(); // Get user from context (email, etc.)
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form default submit action

    if (!user?.email) {
      setError("User email is not found.");
      return;
    }

    const blogDetails: Omit<
      BlogDetails,
      "id" | "createdAt" | "updatedAt" | "deletedAt"
    > = {
      title,
      content,
    };

    setIsSubmitting(true); // Disable the form while submitting
    setError(null); // Reset error state

    try {
      // Call createBlog function to make the API request
      const createdBlog = await createBlog(blogDetails, user.email);

      if (!createdBlog) {
        setError("Failed to create the blog.");
        return;
      }

      eventEmitter.emit({ type: "CREATE_BLOG", blog: createdBlog });

      // Reset form after successful submission
      setTitle("");
      setContent("");
      console.log("Blog created successfully", createdBlog);
    } catch (error) {
      console.error("Error creating blog:", error);
      setError("An error occurred while creating the blog.");
    } finally {
      setIsSubmitting(false); // Re-enable the form after submission
    }
  };

  // Function to create a blog by making a POST request to the backend
  const createBlog = async (
    blogDetails: Omit<
      BlogDetails,
      "id" | "createdAt" | "updatedAt" | "deletedAt"
    >,
    userEmail: string
  ): Promise<BlogDetails | null> => {
    try {
      // Generate a unique blog_id
      const blogId = uuidv4();

      // Prepare the payload
      const payload = {
        email: userEmail,
        blog: {
          id: blogId,
          ...blogDetails, // Spreading the rest of the blogDetails properties
        },
      };

      // Send the POST request to the backend API
      const response = await fetch(`https://dreamnote-go.onrender.com/v1/createBlog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Check if the request was successful
      if (!response.ok) {
        console.error("Failed to create blog:", response.statusText);
        return null;
      }

      // Parse the response and return the created blog
      const createdBlog: BlogDetails = await response.json();
      console.log("Blog successfully created:", createdBlog);
      return createdBlog;
    } catch (error) {
      console.error("Error creating blog:", error);
      return null;
    }
  };

  if (!user) {
    return (
      <>
        <div className="blog-container not-logged">
          <div className="not-logged-title bebas ">Blog Overview</div>
          <div className="small-txt robo">Log in to view your blogs...</div>
        </div>
      </>
    );
  }

  return (
    <div className="blog-container ">
      <div className="blog-entry">
        <div className="blog-entry-txt bebas">Create Blog
        </div>
        <div className="small-txt robo">
          "All your blogs are available below..."
        </div>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <form className="form-style " onSubmit={handleSubmit}>
        <div className="create-title">
          <label className="label-style bebas " htmlFor="title">
            Title:
            <br />
          </label>
          <input
            className="input-style-blog robo"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="content-area">
          <label className="label-style bebas" htmlFor="content">
            Content:
            <br />
          </label>
          <textarea
            className="txt-style"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={25} // Specifies the number of visible lines in the textarea
            cols={140} // Specifies the width of the textarea in characters (optional)
          />
        </div>

        <button className="blog-btn robo" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
};
