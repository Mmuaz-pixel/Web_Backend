import Resource from '../models/Resource.js';

// Get resources
export const getResources = async (req, res) => {
  try {
    const { type, category, language } = req.query;
    const filters = {};
    if (type) filters.type = type;
    if (category) filters.category = category;
    if (language) filters.language = language;

    const resources = await Resource.find(filters);
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Upload resource
export const uploadResource = async (req, res) => {
  try {
    // todo 
    // -- file saving in local/S3 using multer
    const resource = new Resource({ ...req.body, filePath: req.file.path });
    await resource.save();
    res.status(201).json({ message: 'Resource uploaded successfully', resource });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Download resource
export const downloadResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ error: 'Resource not found' });
    res.download(resource.filePath);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
