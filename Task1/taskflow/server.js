const express = require("express");

const app = express();
const PORT = 3000;

// Set EJS as the template engine
app.set("view engine", "ejs");

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Serve files from the public folder
app.use(express.static("public"));

// Home page
app.get("/", (req, res) => {
    res.render("index");
});

// Handle form submission
app.post("/tasks", (req, res) => {
    const { title, description } = req.body;

    res.render("success", {
        title: title,
        description: description
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});