import { useRef, useState } from "react";
import "./SignIn.css";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {auth} from '../../firebase.config'
export default function SignIn() {
  const emailSignInInputRef = useRef(null);
  const passwordSignInInputRef = useRef(null);
  const emailSignUpInputRef = useRef(null);
  const passwordSignUpInputRef = useRef(null);
  const [user, setUSer]=useState({})


  onAuthStateChanged(auth, (currentUser)=>{
    setUSer(currentUser);
  })

  const onSubmitHandler = (e) => {
    e.preventDefault();

    console.log(emailSignInInputRef.current.value);
    console.log(passwordSignInInputRef.current.value);
    emailSignInInputRef.current.value = "";
    passwordSignInInputRef.current.value = "";
  };



  const register= async (e)=>{
    try {
        e.preventDefault()
        const user= await createUserWithEmailAndPassword(auth, emailSignUpInputRef.current.value, passwordSignUpInputRef.current.value)
        console.log('user',user);
    } catch (error) {
        console.log(error.message);
    }
  };
  const login= async (e)=>{
      e.preventDefault()
    try {
        const user= await signInWithEmailAndPassword(auth, emailSignInInputRef.current.value, passwordSignInInputRef.current.value)
        console.log('user',user);
    } catch (error) {
        console.log(error.message);
    }
  };
  const logout= async ()=>{
    const signO=await signOut(auth);
  };




  return (
    <div id="signin-page">
      
      <form action="" onSubmit={login} id="signin-form">
        <div id="welcome-message">
        <p> <b> Welcome</b></p>
        <p>to GetGuide</p>
        </div>
        <input
          type="email"
          className="signin-input"
          ref={emailSignInInputRef}
          placeholder="Email"
        />
        <input
          type="password"
          className="signin-input"
          ref={passwordSignInInputRef}
          placeholder="Password"
        />
        <button type="submit">signin</button>
      </form>
      {/* <form action="" onSubmit={register}>
        <input
          type="email"
          id="signup-email"
          ref={emailSignUpInputRef}
          placeholder="Email"
        />
        <input
          type="password"
          id="signup-password"
          ref={passwordSignUpInputRef}
          placeholder="Password"
        />
        <button type="submit">signup</button>
     <h3 id="signedin">{user?.email}</h3>
      </form> */}
      {/* <button onClick={logout}>SignOut</button> */}
    </div>
  );
}
