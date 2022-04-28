const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;



const getApiInfo = async () => {
    const apiInfo = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`
    );
    return apiInfo.data.results;
  };
  
  const getDbInfo = async () => {
    return await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  };
  
  const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const totalInfo = dbInfo.concat(apiInfo);
    return totalInfo;
  }; 

  module.exports ={
      getAllRecipes
  }