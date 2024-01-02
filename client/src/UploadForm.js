import React, { useState, useRef } from "react";
import axios from "axios";
import "./UploadForm.css";

function UploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(); // Reference to the file input

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", file);

    try {
      await axios.post(
        "https://dev-gallery-qwds.onrender.com/gallery",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Image uploaded successfully");
      // Clear the form
      setTitle("");
      setDescription("");
      setFile(null);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading image", error);
      alert(error.response?.data || "An error occurred during upload");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      ></textarea>
      <input
        type="file"
        ref={fileInputRef} // Attach the ref to the file input
        onChange={(e) => setFile(e.target.files[0])}
        required
      />
      <button type="submit">Upload Image</button>
    </form>
  );
}

export default UploadForm;
