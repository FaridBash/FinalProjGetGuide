import { useEffect, useRef, useState } from "react";
import "./AdminDash.css";

export default function AdminDash() {

 
  const [tour, setTour]=useState(undefined);
  // const [images, setImages]=useState([]);
  // useEffect(()=>{
  //   if(tour){
  //     try {
        
  //       fetchTour(tour);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // },[tour])

  const tourNameRef=useRef(null);
  const tourDescriptionRef=useRef(null);
  const tourSitesRef=useRef(null);
  const tourHighlightsRef=useRef(null);
  const tourimagesRef=useRef(null);
  const tourPriceRef=useRef(null);
  const tourCityRef=useRef(null);


  function handleSubmit(e) {
    e.preventDefault();
    const tourObj={};
    const formData = new FormData();
    // for (let i = 0; i < images.length; i++) {
      //  formData.append('images', images[i]);
    // }
    console.log('formData',formData);
    const tour={
      
      // // images: formData.images,
      tourName:tourNameRef.current.value, 
      tourDescription:tourDescriptionRef.current.value, 
      sitesDuringtheTour: tourSitesRef.current.value.split('-').map(highlight => highlight.trim()),
      highlights: tourHighlightsRef.current.value.split('-').map(highlight => highlight.trim()),
      city: tourCityRef.current.value,
      tourPrice: tourPriceRef.current.value
    }
     
    console.log("Tour to add", tour);
    try {
      fetchTour(tour)
    } catch (error) {
      console.error(error);
    }

  }

  async function fetchTour(obj){
    const response = await fetch(
      "http://localhost:6363/api/tours",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      }
    );

    // const responseData = await response.json();
    // console.log(responseData);
  }

  function handleFileChange(e) {
    // setImages(e.target.images);
  }

  return (
    <div>
      <form id="form" onSubmit={handleSubmit}>
        <input type="text" name="tourName" placeholder="Tour Name" className="input-new-tour" ref={tourNameRef} />
        <textarea
          id="tour-info"
          name="tourDescription"
          rows="10"
          cols="50"
          placeholder="Description"
          className="text-area"
          ref={tourDescriptionRef}
        ></textarea>
        <textarea
          id="sites-list"
          name="sitesDuringtheTour"
          rows="10"
          cols="50"
          placeholder="Sites During the Tour"
          className="text-area"
          ref={tourSitesRef}
        ></textarea>
        <textarea
          id="highlights-list"
          name="highlights"
          rows="10"
          cols="50"
          placeholder="Tour highlights"
          className="text-area"
          ref={tourHighlightsRef}
        ></textarea>
        {/* <input type="file" name="images" className="input-new-tour" ref={tourimagesRef} multiple onChange={handleFileChange} /> */}
        <input type="number" name="tourPrice" id="price" placeholder="Price" className="input-new-tour" ref={tourPriceRef}/>
        <input type="text" name="city" id="city" placeholder="City Name" className="input-new-tour" ref={tourCityRef}/>
        <button>Add Tour</button>
      </form>
    </div>
  );
}
