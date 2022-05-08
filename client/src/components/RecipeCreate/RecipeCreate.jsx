import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { postRecipe, getDiets, getDetail, updateRecipe, getRecipes } from "../../actions";
import { useDispatch, useSelector, useStore } from "react-redux";
import "./RecipeCreate.css";

function validate(input) {
  let errors = {};
  
  input.title
    ? (errors.title = "")
    : (errors.title = "You must name the recipe");
  input.summary
    ? (errors.summary = "")
    : (errors.summary = "You must provide a summary");
  input.diets.length < 1
    ? (errors.diets = "Choose at least one diet")
    : (errors.diets = "");
  if (!input.image.includes("https://") && !input.image.includes("http://")) {
    errors.image = "This isn't a valid image address";
  } else {
    errors.image = "";
  }
  return errors;
}

export default function RecipeCreate() {
  const recipeUpdate = useSelector( state => state.detail)

  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.diets);
  const [errors, setErrors] = useState({});
  const [updated, setUpdated] = useState(false);

  // put

  const {id} = useParams();
 
  
   
  
  

  useEffect(() => {// esto trae las diets
    dispatch(getDiets());
    
    id && dispatch(getDetail(id));
  }, [dispatch, id]);
  
  const [input, setInput] = useState({
    title: "",
    summary: "",
    aggregateLikes: 0,
    healthScore: 0,
    analyzedInstructions: "",
    image: "",
    diets: [],
  });

  // handlers

  function handleSelectDiet(e) {
   
    setErrors(
      validate({
        ...input,
        diets: [...input.diets, e.target.value],
      })
    ); 
    if(!diets.includes(e.target.value)){
    setInput((input) => ({
      ...input,
      diets: [...input.diets, e.target.value],
    }));
  }
  }

  
  function handleDelete(e, d) {
    e.preventDefault();
    setInput({
      ...input,
      diets: input.diets.filter((diet) => diet !== d),
    });
  }



  function handleSubmit(e) {
    console.log(id)

    if (!input.title && !input.summary && !input.image && input.diets.length === 0)  {
      e.preventDefault();
      alert("You must complete every field!!");
    }
    
    if (input.title && input.summary && input.image && input.diets.length > 0) {
      e.preventDefault();
      
      if( id === undefined){
        console.log("owo")

      
        
      dispatch(postRecipe(input));
      alert("Recipe succesfully Created!!");
      setInput({
        title: "",
        summary: "",
        aggregateLikes: 0,
        healthScore: 0,
        analyzedInstructions: "",
        image: "",
        diets: [],
      });

     history.push("/home");
     
     
    
  } else if (id) {
   
    dispatch(updateRecipe(id, input));
    alert("updated!");
    history.push("/home");
   
  } 
}
  
  }
  if (recipeUpdate.length > 0) {
  if (id && recipeUpdate[0].title && !updated) {
    setInput({
      ...input,
      title: recipeUpdate[0].title,
      summary: recipeUpdate[0].summary,
      aggregateLikes: recipeUpdate[0].aggregateLikes,
      healthScore: recipeUpdate[0].healthScore,
      analyzedInstructions: recipeUpdate[0].analyzedInstructions,
      image: recipeUpdate[0].image,
      //diets: updateRecipe[0].diets,
    });
    setUpdated(!updated);
  }
  }


  function handleChange(e) {
    e.preventDefault();
    setInput((input) => ({
      ...input,
      [e.target.name]: e.target.value,
    }));
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }




  return (
    <div className="create">
    
      <h1><img src="https://i.ibb.co/nmWgfS3/IMG-4878.png" alt="tiger eating a bone" border="0"/>Create your own Recipe here:</h1>
      <div className="form">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <h2 className="form-title">Fill this form with your recipe details please </h2>
          </div>
          <div>
            <label>Plate Name:</label>
            <input
              className="inputCreate"
              placeholder="Complete here..."
              type="text"
              value={input.title}
              name="title"
              onChange={(e) => handleChange(e)}
            />
            {errors.title && <p>{errors.title}</p>}
          </div>
          <div>
            <label>Summary:</label>
            <input
              className="inputCreate"
              placeholder="Complete here..."
              type="text"
              value={input.summary}
              name="summary"
              onChange={(e) => handleChange(e)}
            />
            {errors.summary && <p>{errors.summary}</p>}
          </div>
          <div>
            <label>Score:</label>
            <input
              className="inputCreate"
              type="number"
              value={input.aggregateLikes}
              name="aggregateLikes"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Health Level:</label>
            <input
              className="inputCreate"
              type="number"
              value={input.healthScore}
              name="healthScore"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label className="labelInstr">Instructions:</label>
            <textarea
              type="text"
              className="instruction"
              placeholder="Complete here..."
              rows="5"
              value={input.analyzedInstructions}
              name="analyzedInstructions"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Image:</label>
            <input
              className="inputCreate"
              type="text"
              placeholder="Example: https://..."
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
            />
            {errors.image && <p>{errors.image}</p>}
          </div>
          <div className="dietsCreate">
            <span>Type of Diet:</span>
            <select onChange={(e) => handleSelectDiet(e)}>
              {diets.map((d) => (
                <option value={d.name} key={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
            {input.diets.map((d, i) => (
              <ul key={i}>
                <p>{d}</p>
                <button className="btnCreateD" onClick={(e) => handleDelete(e, d)}>x</button>
              </ul>
            ))}
            {errors.diets && <p>{errors.diets}</p>}
          </div>
          <button type="submit" className="btnCreate">
            Create Recipe
          </button>
          <Link to="/home">
        <button className="buttonToHome">Back to Home</button>
      </Link>
        </form>
      </div>
    </div>
  );
}

