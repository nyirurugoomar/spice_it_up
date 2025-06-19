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
                // Allow various URL formats including local file paths for development
                // This is more permissive to handle different development setups
                const isValidUrl = /^(https?:\/\/.+\.(jpg|jpeg|png|gif|webp)|http:\/\/localhost:\d+\/uploads\/.+\.(jpg|jpeg|png|gif|webp)|http:\/\/127\.0\.0\.1:\d+\/uploads\/.+\.(jpg|jpeg|png|gif|webp))$/.test(v);
                const isValidLocalPath = /^\/.*\.(jpg|jpeg|png|gif|webp)$/.test(v);
                const isValidFullPath = /^.*\/uploads\/.*\.(jpg|jpeg|png|gif|webp)$/.test(v);
                
                console.log('Image validation:', {
                    value: v,
                    isValidUrl,
                    isValidLocalPath,
                    isValidFullPath,
                    result: isValidUrl || isValidLocalPath || isValidFullPath
                });
                
                return isValidUrl || isValidLocalPath || isValidFullPath;
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