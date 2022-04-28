const { Router } = require('express')

const recipes = require("./Recipes.js")
const recipe = require("./Recipe.js")
const types = require("./Types.js")



const router = Router ();

router.use('/recipes', recipes);
router.use('/recipe', recipe );
router.use('/types', types);



module.exports = router;




























