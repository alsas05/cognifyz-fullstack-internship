# 🚀 Cognifyz Full Stack Development Internship

A complete collection of my work completed during my **Full Stack Development Internship at Cognifyz Technologies**.

This repository contains **8 progressively advanced tasks** developed around a task-management web application called **TaskFlow**.

The project evolved from a basic Express.js and EJS application into a full-stack application featuring REST APIs, MongoDB, authentication, external API integration, Redis caching, background job processing, and custom middleware.

---

## 👨‍💻 About TaskFlow

**TaskFlow** is a task-management application developed progressively throughout the internship.

Instead of creating separate unrelated projects for each task, the same application was continuously enhanced as new concepts and technologies were introduced.

Each task is maintained in its own folder to preserve the development progression.

```text
Task 1
   ↓
Task 2
   ↓
Task 3
   ↓
Task 4
   ↓
Task 5
   ↓
Task 6
   ↓
Task 7
   ↓
Task 8

## 🚀 Project Overview

TaskFlow is a progressive full-stack web application developed as part of my Full Stack Development Internship at Cognifyz Technologies.

The project was built step-by-step across 8 tasks, with each level introducing more advanced concepts in frontend development, backend development, APIs, databases, authentication, external services, caching, middleware, and background processing.

Instead of creating separate projects for every task, TaskFlow evolves continuously from a basic Express application into a more advanced full-stack system.

---

## 📌 Task Progression

### Task 1 — Basic HTML Structure & Server Interaction

Implemented the initial TaskFlow application using:

- HTML
- Node.js
- Express.js
- EJS
- Server-side rendering
- Basic form submission
- Express routes

The application introduced a basic task creation workflow where submitted task details were processed by the Express server and rendered using EJS.

---

### Task 2 — Form Validation & Server-Side Storage

Enhanced the application with more detailed task forms and validation.

#### Features

- Client-side form validation
- Server-side validation
- Multiple form fields
- Task priority selection
- Task category selection
- Due-date handling
- Temporary server-side storage
- Dynamic EJS rendering

This task strengthened the connection between frontend form handling and backend validation.

---

### Task 3 — Advanced CSS & Responsive Design

Improved the user interface and introduced responsive web design.

#### Features

- Bootstrap 5
- Responsive layouts
- Multiple dashboard sections
- Navigation bar
- Hero section
- Feature section
- Task creation interface
- CSS transitions
- CSS animations
- Responsive media queries
- Improved visual design

The application was transformed from a basic form into a structured dashboard-style interface.

---

### Task 4 — Advanced Validation & Dynamic DOM Manipulation

Introduced more advanced client-side functionality.

#### Features

- Password validation
- Password strength checker
- Uppercase character validation
- Number validation
- Special character validation
- Minimum password length validation
- Dynamic DOM manipulation
- Priority-based dynamic messages
- Hash-based client-side routing
- Interactive UI updates
- CSS animations

Hash routes implemented:

```text
#/dashboard
#/create

Task 5 — REST API & Frontend Interaction

Introduced a complete REST API and connected the frontend with the backend using JavaScript fetch().

REST API Endpoints
GET     /api/tasks
POST    /api/tasks
PUT     /api/tasks/:id
DELETE  /api/tasks/:id
Features
RESTful API design
CRUD operations
GET requests
POST requests
PUT requests
DELETE requests
JavaScript Fetch API
Dynamic task rendering
Edit functionality
Delete functionality
Frontend-backend communication

This task established the foundation for building a proper API-driven application.

Task 6 — MongoDB & User Authentication

Integrated a database and implemented authentication and authorization.

Technologies
MongoDB
Mongoose
bcrypt.js
JSON Web Tokens (JWT)
Features
User registration
User login
Password hashing
JWT authentication
Protected API routes
User-specific task ownership
Authorization checks
MongoDB task storage
MongoDB user storage
CRUD operations with persistent data
Separate authentication page
Protected TaskFlow dashboard

Each task is associated with the authenticated user, preventing users from accessing other users' tasks.

Task 7 — External API Integration & API Security

Introduced third-party API integration and advanced API handling.

Features
External API integration
Dynamic daily motivation quotes
JavaScript Fetch API
JWT-protected external API route
API error handling
HTTP status handling
Rate limiting
OAuth 2.0 concepts

The application integrates with:

https://dummyjson.com/quotes/random

The quote endpoint is protected using JWT authentication.

Rate limiting was implemented using express-rate-limit.

The quote API allows:

5 requests per minute

Additional requests are rejected with:

HTTP 429 — Too Many Requests
OAuth 2.0 Concepts Covered

The project also includes a visual explanation of:

Authorization
      ↓
User Consent
      ↓
Authorization Code
      ↓
Access Token
      ↓
Protected Resource

The OAuth section is educational and demonstrates the concepts rather than implementing a real third-party OAuth login provider.

Task 8 — Redis, Background Jobs & Middleware

The final task introduced advanced server-side functionality.

Technologies
Redis
ioredis
BullMQ
Express middleware
Background workers
Redis Caching

The daily motivation quote API uses Redis for caching.

The flow is:

User Request
     ↓
Check Redis Cache
     ↓
 ┌───────────────┐
 │ Cache Exists? │
 └───────────────┘
      ↓       ↓
     YES      NO
      ↓       ↓
 Return     External API
 Cached        ↓
 Quote       Get Quote
                ↓
          Store in Redis
                ↓
            Return Quote

The cached quote expires after:

60 seconds
Background Job Processing

BullMQ is used to process background jobs.

When a new task is created:

Create Task
    ↓
Save Task to MongoDB
    ↓
Add Job to BullMQ Queue
    ↓
Background Worker
    ↓
Process Job
    ↓
Job Completed

A dedicated worker is implemented in:

jobs/taskProcessor.js
Express Middleware

A custom request logging middleware was added.

It records:

Request method
Request URL
HTTP status code
Response time
Timestamp

Example:

[2026-09-16T...] POST /api/tasks → 201 (25ms)
🛠️ Technology Stack
Frontend
HTML5
CSS3
JavaScript
Bootstrap 5
EJS
Fetch API
DOM Manipulation
Backend
Node.js
Express.js
EJS
REST APIs
Express Middleware
Database
MongoDB
Mongoose
Authentication & Security
bcrypt.js
JSON Web Tokens (JWT)
Authorization Middleware
API Rate Limiting
External API
DummyJSON Quotes API
Caching & Background Processing
Redis
ioredis
BullMQ
Development Tools
Visual Studio Code
Git
GitHub
npm
MongoDB Server
Memurai Developer Edition
📁 Project Structure
Cognifyz/
│
├── .gitignore
├── README.md
│
├── Task1/
│   └── taskflow/
│
├── Task2/
│   └── taskflow/
│
├── Task3/
│   └── taskflow/
│
├── Task4/
│   └── taskflow/
│
├── Task5/
│   └── taskflow/
│
├── Task6/
│   └── taskflow/
│
├── Task7/
│   └── taskflow/
│
└── Task8/
    └── taskflow/

Each task contains its own version of the TaskFlow application.

This structure preserves the progression of the project from Task 1 through Task 8.

🔐 Authentication Flow
User
 ↓
Register
 ↓
Password Hashing using bcrypt.js
 ↓
MongoDB
 ↓
Login
 ↓
Password Verification
 ↓
JWT Generation
 ↓
JWT Stored on Client
 ↓
Authenticated API Requests
 ↓
Authorization Middleware
 ↓
Protected Resources
🗄️ Database Structure
User
User
├── username
├── email
└── password

Passwords are stored as bcrypt hashes rather than plain text.

Task
Task
├── title
├── description
├── priority
├── category
├── dueDate
└── user

The user field establishes ownership of the task.

🌐 API Endpoints
Authentication
POST /api/auth/register
POST /api/auth/login
Tasks
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
External API
GET /api/quote

The quote endpoint requires JWT authentication and is rate-limited.

⚡ Task 8 Architecture
                 ┌──────────────────┐
                 │     Frontend     │
                 │ HTML/CSS/JS/EJS  │
                 └────────┬─────────┘
                          │
                          ↓
                 ┌──────────────────┐
                 │   Express.js     │
                 │     Server       │
                 └───────┬──────────┘
                         │
              ┌──────────┼──────────┐
              │          │          │
              ↓          ↓          ↓
         MongoDB      Redis      BullMQ
              │          │          │
              │          │          ↓
              │          │    Background Worker
              │          │
              │          ↓
              │      Cached Data
              │
              ↓
          Persistent
            Data
▶️ Running the Project
1. Clone the Repository
git clone https://github.com/alsas05/cognifyz-fullstack-internship.git
2. Open the Project
cd cognifyz-fullstack-internship
3. Navigate to a Task

For example:

cd Task8/taskflow
4. Install Dependencies
npm install
5. Start MongoDB

On Windows:

& "C:\Program Files\MongoDB\Server\8.3\bin\mongod.exe" --dbpath "C:\data\db"
6. Start Redis / Memurai

Make sure the Memurai service is running.

To test Redis:

& "C:\Program Files\Memurai\memurai-cli.exe" ping

Expected output:

PONG
7. Start the TaskFlow Server
node server.js

The application will run at:

http://localhost:3000
8. Start the Background Worker

Open another terminal:

node jobs/taskProcessor.js

The worker should display:

TaskFlow background worker is running.
🧪 Task 8 Testing

The final implementation was tested for:

MongoDB connection
Redis connection
Redis cache miss
External API request
Redis cache storage
Redis cache hit
Background job creation
BullMQ worker processing
Middleware request logging
JWT authentication
API rate limiting
CRUD operations

Example Redis flow:

Cache miss
     ↓
Fetch external quote
     ↓
Store quote in Redis
     ↓
Next request
     ↓
Quote served from Redis cache

Example rate-limit test:

200
200
200
200
200
429
429
📚 What I Learned

Throughout the eight tasks, I developed practical experience with:

Frontend development
Backend development
Node.js
Express.js
EJS
JavaScript
REST API development
CRUD operations
MongoDB
Mongoose
Authentication
Authorization
Password hashing
JWT
API security
External API integration
Rate limiting
OAuth 2.0 concepts
Redis
Caching
BullMQ
Background job processing
Express middleware
Git and GitHub
Debugging
Full-stack application architecture
📈 Learning Progression
Task 1
Basic Server & HTML
        ↓
Task 2
Validation & Form Handling
        ↓
Task 3
Responsive UI & CSS
        ↓
Task 4
Advanced JavaScript & DOM
        ↓
Task 5
REST API & CRUD
        ↓
Task 6
MongoDB & Authentication
        ↓
Task 7
External APIs & API Security
        ↓
Task 8
Redis, BullMQ & Middleware

The project progressively evolved from a simple Express application into a more feature-rich full-stack system.

🎥 Internship Documentation

Each task was developed, tested, and documented as part of the Cognifyz Full Stack Development Internship.

The development journey includes:

Task implementation
Debugging
API testing
Database integration
Authentication testing
Redis testing
Background worker testing
Screen recordings
LinkedIn progress updates
🔮 Future Improvements

Possible future improvements include:

Production deployment
Environment variables for secrets
Refresh-token authentication
Secure cookie-based authentication
Real OAuth provider integration
Advanced task filtering
Task search
Pagination
Automated testing
API documentation
Docker-based deployment
Production Redis configuration
Improved background job workflows
Role-based access control
Improved UI/UX
Monitoring and logging
👩‍💻 Author

Alsa S

B.Tech Computer Science & Engineering Student

GitHub:
https://github.com/alsas05

LinkedIn:
https://www.linkedin.com/in/alsa-s-35566b2a8

🙏 Acknowledgement

I would like to thank Cognifyz Technologies for providing this internship opportunity and allowing me to strengthen my practical full-stack development skills through progressive hands-on tasks.

This internship helped me understand how individual frontend and backend concepts come together to build a complete application.

