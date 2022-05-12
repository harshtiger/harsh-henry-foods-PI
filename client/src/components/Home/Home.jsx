import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {getRecipes, filterByDiet, getTypesOfDiet, orderByName, orderByScoreLikes,
        clearError, setPagIndexes, } from "../../actions";

import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginates from "../Paginate/Paginates";
import SearchBar from "../SearchBar/SearchBar";

// manejo de errores y loading screen
import Modal from "../modal/Modal";
import Modal2 from "../modal/Modal";
import Loading from "../loading/Loading";


import "./Home.css"; // estilos


export default function Home() {

  
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const diets = useSelector((state) => state.diets);
  const error = useSelector(state => state.error);
  const [popUp2, setPopUp2] = useState(false)
 

  //Paginado:
 
  const [currentPage, setCurrentPage] = useState(1);        // aca seteo la pagina inicial en 1
  const [recipesPerPage, /*setRecipesPerPage*/] = useState(9);// le pido paginar 9  cards en cada page
  const indexOfLastRecipe = currentPage * recipesPerPage;   
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const pagesDisplayLimit = 5;  // aca  limito la cantidad de botones de paginado que quiero mostrar
  const [maxPageDisplay, setMaxPageDisplay] = useState(5);
  const [minPageDisplay, setMinPageDisplay] = useState(1);

  
  let lastpage = [];
  for (let i = 1; i <= Math.ceil(allRecipes.length / recipesPerPage); i++) {  // la ultima pagina, esto lo uso de indice para mi nextSup
  lastpage.push(i);    
}
  // use effects paginado

useEffect(
  () => dispatch(setPagIndexes(indexOfLastRecipe, indexOfFirstRecipe)),
  [indexOfLastRecipe, indexOfFirstRecipe, dispatch]);

useEffect(() => {
  setCurrentPage(1);
  setMaxPageDisplay(5);
  setMinPageDisplay(1);
}, [allRecipes]);
 
//handlers de mi paginate

const handleSupPrev = () => {
  if (currentPage !== 1) {
    window.scrollTo( 0, 0 );// esta linea magica de codigo hermosa hace que se carge la pag. arriba de todo cuando pagino
    setCurrentPage(1);
    setMaxPageDisplay(5);
    setMinPageDisplay(1);
  }
};

const handlePrev = () => {
  if (currentPage !== 1) {
    window.scrollTo( 0, 0 );
    setCurrentPage(currentPage - 1);
      if (currentPage - 1 < minPageDisplay) {
      setMaxPageDisplay(maxPageDisplay - pagesDisplayLimit < 5 ? 5 : maxPageDisplay - pagesDisplayLimit);
      setMinPageDisplay(minPageDisplay - pagesDisplayLimit <= 0 ? 1 : minPageDisplay - pagesDisplayLimit);
    }
  }
};


const handleNext = () => {
  if (currentPage !== lastpage.length) {
    setCurrentPage(currentPage + 1);
    window.scrollTo( 0, 0 );
    console.log("holiiis")
    if (currentPage + 1 > maxPageDisplay) {
      setMaxPageDisplay(maxPageDisplay + pagesDisplayLimit);
      setMinPageDisplay(minPageDisplay + pagesDisplayLimit);
    }
  }
};

const handleSupNext = () => {
  const lastPage = lastpage.length;
  if (currentPage !== lastPage) {
    window.scrollTo( 0, 0 );
    setCurrentPage(lastPage);
    setMaxPageDisplay(lastPage);
    setMinPageDisplay(lastPage - pagesDisplayLimit + 1);
  }
};

  
function paginate(pageNumber) {  // seteo la pagina acorde al click en el boton, hiper simple
window.scrollTo( 0, 0 );
setCurrentPage(pageNumber);}

// fin del paginado


//  manejo de orden de recetas
 const [/*orderName*/, setOrderName] = useState("");
 const [/*orderLike*/, setOrderLike] = useState("");
 const [/*cambio*/, setCambio] = useState(false);


  useEffect(() => {
  dispatch(getRecipes());  // trae todas las recetas
  
  setCambio(true);    
  }, [dispatch]);




  useEffect(() => {
    dispatch(getTypesOfDiet());  // trae los tipos  de  dieta
  }, [dispatch]);

 
  const clearErrors = () => {  // manejo de errores para la ventana modal
    dispatch(clearError());
}

const clearErrors2 = () => {  // manejo de errores para la ventana modal
  setPopUp2(false);
  
}






  function handleClick(e) {     // si bien esto es disparado por el boton all recipes
    e.preventDefault();         // la verdad es que es un refresh
    dispatch(getRecipes());     // con el me traigo todas las resetas y filtro todos los selects
    reset()                     // aun asi, le deje all recipes al btn pq me parecio mas user friendly y lindo jaja
  }

  function handleSelectTypeOfDiet(e) {         
    dispatch(filterByDiet(e.target.value));    
    setCurrentPage(1)
      
  }

  function handleSelectByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrderName("Order" + e.target.value);
  }


  function handleSelectByScore(e) {
    e.preventDefault();
    dispatch(orderByScoreLikes(e.target.value));
    setCurrentPage(1);
    setOrderLike("Order" + e.target.value);

  }



  // aca manejo el reseteo de los selects de filtrado cuando refresco todo
  function reset() {
    resetOrderAlpha();
    resetOrderScore();
    resetOrderDiets();
}
 
  function resetOrderScore(){
    var score = document.getElementById('orderScore')
    for (var i = 0, l = score.length; i < l; i++) {
        score[i].selected = score[i].defaultSelected;
    }
  }

  function resetOrderDiets(){
    var diets = document.getElementById('orderDiets')
    for (var i = 0, l = diets.length; i < l; i++) {
        diets[i].selected = diets[i].defaultSelected;
    }
}

function resetOrderAlpha(){
  var alpha = document.getElementById('orderAlpha')
  for (var i = 0, l = alpha.length; i < l; i++) {
      alpha[i].selected = alpha[i].defaultSelected;
  }
}



  return (
    
    <div className="home">
      {allRecipes.length>0? 


      (<div className="home">
      <h1>pick one for me!!!<img src="https://i.ibb.co/WFBhFLb/Harsh-Stickers1.png" alt="Harsh-Stickers1" border="0" /></h1>
      
      <SearchBar 
      setPopUp2 = {setPopUp2}/>
      {popUp2 && <Modal2 show={true} setShow={clearErrors2} message={"Complete every field!"} /> }
      {error && <Modal show={true} setShow={clearErrors} message={"No results were found"} />}
      
      

      <div className="showAll">

      <Link to="/recipe" className="showAll">
        <button >Create your own recipe</button>
      </Link>

  

        <button
          onClick={(e) => {handleClick(e);}}>
          Show all recipes                
        </button>
      </div>

   
      <div className="select">
      


        <span className="span">Order by Recipe Name</span>
        <select id='orderAlpha' onChange={(n) => handleSelectByName(n)}>
        <option value="unordered" disabled hidden>All</option>
          <option value="All">All</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>


       

        <span  className="span">Order by Score</span>
        <select id='orderScore' onChange={(s) => handleSelectByScore(s)}>
        <option value="unordered" disabled hidden>All</option>
        <option value="All">All</option>
        <option value="Asc">Highest Score</option>
        <option value="Desc">Lowest Score</option>
        </select>


        <span className="span">Filter by Type of diet</span>
        <select id='orderDiets' onChange={(e) => handleSelectTypeOfDiet(e)}>
          <option value="default">All Diets</option>

          {diets.map((d) => (
          <option value={d.name} key={d.id}>{d.name}</option>
          ))}
        </select>
        </div>
      <div className="paginate">
      <Paginates
        paginate={paginate}
        recipesPerPage={recipesPerPage}
        allRecipes={allRecipes.length}
        
        handleNext={handleNext}
        handleSupNext={handleSupNext}
        handleSupPrev={handleSupPrev}
        handlePrev={handlePrev}
        maxPageDisplay={maxPageDisplay}
        minPageDisplay={minPageDisplay}
        currentPage={currentPage}
        
        />  
      </div>
      

      



      <div className="cards">
       
      {currentRecipes?.map((c) => (
         
        
          <div key={c.id}>             
            <Link to={"/home/" + c.id} className="linkCard">             
              <Card               
                title={c.title}
                image={c.image 
                  ?(c.image) 
                  :(<img src="https://shorturl.ae/eEB8K" alt="Img not provided"/>)                  
                 }   

                diets={c.createdDb
                    ? c.diets.map((d) => ( <p key={d.name} className="dietsMap">{d.name}</p>))
                    : c.diets.map((d) => ( <p key={d} className="dietsMap">{d}</p>))
                     }

                vegetarian={
                  c.vegetarian === true 
                  ? (<p className="dietsMap">vegetarian</p>) 
                  :(<p>No veggie option aviable</p>)}
                  score={c.aggregateLikes}
              />              
            </Link>            
          </div>
          ))}
         
          
        </div>     
    
      <div className="paginate">

      <Paginates
        paginate={paginate}
        recipesPerPage={recipesPerPage}
        allRecipes={allRecipes.length}        
        handleNext={handleNext}
        handleSupNext={handleSupNext}
        handleSupPrev={handleSupPrev}
        handlePrev={handlePrev}
        maxPageDisplay={maxPageDisplay}
        minPageDisplay={minPageDisplay}
        currentPage={currentPage}
        />  
         </div>

</div>) 
: <Loading />}
    </div>
  );
}