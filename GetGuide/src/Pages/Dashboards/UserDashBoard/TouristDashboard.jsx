import { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import './TouristDashboard.css'



export default function TouristDashboard(){
    const nav=useNavigate();
    useEffect(()=>{
        nav('/Dashboard/userDashboard/openAuctions');
    },[])

    const LinkStyles = ({ isActive }) => {
        console.log("isActive", isActive);
        return {
          borderBottom: isActive ? "2px solid rgb(240,229,7,1)" : "",
          borderTop: isActive ? "2px solid rgb(240,229,7,1)" : "",
          color:"rgb(240,229,7,1)",
          // backgoundColor: isActive? '':''
          boxShadow: isActive? "rgba(20, 20, 40, 0.25) 0px 30px 60px -12px inset, rgba(10, 0, 90, 0.3) 0px 18px 36px -18px inset":"",
        };
      };




    return <div id='TouristDashboard-page'>

        <div id='TouristDashboard-side-menu'>
            <ul>
            <NavLink className="side-menu-links" style={LinkStyles} to={'/Dashboard/userDashboard/openAuctions'}>Open Auctions</NavLink>
            <NavLink className="side-menu-links" style={LinkStyles} >Closed Auctions</NavLink>
            <NavLink className="side-menu-links" style={LinkStyles} >Edit Profile</NavLink>
            </ul>
        </div>
        <div id='TouristDashboard-outlet'><Outlet/></div>


    </div>

}