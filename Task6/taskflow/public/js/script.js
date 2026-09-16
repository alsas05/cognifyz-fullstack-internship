// =========================================
// TASK 5 - REST API FRONTEND
// =========================================


// Load tasks from the API
async function loadTasks() {

    try {

        const response = await fetch("/api/tasks", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        const tasks =
            await response.json();

        displayTasks(tasks);

    } catch (error) {

        console.error(
            "Error loading tasks:",
            error
        );
    }
}


// Display tasks dynamically
function displayTasks(tasks) {

    const taskList =
        document.getElementById("taskList");

    const emptyTasks =
        document.getElementById("emptyTasks");


    taskList.innerHTML = "";


    if (tasks.length === 0) {

        emptyTasks.style.display = "block";

        return;
    }


    emptyTasks.style.display = "none";


    tasks.forEach(task => {

        const taskCard =
            document.createElement("div");

        taskCard.className =
            "col-md-6 col-lg-4";


        taskCard.innerHTML = `

            <div class="api-task-card">

                <div class="task-card-top">

                    <span class="task-id">
                        #${task._id}
                    </span>

                    <span class="task-priority">
                        ${task.priority}
                    </span>

                </div>

                <h4>
                    ${task.title}
                </h4>

                <p>
                    ${task.description}
                </p>

                <div class="task-meta">

                    <span>
                        📁 ${task.category}
                    </span>

                    <span>
                        📅 ${task.dueDate}
                    </span>

                </div>

                <div class="task-actions">

                    <button
                        class="btn btn-sm btn-outline-primary"
                        onclick="editTask('${task._id}')"
                    >
                        Edit
                    </button>

                    <button
                        class="btn btn-sm btn-outline-danger"
                        onclick="deleteTask('${task._id}')"
                    >
                        Delete
                    </button>

                </div>

            </div>

        `;


        taskList.appendChild(taskCard);

    });
}


// =========================================
// CREATE TASK USING POST API
// =========================================

async function createTaskAPI(taskData) {

    try {

        const response =
            await fetch("/api/tasks", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(taskData)

            });


        const result =
            await response.json();


        if (!response.ok) {

            alert(result.message);

            return;
        }


        console.log(
            "Created task:",
            result.task
        );


        await loadTasks();

    } catch (error) {

        console.error(
            "Error creating task:",
            error
        );
    }
}


// =========================================
// DELETE TASK
// =========================================

async function deleteTask(id) {
    const confirmed = confirm("Are you sure you want to delete this task?");

    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(`/api/tasks/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.message);
            return;
        }

        alert("Task deleted successfully!");

        await loadTasks();

    } catch (error) {
        console.error("Error deleting task:", error);
    }
}


// =========================================
// UPDATE TASK
// =========================================

async function editTask(id) {
    const newTitle = prompt("Enter the new task title:");

    if (!newTitle || newTitle.trim() === "") {
        return;
    }

    try {
        const response = await fetch(`/api/tasks/${id}`, {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },

            body: JSON.stringify({
                title: newTitle.trim()
            })
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.message);
            return;
        }

        alert("Task updated successfully!");

        await loadTasks();

    } catch (error) {
        console.error("Error updating task:", error);
    }
}


// =========================================
// INITIAL LOAD
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    loadTasks
);
// =========================================
// FORM SUBMISSION USING POST API
// =========================================

async function handleTaskSubmit(event) {

    event.preventDefault();

    // Run existing validation
    if (!validateForm()) {
        return false;
    }

    const taskData = {

        title: document.getElementById("title").value.trim(),

        description: document.getElementById("description").value.trim(),

        priority: document.getElementById("priority").value,

        category: document.getElementById("category").value,

        dueDate: document.getElementById("dueDate").value
    };


    try {

        const response = await fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(taskData)
        });


        const result = await response.json();


        if (!response.ok) {

            alert(result.message);

            return false;
        }


        console.log("Task created:", result.task);

        alert("Task created successfully!");


        // Clear the form
        document.getElementById("taskForm").reset();


        // Reload tasks from the API
        await loadTasks();


        // Go to task list
        window.location.hash = "#task-list";

    } catch (error) {

        console.error(
            "Error creating task:",
            error
        );

        alert(
            "Unable to create task. Please try again."
        );
    }

    return false;
}
// ==================== AUTHENTICATION ====================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async(event) => {

        event.preventDefault();

        const username =
            document.getElementById("registerUsername").value;

        const email =
            document.getElementById("registerEmail").value;

        const password =
            document.getElementById("registerPassword").value;

        const message =
            document.getElementById("registerMessage");

        try {

            const response = await fetch("/api/auth/register", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });

            const data = await response.json();

            message.textContent = data.message;

            if (response.ok) {

                message.className = "mt-3 text-success";

                registerForm.reset();

            } else {

                message.className = "mt-3 text-danger";

            }

        } catch (error) {

            console.error(error);

            message.textContent = "Registration failed.";

            message.className = "mt-3 text-danger";
        }

    });

}


const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async(event) => {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value;

        const password =
            document.getElementById("loginPassword").value;

        const message =
            document.getElementById("loginMessage");

        try {

            const response = await fetch("/api/auth/login", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            message.textContent = data.message;

            if (response.ok) {

                message.className = "mt-3 text-success";

                localStorage.setItem("token", data.token);

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                loginForm.reset();

                window.location.href = "/app";

            } else {

                message.className = "mt-3 text-danger";

            }

        } catch (error) {

            console.error(error);

            message.textContent = "Login failed.";

            message.className = "mt-3 text-danger";
        }

    });

}