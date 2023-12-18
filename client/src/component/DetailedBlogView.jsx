import { React, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import EditBlog from "./EditBlog";

const DetailedBlogView = ({ isLogged }) => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  console.log("Is editing? " + isEditing)
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let apiUrl;

    apiUrl = `http://localhost:8000/read/${blogId}`; // Default endpoint for "/"

    try {
      setIsLoading(true);
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setBlog(result.blogPost);
      setIsLoading(false);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (blog) => {
    // Handle delete action
    console.log("Delete action clicked");
    console.log(blog);
    try {
      const response = await fetch("http://localhost:8000/actions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "delete",
          blogId: blog._id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete the blog post");
      } else {
        console.log("response is ok!");
      }
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error deleting a blog post:", error);
    }
  };

  const handleEditClick = async (blog) => {
    try {
      const url = `http://localhost:8000/actions`;
      console.log("LOG 01" + url )
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "edit",
          blogId: blog._id,
        }),
      });
      console.log("LOG MALDITO" + response)
      if (!response.ok) {
        throw new Error("Failed to edit blog post");
      }
      setIsEditing(true);
    } catch (error) {
      console.error("Error editing blog:", error);
    }
  };

  const onEdit = async (editedPost) => {
    console.log(editedPost + " / " + JSON.stringify(editedPost));
    try {
      console.log(`http://localhost:8000/update/${editedPost._id}`);
      const response = await fetch(`http://localhost:8000/update/${editedPost._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedPost),
      });

      if (!response.ok) {
        throw new Error("Failed to update the post");
      }
      setIsEditing(false);
      console.log(response.json());
      setBlog(response.blogPost);
      fetchData();
    } catch (error) {
      console.error("Error editing blog post: ", error);
    }
  }

  return (
    <>
      {isLoading ? (
        <div className="container">Loading...</div>
      ) : (
        <>
          {isEditing ? (
            <div className="container blog-container-flexbox">
              <EditBlog blogPost={blog} onEditBlog={onEdit}/>
            </div>
          ) : (
            <>
              {blog != null ? (
                <div className="container blog-container-flexbox">
                  <h1>{blog.title}</h1>
                  <img src={blog.cover} alt="blog cover image" />
                  <div>{parse(blog.content)}</div>

                  {isLogged ? (
                    <form action="/actions" method="post">
                      <input
                        type="hidden"
                        name="blogType"
                        value={blog.type}
                      />
                      <input
                        type="hidden"
                        name="blogId"
                        value={blog._id}
                      />
                      <input
                        type="hidden"
                        name="blogTitle=="
                        value={blog.title}
                      />
                      <input
                        type="hidden"
                        name="blogCover"
                        value={blog.cover}
                      />
                      <input
                        type="hidden"
                        name="blogContent"
                        value={blog.content}
                      />
                      <div className="option-buttons">
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={(event) => {
                            handleDelete(blog);
                            event.preventDefault();
                          }}
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={(event) => {
                            handleEditClick(blog);
                            event.preventDefault();
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    </form>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <div className="container">There's something wrong.</div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default DetailedBlogView;
