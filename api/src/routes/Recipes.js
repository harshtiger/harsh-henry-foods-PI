
const { Router } = require("express");
require("dotenv").config();
const {getAllRecipes} = require('../controllers/controllers.js')
 
const router = Router();

  
  
  router.get("/", async (req, res) => {
    const { name } = req.query;
    const recipesTotal = await getAllRecipes();
    if (name) {
      let recipeTitle = await recipesTotal.filter((r) =>
        r.title.toLowerCase().includes(name.toLowerCase())
      );
      recipeTitle.length
        ? res.status(200).json(recipeTitle)
        : res.status(404).send("This recipe doesn't exist -.-");
    } else {
      res.status(200).json(recipesTotal);
    }
  });



  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const recipesTotal = await getAllRecipes();
    if (id) {
      
      let recipeId = await recipesTotal.filter((r) => r.id == id);
      recipeId.length
        ? res.status(200).json(recipeId)
        : res.status(404).send("Not Found");
     
    }
  });

  module.exports = router;