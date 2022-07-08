import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { postRecipe, getDiets, getDetail, updateRecipe, clearError } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal/Modal";
import Modal2 from "../modal/Modal2";
import "./RecipeCreate.css";

function validate(input) {
  let errors = {};
  
  input.title
    ? (errors.title = "" )
    : (errors.title = "You must name the recipe");
  input.summary
    ? (errors.summary = "")
    : (errors.summary = "You must provide a summary");
    input.analyzedInstructions 
    ?(errors.analyzedInstructions = "")
    :(errors.analyzedInstructions = "Enter a description");
   
  input.diets.length < 1
    ? (errors.diets = "Choose at least one diet")
    : (errors.diets = "");
    parseInt(input.aggregateLikes) <= 1
   ? (errors.aggregateLikes = "Cant take a number bellow 1")
   :(errors.aggregateLikes = "");
   parseInt(input.healthScore) <= 1
   ? (errors.healthScore = "Cant take a number bellow 1")
   :(errors.healthScore ="")
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

  const history = useHistory();// para irme a casa despues de crear o updatear

  const diets = useSelector((state) => state.diets);

  const [errors, setErrors] = useState({}); //manejo de errores

  const [updated, setUpdated] = useState(false);// c r u d
  const[isUpdated, setIsUpdated] = useState(false); // c r u d
  

  const error = useSelector(state => state.error);

  const [popUp, setPopUp] = useState(false);
  const [popUp2, setPopUp2] = useState(false);

  
  
  

 

 const {id} = useParams(); // para el put
 

const clearErrors = () => {  // manejo de errores para la ventana modal
    dispatch(clearError());
    history.push("/home")
}
  
const clearErrors2 = () => {  // manejo de errores para la ventana modal
  setPopUp2(false);
  
}

  
  
  

  useEffect(() => {// esto trae las diets
    dispatch(getDiets());
    
    id && dispatch(getDetail(id)); // trae details para el put
  }, [dispatch, id]);
  
  const [input, setInput] = useState({
    title: "",
    summary: "",
    aggregateLikes: 0,
    healthScore: 0,
    analyzedInstructions: "",
    image: "" ,
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
    if(!input.diets.includes(e.target.value)){
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

    
    
    console.log(errors.analyzedInstructions)
    

    if (!input.title || !input.summary || !input.image||  !input.analyzedInstructions || input.diets.length === 0 || Number(input.aggregateLikes) <= 0 || Number(input.healthScore) <= 0)  {
     
      setPopUp2(()=> true)

      e.preventDefault();
      
      
      //console.log(popUp2)
      
     // alert("You must complete every field!!");
    }
    
     else if (input.title && input.summary&& input.analyzedInstructions  && input.image && input.diets.length  > 0 && Number(input.aggregateLikes) > 0 && Number(input.healthScore) > 0)
     {
      e.preventDefault();
      
      if( id === undefined){
        console.log("owo")

      
        
      dispatch(postRecipe(input));
      
      setPopUp(()=> true)
     
      setInput({
        title: "",
        summary: "",
        aggregateLikes: 0,
        healthScore: 0,
        analyzedInstructions: "",
        image: "" ,
        diets: [],
      });

    
     
     
    
  } else if (id) {
    
    dispatch(updateRecipe(id, input));
    setIsUpdated(()=> true)
    console.log(isUpdated)
 
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
      diets: [recipeUpdate[0].diets.map((d) => d.name).join(", ")],
      
     
    });
    //console.log(recipeUpdate[0].diets.map((d) => d.name).join(", "))
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
      { ( !id
      ? <h1><img className="harsh" src="https://i.ibb.co/nmWgfS3/IMG-4878.png" alt="tiger eating a bone" border="0"/>Create your own Recipe here:</h1>
      : <h1><img className="harsh" src="https://i.ibb.co/nmWgfS3/IMG-4878.png" alt="tiger eating a bone" border="0"/>Update your recipe here:</h1>
      )}

      {popUp2 && <Modal2 show={true} setShow={clearErrors2} message={"Complete every field!"} /> }
      {popUp && <Modal show={true} setShow={clearErrors} message={"Recipe created!"} /> }
      {isUpdated && <Modal show={true} setShow={clearErrors} message={"Recipe updated!"} /> }
      {error && <Modal2 show={true} setShow={clearErrors} message={"Your Recipe ID does not exist in database"} />}
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
              type="text"
              value={parseInt(input.aggregateLikes)}
              name="aggregateLikes"
             
              max="10000"
              onChange={(e) => handleChange(e)}

            />
            {errors.aggregateLikes && <p>{errors.aggregateLikes}</p>}
          </div>
          <div>
          
            <label>Health Level:</label>
            <input
              className="inputCreate"
              type="number"
              value={input.healthScore}
              name="healthScore"
              
              max="10000"
              onChange={(e) => handleChange(e)}
            />
            {errors.healthScore && <p>{errors.healthScore}</p>}
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
          
            {errors.analyzedInstructions && <p>{errors.analyzedInstructions}</p>}
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
        
          {id ? (
          <button type="submit" className="btnCreate">
           Update Recipe
          </button>)


          : (<button type="submit" className= "btnCreate">
           Create Recipe
          </button>)}
          


          <Link to="/home">
        <button className="buttonToHome">Back to Home</button>
      </Link>
        </form>
      </div>
    </div>
  );
}

