const express = require('express');
const router = express.Router();
const { getAllSessions, getAllUsers, deleteSession } = require('./adminController');

// Middleware to check if user is authenticated and an admin
router.use((req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).send('Not authorized');
  }
  next();
});

router.get('/sessions', getAllSessions);
router.get('/users', getAllUsers);
router.delete('/session/:id', deleteSession);

module.exports = router;
