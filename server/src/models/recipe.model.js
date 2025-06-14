const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
       
    },
    ingredients: {
        type: String,
        required: true,
        
    },
    
    instructions: {
        type: String,
        required: true,
        
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // Allow both full URLs and local server URLs
                return /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(v);
            },
            message: props => `${props.value} is not a valid image URL!`
        }
    },
    preparation:{
        type: String,
        required: true
    },
    CookingTime:{
        type: String,
        required: true
    },
    createdBy: {
        id: { type: String, required: true },
        username: { type: String, required: true }
      },
}, {
    timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;