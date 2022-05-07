import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipe } from "../../actions";
//import Paginates from "../Paginate/Paginates"

import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
 
  
 


  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      return alert("It's required to enter a name in order to make a search")
    } else {
     
    dispatch(getNameRecipe(name));   
    setName(e.target.value);
    setName("")
    

     
    }
  }
  

  const onKeyPress = event => {
    if (!name) {
      return alert("It's required to enter a name in order to make a search")
    } else {
    if (event.charCode === 13) {
      dispatch(getNameRecipe(name, dispatch));
      setName("");
    }
  }
  };

  function handleInputChange(e){
    e.preventDefault();
    setName(e.target.value);

   
    
    
  }



  return (

   <><div className="searchBar">
      <input
        id="inputsearch"
        className="input"
        type="search"
        value={name}
        placeholder="Search recipe..."
        onChange={(e) => handleInputChange(e)}
        autoComplete='false' 
        onKeyPress={(e) =>onKeyPress(e)}
        />

      <button type="submit" onClick={(e) => handleSubmit(e)} className="btn">
        <span className="search">search</span>

      </button>

    </div></>

    
    
  );
}
