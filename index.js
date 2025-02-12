import express from "express";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;
const MAIN_FOLDER_NAME = dirname(fileURLToPath(import.meta.url));

var blogs = [];

// Middleware
app.use(express.static(MAIN_FOLDER_NAME + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/app", (req, res) => {
    res.render("index.ejs");
});

app.get("/app/new-blog", (req, res) => {
    res.render("new-blog.ejs");
});

app.get("/app/all-blogs", (req, res) => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    
    res.render("all-blogs.ejs", {
        allBlogs: blogs,
        date: formattedDate
    })
});

app.post("/app/postBlog", (req, res) => {
    console.log(req.body);
    blogs.push(req.body);

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    res.render("blog.ejs", {
        blogTitle: req.body["blogTitle"],
        blogContent: req.body["blogContent"],
        newPost: true,
        date: formattedDate
    });
});

app.post("/app/blog", (req, res) => {
    console.log(req.body);
    // blogs.push(req.body);

    let blogIndex = req.body["blogIndex"];
    console.log("Blog at index " + blogIndex + ": " + blogs[blogIndex]["blogTitle"]);

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    res.render("blog.ejs", {
        blogTitle: blogs[blogIndex]["blogTitle"],
        blogContent: blogs[blogIndex]["blogContent"],
        date: formattedDate
    });
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});