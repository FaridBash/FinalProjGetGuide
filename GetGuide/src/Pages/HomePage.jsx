import { NavLink } from 'react-router-dom'
import './HomePage.css'



export default function Home(){


    return <div id='page-container'>
         <div id="header-text">
            <h1 id="header-h1">Enjoy a Perfect Tour</h1>
            <p id="header-p">Find the best Tours and Excursion at the best price</p>
            <NavLink to={'/Tours'} id='ourtours-link' >OUR TOURS</NavLink>
        </div>
        <div id="black-div">
        </div>

    </div>
}