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
import Loading from "../loading/Loading"
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
  const [recipesPerPage, /*setRecipesPerPage*/] = useState(9);  // le pido paginar 9  cards en cada page
  const indexOfLastRecipe = currentPage * recipesPerPage;   
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );


  const paginate = (pageNumber) => {   // esto setea el paginado
    setCurrentPage(pageNumber);
  };


  const [/*orderName*/, setOrderName] = useState("");
  const [/*orderLike*/, setOrderLike] = useState("");
 // const [loading, setLoading] = useState(false);


  /*const getdata = async () => {
    await dispatch(getNameRecipe());    //cuando haga una busqueda, me setea el estado del load en true
    setLoading(true);
  };*/


  useEffect(() => {
    dispatch(getRecipes());  // trae todas las recetas
   
    
    
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
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginate={paginate}
        />
      </div>
      

      



      <div className="cards">
        {currentRecipes ? 
         
        currentRecipes?.map ((c) => (
          <div key={c.id}>
            <Link to={"/home/" + c.id} className="linkCard">
              <Card
                title={c.title}
                image={
                  c.image ? (   // ternario, si no recibe imagen de  la api le pasa una imagen default
                    c.image
                  ) : (
                    <img
                      src="https://shorturl.ae/eEB8K"
                      alt="Img not provided"
                    />
                  )
                }
                diets={
                  c.createdDb
                    ? c.diets.map((d) => (
                        <p key={d.name} className="dietsMap">
                          {d.name}
                        </p>
                      ))
                    : c.diets.map((d) => (
                        <p key={d} className="dietsMap">
                          {d}
                        </p>
                      ))
                }
                vegetarian={
                  c.vegetarian === true ? (
                    <p className="dietsMap">vegetarian</p>
                  ) : (
                    <p></p>
                  )
                }
                score={c.aggregateLikes}
              />
              
            </Link>
            
          </div>
        ))   : <Loading /> } 
      </div>
      





      <div className="paginate">
        <Paginate
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}
