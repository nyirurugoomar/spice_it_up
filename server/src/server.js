const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/user.routes');
const recipeRoutes = require('./routes/recipe.routes');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173','https://spiceitup-app.netlify.app/'],
  credentials: true,
}));
// Routes
app.use('/api/auth', authRoutes);
app.use('/api', recipeRoutes);
app.use('/uploads', express.static('uploads'));

// Connect DB & Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server is running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error(err));
