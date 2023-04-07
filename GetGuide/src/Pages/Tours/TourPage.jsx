import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './TourPage.css'
import myImage from'../../assets/jerusalem.jpg'
import AskForm from '../AskForm/AskForm';


export default function TourPage(){

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


    return <div id='tour-page'>
        <div id='image-holder'>
        {chosenTour && <section id='header-image'>
            <img src={myImage} alt="" id='myImage' />
            </section>}
        </div>

        <section id='tour-show-holder'>
        <div id='divider'>
                
                
       { chosenTour && <div id='tour-show'>
            <div id='tour-name-box'>
                <h2>{chosenTour.tourName}</h2>
            </div>
            
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
        <div id='form-holder'>
        <AskForm></AskForm>
        </div>
        </div>
        </section>
    </div>
}