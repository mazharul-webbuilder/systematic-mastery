const User = require('../models/User');

const getAllUsers = async (req, res) => {
  const reqH = req.headers

  try {
    const users = await User.find();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(users));
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: error.message }));
  }
};

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(user));
  } catch (error) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: error.message }));
  }
};

const getUserById = async (req, res, id) => {
  try {
    console.log(id)
    const user = await User.findById(id);
    if (!user) {
      res.statusCode = 404;
      return res.end(JSON.stringify({ error: 'User not found' }));
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(user));
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: error.message }));
  }
};

const updateUser = async (req, res, id) => {
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      res.statusCode = 404;
      return res.end(JSON.stringify({ error: 'User not found' }));
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(user));
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: error.message }));
  }
};

const deleteUser = async (req, res, id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.statusCode = 404;
      return res.end(JSON.stringify({ error: 'User not found' }));
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'User deleted' }));
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: error.message }));
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
