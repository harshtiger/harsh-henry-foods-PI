import React from "react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, clearDetails, deleteRecipe, updateRecipe, clearError } from "../../actions";
import {  useParams  } from "react-router";
import { Link, useHistory  } from "react-router-dom";
import "./Detail.css";

// adicionales
import Loading from "../loading/Loading";
import DeleteConfirm from "../modal/DeleteConfirm"
import Modal from "../modal/Modal";



export default function Detail(props) {
  
  const dispatch = useDispatch();
  const [/*cambio*/, setCambio] = useState(false);
  const detail = useSelector((state) => state.detail);

  // manejo de errores
  const error = useSelector(state => state.error);
  const [popUp, setPopUp] = useState(false);

  
  
  const { id } = useParams();

  
  const history = useHistory()

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    setCambio(true);
    return () => {
      dispatch(clearDetails());
  }
    
  }, [props.match.params.id, dispatch]);


  const clearErrors = () => {  // manejo de errores para la ventana modal
    dispatch(clearError());
    history.push("/home")
}
 

  //delete
  
  function handleDeleteClick() {
    setPopUp(() => true);
  }
  
  function acceptPopUp() {
    console.log("owo")
    dispatch(deleteRecipe(id));
    setPopUp(false);
    history.push("/home")
  }
  
  

  //cancel? ok
  function cancelPopUp() {
  setPopUp(false);
  }

  const handleUpdata = () => {
    dispatch(updateRecipe(id));
    history.push(`/update/${id}`);
  };



  return (
    <div className="detail">
      
      {error && <Modal show={true} setShow={clearErrors} message={"There was a problem with your Recipe ID. Lets go back"} />}
      {detail.length ? 
      <><div>
          <Link to="/home"> 
            <button>Back to Home</button>
          </Link>

          {id.length > 8
            ? <button onClick={handleUpdata}>
              Update recipe!
            </button>
            : <br></br>}

          {id.length > 8
            ? <button onClick={handleDeleteClick}>
              Delete Recipe
            </button>
            : <br></br>}

        </div><div>
            <h1> "{detail[0].title}"</h1>

            <img className="detailImg" src={detail[0].image
              ? (detail[0].image)
              : (<img src="https://shorturl.ae/eEB8K" alt="img plate" />)} alt="img recipe" />

            <div className="h3-2">

              {detail[0].createdDb
                ? (<h2>Type of Diets: {detail[0].diets.map((d) => d.name).join(", ")}</h2>)
                : (<h2>Type of Diets:
                  {detail[0].vegetarian === true
                    ? " " + detail[0].diets.join(", ") + ", vegetarian"
                    : " " + detail[0].diets.join(", ")}
                </h2>)}

              <h2>
                {detail[0].createdDb
                  ? null
                  : "Dish types: " + detail[0].dishTypes.join(", ")}
              </h2>


            </div>




            {popUp &&
              <DeleteConfirm

                show={true} setShow={setPopUp}
                text="Are you sure you want to delete this recipe??"

                acceptPopUp={acceptPopUp}
                cancelPopUp={cancelPopUp} />}



            <div className="details">
              {detail[0].aggregateLikes !== 0
                ? (<h2>Score: {detail[0].aggregateLikes}</h2>)
                : (<h2>Score: - </h2>)}


              {detail[0].healthScore !== 0
                ? (<h2>Health Score: {detail[0].healthScore}</h2>)
                : (<h2>Health Score: - </h2>)}

              <h2>Summary:</h2>

              <p>{detail[0].summary.replace(/<[^>]*>?/g, "")}</p>
              {detail[0].analyzedInstructions
                ? (<h2>Step by step instructions: </h2>)
                : (<h2>Step by step instructions: - </h2>)}


              {detail[0].analyzedInstructions.length > 0
                ? (<ul>{detail[0].createdDb
                  ? (<li>{detail[0].analyzedInstructions}</li>)

                  : (detail[0].analyzedInstructions[0].steps.map((p) => (<li key={p.number}>{p.step}</li>)))}
                </ul>)

                : (<p>Vegetarian</p>)}

            </div>

          </div></> 

        : <Loading />}

        </div>
  );
}
