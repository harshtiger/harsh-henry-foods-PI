import {
  GET_RECIPES,
  FILTER_BY_DIET,
  GET_TYPES_OF_DIET,
  ORDER_BY_NAME,
  ORDER_BY_SCORE_LIKES,
  GET_NAME_RECIPE,
  GET_DIETS,
  POST_RECIPE,
  GET_DETAIL,
  ERROR_OCURRED,
  CLEAR_ERROR,
  CLEAR_DETAILS,
  GET_DB,

  PAG_INDEXES,
  DELETE_RECIPE, 
  
  UPDATE_RECIPE

} from "../actions";

const initialState = {
  recipes: [],
  DBrecipes: [],
  allRecipes: [],
  diets: [],
  detail: [],
  error:"",
  indexOfFirstRecipe: 0,
  indexOfLastRecipe: 9,
  
};


function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      
      };
      case ERROR_OCURRED:
        return {
            ...state,
            error: action.payload
        }

        case CLEAR_ERROR:
          return {
              ...state,
              error: ''
          }


    case GET_TYPES_OF_DIET:
      return {
        ...state,
        diets: action.payload,
      };

     

      case PAG_INDEXES: 
        return {
          ...state,
          indexOfFirstRecipe: action.payload.indexOfFirstRecipe,
          indexOfLastRecipe: action.payload.indexOfLastRecipe,
        };

        case DELETE_RECIPE: {
        
            return {
              ...state,
            };
          
        }


      

      



      
    case FILTER_BY_DIET:
      let allRecipes = state.allRecipes;
      const recipesApi = allRecipes.filter((r) => !r.createdDb);
      const filteredRecipesApi = recipesApi.filter((r) =>
        r.diets.includes(action.payload)
      );
           
      const recipeDb = allRecipes.filter((r) => r.createdDb); 
      
     


     let c =[]  
      recipeDb.forEach(e=> {
        if(e.hasOwnProperty('diets') && e.diets.find(c=> c.name === action.payload)) {
            c.push(e);
        }
    })
    console.log(c)

    let vegie = []
    recipeDb.forEach(e=> {
      if(e.hasOwnProperty('diets') && e.diets.find(c=> c.name === 'vegetarian')) {
          vegie.push(e);
      }
  })

  


      const filtered = c.concat(filteredRecipesApi);
      const vegetarianApi = allRecipes.filter((r) => r.vegetarian === true);
      const vegetarian = vegie.concat(vegetarianApi);
      const ternario = action.payload === "vegetarian" ? vegetarian : filtered;
      console.log(recipeDb)
     

      return {
        ...state,
        recipes: action.payload === "default" ? allRecipes : ternario,
        
      };


      case GET_DB:
        let allRecipes2 = state.allRecipes;
        
      const recipesApi2 = allRecipes2.filter((r) => !r.createdDb);

      const recipeDb2 = allRecipes2.filter((r) => r.createdDb);

          var getByDB =
          action.payload === "created"
            ? recipeDb2
            : recipesApi2;
        if (action.payload === "all") getByDB = state.allRecipes;
        console.log(getByDB)
        //if (!getRecipesByDB.length)
        
          //return { ...state, errors: { created: true } };

        return {
          ...state,
          recipes: getByDB,
          errors: {},
          
          
        };

      
    case ORDER_BY_NAME:
     
      let sortedRecipes =
        action.payload === "A-Z"
          ? state.recipes.sort(function (a, b) {
              if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
              }
              if (b.title.toLowerCase() > a.title.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return 1;
              }
              if (b.title.toLowerCase() < a.title.toLowerCase()) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: action.payload === "default" ? state.recipes : sortedRecipes,
      };
    case ORDER_BY_SCORE_LIKES:
      let orderedRecipes =
        action.payload === "Desc"
          ? state.recipes.sort((a, b) => a.aggregateLikes - b.aggregateLikes)
          : state.recipes.sort((a, b) => b.aggregateLikes - a.aggregateLikes);
      return {
        ...state,
        recipes: action.payload === "All" ? state.recipes : orderedRecipes,
      };
    case GET_NAME_RECIPE:
      return {
        ...state,
        recipes: action.payload,
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case POST_RECIPE:
      return {
        ...state,
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

      case CLEAR_DETAILS:
        return {
            ...state,
            detail: []
        };


        case UPDATE_RECIPE:
      return {
        ...state,
      };


    default:
      return state;
  }
}



export default rootReducer;
