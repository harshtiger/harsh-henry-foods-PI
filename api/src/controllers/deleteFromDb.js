const { Recipe } = require("../db")


async function deleteFromDb(id) {


  const recipe = await Recipe.findOne({ where: {  id } });

  if (!recipe) throw new Error(`Recipe does not exist`);

  await Recipe.destroy({ where: {  id } });
  
  return "recipe erased correctly";
}

module.exports = deleteFromDb;