import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import SignInModal from "../PopUps/SignIn";
import { useCookies } from "react-cookie";
import { auth } from "../firebase.config";
import {
  signOut,
} from "firebase/auth";
import "./Header.css";

export default function Header() {
  const [cookies, setCookie, removeCookie] = useCookies(["getguideuser"]);
  const [user, setUser] = useState();
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    if (cookies.getguideuser != undefined) {
      console.log("cookies", cookies.getguideuser.role);
      setUser(cookies.getguideuser);
    }
  }, [cookies]);

  useEffect(()=>{
    if(user!=undefined){
      setUserRole(user.role);
      console.log('userRole',userRole);
    }
  },[user])

  const LinkStyles = ({ isActive }) => {
    console.log("isActive", isActive);
    return {
      borderBottom: isActive ? "2px solid #BAF801" : "",
      borderTop: isActive ? "2px solid #BAF801" : "",
      // backgoundColor: isActive? '':''
    };
  };
  const logout = async () => {
    const signO = await signOut(auth);
    removeCookie('getguideuser');
    removeCookie('undefined');
    
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
          {cookies['getguideuser'] != undefined? <div id="name-holder"><p>Weclome {cookies.getguideuser.name}</p> 
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
