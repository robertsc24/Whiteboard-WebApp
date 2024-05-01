exports.getAllSessions = (req, res) => {
  res.send('All sessions data');
};

exports.getAllUsers = (req, res) => {
  res.send('All users data');
};

exports.deleteSession = (req, res) => {
  const { id } = req.params;
  res.send(`Session ${id} deleted`);
};
