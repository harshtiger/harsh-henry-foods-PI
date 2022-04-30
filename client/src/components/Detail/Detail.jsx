import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { Link } from "react-router-dom";
import "./Detail.css";

export default function Detail(props) {
  console.log(props);
  const dispatch = useDispatch();
  const [/*cambio*/, setCambio] = useState(false);
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    setCambio(true);
  }, [props.match.params.id, dispatch]);
  console.log(detail);

  return (
    <div className="detail">
      <Link to="/home">
        <button>Back to Home</button>
      </Link>
      {detail.length ? (
        <div>
          <h1> "{detail[0].title}"</h1>
          <img
            src={
              detail[0].image ? (
                detail[0].image
              ) : (
                <img
                    src="https://shorturl.ae/eEB8K"        alt="img plate"
                />
              )
            }
            alt="img recipe"
          />
          <div className="h3-2">
            {detail[0].createdDb ? (
              <h2>
                Type of Diets: {detail[0].diets.map((d) => d.name).join(", ")}
              </h2>
            ) : (
              <h2>
                Type of Diets:
                {detail[0].vegetarian === true
                  ? " " + detail[0].diets.join(", ") + ", vegetarian"
                  : " " + detail[0].diets.join(", ")}
              </h2>
            )}
            <h2>
              {detail[0].createdDb
                ? null
                : "Dish types: " + detail[0].dishTypes.join(", ")}
            </h2>
          </div>
          <div className="details">
            {detail[0].aggregateLikes !== 0 ? (
              <h2>Score: {detail[0].aggregateLikes}</h2>
            ) : (
              <h2>Score: - </h2>
            )}
            {detail[0].healthScore !== 0 ? (
              <h2>Health Score: {detail[0].healthScore}</h2>
            ) : (
              <h2>Health Score: - </h2>
            )}
            <h2>Summary:</h2>
            <p>{detail[0].summary.replace(/<[^>]*>?/g, "")}</p>
            {detail[0].analyzedInstructions ? (
              <h2>Step by step instructions: </h2>
            ) : (
              <h2>Step by step instructions: - </h2>
            )}
            {detail[0].analyzedInstructions.length > 0 ? (
              <ul>
                {detail[0].createdDb ? (
                  <li>{detail[0].analyzedInstructions}</li>
                ) : (
                  detail[0].analyzedInstructions[0].steps.map((p) => (
                    <li key={p.number}>{p.step}</li>
                  ))
                )}
              </ul>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}