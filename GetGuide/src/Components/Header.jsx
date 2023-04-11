import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import SignInModal from "../PopUps/SignIn";
import { useCookies } from "react-cookie";
import "./Header.css";

export default function Header() {
  const [cookies, setCookie] = useCookies(["getguideuser"] ?? undefined);
  const [user, setUser] = useState();

  useEffect(() => {
    if (cookies != undefined) {
      // const myUser=JSON.parse(cookies.['getguideuser']);

      // setUser(cookies);
      console.log("cookies", cookies);
    }
  }, [cookies]);

  const LinkStyles = ({ isActive }) => {
    console.log("isActive", isActive);
    return {
      borderBottom: isActive ? "2px solid #BAF801" : "",
      borderTop: isActive ? "2px solid #BAF801" : "",
      // backgoundColor: isActive? '':''
    };
  };

  return (
    <div id="main-container">
      <div id="header-bar">
        <div id="header-bar-menu">

        
        <h3 id="header-logo">GET GUIDE</h3>
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
          {/* <NavLink to={"/about-us"} className='header-navlink' style={LinkStyles}>ABOUT US</NavLink> */}
          <NavLink
            to={"/Dashboard"}
            className="header-navlink"
            style={LinkStyles}
          >
            DASHBOARD
          </NavLink>
          <NavLink className="header-navlink" to={"/signin"}>
            SignIn
          </NavLink>
        </ul>
      <div id="welcome-user">
        <p>Weclome {cookies ? cookies.getguideuser.name : null}</p>
      </div>
        </div>
      </div>
      <div id="outlet">
        <Outlet />
      </div>
    </div>
  );
}
