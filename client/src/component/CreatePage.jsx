import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewBlog from "./NewBlog";

const CreatePage = ({ isLogged }) => {
  const [blogsCategory, setCategoryOfBlogs] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setError(null);
  }, []);

  const createNewBlog = async (blogData) => {
    try {
      const response = await fetch("http://localhost:8000/addBlog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        throw new Error("Failed to create new blog");
      }
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error creating new blog:", error);
    }
  };

  return (
    <>
      {isLogged ? (
        <>
          <h1 className="page-title">Create a new Post</h1>
          <div className="container new-blog-form">
            <NewBlog
              blogCategory={blogsCategory}
              onCreateBlog={createNewBlog}
            />
          </div>
        </>
      ) : (
        <>
          <div>
            <h1>Unauthorized operation</h1>
            <h2>You must be an administrator in order to create new posts.</h2>
          </div>
        </>
      )}
    </>
  );
};

export default CreatePage;
