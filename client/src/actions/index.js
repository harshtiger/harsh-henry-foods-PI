import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const GET_TYPES_OF_DIET = "GET_TYPES_OF_DIET";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_SCORE_LIKES = "ORDER_BY_SCORE_LIKES";
export const GET_NAME_RECIPE = "GET_NAME_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const POST_RECIPE = "POST_RECIPE";
export const GET_DETAIL = "GET_DETAIL";
export const CLEAR_DETAILS = 'CLEAR_DETAILS';



// manejo de errores desde el front
export const ERROR_OCURRED = 'ERROR_OCURRED';
export const CLEAR_ERROR = 'CLEAR_ERROR';

//paginacion
export const PAG_INDEXES = 'PAG_INDEXES';

// para hacerla c r u d
export const DELETE_RECIPE = "DELETE_RECIPE";

export const UPDATE_RECIPE = "UPDATE_RECIPE"

//  -------------------------------------- //


//aca es donde ocurre la magia (?) en este lugar le pego a los endpoints de mi backend
// conectando asi el front con mi back

export function getRecipes() {
  return async function (dispatch) {

  
    return fetch("https://harsh-food-api.herokuapp.com/recipes")
    .then (response => {
      if (!response.ok) throw Error (response.status)
      return response.json()
    })
    .then(json => {
      dispatch({type: GET_RECIPES, payload: json})
    })
    .catch(error => dispatch({type: ERROR_OCURRED, payload: error.toString()},
     console.log("Error, could not get recipes, API connection was refussed")))
  };
}





export function getTypesOfDiet() {
  return async function (dispatch) {
    try {
      var json = await fetch("https://harsh-food-api.herokuapp.com/types")

      .then(response => {
        if(!response.ok) throw Error(response.status);
        return response.json()
      })
      return dispatch({
        type: "GET_TYPES_OF_DIET",
        payload: json
      });
    } catch (error) {
      dispatch({type: ERROR_OCURRED, payload: error.toString()})
    }
  };
}



export function clearError()  {
  return {
      type: CLEAR_ERROR
  }
}

//paginacion
export const setPagIndexes = (indexOfLastRecipe, indexOfFirstRecipe) => {
  return { type: PAG_INDEXES, payload: { indexOfLastRecipe, indexOfFirstRecipe } };
};


export function filterByDiet(diets) {
  return {
    type: "FILTER_BY_DIET",
    payload:diets,
  };
}





export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByScoreLikes(payload) {
  return {
    type: "ORDER_BY_SCORE_LIKES",
    payload,
  };
}

export function getNameRecipe(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        "https://harsh-food-api.herokuapp.com/recipes?name=" + name

        );
      return dispatch({
        type: "GET_NAME_RECIPE",
        payload: json.data,
      });

    } catch (error) {
      dispatch({type: ERROR_OCURRED, payload: error.toString()})
    }
  };
}

export function getDiets() {
  return async function (dispatch) {
    try{
    var json = await axios.get("https://harsh-food-api.herokuapp.com/types");
    return dispatch({
      type: "GET_DIETS",
      payload: json.data,
    });
  } catch(error){
    dispatch({type: ERROR_OCURRED, payload: error.toString()})

  }
  };
}

export function postRecipe(payload) {
  return async function () {
   try { const json = await axios.post("https://harsh-food-api.herokuapp.com/recipe", payload);
    return {
      type: "POST_RECIPE",
      json,
    };
  } catch (error){
    console.log("No se pudo crear jaja");
    payload({type: ERROR_OCURRED, payload: error.toString()})
  }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      
      let json = await axios.get("https://harsh-food-api.herokuapp.com/" + id);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      dispatch({type: ERROR_OCURRED, payload: error.toString()})
    }
  };
}

export function clearDetails () {
  return {
      type: CLEAR_DETAILS
  }
}


// para el c r u d
export const deleteRecipe = (id) => {
  return async function (dispatch) {
    try{
    await axios.delete(`https://harsh-food-api.herokuapp.com/recipe?id=${id}`);
    return dispatch({
      type: "DELETE_RECIPE",
    });
  
  } catch(error){
    dispatch({type: ERROR_OCURRED, payload: error.toString()})
  }
}
};

export const updateRecipe = (id, data) => {
  return async function (dispatch) {
    try{
    await axios.put(`https://harsh-food-api.herokuapp.com/recipe/${id}`, data);
    return dispatch({
      type: "UPDATE_RECIPE",
    });
  } catch(error){
    dispatch({type: ERROR_OCURRED, payload: error.toString()})
  }
  };
};