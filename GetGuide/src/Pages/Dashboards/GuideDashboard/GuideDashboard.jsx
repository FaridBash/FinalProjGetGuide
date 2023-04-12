import './GuideDashboard.css'
import '../UserDashBoard/TouristDashboard.css'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';


export default function GuideDashboard(){

    const nav=useNavigate();
    useEffect(()=>{
        nav('/Dashboard/guideDashboard/Auctions');
    },[])

    return <div id='TouristDashboard-page'>
         <div id='TouristDashboard-side-menu'>
            <ul>
            
            <NavLink className="side-menu-links" to={'/Dashboard/guideDashboard/Auctions'}>Auctions</NavLink>
            <NavLink className="side-menu-links">Closed Auctions</NavLink>
            <NavLink className="side-menu-links">Tours</NavLink>
            </ul>
        </div>
        
        <div id='TouristDashboard-outlet'><Outlet/></div>
    </div>
}