import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  filterByDiet,
  getTypesOfDiet,
  orderByName,
  orderByScoreLikes,
  clearError,
 /* getNameRecipe*/
} from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginate from "../Paginate/Paginate";
import SearchBar from "../SearchBar/SearchBar";
import LoadingHome from "../loading/LoadingHome"
import Modal from "../modal/Modal";


import "./Home.css";




export default function Home() {
  const [, /*refreshState*/ setRefreshState] = useState(false);
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const diets = useSelector((state) => state.diets);
  const error = useSelector(state => state.error);



  //Paginado:

 
  const [currentPage, setCurrentPage] = useState(1);        // aca seteo la pagina inicial en 1
  const [recipesPerPage, setRecipesPerPage] = useState(9);// le pido paginar 9  cards en cada page
  const indexOfLastRecipe = currentPage * recipesPerPage;   
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );
//

useEffect(() => {
  setCurrentPage(1);
  setMaxPageDisplay(5);
  setMinPageDisplay(1);
}, [allRecipes]);



const pagesDisplayLimit = 5;
const [maxPageDisplay, setMaxPageDisplay] = useState(5); 
const [minPageDisplay, setMinPageDisplay] = useState(1);

const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }


  
  const handleNext = () => {
    if (currentPage !== pageNumbers.length) {
      setCurrentPage(currentPage + 1);
      if (currentPage + 1 > maxPageDisplay) {
        setMaxPageDisplay(maxPageDisplay + pagesDisplayLimit);
        setMinPageDisplay(minPageDisplay + pagesDisplayLimit);
      }
    }
  };

  const handleSupNext = () => {
    const lastPage = pageNumbers.length;
    if (currentPage !== lastPage) {
      setCurrentPage(lastPage);
      setMaxPageDisplay(lastPage);
      setMinPageDisplay(lastPage - pagesDisplayLimit + 1);
    }
  };

  const handleSupPrev = () => {
    
    if (currentPage !== 1) {
      setCurrentPage(1);
      setMaxPageDisplay(5);
      setMinPageDisplay(1);
      
    }
  };

  const handlePrev = () => {
    console.log("owo")
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      if (currentPage - 1 < minPageDisplay) {
        setMaxPageDisplay(
          maxPageDisplay - pagesDisplayLimit < 5 ? 5 : maxPageDisplay - pagesDisplayLimit
        );
        setMinPageDisplay(
          minPageDisplay - pagesDisplayLimit <= 0 ? 1 : minPageDisplay - pagesDisplayLimit
        );
      }
    }
  };
  

  
  const paginate = (pageNumber) => {   // esto setea el paginado
    setCurrentPage(pageNumber);
    };




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

  const clearErrors = () => {
    dispatch(clearError());
}

  function handleClick(e) {    // con este handle click me traigo todas las recetas
    e.preventDefault();
    
    dispatch(getRecipes());
    
  }


  function handleSelectTypeOfDiet(e) {         
    dispatch(filterByDiet(e.target.value));
    
    setCurrentPage(1)

    setRefreshState((prevState) => !prevState);
    
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

  //


  


  return (
    <div className="home">
      <h1>pick one for me!!!<img src="https://i.ibb.co/WFBhFLb/Harsh-Stickers1.png" alt="Harsh-Stickers1" border="0" /></h1>
      <SearchBar />
      {error && <Modal show={true} setShow={clearErrors} message={"No results were found"} />}
      
      <Link to="/recipe" className="linkCreate">
        <button className="btnCreate">Create your own recipe</button>
      </Link>
      <div className="showAll">
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Show all recipes
          

          
        </button>
      </div>

   
      <div className="select">


        <span className="span">Order by Recipe Name</span>
        <select onChange={(n) => handleSelectByName(n)}>
          <option value="default">All</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>


        <span className="span">Order by Score</span>
        <select onChange={(s) => handleSelectByScore(s)}>
          <option value="All">All</option>
          <option value="Asc">Highest Score</option>
          <option value="Desc">Lowest Score</option>
        </select>


        <span className="span">Filter by Type of diet</span>
        <select onChange={(e) => handleSelectTypeOfDiet(e)}>
          <option value="default">All Diets</option>

          {diets.map((d) => (
            <option value={d.name} key={d.id}>
              {d.name}
            </option>
          ))}
        </select>
        </div>



      <div className="paginate">
        <Paginate
        paginate={paginate}
        handleNext={handleNext}
        handleSupNext={handleSupNext}
        handlePrev={handlePrev}
        handleSupPrev={handleSupPrev}
        maxPageDisplay = {maxPageDisplay}
        minPageDisplay = {minPageDisplay}

        
        /> 
      </div>
      

      



      <div className="cards">
       
      {allRecipes.length>0? currentRecipes?.map((c) => {
         
        return  (
          <div key={c.id}>
             
            <Link to={"/home/" + c.id} className="linkCard">
             
              <Card
               
                title={c.title}


                image={
                  c.image 
                  ?(c.image) 
                  :(<img src="https://shorturl.ae/eEB8K" alt="Img not provided"/>)                  
                 }   


                diets={
                  c.createdDb
                    ? c.diets.map((d) => ( <p key={d.name} className="dietsMap">{d.name}</p>))
                    : c.diets.map((d) => ( <p key={d} className="dietsMap">{d}</p>))
                     }

                vegetarian={
                  c.vegetarian === true 
                  ? (<p className="dietsMap">vegetarian</p>) 
                  :(<p></p>)
                  }


                score={c.aggregateLikes}


              />
              
            </Link>
            
          </div>)})    : <LoadingHome/>}  
          
        </div> 
      
      





      <div className="paginate">
      <Paginate
        paginate={paginate}
        handleNext={handleNext}
        handleSupNext={handleSupNext}
        handlePrev={handlePrev}
        handleSupPrev={handleSupPrev}
        maxPageDisplay = {maxPageDisplay}
        minPageDisplay = {minPageDisplay}

        
        />  
      </div>


    </div>
  );
}