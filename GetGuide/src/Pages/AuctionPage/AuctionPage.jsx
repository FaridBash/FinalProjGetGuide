import { useEffect, useState, useRef } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import AuctionComp from "../../Components/auctions/AuctionComp";
import io from "socket.io-client";

const socket = io.connect("http://localhost:6363");
import "./AuctionPage.css";

export default function AuctionPage() {
  const nav=useNavigate();
  const [auction, setAuction] = useState(undefined);
  const bidAmountInputRef = useRef(null);
  const params = useParams();
  const [aucID, setAucID] = useState(params.id);
  const [numofBidsFDBRecieved, setNumOfBidsFDBRecieved] = useState("");
  const [numofBidsFDB, setNumOfBidsFDB] = useState([]);
  const [dataToShow, setDataToShow] = useState(undefined);
  const [room, setRoom] = useState("");
  const [userRole, setUserRole] = useState(
    JSON.parse(localStorage.getItem("user")).role
  );
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [newBid, setNewBid] = useState([]);
  const [takeAuction, setTakeAuction] = useState(false);
  const [auctionIsOpen, setAuctionIsOpen] = useState(true);
  const [lastBidder, setLastBidder] = useState(undefined);
  console.log("params._id", params);
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
  const [tooHighBid, setTooHighBid] = useState("");
  useEffect(() => {
    getAuction();
  }, []);

  useEffect(() => {
    if (auction) {
      setRoom(params.aucid);
      setNumOfBidsFDB(auction.auctionBids);
      if (numofBidsFDB) {
        setDataToShow(auction.auctionBids);
      }
      setAuctionIsOpen(auction.auctionIsOpen);
    }
  }, [auction]);

  useEffect(() => {
    if (room) {
      joinRoom();
    }
  }, [room]);
  useEffect(() => {
    console.log("newBid", newBid);
    sendBid();
  }, [newBid]);
  useEffect(() => {
    if (numofBidsFDBRecieved) {
      setNumOfBidsFDB(JSON.parse(numofBidsFDBRecieved));
      console.log(JSON.parse(numofBidsFDBRecieved));
      setDataToShow(JSON.parse(numofBidsFDBRecieved));
      updateHandler(params.aucid, JSON.parse(numofBidsFDBRecieved));
    }
  }, [numofBidsFDBRecieved]);

  useEffect(() => {
    socket.on("recieve-bid", (data) => {
      setNumOfBidsFDBRecieved(JSON.stringify(data.numofBidsFDB));
      // setNumOfBidsFDBRecieved(`${data.newBid.bidderName}`);
      updateAuctionWithNewBid(data.newBid);
    });
  }, [socket]);

  useEffect(() => {}, [auctionIsOpen]);

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
    await fetch(`http://localhost:6363/api/Auctions/auction/${params.aucid}`)
      .then((res) => res.json())
      .then((res) => {
        setAuction(res);
        console.log("res GETTING AUCTION", res);
      });
  }

  const submitNewBid = (id) => {
    if (!takeAuction) {
      if (
        !compareLowestBidToNewBid(
          numofBidsFDB,
          bidAmountInputRef.current.value
        ) ||
        bidAmountInputRef.current.value < 0
      ) {
        bidAmountInputRef.current.value = "";
        setTooHighBid(true);
        return;
      } else {
        setTooHighBid(false);
      }
    }
    const bidderObj = {};
    if (user) {
      bidderObj.bidderId = user._id;
      bidderObj.bidderName = user.name;
    }
    if (bidAmountInputRef != null) {
      {
        bidderObj.bid = bidAmountInputRef.current.value;
      }
    }
    console.log("bidderObj", bidderObj);
    setNumOfBidsFDB([bidderObj, ...numofBidsFDB]);
    setNewBid(bidderObj);
    setLastBidder(numofBidsFDB[0]);
    bidAmountInputRef.current.value = "";
  };

  async function updateHandler(itemId, biObj) {
    try {
      fetch(`http://localhost:6363/api/Auctions/auction/${itemId}`, {
        method: "PUT",
        body: JSON.stringify({
          auctionBids: biObj,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => console.log("data from updatehandler", data));
    } catch (error) {
      console.log(error);
    }
  }

  function closeAuctionHandler(id) {
    
    const lowestBid = auction.auctionBids.reduce((prev, current) => {
      return prev.bid < current.bid ? prev : current;
    });
    
    const winner = lowestBid.bidderName;
    console.log("Wineeer", winner);
    try {
      fetch(`http://localhost:6363/api/Auctions/auction/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          auctionIsOpen: false,
          auctionWonBy: winner,

        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {setAuctionIsOpen(false); 
          console.log("updated data for winner", data);
          const chatObj={};
          chatObj.chatRoomName=id+""+winner;
          chatObj.chatMessages=[];
          setChat(chatObj);       
        });
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

  function compareLowestBidToNewBid(arr, newBid) {
    let minBid = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < arr.length; i++) {
      let bid = parseInt(arr[i].bid);
      if (bid < minBid) {
        minBid = bid;
      }
    }

    if (newBid > minBid) {
      return false;
    }
    return true;
  }

  function getLowestBid(arr) {
    const winnerObj={};
    let minBid = Number.MAX_SAFE_INTEGER;
    let winner = "";
    for (let i = 0; i < arr.length; i++) {
      let bid = parseInt(arr[i].bid);
      if (bid < minBid) {
        minBid = bid;
        winner = arr[i].bidderName;
        console.log('minBid',minBid);
        console.log('winner',winner);
      }
    }
    // console.log('winnerObj',winnerObj);
    return winner;
  }

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



  async function setChat(obj) {
    const response = await fetch(
      "http://localhost:6363/api/chats/",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },        
        body: JSON.stringify(obj),
      }
    );
    const result = await response.json();
    console.log("result for chaaat", result);
    return result;
  }



  return (
    <div id="auction-page">
      {auction && (
        <table id="auctionpage-aucinfo">
          <tr>
            <td>
              {" "}
              <p className="info-table">
                {" "}
                <b> Tour Name: </b>{" "}
              </p>{" "}
              {auction.auctionTourName}
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <p className="info-table">
                {" "}
                <b> Tour Date: </b>{" "}
              </p>{" "}
              {getRealDate(auction.auctionDate)}{" "}
            </td>
          </tr>
        
          <tr>
            <td>
              {" "}
              <p className="info-table">
                {" "}
                <b> Tour Language: </b>{" "}
              </p>{" "}
              {auction.auctionLanguage}
            </td>{" "}
          </tr>
        </table>
      )}

      <div id="bids-container">
        <div id="realtime-auction">
          {dataToShow &&
            dataToShow.map((i, index) => {
              if (index === 0) {
                return (
                  <div id="newest-bid">
                    {" "}
                    <h3>
                      {"Best Bid: "}
                      {i.bidderName} {" Bid Amount "} {i.bid} {"$"}
                    </h3>
                  </div>
                );
              }
              return (
                <div id="old-bids">
                  {" "}
                  <p>
                    {" "}
                    {"Bid's Amount: "} {i.bid} {"$"}
                  </p>
                </div>
              );
            })}
        </div>
        <div>
          {auctionIsOpen && (
            <div id="controller">
              {userRole === 'guide'? 
              <div id="bid-controller">
                <input
                  type="number"
                  placeholder="bid.."
                  ref={bidAmountInputRef}
                />
                <button
                  onClick={() => {
                    submitNewBid(params.aucid);
                  }}
                >
                  Add bid
                </button>
              </div>:null}
              {userRole && userRole === "tourist" && (
                <button
                  onClick={() => {
                    closeAuctionHandler(params.aucid);
                  }}
                >
                  End Auction
                </button>
              )}

              {auction && userRole && userRole === "guide" && (
                <button
                  onClick={() => {
                    setTakeAuction(true);
                    bidAmountInputRef.current.value =
                      auction.auctionDesiredPrice;
                    submitNewBid(params.aucid);
                    closeAuctionHandler(params.aucid);
                  }}
                >
                  Take it for {auction.auctionDesiredPrice} $
                </button>
              )}
            </div>
          )}
          {!auctionIsOpen && <div><button onClick={()=>{nav(-1)}}>Back To Auctions</button></div>}
          {!takeAuction && (
            <div
              style={{
                height: "1rem",
                border: "1px solid transparent",
                boxSizing: "borderBox",
              }}
            >
              {tooHighBid && (
                <div>
                  {" "}
                  <h5 style={{ color: "red" }}>Bid Rejected Try Again</h5>{" "}
                </div>
              )}
              {tooHighBid === false ? (
                <div>
                  {" "}
                  <h5 style={{ color: "green" }}>Bid Accepted</h5>{" "}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


