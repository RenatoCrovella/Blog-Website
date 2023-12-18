import React from 'react';
import parse from "html-react-parser";

/**
 * This component renders a Blog post.
 *
 * @param {json} blog The post's json object, with title, cover, content, id and type.
 * @param {function} onReadMore Function to carry out the user to a detailed view of the post. 
 * @returns {BlogItem} A React element that renders a blog post to the user.
 */

const blogStyle = {
    "marginTop": '100px',
    // "display": 'flex',
    "minHeight": '100px',
    "border": '1px solid black',
    "borderRadius": '20px',
    "padding": '40px',
    "boxShadow": '4px 4px 10px #d9d9d9',
    "backgroundColor": "#ffffff",
};


const BlogItem = ({ blog, onReadMore }) => {
    return (
        <div className="blog-item m-2 p-2" style={blogStyle}>
            <h2 style={{fontSize: "3.5rem"}}>{blog.title}</h2>
            { blog.cover && <img className="blog-cover" src={blog.cover} /> }
            <div>{ blog.content.length > 500 ? parse(blog.content.substr(0,500)+"...") : parse(blog.content)}</div>            
            <div className='container'>
                <form>
                    <input type="hidden" name="blogId" value={blog._id} />
                    <button type="submit" className="btn btn-outline-success" onClick={(event) => {
                        console.log("This detail is good / " + blog._id);
                        onReadMore(blog._id);
                        event.preventDefault();
                    }}> Read more </button>
                </form>
            </div>
        </div>
    );
};

export default BlogItem;
