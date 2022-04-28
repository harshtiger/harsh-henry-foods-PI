const { Router } = require('express');
const { Diet } = require('../db');
const { API_KEY } = process.env;
const axios = require("axios");



const router = Router();



router.get("/", async (req, res) => {
    const recipesApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`
    );
    const types = await recipesApi.data.results.map((t) => t.diets);
    const diets = types.flat();
    const typeDiets = [...new Set(diets.flat()), "vegetarian"];
    typeDiets.forEach((d) => {
      Diet.findOrCreate({
        where: { name: d },
      });
    });
    const allDiets = await Diet.findAll();
    res.json(allDiets);
  });

  module.exports = router;