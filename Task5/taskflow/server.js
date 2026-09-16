const express = require("express");

const app = express();
const PORT = 3000;


// =========================================
// MIDDLEWARE
// =========================================

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


// =========================================
// TEMPORARY TASK STORAGE
// =========================================

let tasks = [];

let nextId = 1;


// =========================================
// FRONTEND
// =========================================

app.get("/", (req, res) => {
    res.render("index");
});


// =========================================
// REST API — GET ALL TASKS
// =========================================

app.get("/api/tasks", (req, res) => {

    res.json(tasks);

});


// =========================================
// REST API — CREATE TASK
// =========================================

app.post("/api/tasks", (req, res) => {

    const {
        title,
        description,
        priority,
        category,
        dueDate
    } = req.body;


    if (!title || !description || !priority || !category || !dueDate) {

        return res.status(400).json({
            message: "All task fields are required."
        });

    }


    const task = {

        id: nextId++,

        title: title.trim(),

        description: description.trim(),

        priority,

        category,

        dueDate
    };


    tasks.push(task);


    res.status(201).json({
        message: "Task created successfully.",
        task
    });

});


// =========================================
// REST API — UPDATE TASK
// =========================================

app.put("/api/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const task = tasks.find(task => task.id === id);


    if (!task) {

        return res.status(404).json({
            message: "Task not found."
        });

    }


    const {
        title,
        description,
        priority,
        category,
        dueDate
    } = req.body;


    if (title !== undefined) {
        task.title = title.trim();
    }

    if (description !== undefined) {
        task.description = description.trim();
    }

    if (priority !== undefined) {
        task.priority = priority;
    }

    if (category !== undefined) {
        task.category = category;
    }

    if (dueDate !== undefined) {
        task.dueDate = dueDate;
    }


    res.json({
        message: "Task updated successfully.",
        task
    });

});


// =========================================
// REST API — DELETE TASK
// =========================================

app.delete("/api/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const taskIndex =
        tasks.findIndex(task => task.id === id);


    if (taskIndex === -1) {

        return res.status(404).json({
            message: "Task not found."
        });

    }


    const deletedTask =
        tasks.splice(taskIndex, 1)[0];


    res.json({
        message: "Task deleted successfully.",
        task: deletedTask
    });

});


// =========================================
// START SERVER
// =========================================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});