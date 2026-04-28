# CodeForge

CodeForge is a full-stack coding platform built for students to browse algorithm problems, read solutions, and submit their own problem entries through a clean and responsive interface.

## Live Demo

Frontend: [https://codeforge-lyart-pi.vercel.app/](https://codeforge-lyart-pi.vercel.app/home.html)
Backend: [https://codeforge-backend-1zsy.onrender.com](https://codeforge-backend-1zsy.onrender.com)

## Features

* User signup and login
* JWT-based authentication
* Browse coding problems
* Open individual problem pages
* Submit new solutions/problems
* MongoDB Atlas integration
* Protected routes and logout
* Responsive dark-themed UI
* Deployed frontend and backend

## Tech Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* bcryptjs
* jsonwebtoken

### Deployment

* Vercel
* Render

## Folder Structure

```bash
codeforge/
├── frontend/
│   ├── index.html
│   ├── getstarted.html
│   ├── browse.html
│   ├── submit.html
│   ├── home.html
│   ├── script.js
│   ├── getstarted.js
│   ├── browse.js
│   └── submit.js
│
└── backend/
    ├── server.js
    ├── .env.example
    ├── models/
    │   ├── User.js
    │   └── Problem.js
    ├── routes/
    │   ├── auth.js
    │   └── problems.js
    ├── controllers/
    │   ├── authController.js
    │   └── problemController.js
    └── middleware/
        └── authMiddleware.js
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Bhagyalakshmi-i/codeforge.git
```

### 2. Open the project

```bash
cd codeforge
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Create environment variables

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 5. Start the backend

```bash
node server.js
```

## API Endpoints

### Authentication

* `POST /api/auth/signup` — create a new user
* `POST /api/auth/login` — login user

### Problems

* `GET /api/problems` — fetch all problems
* `POST /api/problems` — add a new problem

## How It Works

1. User signs up or logs in.
2. JWT token is generated and stored in the browser.
3. User can browse coding problems.
4. User can submit a new solution/problem.
5. Data is saved in MongoDB Atlas.

## What I Learned

* Full-stack project structure
* REST API development
* MongoDB and Mongoose
* JWT authentication
* Frontend-backend integration
* Deployment using Render and Vercel
* Git and GitHub workflow

## Team

Built with support and collaboration from my team members Lakshya Batra(https://github.com/Lakshay855),Himanshi Khajuria (https://github.com/himanshikhajuria).

## Future Improvements

* Problem editor
* Comments and discussions
* Like and save system
* User profile dashboard
* Difficulty filters from backend
* Better analytics and progress tracking

## License

This project is licensed under the MIT License..
