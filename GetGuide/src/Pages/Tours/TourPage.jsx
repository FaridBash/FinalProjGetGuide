import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import './TourPage.css'
import myImage from'../../assets/jerusalem.jpg'
import AskForm from '../AskForm/AskForm';
import Modal from '../../Components/PopUp/Modal';


export default function TourPage(){
    const [isOpen, setIsOpen]=useState(false);
    const [chosenTour, setChosenTour]=useState(undefined);

    useEffect(()=>{
        getTour();
    },[])
    useEffect(()=>{
        if(chosenTour!=undefined){console.log('chosenTour',chosenTour);}
    },[chosenTour])

    const params=useParams();
    const location = useLocation();
    console.log("PARAMS: ", params);
    console.log('params._id: ',params.id);

    async function getTour() {
        const headers = new Headers();
        headers.append("content-type", "application/json");
        await fetch(`http://localhost:6363/api/Tours/${params.id}`)
          .then((res) => res.json())
          .then((res) => {
            setChosenTour((chosenTour)=>res);
            console.log("res", res);
          });
      }


    return (
    
        <div id='divider'>
        
        <div id='control-btns' >
            <NavLink className="control-btns-link" onClick={()=>{setIsOpen(true)}}>Open Auction</NavLink>
            
            <NavLink className="control-btns-link" to={`/ToursPerCity/${params.city}`}>Back To Tours Page</NavLink>
        </div>
        <div id='tour-show'>      
       { chosenTour && <div id='tour-view'>
            <div id='tour-name-box'>
                <h2>{chosenTour.tourName}</h2>
            </div>
            <Modal open={isOpen} onClose={()=>{setIsOpen(false)}} tourName={chosenTour.tourName} tourId={chosenTour._id} city={chosenTour.city}>Fancy text</Modal>
            <div id='show-image'></div>
            <div id='middle-section'>
                <div id='tour-info'>
                    <div id='tour-overview'>
                        <h4>Tour Over View</h4>
                        {chosenTour.tourDescription}
                        <h4>Sites During the Tour</h4>
                        <div id='tour-sites'>
                        {chosenTour.sitesDuringtheTour.map((s)=>{
                            if(s){
                                return(<div id='site-holder'> <p><span class="fa-solid fa-location-dot" style={{color: "#BAF801",}}> </span> {s}</p></div>);
                            }
                        })}
                        </div>
                    </div>
                    <div id='tou-highlights'>
                        <h3>Highlights - {chosenTour.tourName} Tour</h3>
                        {chosenTour.highlights.map((s)=>{
                            if(s){
                                return(<div> <p><span class="fa-solid fa-star" style={{color: "#BAF801",}}> </span> {s}</p></div>);
                            }
                        })}
                    </div>
                </div>
                <div id='contact-us'></div>
            </div>
        </div>}
        </div>
        <div id='form-holder'>
        <AskForm></AskForm>
        </div>
        </div>
    )
}