import "./TourPerCityComp.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TourCityComp(props) {
  const navigate = useNavigate();
  const [boxHolderStyle, setBoxHolderStyle] = useState({});

  const mOver = () => {
    setBoxHolderStyle({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#fff",
      opacity: "0.1",
      position: "absolute",
      top: "0",
      bottom: "0",
      right: "0",
      left: "0",
      cursor: "pointer",
    });
  };
  const mOut = () => {
    setBoxHolderStyle({
      opacity: "0",
    });
  };

  return (
    <div
      id="city-box"
      onMouseOver={mOver}
      onMouseLeave={mOut}
      onClick={() => {
        navigate(`../ToursPerCity/${props.city}`);
      }}
      state={props.pass}
    >
      <div id="image-opacity" style={boxHolderStyle}></div>
      <div id="city-info">
        <h2>{props.city} Tours</h2>
        <div id="dash"></div>
        <h2 id="num-of-tours">{props.numOfTours} Tours</h2>
      </div>
    </div>
  );
}
