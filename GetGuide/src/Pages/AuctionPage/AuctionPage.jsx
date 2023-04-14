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
  const [numofBidsFDB, setNumOfBidsFDB] = useState("");
  const [room, setRoom] = useState("");

  console.log("params._id",params);

  useEffect(() => {
    getAuction();
  }, []);
  useEffect(() => {
    if (!auction) return;
    console.log(auction);
    setRoom(auction.auctionId);
  }, [auction]);

  useEffect(() => {
    if (room) {
      joinRoom();
    }
  }, [room]);

  useEffect(() => {
    socket.on("recieve-bid", (data) => {
      setNumOfBidsFDBRecieved(data.numofBidsFDB);
      console.log("numofBidsFDBRecieved", numofBidsFDBRecieved);
      console.log("numofBidsFDBRecieved", room);
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
    await fetch(`http://localhost:6363/api/Auctions/${params.id}`)
      .then((res) => res.json())
      .then((res) => {
        setAuction(res);
        console.log("res", res);
      });
  }

  const submitNewBid = (id) => {
    console.log("auction id to put bid", id);
    const bidderObj = {};
    bidderObj.bidderId = user._id;
    bidderObj.bidderName = user.name;
    bidderObj.bid = bidAmountInputRef.current.value;
    if (bidAmountInputRef != null) {
      {
        props.putBid(id, bidderObj);
      }
      bidAmountInputRef.current.value = "";
    }

    setNumOfBidsFDB(bidAmountInputRef.current.value);
    sendBid();
  };

  return (
    <div id="auction-page">
      <div id="auctionpage-aucinfo">
        {auction && (
            <p>{auction.auctionTourName}</p>
        //   <AuctionComp
        //     tourName={auction.auctionTourName}
        //     Date={auction.auctionDate}
        //     endDate={auction.auctionEndDate}
        //     lang={auction.auctionLanguage}
        //     submitNewBid={submitNewBid}
        //     bidAmountInputRef={bidAmountInputRef}
        //   />
        )}
      </div>

      <div id="bids-container">{numofBidsFDBRecieved}</div>
    </div>
  );
}
