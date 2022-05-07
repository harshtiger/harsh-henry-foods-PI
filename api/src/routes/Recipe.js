const { Router } = require('express');
const deleteFromDb = require('../controllers/deleteFromDb');
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
    if (!title || !summary) {
      return res.json("Title and summary are required to create a recipe");
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
  

  module.exports = router;