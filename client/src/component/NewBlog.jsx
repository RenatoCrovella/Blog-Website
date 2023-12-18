import React, { useState } from 'react';
import ReactQuill from "react-quill";
import { useNavigate } from 'react-router-dom';
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic"],
    ["link", "blockquote", "code-block", "image"],
    [{ list: "ordered" }, { list: "bullet" }],
    
  ]
};


const NewBlog = ({ typeOfBlog, onCreateBlog }) => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCover, setBlogCover] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const navigate = useNavigate();

  const handleCreateBlog = async (event) => {
    event.preventDefault();

    if (!blogTitle || !blogContent || !blogCover) {
      alert('Please enter a title and content for the blog');
      console.log(blogTitle + "/" + blogCover + "/" + blogContent)
      return;
    } else {
      const blogData = {
        blogType: typeOfBlog,
        blogTitle,
        blogCover,
        blogContent,
      };
  
      await onCreateBlog(blogData); // Trigger the creation of a new blog
      setBlogTitle('');
      setBlogCover('');
      setBlogContent('');  
    }
  };

  function handleChange(e) {
    console.log(e.target.value);
    setBlogCover(e.target.value);
  }

  return (
    <form onSubmit={handleCreateBlog} className="form-container">
      <input type="text" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} placeholder="Enter title here" />
      <input type="text"value={blogCover} onChange={handleChange} placeholder='Provide cover image URL' />
      { blogCover != "" && <img className="blog-cover" src={blogCover} /> }
      <ReactQuill modules={modules} onChange={setBlogContent} placeholder="What did you learn today?" theme="snow" />
      <div className="button-container mt-4">
        <button type="button" className="cancel-blog-creation btn btn-danger" onClick={() => {navigate("/", {replace: true})}}>Cancel</button>
        <button type="submit" className="btn btn-success">Save</button>
      </div>
    </form>
  );
};

export default NewBlog;
