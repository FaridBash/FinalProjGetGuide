import { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import './TouristDashboard.css'



export default function TouristDashboard(){
    const nav=useNavigate();
    useEffect(()=>{
        nav('/Dashboard/userDashboard/openAuctions');
    },[])

    return <div id='TouristDashboard-page'>

        <div id='TouristDashboard-side-menu'>
            <ul>
            <NavLink className="side-menu-links" to={'/Dashboard/userDashboard/openAuctions'}>Open Auctions</NavLink>
            <NavLink className="side-menu-links">Closed Auctions</NavLink>
            <NavLink className="side-menu-links">Edit Profile</NavLink>
            </ul>
        </div>
        <div id='TouristDashboard-outlet'><Outlet/></div>


    </div>

}