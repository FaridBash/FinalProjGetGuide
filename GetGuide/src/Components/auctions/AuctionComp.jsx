import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:6363");

import "./AuctionComp.css";

export default function AuctionComp(props) {
 
  const [userRole, setUserRole]=useState(JSON.parse(localStorage.getItem('user')).role);
  const [user, setUser]=useState(JSON.parse(localStorage.getItem('user')));

  // useEffect(

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getRealDate(date) {
  return (
    dayNames[new Date(date).getDay()] +
    ", " +
    new Date(date).getDate() +
    " " +
    month[new Date(date).getMonth()] +
    " " +
    new Date(date).getFullYear()
  );
}




  return (
    <div id="auction-box">
      <div id="auction-box-tourinfo">
        
        <p>

          <b>Tour Name: </b> {props.tourName}
        </p>
        <p>
          <b>Tour Date: </b>
          {getRealDate(props.Date)}
          
        </p>
        <p>
          <b>Req Lang: </b>
          {props.lang}
        </p>
        
        <p>
          <b>num of bids: </b>
          {props.numOfBids}
        </p>
        <p>
          <b>ID: </b>
          {props.auctionId}
        </p>
      </div>
      { props.isOpen === false? <div id="winner-container"> <p>Won By: {props.winner} </p> </div>:null}
      <div id="auction-box-btns">
        <NavLink to={`/ToursPerCity/${props.city}/${props.tourId}`} className='auction-btn'>Tour Page</NavLink>
        { props.isOpen === false  && userRole && userRole==='tourist' && <NavLink className='auction-btn'>End Auction</NavLink>}
        {userRole && userRole==='tourist' &&  <NavLink to={`/Dashboard/guideDashboard/Auctions/${props.auctionId}`} className='auction-btn'>See Auction</NavLink> }
        {props.isOpen !== false &&userRole && userRole==='guide' && <NavLink to={`/Dashboard/guideDashboard/Auctions/${props.auctionId}`} className='auction-btn'>Join Auction</NavLink>}
        {(props.isOpen === false && user && (props.winner === user.name || props.owner===true)) && <NavLink to={`/Dashboard/guideDashboard/Chats/${props.auctionId}` } className='auction-btn'>Join Chat</NavLink> }
      </div>
    </div>
  );
}
