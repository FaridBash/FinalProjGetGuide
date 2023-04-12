import { useRef } from "react";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";
import "./AuctionComp.css";

export default function AuctionComp(props) {
  const bidAmountInputRef = useRef(null);
  const [cookies, setCookie] = useCookies(['getguideuser']);
  return (
    <div id="auction-box">
      <div id="auction-box-tourinfo">
        <p>
          <b>Tour Name: </b> {props.tourName}
        </p>
        <p>
          <b>Tour Date: </b>
          {props.Date}
        </p>
        <p>
          <b>Req Lang: </b>
          {props.lang}
        </p>
        <p>
          <b>Auction Ends: </b>
          {props.endDate}
        </p>
      </div>
      <div id="auction-box-btns">
        <NavLink to={`/ToursPerCity/${props.city}/${props.tourId}`} className='auction-btn'>Tour Page</NavLink>
        <NavLink className='auction-btn'>End Auction</NavLink>
        { cookies.getguideuser && cookies.getguideuser.role==='guide' && <div id="bid-container">
        <input type="number" id="bid-input" ref={bidAmountInputRef} placeholder="bid.." />
        <NavLink className='auction-btn'>Bid</NavLink>
        </div>}
      </div>
    </div>
  );
}
