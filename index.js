import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// --- Middleware ---
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// --- In-memory Data Store ---
const posts = [];

// --- Routes ---
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/posts.ejs", (req, res) => {
  res.render("posts.ejs", { posts: posts });
});

app.get("/write.ejs", (req, res) => {
  res.render("write.ejs");
});

// --- New Post ---
app.post("/submit", (req, res) => {
  const newPost = {
    title: req.body["post-title"],
    content: req.body["post-content"],
  };
  posts.push(newPost);
  console.log("New post added: ", newPost);
  console.log("Current posts: ", posts);
  res.redirect("/posts.ejs");
});

// --- Delete Post ---
app.post("/delete", (req, res) => {
  const postIndexToDelete = parseInt(req.body.postIndex, 10);

  if (
    !isNaN(postIndexToDelete) &&
    postIndexToDelete >= 0 &&
    postIndexToDelete < posts.length
  ) {
    posts.splice(postIndexToDelete, 1);
    console.log(`Deleted post at index: ${postIndexToDelete}`);
    console.log("Current posts: ", posts);
  } else {
    console.error(`Invalid index received for deletion: ${req.body.postIndex}`);
  }

  res.redirect("/posts.ejs");
});

// --- Server Start ---
app.listen(port, () => {
  console.log(`Server is on port ${port}`);
});
