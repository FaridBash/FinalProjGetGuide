import { useEffect, useRef, useState } from "react";
import "./AdminDash.css";
import GuideDashboard from "./GuideDashboard/GuideDashboard";
import TouristDashboard from "./UserDashBoard/TouristDashboard";
import SignIn from "../SignIn/SignIn";
import { useNavigate } from "react-router-dom";
export default function AdminDash() {
  const [tour, setTour] = useState(undefined);
  const [user, setUser]=useState(JSON.parse(localStorage.getItem('user')) ?? undefined)
    const [role, setRole]=useState(JSON.parse(localStorage.getItem('user')).role ?? undefined)
  const tourNameRef = useRef(null);
  const tourDescriptionRef = useRef(null);
  const tourSitesRef = useRef(null);
  const tourHighlightsRef = useRef(null);
  const tourimagesRef = useRef(null);
  const tourPriceRef = useRef(null);
  const tourCityRef = useRef(null);
  const nav=useNavigate();
  useEffect(()=>{
    if(user){
      console.log("role is not ava");
    }else{
      console.log(role);
    }
  },[])

if(user){

  if (role && role === 'admin') {

    // return <AdminDashboard />;
  } else if (role === 'tourist') {
    console.log("TOurist role", role);
    return <TouristDashboard/>
  } else if (role === 'guide') {
    return <GuideDashboard/>
  } 
  else if(!JSON.parse(localStorage.getItem('user'))) {
    // nav('http://localhost:5173/SignIn')
    return <SignIn/>
  }
}else {
  return nav('http://localhost:5173/SignIn');
}




  function handleSubmit(e) {
    e.preventDefault();

    const tour = {
      tourName: tourNameRef.current.value,
      tourDescription: tourDescriptionRef.current.value,
      sitesDuringtheTour: tourSitesRef.current.value
        .split("-")
        .map((highlight) => highlight.trim()),
      highlights: tourHighlightsRef.current.value
        .split("-")
        .map((highlight) => highlight.trim()),
      city: tourCityRef.current.value,
      tourPrice: tourPriceRef.current.value,
    };

    console.log("Tour to add", tour);
    try {
      fetchTour(tour);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchTour(obj) {
    const response = await fetch("http://localhost:6363/api/tours", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });
  }

  return (
    <div id="admin-page">
      <form id="form" onSubmit={handleSubmit}>
        <div className="tour-form-divs">
          <label htmlFor="">Tour Name :</label>
          <input
            type="text"
            name="tourName"
            placeholder="Tour Name"
            className="input-new-tour"
            ref={tourNameRef}
          />
        </div>
        <div className="tour-form-divs">
          <label htmlFor="">Tour Overview :</label>
          <textarea
            id="tour-info"
            name="tourDescription"
            rows="10"
            cols="50"
            placeholder="Description"
            className="text-area"
            ref={tourDescriptionRef}
          ></textarea>
        </div>
        <div className="tour-form-divs">
          <label htmlFor="">Sites During the Tour :</label>

          <textarea
            id="sites-list"
            name="sitesDuringtheTour"
            rows="10"
            cols="50"
            placeholder="Sites During the Tour"
            className="text-area"
            ref={tourSitesRef}
          ></textarea>
        </div>
        <div className="tour-form-divs">
          <label htmlFor="">Tour Highlights :</label>

          <textarea
            id="highlights-list"
            name="highlights"
            rows="10"
            cols="50"
            placeholder="Tour highlights"
            className="text-area"
            ref={tourHighlightsRef}
          ></textarea>
        </div>
        {/* <input type="file" name="images" className="input-new-tour" ref={tourimagesRef} multiple onChange={handleFileChange} /> */}
        <div className="tour-form-divs">
          <label htmlFor="">Price :</label>

          <input
            type="number"
            name="tourPrice"
            id="price"
            placeholder="Price"
            className="input-new-tour"
            ref={tourPriceRef}
          />
        </div>
        <div className="tour-form-divs">
          <label htmlFor="">Tour City :</label>

          <input
            type="text"
            name="city"
            id="city"
            placeholder="City Name"
            className="input-new-tour"
            ref={tourCityRef}
          />
        </div>

        <button>Add Tour</button>
      </form>
    </div>
  );
}
