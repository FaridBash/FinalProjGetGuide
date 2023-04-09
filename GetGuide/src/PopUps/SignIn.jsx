
import { useEffect, useRef, useState } from "react";


import "./SignIn.css";

export default function SignInModal(props) {
 


  if (!props.open) return null;



  return (
    <>
      <div id="overLay1" />
      <div id="modal1">
        <h1>Modal</h1>
        <button onClick={props.onClose}>close</button>
    </div>
      
    </>
  );
}
