require('dotenv').config();  // Ensure this is at the top to load environment variables first


const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://robertsc:!!Milwaukee2022@whiteboard.jhwunrk.mongodb.net/?retryWrites=true&w=majority&appName=Whiteboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Middleware
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes'); // Ensure the path is correct based on your directory structure
app.use('/auth', authRoutes); // Use the authentication routes under a specific path for better structure

// WebSocket handling
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// A basic route for testing the server
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

