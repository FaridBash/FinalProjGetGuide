import { useState, useEffect } from 'react';
import TourCityComp from '../../Components/TourComp/TourPerCityComp';
import './ToursPerCity.css'


export default function ToursPerCity(){
    const [tours, setTours] = useState(undefined);
    const [toursPerCity, setToursPerCity] = useState(undefined);

    useEffect(() => {
      getTours();
    }, []);
    useEffect(() => {
      
    }, [toursPerCity]);
  
    async function getTours() {
      const headers = new Headers();
      headers.append("content-type", "application/json");
      await fetch(`http://localhost:6363/api/tours`)
        .then((res) => res.json())
        .then((res) => {
          setTours((tours) => res);
          console.log("res", res);
            let myObj={tours: []};

            const toursArr=[];

            for (let x = 0; x < res.length; x++) {
                const e = res[x];
                myObj={tours: []};
                myObj.city=e.city;
                myObj.tours=[...myObj.tours, e];
                if(toursArr.length===0){
                    toursArr.push(myObj);
                }else{
                    for (let j = 0; j < toursArr.length; j++) {
                        const i = toursArr[j];
                        if(i.city===e.city){
                            i.tours=[...i.tours, e];
                            myObj={tours: []};
                            break;
                        }                        
                    }
                    if(myObj.city){
                        toursArr.push(myObj);
                    }
                }
                
            }
            setToursPerCity(toursArr);
            console.log('toursArr: ',toursArr);
        });
    }

    return <div id='tours-per-city-page'>
        <div id='tours-per-city-show'>

        {Array.isArray(toursPerCity) && toursPerCity.map(i=>{
            return <TourCityComp city={i.city} numOfTours={i.tours.length} pass={i.city} />
        })}
        </div>
    </div>
}