const User = require('../models/User');
const Post = require('../models/Post');

const createPost = async (req, res) => {
  const session = await User.startSession();

  try {
    await session.withTransaction(async () => {
      const { title, body, userId, name, email } = req.body;

      if (!title || !body || !userId) {
        throw new Error('Title, body, and userId are required');
      }

      let user = await User.findOne({ _id: userId }).session(session);

      if (!user) {
        if (!name || !email) {
          throw new Error('User not found. Name and email required to register new user');
        }

        user = new User({ _id: userId, name, email });
        await user.save({ session });
      }

      const post = new Post({ title, body, userId });
      await post.save({ session });

      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ post, user }));
    });
  } catch (error) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: error.message }));
  } finally {
    session.endSession();
  }
};

module.exports = { createPost };
