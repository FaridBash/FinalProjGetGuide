import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:6363");

import "./AuctionComp.css";

export default function AuctionComp(props) {
  // const bidAmountInputRef = useRef(null);
  const [userRole, setUserRole]=useState(JSON.parse(localStorage.getItem('user')).role);
  const [user, setUser]=useState(JSON.parse(localStorage.getItem('user')));
//   const [numofBidsFDBRecieved, setNumOfBidsFDBRecieved]=useState("");
//   const [numofBidsFDB, setNumOfBidsFDB]=useState("");
//   const [room, setRoom] = useState("");
// useEffect(()=>{
    
//   setRoom(props.auctionId);
  

// },[]);
// useEffect(()=>{
    
  
//   joinRoom();

// },[room]);



// const joinRoom = () => {
//   if (room !== "") {
//     socket.emit("join_room", room);
//     console.log('roomjoined',room);
//   }
// };

// const sendBid = () => {
//   socket.emit("send-bid", { numofBidsFDB, room });
// };

// useEffect(() => {
//   socket.on("recieve-bid", (data) => {
//     setNumOfBidsFDBRecieved(data.numofBidsFDB);
//     console.log('numofBidsFDBRecieved',numofBidsFDBRecieved);
//     console.log('numofBidsFDBRecieved',room);
//   });
// }, [socket]);

// const onSubmitBid=(id)=>{
//   console.log("auction id to put bid", id);
//   const bidderObj={}
//   bidderObj.bidderId=user._id;
//   bidderObj.bidderName=user.name;
//   bidderObj.bid=bidAmountInputRef.current.value;
//   if(bidAmountInputRef!=null){
//     {props.putBid(id, bidderObj)}
//     bidAmountInputRef.current.value="";
    
//   }
  
//   setNumOfBidsFDB(bidAmountInputRef.current.value)
//   sendBid();


  
// }






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
        
      </div>
    </div>
  );
}
