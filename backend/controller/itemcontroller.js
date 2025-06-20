import Item from '../models/items.js';

export const addItem = async (req, res) => {
  try {
    console.log('AddItem function called');
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    const { name, type, description } = req.body;

    if (!name || !type || !description) {
      return res.status(400).json({
        message: 'Missing required fields',
        received: { name, type, description },
      });
    }

    if (!req.files || !req.files['coverImage']) {
      return res.status(400).json({ message: 'Cover image is required' });
    }

    const coverImage = req.files['coverImage'][0].path;
    const additionalImages = req.files['additionalImages']
      ? req.files['additionalImages'].map((file) => file.path)
      : [];

    const newItem = new Item({
      name,
      type,
      description,
      coverImage,
      additionalImages,
    });

    await newItem.save();

    res.status(200).json({ message: 'Item successfully added' });
  } catch (err) {
    console.error('Error in addItem:', err);
    res.status(500).json({
      message: 'Error adding item',
      error: err.message,
      errorName: err.name,
    });
  }
};
export const getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching items", error: err.message });
  }
};