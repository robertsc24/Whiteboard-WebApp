# Whiteboard-WebApp

## Description:

This Realtime Collaborative Whiteboard is a web application designed to facilitate interactive and dynamic collaboration across remote teams and educational environments. Using different modern web technologies, this application allows multiple users to draw, sketch, and write on a shared virtual whiteboard in real-time, enhancing communication and creative processes. Built with a Node.js backend and a React frontend, the application leverages WebSocket for real-time interactivity and MongoDB Atlas for data management in the cloud. It is containerized using Docker, ensuring easy deployment and scalability across different environments, and managed through Kubernetes to handle orchestration efficiently. This whiteboard tool not only supports standard drawing functionalities but also includes features such as user authentication and administrative controls for managing sessions and user interactions.

## Set-up Instructions:

To set up and run this application, follow these detailed installation instructions:

**Prerequisites:**

- Ensure you have Node.js (v14 or newer) and npm installed on your system. You can download them from Node.js official website.
- Docker and Docker Compose are required for containerization. Download and install Docker from Docker's official website.
- To use Kubernetes for orchestration, ensure you have kubectl installed and configured.

**Clone:**

- Clone the project repository using Git: git clone https://github.com/robertsc24/Whiteboard-WebApp.git
- cd Whiteboard-WebApp
  
**Backend Setup:**

- Navigate to the backend directory and install the necessary dependencies: cd backend
- npm install
- Create a .env file in the backend directory and populate it with the necessary environment variables such as DB_URI for MongoDB Atlas connection, JWT_SECRET for JSON Web Tokens, and any other relevant configurations.

**Frontend Setup:**

- Move to the frontend directory from the root of the project and install dependencies: cd ../frontend
- npm install
  
**Docker and Kubernetes:**

- To build and run the application using Docker, execute: docker-compose up --build
- For deploying with Kubernetes, make sure the Kubernetes cluster is active and apply the configuration: kubectl apply -f node-backend-deployment.yaml and react-frontend-deployment.yaml for the two frontend and backend yaml files. 
  
**Running the Application:**

Once all services are up and running, access the frontend through the web browser at http://localhost:3000.


## API Documentation

**1. User Management API**
This API handles user registration, login, and authentication processes.

Endpoints:

POST /auth/register: Registers a new user.
POST /auth/login: Authenticates a user and returns a JWT for session management.

Use Case:

A new user visits the whiteboard app and logs in by pressing the login button. The data is sent to the /auth/register endpoint, which creates a new user in the database and returns a success message.

**2. Session Management API**

This API deals with the creation and management of drawing sessions.

Endpoints:

GET /sessions: Retrieves a list of active drawing sessions.
POST /sessions: Creates a new drawing session.
DELETE /sessions/:id: Deletes a specified session.

Use Case:

An authenticated user wants to start a new drawing session. They send a request to the /sessions endpoint to create a new session and receive a session ID to share with other participants.

**3. Real-Time Drawing API**

Enabled through WebSocket connections, this API allows for the real-time broadcast of drawing actions.

WebSocket Events (Drawing):

Event triggered when a user draws on the canvas. It sends drawing coordinates and actions to other connected clients in real time.

Use Case:

A user draws on the whiteboard and the coordinates of that drawing are sent to the server with the drawing WebSocket event. The server then broadcasts these coordinates to all other connected clients, allowing all participants to see the drawing live.

**4. Administrative API**
   
This API provides administrative functionalities, including access to usage statistics and user management.

Endpoints:

GET /admin/users: Lists all registered users.
GET /admin/sessions: Retrieves statistics about drawing sessions.

Use Case:

An admin user wants to review the number of active users and sessions for reporting. They access the /admin/sessions endpoint to fetch this data, which might include metrics like session duration, number of drawings made, and active user count.
