import express from "express";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;
const MAIN_FOLDER_NAME = dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(express.static(MAIN_FOLDER_NAME + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/app", (req, res) => {
    res.render("index.ejs");
});

app.get("/app/new-blog", (req, res) => {
    res.render("new-blog.ejs");
});

app.post("/app/postBlog", (req, res) => {
    console.log(req.body);

    res.send("Hola");
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});