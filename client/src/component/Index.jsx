import React, { useState, useEffect } from "react";
import BlogItem from "./BlogItem"; 
import { useNavigate } from "react-router-dom";

const Index = ({ route }) => {
  const [typeOfBlogs, setTypeOfBlogs] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(route);
  }, [route]);

  const fetchData = async (route) => {
    let apiUrl;

    apiUrl = "http://localhost:8000"; // Default endpoint for "/"

    switch (route) {
      case "/technical":
        apiUrl = "http://localhost:8000/technical";
        break;
      case "/other":
        apiUrl = "http://localhost:8000/other";
        break;
      default:
        apiUrl = "http://localhost:8000"; // Default endpoint for "/"
        break;
    }

    try {
      //Try to connect to the API and return the related blogs (filtered by type)
      setIsLoading(true);
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setTypeOfBlogs(result.typeOfBlogs);
      setBlogs(result.blogs);
      setIsLoading(false);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setIsLoading(false);
    }
  };

  const handleDetailedViewOfBlog = (idOfBlog) => {
    console.log("/read/" + idOfBlog);
    navigate("/read/" + idOfBlog);
  };

  return (
    <>
      <h2 className="blog-type">Recent posts</h2>

      {isLoading ? (
        <div className="container">Loading...</div>
      ) : (
        <>
          {blogs.length !== 0 ? (
            <div className="container blog-container-flexbox">
              {blogs.map((blog) => (
                <BlogItem
                  key={blog._id}
                  blog={blog}
                  onReadMore={handleDetailedViewOfBlog}
                />
              ))}
            </div>
          ) : (
            <div className="container">No blogs available.</div>
          )}
        </>
      )}
    </>
  );
};

export default Index;
