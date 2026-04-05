const userController = require('../controllers/userController');

function userRoutes(req, res) {
  const url = req.url;
  const method = req.method;

  // GET /users - Get all users
  if (url === '/users' && method === 'GET') {
    return userController.getAllUsers(req, res);
  }

  // POST /users - Create user
  if (url === '/users' && method === 'POST') {
    return userController.createUser(req, res);
  }

  // GET /users/:id - Get single user
  if (url.startsWith('/users/') && method === 'GET') {
    const id = url.split('/')[2];
    return userController.getUserById(req, res, id);
  }

  // PUT /users/:id - Update user
  if (url.startsWith('/users/') && method === 'PUT') {
    const id = url.split('/')[2];
    return userController.updateUser(req, res, id);
  }

  // DELETE /users/:id - Delete user
  if (url.startsWith('/users/') && method === 'DELETE') {
    const id = url.split('/')[2];
    return userController.deleteUser(req, res, id);
  }

  return false;
}

module.exports = userRoutes;
