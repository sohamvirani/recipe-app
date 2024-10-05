const mongoose = require('mongoose');


// Define the schema for a recipe

const recipeSchema = new mongoose.Schema(
  {
    recipe_image: {
        type: String,
        required: true, 
    },
    title: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String], 
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    cuisineType: {
      type: String,
      required: true,
    },

  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Recipe', recipeSchema);
