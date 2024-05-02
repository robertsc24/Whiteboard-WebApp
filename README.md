# Whiteboard-WebApp

## Intro:

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
