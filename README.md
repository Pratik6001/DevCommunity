
# Project Title

![Node.js](https://img.shields.io/badge/node-v16+-green)
![MongoDB](https://img.shields.io/badge/mongodb-cloud-blue)
![Redis](https://img.shields.io/badge/redis-cloud-orange)
![License](https://img.shields.io/badge/license-MIT-brightgreen)

**DeveloperFeed** is a social platform for developers to share posts, comment, and connect via real-time chat. This repository contains both **backend** and **frontend** code. The backend uses **Node.js, Express, MongoDB, Redis (cloud)**, and **Socket.IO**, while the frontend is built with **React.js**.

## Screenshots
![image alt](https://github.com/Pratik6001/DevCommunity/blob/6c23339b5290f3a5c7b7ae963e69fd722d985047/Screenshots/upload%202025-08-17%20092816.png)
![image alt](https://github.com/Pratik6001/DevCommunity/blob/6c23339b5290f3a5c7b7ae963e69fd722d985047/Screenshots/upload%202025-08-17%20093006.png)

## API Reference

#### Get all items
| Method | Endpoint               | Auth | Description                       |
| ------ | ---------------------- | ---- | --------------------------------- |
| POST   | /signup                | No   | Register a new user               |
| POST   | /login                 | No   | Authenticate a user               |
| POST   | /send-reset-email      | Yes  | Send password reset email         |
| POST   | /get-feed-data         | No   | Fetch feed data                   |
| GET    | /get-all-data          | No   | Retrieve all posts                |
| POST   | /create-post           | Yes  | Create a new post                 |
| POST   | /\:postId/comments     | Yes  | Add a comment to a post           |
| GET    | /\:postId/comments     | No   | View comments on a post           |
| GET    | /get-all-user          | Yes  | Fetch all users                   |
| GET    | /messages/\:receiverId | Yes  | Get messages for a chat room      |
| POST   | /create-profile        | Yes  | Create/update profile with avatar |



## Authors

- [@Pratik6001](https://github.com/Pratik6001)


## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## Demo

https://dev-community-five.vercel.app/

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

| Variable                                       | Description                                                         |
| ---------------------------------------------- | ------------------------------------------------------------------- |
| MONGODB\_URI                                   | MongoDB connection string                                           |
| PORT                                           | Server port (default: 3000)                                         |
| JWT\_SECRET, JWT\_REFRESH\_SECRET              | JWT authentication secrets                                          |
| NODE\_ENV                                      | Environment (development, production)                               |
| API\_KEY                                       | External service API key                                            |
| FRONTEND\_URL                                  | Frontend URL (e.g., [http://localhost:5173](http://localhost:5173)) |
| REDIS\_URL                                     | Cloud Redis connection URL (preferred)                              |
| REDIS\_PASS                                    | Redis password                                                      |
| SMTP\_HOST, SMTP\_PORT, SMTP\_USER, SMTP\_PASS | SMTP credentials for email                                          |
| SOCKET\_IO\_ORIGIN                             | CORS origin for Socket.IO (frontend URL)                            |
| VITE\_API\_URL                                 | Frontend: Backend API URL                                           |



## Features

Authentication & Profiles

🔑 User signup/login with JWT tokens

👤 Create & update user profiles (bio, avatar, social links)

🔍 Fetch all users (with authentication middleware)

Posts & Feeds

📝 Create, update, delete posts

📌 Each post supports title, description, codeSnippet, tags

🔎 Advanced search & filters using MongoDB aggregation pipeline

❤️ Like/unlike posts

💬 Add comments & replies

Comments & Discussions

Add, edit, delete comments on posts

Nested replies for discussions

Real-time updates via Socket.IO

Chat & Messaging

💬 One-to-one messaging between developers

Fetch messages by room ID (/messages/:roomId)

Socket.IO integration for real-time message delivery

Online/offline status tracking

Notifications

🔔 Event-driven notifications for likes, comments, and messages

Real-time push with Socket.IO

Performance & Security

🚦 Rate limiting using Redis middleware

⚡ Optimized queries with MongoDB indexes

🔐 Secure routes with authenticateToken middleware

Developer-Friendly API

📡 RESTful API endpoints for all major features

🌍 Query parameters for pagination & filtering (e.g., ?page=1&limit=10&tags=javascript,nodejs)



## 🚀 About Me
I'm a full stack developer...


## Installation

Install my-project with npm

```bash
  cd Backend
  npm Install
  npm run dev
  cd Frontend
  npm install
  rpm run dev
```
    
## Prerequisites

- **Node.js:** v16 or higher  
- **MongoDB:** Cloud (Atlas) or local instance  
- **Redis:** Cloud instance (Redis Cloud, Upstash)  
- **Socket.IO:** For real-time chat  
- **Postman:** For API testing  
- **Git:** For cloning the repository 

## ⚡ Tech Stack

## Frontend

React.js (with Redux Toolkit for state management)

Vite (fast build tool)

Tailwind CSS (for modern styling)

Axios (for API requests)

Socket.IO Client (for real-time communication)

## Backend

Node.js with Express.js

MongoDB with Mongoose (Database)

Redis (for caching, sessions & rate limiting)

Socket.IO (real-time chat & notifications)

Authentication & Security

JWT (JSON Web Tokens) for secure authentication

bcrypt.js (password hashing)

Helmet & CORS (security middlewares)

## Tools & Deployment

Postman (API testing)

Nodemon (dev auto-restart)

Git & GitHub (Version control)

MongoDB Atlas & Redis Cloud (database & caching)

Render / Vercel (deployment)

## Setup Instructions
Clone the Repository:
https://github.com/Pratik6001/DevCommunity.git
Cd Backend
Install Dependencies:
npm install
Configure Environment Variables:
Copy .env.example to  .env
