const { Router } = require('express');
const deleteFromDb = require('../controllers/deleteFromDb');
const putRecipe = require('../controllers/updateRecipe')
const { Recipe, Diet } = require("../db");
const router = Router();



router.post("/", async (req, res) => {
    let {
      title,
      summary,
      aggregateLikes,
      healthScore,
      analyzedInstructions,
      image,
      diets,
    } = req.body;
    if (!title || !summary || !aggregateLikes || !healthScore|| !analyzedInstructions || !image || !diets)  {
      console.log("No se pudo crear jaja")
      return res.json("Missing information for creating a recipe detected");
      
    }
    let recipeCreated = await Recipe.create({
      title,
      summary,
      aggregateLikes,
      healthScore,
      analyzedInstructions,
      image,
    });
    let dietDb = await Diet.findAll({ where: { name: diets } });
    recipeCreated.addDiet(dietDb);
    res.send("Recipe created successfully");
  });

  router.delete("/", async (req, res) => {
    let { id } = req.query;
    try {
      let response = await deleteFromDb(id);
      res.status(200).send(response);
    } catch (error) {
      res.status(409).send(error.message);
    }
  });

  router.put("/:id", putRecipe);
  

  module.exports = router;