import Post from '../models/Post.js';

// Get Posts
export const getPosts = async (req, res) => {
  try {
    const { category, search, sort, page = 1, limit = 10 } = req.query;
    const filters = {};
    if (category) filters.category = category;
    if (search) filters.title = new RegExp(search, 'i');

    const posts = await Post.find(filters)
      .sort(sort || 'createdAt')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create Post
export const createPost = async (req, res) => {
  try {
    const post = new Post({ user: req.user._id, ...req.body });
    await post.save();
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get Post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('comments.user', 'name');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add Comment
export const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post.comments.push({ user: req.user._id, content: req.body.content });
    await post.save();
    res.status(201).json({ message: 'Comment added successfully', post });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

