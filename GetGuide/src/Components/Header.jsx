import { NavLink, Outlet } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <div id="main-container">
        <div id="header">

        
      <div id="header-bar">
        <h3>GET GUIDE</h3>
        <ul id="header-menu">
          <NavLink to={"/"} className='header-navlink'>HOME</NavLink>
          <NavLink to={"/"} className='header-navlink'>TOURS</NavLink>
          <NavLink to={"/"} className='header-navlink'>ABOUT US</NavLink>
        </ul>
      </div>
      <div id="video">
       
        <div id="black-div">
        </div>
        
      </div>
      <div id="header-text">
            <h1 id="header-h1">Enjoy a Perfect Tour</h1>
            <p id="header-p">Find the best Tours and Excursion at the best price</p>
        </div>
      </div>
      <div id="outlet">
        <Outlet/>
      </div>
    </div>
  );
}
