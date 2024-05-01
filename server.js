require('dotenv').config(); 

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});
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
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);
const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);

// WebSocket handling
io.on('connection', (socket) => {
  console.log('New client connected');

  // Handle drawing events
  socket.on('drawing', (data) => {
    // Broadcast drawing actions to all other clients
    socket.broadcast.emit('drawing', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// A basic route for testing the server
app.get('/', (req, res) => {
  res.send('Server is working!');
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


