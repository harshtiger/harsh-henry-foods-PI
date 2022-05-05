import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Paginate.css";

//action 
import {setPagIndexes} from "../../actions/index";



export default function Paginate({paginate, handleNext, handleSupNext, handleSupPrev, handlePrev, maxPageDisplay, minPageDisplay}) {

const dispatch = useDispatch();
const allRecipes = useSelector(state => state.recipes.length);

// 

const [currentPage, /*setCurrentPage*/] = useState(1);
const recipesPerPage= 9;

const indexOfLastRecipe = currentPage * recipesPerPage;   
const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;





  
  useEffect(
    () => dispatch(setPagIndexes(indexOfLastRecipe, indexOfFirstRecipe)),
    [indexOfLastRecipe, indexOfFirstRecipe, dispatch]
  );


  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  





  

  

  return (
 

  <nav className="btnPag">
      {pageNumbers.length === 0 ? (
        <p></p>
      ) : (
        <div>
          <button  onClick={()=> handleSupPrev(currentPage)}>{"<<"}</button>
          <button onClick={()=> handlePrev(currentPage)}>{"<"}</button>
          {pageNumbers?.map(number => {
            if (number <= maxPageDisplay && number >= minPageDisplay) {
              return (
                <button
                  key={number}
                  id={number}
                  
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              );
            } else {
              return null;
            }
          })}
          <button onClick={()=> handleNext(currentPage)}>{">"}</button>
          <button onClick={()=> handleSupNext(currentPage)}>{">>"}</button>
        </div>
      )}
    </nav>
  );
}


