import { NavLink } from 'react-router-dom'
import './HomePage.css'
import { useState } from 'react';
import SignInModal from '../PopUps/SignIn';

export default function Home(){

    const [isSignInOpen, setIsSignInOpen]=useState(false);

    return <div id='page-container'>
            <SignInModal open={isSignInOpen} onClose={()=>{setIsSignInOpen(false)}} />
         <div id="header-text">
            <h1 id="header-h1">Enjoy a Perfect Tour</h1>
            <p id="header-p">Find the best Tours and Excursion at the best price</p>
            <NavLink to={'/ToursPerCity'} id='ourtours-link' >OUR TOURS</NavLink>
            <NavLink className='header-navlink'  onClick={()=>{setIsOpen(true)}}>SignIn</NavLink>

        </div>
        <div id="black-div">
        </div>

    </div>
}