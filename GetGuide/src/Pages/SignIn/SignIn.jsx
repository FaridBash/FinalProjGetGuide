import { useEffect, useRef, useState } from "react";
import "./SignIn.css";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase.config";
export default function SignIn() {
  const emailSignInInputRef = useRef(null);
  const passwordSignInInputRef = useRef(null);
  const emailSignUpInputRef = useRef(null);
  const passwordSignUpInputRef = useRef(null);
  const [user, setUSer] = useState({});
  const [userInMongo, setUSerInMongo] = useState(undefined);

  onAuthStateChanged(auth, (currentUser) => {
    setUSer(currentUser);
  });

  useEffect(() => {
    signInUserFromMomgo(user);
  }, [user]);

  const login = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        emailSignInInputRef.current.value,
        passwordSignInInputRef.current.value
      );
      console.log("user", user);
    } catch (error) {
      console.log(error.message);
    }
  };
  const logout = async () => {
    const signO = await signOut(auth);
  };

  async function signInUserFromMomgo(obj) {
    const response = await fetch("http://localhost:6363/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: obj.email }),
    });
    const responseData = await response.json();
    console.log(responseData);

    // Convert the object to a string
    const cookieUser = JSON.stringify(responseData);

    // Set the cookie with a name and a value
    document.cookie = "user" + cookieUser;
  }

  return (
    <div id="signin-page">
      <form action="" onSubmit={login} id="signin-form">
        <div id="welcome-message">
          <p>
            {" "}
            <b> Welcome</b>
          </p>
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
    
    </div>
  );
}