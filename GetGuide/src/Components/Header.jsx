import { NavLink, Outlet } from "react-router-dom";
import "./Header.css";

export default function Header() {


  const LinkStyles=({isActive})=>{
    console.log('isActive',isActive);
    return {
        borderBottom: isActive? '2px solid #BAF801':'',
        // backgoundColor: isActive? '':''
    }
}


  return (
    <div id="main-container">
       
      <div id="header-bar">
        <h3>GET GUIDE</h3>
        <ul id="header-menu">
          <NavLink to={"/"} className='header-navlink' style={LinkStyles}>HOME</NavLink>
          <NavLink to={"/"} className='header-navlink' style={LinkStyles}>TOURS</NavLink>
          <NavLink to={"/"} className='header-navlink' style={LinkStyles}>ABOUT US</NavLink>
          <NavLink to={"/Dashboard"} className='header-navlink' style={LinkStyles}>DASHBOARD</NavLink>
        </ul>
      </div>
      
      <div id="outlet">
        <Outlet/>
      </div>
    </div>
  );
}
