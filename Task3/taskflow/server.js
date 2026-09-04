const express = require("express");

const app = express();
const PORT = 3000;
// Temporary server-side storage
const tasks = [];
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

    const {
        title,
        description,
        priority,
        category,
        dueDate
    } = req.body;


    // =========================
    // SERVER-SIDE VALIDATION
    // =========================

    if (!title || title.trim().length < 3) {
        return res.status(400).send(
            "Invalid task title. It must contain at least 3 characters."
        );
    }

    if (!description || description.trim().length < 10) {
        return res.status(400).send(
            "Invalid description. It must contain at least 10 characters."
        );
    }

    if (!priority) {
        return res.status(400).send(
            "Please select a priority."
        );
    }

    if (!category) {
        return res.status(400).send(
            "Please select a category."
        );
    }

    if (!dueDate) {
        return res.status(400).send(
            "Please select a due date."
        );
    }


    // =========================
    // CREATE VALIDATED TASK
    // =========================

    const task = {
        title: title.trim(),
        description: description.trim(),
        priority: priority,
        category: category,
        dueDate: dueDate
    };


    // =========================
    // TEMPORARY STORAGE
    // =========================

    tasks.push(task);

    console.log("Validated task:", task);
    console.log("All stored tasks:", tasks);


    // =========================
    // RENDER SUCCESS PAGE
    // =========================

    res.render("success", task);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});