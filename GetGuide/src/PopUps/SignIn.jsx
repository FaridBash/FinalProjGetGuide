
import { useEffect, useRef, useState } from "react";


import "./SignIn.css";

export default function SignInModal(props) {
 


  if (!props.open) return null;



  return (
    <>
      <div id="overLay" />
      <div id="modal">
        <h1>Modal</h1>
        <button onClick={props.onClose}>close</button>
    </div>
      
    </>
  );
}
