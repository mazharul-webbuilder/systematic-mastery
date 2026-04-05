const postController = require('../controllers/postController');

function postRoutes(req, res) {
  const url = req.url;
  const method = req.method;

  if (url === '/posts' && method === 'POST') {
    return postController.createPost(req, res);
  }

  return false;
}

module.exports = postRoutes;
