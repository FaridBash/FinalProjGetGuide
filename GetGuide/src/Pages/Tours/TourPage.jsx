import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './TourPage.css'



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
        <div id='tour-show'>
            <div id='tour-name-box'>
                <h2>{chosenTour.tourName}</h2>
            </div>
            <div id='show-image'></div>
        </div>
    </div>
}