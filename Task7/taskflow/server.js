const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const authMiddleware = require("./middleware/authMiddleware");
const app = express();
const PORT = 3000;
mongoose.connect("mongodb://127.0.0.1:27017/taskflow")
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });
const User = require("./models/User");
const Task = require("./models/Task");
// =========================================
// MIDDLEWARE
// =========================================

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


// =========================================
// TEMPORARY TASK STORAGE
// =========================================




// =========================================
// FRONTEND
// =========================================

app.get("/", (req, res) => {
    res.render("auth");
});
app.get("/app", (req, res) => {
    res.render("index");
});


// =========================================
// REST API — GET ALL TASKS
// =========================================

app.get("/api/tasks", authMiddleware, async(req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user.userId
        });

        res.json(tasks);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch tasks."
        });
    }
});


// =========================================
// REST API — CREATE TASK
// =========================================

app.post("/api/tasks", authMiddleware, async(req, res) => {
    try {
        const {
            title,
            description,
            priority,
            category,
            dueDate
        } = req.body;

        if (!title ||
            !description ||
            !priority ||
            !category ||
            !dueDate
        ) {
            return res.status(400).json({
                message: "All task fields are required."
            });
        }

        const task = new Task({
            title: title.trim(),
            description: description.trim(),
            priority,
            category,
            dueDate,
            user: req.user.userId
        });

        await task.save();

        res.status(201).json({
            message: "Task created successfully.",
            task
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create task."
        });
    }
});
// =========================================
// REST API — UPDATE TASK
// =========================================

app.put("/api/tasks/:id", authMiddleware, async(req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

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

        await task.save();

        res.json({
            message: "Task updated successfully.",
            task
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update task."
        });
    }
});


// =========================================
// REST API — DELETE TASK
// =========================================

app.delete("/api/tasks/:id", authMiddleware, async(req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found."
            });
        }

        res.json({
            message: "Task deleted successfully.",
            task
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete task."
        });
    }
});

app.post("/api/auth/register", async(req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email and password are required."
            });
        }

        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Username or email already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully.",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error during registration."
        });
    }
});
app.post("/api/auth/login", async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required."
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const token = jwt.sign({
                userId: user._id,
                username: user.username
            },
            "taskflow-secret-key", {
                expiresIn: "1h"
            }
        );

        res.json({
            message: "Login successful.",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error during login."
        });
    }
});
// =========================================
// TASK 7 - EXTERNAL API INTEGRATION
// =========================================
// =========================================
// TASK 7 - RATE LIMITING
// =========================================

const quoteLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: {
        message: "Too many quote requests. Please try again later."
    }
});
app.get("/api/quote", authMiddleware, quoteLimiter, async(req, res) => {
    try {
        const response = await fetch(
            "https://dummyjson.com/quotes/random"
        );

        if (!response.ok) {
            throw new Error("External API request failed.");
        }

        const data = await response.json();

        res.json({
            quote: data.quote,
            author: data.author
        });

    } catch (error) {
        console.error("Quote API error:", error);

        res.status(502).json({
            message: "Unable to fetch quote from external API."
        });
    }
});
// =========================================
// START SERVER
// =========================================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});