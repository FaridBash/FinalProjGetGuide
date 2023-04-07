import { NavLink , useLocation, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import './TourComponent.css'


export default function TourBox(props){
    
    const [imageHolderStyle, setImageHolderStyle]=useState({})
    const [linkStyle, setLinkStyle]=useState({});
    const mOver=()=>{
        setImageHolderStyle({
           
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            background:'#051A35',
            opacity:'0.5',
            position:'absolute',
            top:'0',bottom:'0',right:'0',left:'0',

        })
        setLinkStyle({
            position:'absolute',
            zIndex:'1'
        })
        
    }
    const mOut=()=>{
        setImageHolderStyle({
            opacity:'0',
        })

        setLinkStyle({
            position:'absolute',
            zIndex:'-1'
        })
    }

    return <div id='tour-box'>
        <div id='image'  onMouseOver={mOver} onMouseLeave={mOut} >
            <div id='image-btn-holder' style={imageHolderStyle}>
            </div>
                <NavLink id='hide-link' style={linkStyle} to={(`/ToursPerCity/${props.city}/${props.detailPage}`)} state={props.pass}  >Check Tour</NavLink>
        </div>
        <div id='info'>
        <div id='tour-name'><b>{props.tourName}</b></div>
        <div id='paragraphs'>
            <p className='paragraph'><b>Duration:</b> 1 Day</p>
            <p className='paragraph'><b>Departure days:</b> Every Day</p>
            <p className='paragraph'><b>Languages: </b> English, Spanish, German, French</p>
        </div>
        </div>
        
        
    </div>
}