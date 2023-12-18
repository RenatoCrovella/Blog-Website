import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const port = 8000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use((req, res, next) => {
  const date = new Date().toISOString();
  console.log(`Route accessed at ${date}: ${req.method} ${req.url}`);
  next();
});

// cors
app.use(cors({ origin: true }));

// CONNECTS TO THE DATABASE:
async function connectToDatabase() {
  await mongoose.connect(`${process.env.MONGODB_URI}`);
  console.log("MongoDB is connected....");
}
await connectToDatabase();

// SETS THE SCHEMA OF A BLOG POST:
const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});
const blogPostModel = mongoose.model("BlogPost", blogPostSchema);

// CREATES A NEW BLOG POST ENTRY IN THE DATABASE:
async function createNewBlogPost(blogTitle, blogCover, blogContent) {
  const blog = new blogPostModel({
    title: blogTitle,
    cover: blogCover,
    content: blogContent,
  });
  await blog.save();
}

// SEARCHES FOR BLOG POSTS IN THE DATABASE AND RETURN THEM:
async function findBlogPosts() {
  const blogs = await blogPostModel.find();
  return blogs;
}

// HOME PAGE "GET" ROUTE CONFIG:
app.get("/", async (req, res) => {
  const type = "Post";
  const blogs = await findBlogPosts();
  res.json({ typeOfBlogs: type, blogs: blogs });
});

// ADD BLOG "POST" ROUTE CONFIG:
app.post("/addBlog", async (req, res) => {
  console.log(req.body);
  const blogTitle = req.body.blogTitle;
  const blogCover = req.body.blogCover;
  const blogContent = req.body.blogContent;

  await createNewBlogPost(blogTitle, blogCover, blogContent);
  const blogs = await findBlogPosts();
  res.json({ blogs });
});

//READ BLOG "POST" ROUTE CONFIG:
app.get("/read/:blogId", async (req, res) => {
  console.log("entrou no app.get()" + req.params);

  var blogObject = await blogPostModel.findOne({ _id: req.params.blogId });

  blogObject._id = req.params.blogId;
  res.json({ blogPost: blogObject });
});

// CHECK IF THE POST IS BEING DELETED OR EDITED:
app.post("/actions", async (req, res) => {
  console.log("LOG 02 : Actions????");
  const action = req.body.action;

  if (action === "delete") {
    await blogPostModel.findByIdAndDelete({ _id: req.body.blogId });
    console.log("blogpostdeleted");
    res.json({ message: "Blog deleted successfully" });
  } else if (action === "edit") {
    console.log("LOG 03A: SIM.... Actions!!! How?");
    var blog_ = await blogPostModel.findById({ _id: req.body.blogId });
    console.log("blog post found: " + blog_.title);
    res.json({ blogPost: blog_ });
  } else {
    console.log(action);
    res.sendStatus(404);
  }
});

// UPDATE BLOG "POST" ROUTE CONFIG:
app.put("/update/:blogId", async (req, res) => {
  console.log("entrou no app.put()" + req.body._id);

  try {
    console.log("Tentando..." + req.body._id + " / " + req.body.blogTitle);
    var blogObject = await blogPostModel.findByIdAndUpdate(
      { _id: req.body._id },
      {
        title: req.body.blogTitle,
        content: req.body.blogContent,
        cover: req.body.blogCover,
      },
      {new: true}
    );
    console.log(blogObject);
    res.json({ blogPost: blogObject });
  } catch (error) {
    console.log(error);
  }
});

// LISTEN PORT:
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
