import React from "react";

//? STYLES
//import { PopUp, Button } from "./styles/ConfirmPopUpSC";

function ConfirmPopUp({ text, aceptText, cancelText, aceptPopUp, cancelPopUp }) {
  return (
    <div>
      <p>{text}</p>
      <button onClick={aceptPopUp}>{aceptText}</button>
      <button onClick={cancelPopUp}>{cancelText}</button>
      
    </div>
  );
}

export default ConfirmPopUp;