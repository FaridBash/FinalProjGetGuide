import { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
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
  const [room, setRoom] = useState("");
  const [userRole, setUserRole]=useState(JSON.parse(localStorage.getItem('user')).role);
  const [user, setUser]=useState(JSON.parse(localStorage.getItem('user')));
  const [newBid, setNewBid]=useState([]);
  console.log("params._id",params);

  useEffect(() => {
    getAuction();
    
  }, []);
  
  
  useEffect(() => {
    if (auction){
      setRoom(params.aucid);
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
    }
  }, [numofBidsFDBRecieved]);

  useEffect(() => {
    socket.on("recieve-bid", (data) => {
      setNumOfBidsFDBRecieved(JSON.stringify(data.numofBidsFDB));
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
    const bidderObj = {};
    bidderObj.bidderId = user._id;
    bidderObj.bidderName = user.name;
    if (bidAmountInputRef != null) {
      {
        bidderObj.bid = bidAmountInputRef.current.value;
      }
    }
    console.log('bidderObj', bidderObj);
      setNumOfBidsFDB([...numofBidsFDB, bidderObj]);
      setNewBid(bidderObj);
      
      // sendBid();
   

    bidAmountInputRef.current.value="";
  };


  async function updateHandler(itemId, biObj) {
    
    let updatedbids=[];
    updatedbids=[...auction.auctionBids, biObj];
    console.log('updatedbidssssssssssssssssssssssssssssssssss',updatedbids);
    try {
      fetch(`http://localhost:6363/api/Auctions/${itemId}`, {
        method: "PUT",
        body: JSON.stringify({
          auctionBids: updatedbids,
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


  return (
    <div id="auction-page">
        {auction && (
      <div id="auctionpage-aucinfo">
            <p>{auction.auctionTourName}</p>
            <p>{auction.auctionDate}</p>
            <p>{auction.auctionEndDate}</p>
            <p>{auction.auctionLanguage}</p>     
        </div>
        )}

      <div id="bids-container">
        <div id="realtime-auction">

        {numofBidsFDBRecieved}
        </div>
        <input type="number" placeholder="bid.." ref={bidAmountInputRef} onChange={(e)=>{

          // setNumOfBidsFDB([...numofBidsFDB, ]e.target.value);
          // setBid(e.target.value);
        }} />
        <button onClick={()=>{submitNewBid(params.aucid)}}>Add bid</button>
        </div>
    </div>
  );
}
