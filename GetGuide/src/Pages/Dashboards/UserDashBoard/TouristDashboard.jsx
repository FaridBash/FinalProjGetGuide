import { NavLink, Outlet } from 'react-router-dom'
import './TouristDashboard.css'



export default function TouristDashboard(){
    
    

    return <div id='TouristDashboard-page'>

        <div id='TouristDashboard-side-menu'>
            <ul>
            <NavLink className="side-menu-links">Open Auctions</NavLink>
            <NavLink className="side-menu-links">Closed Auctions</NavLink>
            <NavLink className="side-menu-links">Edit Profile</NavLink>
            </ul>
        </div>
        <div id='TouristDashboard-outlet'><Outlet/></div>


    </div>

}