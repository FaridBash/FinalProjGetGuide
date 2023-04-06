import { useEffect, useState } from "react";
import TourBox from "../../Components/TourComp/TourComponent";
import "./Tours.css";

export default function Tours() {
  const [tours, setTours] = useState(undefined);
  useEffect(() => {
    getTours();
  }, []);
  useEffect(() => {
    console.log("Tours: ", tours);
  }, [tours]);

  async function getTours() {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    await fetch(`http://localhost:6363/api/tours`)
      .then((res) => res.json())
      .then((res) => {
        setTours((tours) => res);
        console.log("res", res);
      });
  }

  return (
    <div id="tours-page">
      <div id="tours-display">
        {Array.isArray(tours) &&
          tours.map((t) => {
            return <TourBox tourName={t.tourName} />;
          })}
      </div>
    </div>
  );
}
