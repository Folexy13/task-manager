

# **Task Manager App**

A simple yet powerful task management application built with **TypeScript**, **Express**, **Sequelize**, and **PostgreSQL** for efficient task organization and management. This app provides a **RESTful API** for managing tasks with full CRUD functionality and pagination support for fetching tasks and also creating a Job to track task's status of overdued task

---

## **Table of Contents**

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [Task Routes](#task-routes)
  - [User Routes](#user-routes)
  - [Authentication](#authentication)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [API Documentation](#api-documentation)

---

## **Features**

- **Task Management:** Create, Read, Update, and Delete tasks.
- **Pagination:** Fetch tasks with pagination, including `total`, `currentPage`, `previousPage`, and `nextPage`.
- **User Management:** Manage users with roles and permissions.
- **Authentication:** Secure API endpoints using JWT authentication.
- **Task Sorting:** Sort tasks by created date or other criteria.
- **Comprehensive Validation:** Input validation for API endpoints.

---

## **Technologies Used**

- **Backend:** Node.js with Express
- **Database:** PostgreSQL with Sequelize ORM
- **Authentication:** JWT (JSON Web Token)
- **Validation:** Custom validation for pagination and task management
- **Environment Management:** dotenv for environment variable management

---

## **Installation**

To set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/Folexy13/task-manager.git
cd task-manager
```

### 2. Install Dependencies

Ensure you have Node.js installed (v14 or higher recommended). Then, install the required dependencies:

```bash
npm install
```

### 3. Configure Environment Variables

Copy the `.env.example` to `.env` and fill in your database configuration.

```bash
cp .env.example .env
```

### 4. Set Up PostgreSQL

Ensure PostgreSQL is installed and running. Configure the connection settings in your `.env` file. For example:

```env
DB_DEV_HOST=localhost
DB_DEV_USER=your_database_user
DB_DEV_PASS=your_database_password
DB_DEV_NAME=taskdb
```

### 5. Run Migrations

Run the following command to set up your database schema:

```bash
npm run migrate
```

### 6. Start the Application

You can now start the application by running:

```bash
npm start
```

This will start the server on `http://localhost:8002`.

---

## **API Endpoints**

### **Task Routes**

#### 1. `GET /tasks`: Get all tasks with pagination.

- **Query Params:**

  - `limit`: Number of tasks per page (default: 10)
  - `page`: Current page number (default: 1)

- **Example Response:**

```json
{
	"total": 50,
	"currentPage": 1,
	"previousPage": null,
	"nextPage": 2,
	"totalPages": 5,
	"data": [
		{
			"id": 1,
			"title": "Task 1",
			"status": "completed",
			"description": null,
			"due_date": "2024-11-27T17:39:46.758Z",
			"createdAt": "2024-11-27T17:45:27.956Z",
			"updatedAt": "2024-11-27T17:51:39.657Z"
		},
		{
			"id": 2,
			"title": "Task 2",
			"status": "pending",
			"description": "lorem ipsum",
			"due_date": "2024-11-27T17:39:46.758Z",
			"createdAt": "2024-11-27T17:45:27.956Z",
			"updatedAt": "2024-11-27T17:51:39.657Z"
		}
	]
}
```

---

#### 2. `POST /tasks`: Create a new task.

- **Request Body:**

```json
{
	"title": "New Task",
	"description": "Task details",
    "due_date": "024-11-27T15:28:56.397Z", (make sure to use a valid date format)
	"status": "pending". (optional)
}
```

---

#### 3. `PUT /api/v1/tasks/:id`: Update an existing task.

- **Request Body:**

```json
{
	"title": "Updated Task",
	"description": "Updated details",
	"status": "completed"
}
```

---

#### 4. `DELETE /api/v1/tasks/:id`: Delete a task.

---

### **User Routes**

- `GET /api/v1/users`: Get all users with pagination.
- `POST /api/v1/users`: Create a new user (admin).
- `GET /api/v1/users/:id`: Get a single user by ID.
- `PUT /api/v1/users/:id`: Update user details.
- `PATCH /api/v1/users/:id`: Set role for user.
- `DELETE /api/v1/users/:id`: Delete a user.Only an admin can do this.

---

### **Authentication**

The application uses **JWT (JSON Web Token)** for securing endpoints.

#### **Login**

- `POST /api/v1/users/login`: Authenticate a user and receive a JWT token.

- **Example Request Body:**

```json
{
  "email": "user@example.com",
  "password": "yourpassword",
  "phone": "yourphonenumber", (only Nigerian number), eg 09122223245,2349122223245
}
```

- **Example Response:**

```json
{
	"status": true,
	"token": "your-jwt-token"
}
```

#### **Secure Routes**

For routes requiring authentication, pass the JWT token in the Authorization header as a Bearer token:

```bash
Authorization: Bearer your-jwt-token
```

---

## **Running Tests**

To run tests for the application, use the following command:

```bash
npm test
```

Tests are located in the `/tests` folder.

---

## **Project Structure**

The project structure is organized as follows:

```bash
/task-manager
│
├── /dist                # Build file
├── /node_modules        # Depedencies
├── /src                 # Src Folders
    ├── /Controllers         # Business logic for handling requests
    ├── /Models              # Sequelize models (tasks, users)
    ├── /Helpers             # Contains helpers functions
    ├── /Services            # Application services
    ├── /Interfaces          # Application type interfaces
    ├── /Middlewares         # Contains the middleware for the route contoller
    ├── /Routes              # Application Route controllers
    ├── /Utils               # Utility functions (e.g., pagination)
    ├── /Migrations          # Sequelize database migrations
    ├── /Tests               # Test cases
    ├── /Config              # Configuration files
    ├── /Validations         # Validations files
├── .env                 # Environment variables
├── app.ts            # Entry point for the application
└── README.md            # Project documentation
```

---

## **Contributing**

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new Pull Request.

---

## **License**

This project is licensed under the **MIT License**.

---

## **Acknowledgements**

- **Sequelize:** ORM for PostgreSQL.
- **Express:** Fast, unopinionated, minimalist web framework for Node.js.
- **JWT:** JSON Web Tokens for secure authentication.

---

## **API Documentation**

You can use the Postman collection for interacting with the API. Below is a link to the dummy Postman collection:

[**Task Manager API Postman Collection**](https://documenter.getpostman.com/view/14121430/2sAYBXAAmt)

---
