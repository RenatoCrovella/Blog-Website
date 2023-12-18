import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic"],
    ["link", "blockquote", "code-block", "image"],
    [{ list: "ordered" }, { list: "bullet" }],
  ],
};

const EditBlog = ({ onEditBlog, blogPost }) => {
  const [blogTitle, setBlogTitle] = useState(blogPost.title);
  const [blogContent, setBlogContent] = useState(blogPost.content);
  const [blogCover, setBlogCover] = useState(blogPost.cover);

  const handleEditBlog = async (event) => {
    event.preventDefault();

    if (!blogTitle || !blogContent || !blogCover) {
      alert('Please enter a title and content for the blog');
      console.log(blogTitle + "/" + blogCover + "/" + blogContent)
      return;
    } else {
      const editedPost = {
        blogTitle,
        blogCover,
        blogContent,
        _id: blogPost._id,
      };
  
      await onEditBlog(editedPost); // Trigger the post's edit update in DetailedViewOfBlog
      setBlogTitle('');
      setBlogCover('');
      setBlogContent('');  
    }
  };

  return (
    <>
      <h1>Editing your post</h1>
      <form onSubmit={handleEditBlog} className="form-container">
        <input
          type="text"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
          placeholder="Enter title here"
        />
        <input
          type="text"
          value={blogCover}
          onChange={(e) => setBlogCover(e.target.value)}
          placeholder="Provide cover image URL"
        />
        {blogCover != "" && <img className="blog-cover" src={blogCover} />}
        <ReactQuill
          modules={modules}
          value={blogContent}
          onChange={setBlogContent}
          placeholder="What did you learn today?"
          theme="snow"
        />
        <div className="button-container mt-4">
          <button
            type="button"
            className="cancel-blog-creation btn btn-danger"
            onClick={() => {
              navigate("/", { replace: true });
            }}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default EditBlog;
