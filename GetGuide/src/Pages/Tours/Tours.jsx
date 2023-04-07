import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import TourBox from "../../Components/TourComp/TourComponent";
import "./Tours.css";

export default function Tours() {
  const location = useLocation();
  const params = useParams();
  console.log("params.city:", params);
  const [tours, setTours] = useState(undefined);
  useEffect(() => {
    getTours();
  }, []);

  async function getTours() {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    await fetch(`http://localhost:6363/api/tours`)
      .then((res) => res.json())
      .then((res) => {
        const toursInCity = res.filter((e) => {
          if (e.city.toLowerCase() === params.city.toLowerCase()) {
            return e;
          }
        });

        setTours((tours) => toursInCity);
      });
  }

  return (
    <div id="tours-page">
      <div id="tours-display">
        {Array.isArray(tours) &&
          tours.map((t) => {
            return (
              <TourBox
                tourName={t.tourName}
                detailPage={`./${t._id}`}
                city={t.city}
                pass={t._id}
              />
            );
          })}
      </div>
    </div>
  );
}
