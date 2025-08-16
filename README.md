DeveloperFeed API
Overview
DeveloperFeed is a social platform for developers to share posts, comment, and connect via real-time chat. This repository contains the backend API built with Node.js, Express, MongoDB, Redis (cloud-based), and Socket.IO for real-time communication. The API supports user authentication, post creation, commenting, and real-time messaging.
Prerequisites

Node.js: v16 or higher
MongoDB: Cloud (MongoDB Atlas) or local instance
Redis: Cloud-based Redis instance (e.g., Redis Cloud, AWS ElastiCache)
Socket.IO: For real-time chat
Postman: For API testing
Git: For cloning the repository

Setup Instructions

Clone the Repository:
https://github.com/Pratik6001/DevCommunity.git
Cd Backend


Install Dependencies:
npm install

Ensure socket.io is included in package.json for real-time chat.

Configure Environment Variables:

Copy .env.example to  .env


Update .env with your configuration, including MongoDB URI, cloud Redis connection details, JWT secrets, and SMTP credentials.


Set Up MongoDB and Redis:

Ensure MongoDB is running (local or Atlas).
For Redis, obtain your cloud Redis connection details (e.g., from Redis Cloud dashboard) and update REDIS_URL or REDIS_HOST, REDIS_PORT, and REDIS_PASS in .env. If Redis is not used, configure the app to bypass Redis caching.
Redis is used for caching chat session data.


Set Up Socket.IO for Real-Time Chat:

The API uses Socket.IO for real-time messaging. Ensure the frontend client connects to the WebSocket server at http://localhost:3000 (or your deployed URL).
Example Socket.IO client setup (in frontend):import io from 'socket.io-client';
const socket = io('http://localhost:3000');
socket.on('message', (msg) => {
  console.log('New message:', msg);
});




Run the Application:

Development mode (with Nodemon):npm run dev


Production mode:npm start




Test the API:

Import the provided Postman collection (DeveloperFeed_API.postman_collection.json) into Postman.
Test REST endpoints (/signup, /login, /create-post, etc.) and simulate WebSocket messages using a Socket.IO client or Postman’s WebSocket feature.



Environment Variables
See .env.example for all required variables:

MONGODB_URI: MongoDB connection string
PORT: Server port (default: 3000)
JWT_SECRET, JWT_REFRESH_SECRET: Secrets for JWT authentication
NODE_ENV: Environment (e.g., development, production)
API_KEY: API key for external services
FRONTEND_URL: Frontend URL (e.g., http://localhost:5173)
REDIS_URL: Cloud Redis connection URL (preferred)
REDIS_PASS: Redis password (required for cloud Redis)
SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS: SMTP for email (e.g., Gmail)
SOCKET_IO_ORIGIN: CORS origin for Socket.IO (e.g., http://localhost:5173)

API Endpoints

POST /signup: Register a new user
POST /login: Authenticate a user
POST /send-reset-email: Send password reset email (authenticated)
POST /get-feed-data: Fetch feed data
GET /get-all-data: Retrieve all posts
POST /create-post: Create a new post (authenticated)
POST /:postId/comments: Add a comment to a post (authenticated)
GET /:postId/comments: View comments on a post
GET /get-all-user: Fetch all users (authenticated)
GET /messages/:receiverId: Get messages for a chat room (authenticated)
POST /create-profile: Create/update user profile with avatar upload (authenticated)
WebSocket /message: Send/receive real-time messages (handled via Socket.IO)

Real-Time Chat

Technology: Socket.IO for WebSocket-based real-time messaging.
Events:
joinRoom: Join a chat room (e.g., { userId, receiverId }).
message: Send a message (e.g., { roomId, senderId, content }).
typing: Indicate typing status (e.g., { roomId, userId }).


Setup:
Server: Socket.IO is integrated with the Express server.
Client: Connect to the Socket.IO server and handle events (see setup example above).


Persistence: Messages are stored in MongoDB and cached in Redis for fast retrieval.

Postman Collection
The DeveloperFeed_API.postman_collection.json file includes requests for testing REST endpoints. For WebSocket testing, use a Socket.IO client or Postman’s WebSocket feature with the /message namespace. Set the baseUrl environment variable to http://localhost:3000 (or your deployed URL).
Screenshots/Demo Video

Screenshots: See the /screenshots 

Troubleshooting

MongoDB Connection Issues: Verify MONGODB_URI and ensure MongoDB is running. Check DB_RETRY_DELAY and DB_MAX_RETRIES.
Redis Errors: Verify REDIS_URL or REDIS_HOST, REDIS_PORT, REDIS_PASS. Ensure your cloud Redis instance is accessible.
Socket.IO Issues: Check SOCKET_IO_ORIGIN for CORS settings. Ensure the frontend URL matches.
SMTP Issues: Ensure SMTP_USER and SMTP_PASS are correct (use an app-specific password for Gmail).

Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a pull request.

