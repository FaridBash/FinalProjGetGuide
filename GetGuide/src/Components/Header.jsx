import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import SignInModal from "../PopUps/SignIn";
import { useCookies } from "react-cookie";
import { auth } from "../firebase.config";
import Cookies from 'js-cookie';
import {
  signOut,
} from "firebase/auth";
import "./Header.css";

export default function Header() {
  // const [cookies, setCookie, removeCookie] = useCookies(["getguideuser"]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))??undefined);
  const [userRole, setUserRole] = useState();
  const navigate=useNavigate();

  // useEffect(() => {
  //   if (cookies.getguideuser != undefined) {
  //     console.log("cookies", cookies.getguideuser.role);
  //     setUser(cookies.getguideuser);
  //   }
  // }, [cookies]);

  useEffect(()=>{
    if(user){
      setUserRole(user.role);
      console.log('userRole',user.role);
    }
  },[user])

  const LinkStyles = ({ isActive }) => {
    console.log("isActive", isActive);
    return {
      borderBottom: isActive ? "2px solid rgb(240,229,7,1)" : "",
      borderTop: isActive ? "2px solid rgb(240,229,7,1)" : "",
      // backgoundColor: isActive? '':''
    };
  };
  const logout = async () => {
    // Cookies.remove('getguideuser');
    // Cookies.remove('undefined');
    // removeCookie(["getguideuser"]);
    // removeCookie('undefined');
    // document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    // setCookie();
    // console.log("object",document.cookie);
    localStorage.setItem('user',null);
    setUser(undefined);
    const signO = await signOut(auth);
    navigate('/');
  };
  return (
    <div id="main-container">
      <div id="header-bar">
        <div id="header-logo-div">
          <h3 id="header-logo">GET GUIDE</h3>
        </div>
        <div id="header-menu-div">
        <ul id="header-menu">
          <NavLink to={"/"} className="header-navlink" style={LinkStyles}>
            HOME
          </NavLink>
          <NavLink
            to={"/ToursPerCity"}
            className="header-navlink"
            style={LinkStyles}
          >
            TOURS
          </NavLink>
          
          <NavLink
            to={"/Dashboard"}
            className="header-navlink"
            style={LinkStyles}
          >
            DASHBOARD
          </NavLink>
        </ul>
        </div>
        <div id="welcome-user-div">
          {user != undefined? <div id="name-holder"><p>Weclome {user.name}</p> 
          <NavLink className="header-navlink" onClick={logout}>
          Logout
        </NavLink></div>:<NavLink className="header-navlink" to={"/signin"}>
            SignIn
          </NavLink>}
          
          
        </div>
      </div>
      <div id="outlet">
        <Outlet />
      </div>
    </div>
  );
}
