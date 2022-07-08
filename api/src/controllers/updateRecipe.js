const {Recipe}= require("../db")

const putRecipe = async (req, res) => {
    try {
      const { id } = req.params;
      let updatedRecipe = await Recipe.findOne({
        where: {
          id: id,
        },
      });
      await updatedRecipe.update({
        title: req.body.title,
        summary: req.body.summary,
        aggregateLikes: req.body.aggregateLikes,
        healthScore: req.body.healthScore,
        analyzedInstructions: req.body.analyzedInstructions,
        image: req.body.image,
        diets: req.body.diets,
        });
      
      res.send(updatedRecipe);
    } catch (error) {
      res.status(400).send(error);
      alert("Recipe id is not correct")
    }
  };
  module.exports = putRecipe