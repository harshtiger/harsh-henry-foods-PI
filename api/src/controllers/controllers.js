const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;
const data = require ("../../fake.json")



 const getApiInfo = async () => {

  
        
    const apiInfo = data.results
   
    return apiInfo
    
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

   

  module.exports ={getAllRecipes}