import "../scss/dashboard.scss";
import "../index.css";
import { useUser } from "../context/UserContext";
import { UserDetails } from "../types/UserDetails";
import testImage from "../assets/noimage.svg";
// import dashboardImage from '../assets/dashboard.svg';
import React, { useState,useEffect } from "react";
import { DashNav } from "./DashNav";
// import NavBar from "./NavBar";

const Dashboard: React.FC = () => {
  const { user, setUser } = useUser(); // Get user and setUser from context

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<UserDetails>({
    name: user?.name || "",
    email: user?.email || "",
    password: user?.password || "",
    age: user?.age || 18,
    sex: user?.sex || "", // Adjusting for the 'sex' field
    bio: user?.bio || "",
    linkedin: user?.linkedin || "",
    instagram: user?.instagram || "",
    github: user?.github || "",
    photo:user?.photo || "",
  });

  useEffect(() => {
    if (user && user.email) {
      const fetchUserData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`https://dreamnote-go.onrender.com/v1/getDetails`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email }), // Send email in the request body
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log(data)
            setFormData(data); // Directly use the returned fields to populate formData
          } else {
            setMessage("Failed to fetch user details.");
          }
        } catch (error) {
          setMessage("Error fetching user details.");
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchUserData();
    }
  }, [user]);

  const uploadImage = async (file: File): Promise<string> => {
    const imageFormData = new FormData(); // Renamed to avoid conflict
    imageFormData.append("file", file);

    try {
      const response = await fetch(`https://dreamnote-go.onrender.com/v1/uploadImage`, {
        method: "POST",
        body: imageFormData,
      });

      if (response.ok) {
        const data = await response.json(); // Assuming backend sends back the URL
        console.log(data.url)
        return data.url; // Return the URL
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the selected file
    if (file) {
      try {
        setIsLoading(true); // Show a loading state
        const imageUrl = await uploadImage(file); // Upload the image and get the URL
        console.log("At least the request was sent properly")
        console.log("Upload is successful and we can accessing the photo public url")
        setFormData((prev) => ({
          ...prev,
          photo: imageUrl, // Update the photo field in formData
        }));
        setMessage("Image uploaded successfully!");
      } catch (error) {
        setMessage("Failed to upload image. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };
  const handleImageClick = () => {
    document.getElementById("file-input")?.click(); // Trigger the hidden file input
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value, // Ensure age is a number
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      setMessage("Name and email are required!");
      return;
    }

    setIsLoading(true);
    setMessage(null); // Clear any previous messages

    try {
      const response = await fetch("http://localhost:8080/v1/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }), //
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser); // Update context with the updated user
        setMessage("Profile updated successfully!");
      } else {
        const error = await response.json();
        setMessage(`Update failed: ${error.message || "Unknown error"}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(`Update failed: ${error.message}`);
      } else {
        setMessage("Update failed: An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <>
        {/* <img src={dashboardImage} alt="dashboard background"/> */}
        <DashNav />
        <div className="big-container alt-text robo">
          Log in for your Dashboard...
        </div>
      </>
    );
  }

  return (
    <>
      <DashNav />
      <div className="big-container ">
        <form className="form" onSubmit={handleSubmit}>
          <div className=" mid-container-1 margin-ri ">
            <div className="image-container ">
            <img
                src={formData.photo || testImage} // Display the uploaded image or fallback
                alt="Uploaded preview"
                className="image "
                onClick={handleImageClick} // Open file input when image is clicked
              />
              {/* Hidden file input */}
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange} // Handle the file change
                style={{ display: "none" }} // Hide the file input
              />
            </div>
            <div className=" details-container ">
              <div className="details ">
                <input
                  className="input-style "
                  name="name"
                  placeholder="Name"
                  type="text"
                  value={formData.name || "Name"}
                  onChange={handleChange}
                  required
                />
                <input
                  className="input-style "
                  name="email"
                  placeholder="Email"
                  type="name"
                  value={formData.email || "Email"}
                  onChange={handleChange}
                  readOnly
                  required
                />
                <input
                   className="input-style "
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={user.password || "Password"}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="details ">
                <input
                  className="input-style "
                  name="age"
                  placeholder="0"
                  type="number"
                  value={formData.age || 18}
                  onChange={handleChange}
                  // required
                />
                <input
                  className="input-style border"
                  name="sex"
                  placeholder="Gender"
                  type="string"
                  value={formData?.sex || "Gender"}
                  onChange={handleChange}
                  // required
                />
              </div>
              <div className=" small-container-2 ">
                <input
                  className="input-style "
                  name="linkedin"
                  placeholder="Linkedin url"
                  type="text"
                  value={formData?.linkedin || "linkedin url"}
                  onChange={handleChange}
                  // required
                />
                <input
                  className="input-style "
                  name="github"
                  placeholder="Github url"
                  type="text"
                  value={formData?.github || "Github url"}
                  onChange={handleChange}
                  // required
                />
                <input
                  className="input-style "
                  name="instagram"
                  placeholder="Instagram url"
                  type="text"
                  value={formData?.instagram || "Instagram url"}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className=" mid-container-1 ">
            <div className="txt-cont">
            <textarea
              className="text-area "
              name="bio"
              placeholder="Write about yourself..."
              value={formData?.bio || "Tell me about yourself..."}
              onChange={handleChange}
              required
              rows={15} // Specifies the number of visible lines in the textarea
              cols={120} // Specifies the width of the textarea in characters (optional)
            />
            </div>
            
          </div>
          <div className=" last-container robo ">
            <button className="save-btn robo " disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
        {message && <div className="message ">{message}</div>}
      </div>
    </>
  );
};

export default Dashboard;
