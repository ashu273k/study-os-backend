# Study OS Backend

Backend API for Study OS, built with Node.js, Express, and PostgreSQL.

## Overview

This service provides:

- User authentication (register/login) with JWT
- Task management (CRUD + filtering by completion)
- Resource management (notes/links/files)
- Health and API info endpoints

Base API URL:

```text
http://localhost:3000/api/v1
```

## Tech Stack

- Node.js (ES modules)
- Express 5
- PostgreSQL (`pg`)
- JWT (`jsonwebtoken`)
- Password hashing (`bcrypt`)
- Security middleware (`helmet`, `cors`)

## Project Structure

```text
study-os-backend/
├── server.js
├── src/
│   ├── app.js
│   ├── config/
│   │   ├── database.js
│   │   ├── migrate.js
│   │   └── schema.sql
│   ├── controllers/
│   ├── middleware/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   └── utils/
├── notes/
└── postman/
```

## Prerequisites

- Node.js 18+
- PostgreSQL 13+

## Environment Variables

Create a `.env` file in the project root with:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=study_os

JWT_SECRET=replace_with_a_strong_secret
JWT_EXPIRES_IN=7d
```

Notes:

- `.env.example` currently exists but is empty.
- `JWT_SECRET` should be long and random in production.

## Installation

```bash
npm install
```

## Database Setup

1. Create your PostgreSQL database.
2. Run migrations:

```bash
npm run migrate
```

The migration script applies `src/config/schema.sql` in a transaction.

## Run the Server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

Server default:

```text
http://localhost:3000
```

## Health and Info Endpoints

- `GET /health`
- `GET /api/v1/info`

## Authentication

Public routes:

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`

Protected routes:

- `/api/v1/tasks/*`
- `/api/v1/resources/*`

Send JWT token in the `Authorization` header:

```http
Authorization: Bearer <your_token>
```

## API Endpoints

### Auth

#### Register

`POST /api/v1/auth/register`

Request:

```json
{
	"name": "Alice",
	"email": "alice@example.com",
	"password": "password123"
}
```

Rules:

- `name`, `email`, `password` are required
- `password` must be at least 8 characters

#### Login

`POST /api/v1/auth/login`

Request:

```json
{
	"email": "alice@example.com",
	"password": "password123"
}
```

### Tasks (Protected)

#### Get all tasks

`GET /api/v1/tasks`

Optional query:

- `completed=true` -> only completed tasks
- `completed=false` -> tasks not completed

#### Get task by ID

`GET /api/v1/tasks/:id`

#### Create task

`POST /api/v1/tasks`

Example body:

```json
{
	"title": "Finish backend README",
	"description": "Improve project docs",
	"status": "pending",
	"subject": "Documentation",
	"due_date": "2026-04-15"
}
```

#### Update task

`PATCH /api/v1/tasks/:id`

Status must be one of:

- `pending`
- `in_progress`
- `completed`

#### Delete task

`DELETE /api/v1/tasks/:id`

### Resources (Protected)

#### Get all resources

`GET /api/v1/resources`

#### Create resource

`POST /api/v1/resources`

Example (link):

```json
{
	"title": "Express Docs",
	"type": "link",
	"url": "https://expressjs.com"
}
```

Example (note):

```json
{
	"title": "Study Notes",
	"type": "note",
	"content": "Review middleware patterns"
}
```

Validation rules:

- `type=link` requires valid `http`/`https` URL
- `type=note` requires non-empty `content`

#### Delete resource

`DELETE /api/v1/resources/:id`

## Response Format

The API consistently returns:

```json
{
	"success": true,
	"data": {}
}
```

or

```json
{
	"success": false,
	"message": "Error description"
}
```

## Available Scripts

- `npm start` - Run server with Node.js
- `npm run dev` - Run server with Nodemon
- `npm run migrate` - Execute DB schema migration

## Postman

Prebuilt files are available in `postman/`:

- `Study-OS-API.postman_collection.json`
- `Study-OS-Local.postman_environment.json`

Import both files into Postman to test the API quickly.

## License

ISC