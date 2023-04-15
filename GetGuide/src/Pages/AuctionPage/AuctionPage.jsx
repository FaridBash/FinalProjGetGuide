import { useEffect, useState, useRef } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import AuctionComp from "../../Components/auctions/AuctionComp";
import io from "socket.io-client";

const socket = io.connect("http://localhost:6363");
import "./AuctionPage.css";

export default function AuctionPage() {
  const [auction, setAuction] = useState(undefined);
  const bidAmountInputRef = useRef(null);
  const params = useParams();
  const [aucID, setAucID] = useState(params.id);
  const [numofBidsFDBRecieved, setNumOfBidsFDBRecieved] = useState("");
  const [numofBidsFDB, setNumOfBidsFDB] = useState([]);
  const [dataToShow, setDataToShow]=useState(undefined);
  const [room, setRoom] = useState("");
  const [userRole, setUserRole]=useState(JSON.parse(localStorage.getItem('user')).role);
  const [user, setUser]=useState(JSON.parse(localStorage.getItem('user')));
  const [newBid, setNewBid]=useState([]);
  console.log("params._id",params);
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  const [tooHighBid, setTooHighBid]=useState("");
  useEffect(() => {
    getAuction();
    
  }, []);
  
 
 
  useEffect(() => {
    if (auction){
      setRoom(params.aucid);
      setNumOfBidsFDB(auction.auctionBids);
      if(numofBidsFDB){

        setDataToShow(auction.auctionBids);
      }
    }
  }, [auction]);

  useEffect(() => {
    if (room) {
      joinRoom();
    }
  }, [room]);
  useEffect(() => {
    console.log("newBid",newBid);
      sendBid();
  }, [newBid]);
  useEffect(() => {
    if(numofBidsFDBRecieved){
      setNumOfBidsFDB(JSON.parse(numofBidsFDBRecieved));
      console.log(JSON.parse(numofBidsFDBRecieved));
      setDataToShow(JSON.parse(numofBidsFDBRecieved));
      updateHandler(params.aucid, JSON.parse(numofBidsFDBRecieved) );
    }
  }, [numofBidsFDBRecieved]);

  useEffect(() => {
    socket.on("recieve-bid", (data) => {
      setNumOfBidsFDBRecieved(JSON.stringify(data.numofBidsFDB));
      // setNumOfBidsFDBRecieved(`${data.newBid.bidderName}`);
      updateAuctionWithNewBid(data.newBid);
    });
  }, [socket]);

  const sendBid = () => {
    socket.emit("send-bid", { numofBidsFDB, room });
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
      console.log("roomjoined", room);
    }
  };

  async function getAuction() {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    await fetch(`http://localhost:6363/api/Auctions/${params.aucid}`)
      .then((res) => res.json())
      .then((res) => {
        setAuction(res);
        console.log("res GETTING AUCTION", res);
      });
  }

  const submitNewBid = (id) => {
    if(!compareLowestBidToNewBid(numofBidsFDB, bidAmountInputRef.current.value )  || bidAmountInputRef.current.value<0 ){
      bidAmountInputRef.current.value ="";
      setTooHighBid(true);
      return;
    } else {
      setTooHighBid(false);
    }
    const bidderObj = {};
    if(user){
      bidderObj.bidderId = user._id;
      bidderObj.bidderName = user.name;
    }
    if (bidAmountInputRef != null) {
      {
        
        bidderObj.bid = bidAmountInputRef.current.value;
      }
    }
    console.log('bidderObj', bidderObj);
      setNumOfBidsFDB([bidderObj, ...numofBidsFDB]);
      setNewBid(bidderObj);
   

    bidAmountInputRef.current.value="";
  };


  async function updateHandler(itemId, biObj) {
    
    // let updatedbids=[];
    // updatedbids=[...auction.auctionBids, biObj];
    // console.log('updatedbidssssssssssssssssssssssssssssssssss',updatedbids);
    try {
      fetch(`http://localhost:6363/api/Auctions/${itemId}`, {
        method: "PUT",
        body: JSON.stringify({
          auctionBids: biObj,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => console.log("data from updatehandler",data));
    } catch (error) {
      console.log(error);
      
    }
  }


  function updateAuctionWithNewBid(newBid) {
    setAuction((prevAuction) => {
      const updatedBids = [...prevAuction.auctionBids, newBid];
      return { ...prevAuction, auctionBids: updatedBids };
    });
  }

  function compareLowestBidToNewBid(arr, newBid){
    let minBid = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < arr.length; i++) {
      let bid = parseInt(arr[i].bid);
      if (bid < minBid) {
        minBid = bid;
      }
    }

    if(newBid>minBid){
      return false
    }
    return true;
  }

function getLowestBid(arr){
  let minBid = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < arr.length; i++) {
      let bid = parseInt(arr[i].bid);
      if (bid < minBid) {
        minBid = bid;
      }
    }
    return minBid;
}

  function getRealDate(date){

    return dayNames[new Date(date).getDay()]+', '+(new Date(date).getDate()) +" " +month[new Date(date).getMonth()]+' '+new Date(date).getFullYear();
  }

  return (
    <div id="auction-page">
        {auction && (
      <div id="auctionpage-aucinfo">
            <tr><td > <p className="info-table"> <b> Tour Name: </b> </p> {auction.auctionTourName}</td></tr>
            {/* <td> <b> Tour Date: </b>{auction.auctionDate}</td> */}
            <tr><td > <p className="info-table"> <b> Tour Date: </b> </p> {getRealDate(auction.auctionDate)} </td></tr>
            {/* <td> <b> Auction Ends By: </b> {(auction.auctionEndDate)}</td> */}
            <tr><td > <p className="info-table"> <b> Auction Ends By: </b> </p>  {getRealDate(auction.auctionEndDate)}</td></tr>
            <tr><td > <p className="info-table"> <b> Tour Language: </b> </p> {auction.auctionLanguage}</td>     </tr>
        </div>
        )}

      <div id="bids-container">
        <div id="realtime-auction">
          {dataToShow && dataToShow.map((i, index)=>{
            if(index===0){
              return <div id="newest-bid"> <h3>{"Newest Bid: "}{i.bidderName} {' Bid Amount '} {i.bid} {"$"}</h3></div>
            }
            return <div> <p> {' Guide Name: '} {i.bidderName} {"--- "} {"Bid's Amount: "} {i.bid} {"$"}</p></div>
          })}
       
        </div>
        <div>
        <div id="bid-controller">
        <input type="number" placeholder="bid.." ref={bidAmountInputRef}/>
        <button onClick={()=>{submitNewBid(params.aucid)}}>Add bid</button>
        </div>
        <div style={{ height:"1rem", border:"1px solid transparent", boxSizing:"borderBox"} }>
          {tooHighBid && <div> <h5 style={{color:'red'}}>Bid Not Accepted Try Again</h5> </div>}
          {tooHighBid === false? <div> <h5 style={{color:'green'}}>Bid Accepted</h5> </div>:null}
        </div>
        </div>
        </div>
    </div>
  );
}
