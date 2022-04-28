import React from "react";
import "../styles/Paginate.css";

export default function Paginate({ recipesPerPage, allRecipes, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
   <nav className="btnPag">
      {pageNumbers &&
        pageNumbers.map((number) => (
        <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))}
    </nav>
  );
}



 /* const handleClick = (e) => {
    for (let page of pageNumbers) {
      if (page === parseInt(e.target.value)) {
        document.getElementById(page).classList.add(Classes.btn__active);
      } else {
        document.getElementById(page).classList.remove(Classes.btn__active);
      }
    }
    onSetPage(e.target.value);
  };

  return (
    <Fragment>
      {pageNumbers &&
        pageNumbers.map((page) => {
          return (
            <button
              id={page}
              value={page}
              className={Classes.btn}
              key={page}
              onClick={handleClick}
            >
              {page}
            </button>
          );
        })}
    </Fragment>
  );
};*/