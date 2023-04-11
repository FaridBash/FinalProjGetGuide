import { useEffect, useRef, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {auth} from '../../firebase.config'

import './SignUp.css'



export default function Signup(){

    const [user, setUser]=useState({})
    const [userToMongoReg, setUserToMongoReg]=useState(undefined);

    const nameInputRef=useRef(null);
    const emailInputRef=useRef(null);
    const passwordInputRef=useRef(null);
    const langaugeInputRef=useRef(null);
    const roleInputRef=useRef(null);

    onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
    })

    useEffect(()=>{
        if(userToMongoReg!=undefined){
            console.log('userToMongoReg',userToMongoReg);
            setUserInMongo(userToMongoReg);
        }
    },[userToMongoReg])
    const register= async (e)=>{
        try {
            e.preventDefault()
            const user= await createUserWithEmailAndPassword(auth, emailInputRef.current.value, passwordInputRef.current.value)
            console.log('user',user);
            userToMongoRegister();
        } catch (error) {
            console.log(error.message);
        }
      };

      const userToMongoRegister=()=>{
        const mongoUser={}
        mongoUser.name=nameInputRef.current.value;
        mongoUser.email=emailInputRef.current.value;
        mongoUser.role=roleInputRef.current.value;
        mongoUser.auctions=[];
        mongoUser.languages=(langaugeInputRef.current.value).split(" ")
        .map((languages) => languages.trim());
        setUserToMongoReg(mongoUser);
      }


      async function setUserInMongo(obj) {
        const response = await fetch("http://localhost:6363/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(obj),
        });
      }

    return <div id='signup-page'>

        <form action="" id='signup-form' onSubmit={register}>
            <input type="text" name='fullName' id='name-input' ref={nameInputRef} placeholder="Full Name" />
            <input type="email" name="email" id="email-input" ref={emailInputRef} placeholder="Email.."/>
            <input type="password" name="password" id="password-input" ref={passwordInputRef} placeholder="Password.."/>
            <input type="text" name="language" id="language-input" ref={langaugeInputRef} placeholder="Mother Tongue.."/>
            <input type="text" name="role" id="role-input" ref={roleInputRef} placeholder="Role"/>
            
            <button type='submit'>SignUp</button>

        </form>

    </div>
}