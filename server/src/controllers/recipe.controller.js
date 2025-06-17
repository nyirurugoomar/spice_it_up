const Recipe = require("../models/recipe.model");
const multer = require('multer');
const path = require('path');
const fs = require('fs')






// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir); // Use absolute path
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

exports.getAllRecipes = async (req, res) => {
  try {
    // Get query params
    const { search = "", page = 1, limit = 10 } = req.query;

    // Build search filter
    const searchFilter = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { ingredients: { $regex: search, $options: "i" } },
            { instructions: { $regex: search, $options: "i" } },
            { "createdBy.username": { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Recipe.countDocuments(searchFilter);
    const recipes = await Recipe.find(searchFilter)
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      recipes,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.createRecipe = async (req, res) => {
  try {
    console.log('Creating recipe with body:', req.body);
    console.log('File:', req.file);

    // Validate required fields
    const { title, ingredients, instructions, preparation, CookingTime } = req.body;
    if (!title || !ingredients || !instructions || !preparation || !CookingTime) {
      return res.status(400).json({ 
        error: 'Missing required fields: title, ingredients, instructions, preparation, CookingTime' 
      });
    }

    // If an image was uploaded, set the image path as a full URL
    let imageUrl = '';
    if (req.file) {
      const serverUrl = process.env.SERVER_URL || `${req.protocol}://${req.get('host')}`;
      const filename = req.file.filename;
      imageUrl = `${serverUrl}/uploads/${filename}`;
      console.log('Image uploaded:', {
        originalName: req.file.originalname,
        filename: req.file.filename,
        path: req.file.path,
        fullUrl: imageUrl
      });
    } else {
      return res.status(400).json({ error: 'Image is required' });
    }

    // Get user info from req.user (set by your auth middleware)
    const userId = req.user.id;
    const username = req.user.username;

    // Create the recipe with all required fields
    const recipe = new Recipe({
      title,
      ingredients,
      instructions,
      preparation,
      CookingTime,
      image: imageUrl,
      createdBy: {
        id: userId,
        username: username
      }
    });

    await recipe.save();
    console.log('Recipe created successfully:', recipe._id);
    res.status(201).json({ message: "Recipe created successfully", recipe });
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(400).json({ error: error.message });
  }
};
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedRecipe)
      return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json({ message: "Recipe updated", updatedRecipe });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a recipe by ID
exports.deleteRecipe = async (req, res) => {
  try {
    const deleted = await Recipe.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json({ message: "Recipe deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserRecipes = async (req, res) => {
  try {
    const userId = req.user.id;
    const recipes = await Recipe.find({ "createdBy.id": userId });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.upload = upload;

