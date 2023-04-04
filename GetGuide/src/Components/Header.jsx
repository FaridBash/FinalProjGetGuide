import { NavLink, Outlet } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <div id="main-container">
       
      <div id="header-bar">
        <h3>GET GUIDE</h3>
        <ul id="header-menu">
          <NavLink to={"/"} className='header-navlink'>HOME</NavLink>
          <NavLink to={"/"} className='header-navlink'>TOURS</NavLink>
          <NavLink to={"/"} className='header-navlink'>ABOUT US</NavLink>
          <NavLink to={"/Dashboard"} className='header-navlink'>DASHBOARD</NavLink>
        </ul>
      </div>
      
      <div id="outlet">
        <Outlet/>
      </div>
    </div>
  );
}
