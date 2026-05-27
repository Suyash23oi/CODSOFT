# Project Management Tool

A full-stack project management application built with React, Node.js, and MongoDB.

## Features
- Create and manage projects
- Assign tasks to projects
- Set deadlines and track task progress
- Update project and task status

## Setup
1. Install dependencies:
   ```bash
   npm install
   npm run install-all
   ```
2. Copy `server/.env.example` to `server/.env` and update `MONGODB_URI` if needed.
3. If you are running MongoDB locally, the default URI is already configured in `server/.env.example`.
4. Start the app:
   ```bash
   npm run dev
   ```

## API
- `GET /api/projects`
- `POST /api/projects`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
