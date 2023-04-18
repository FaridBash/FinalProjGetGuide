import './ChatPage.css'
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const socket = io.connect("http://localhost:6363");


export default function ChatPage(){
    const params=useParams()
    const [room, setRoom] = useState(undefined);
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
    const [auction, setAuction]=useState(undefined);

    console.log(params.aucid);


    useEffect(()=>{
        getAuction(params.aucid);
    },[])


    useEffect(()=>{    
        if(auction!=undefined){
            // const cRoom=auction.auctionWonBy+params.aucid;
            // setRoom(cRoom);
        }
    },[auction])
    useEffect(()=>{    
       joinRoom();
    },[room])

    const joinRoom = () => {
        if (room !== undefined) {
          socket.emit("join_room", room);
          console.log("Room Joined",room);
        }
      };

      const sendMessage = () => {
        socket.emit("send-message", { message, room });
      };
    
      useEffect(() => {
        socket.on("receive-message", (data) => {
          setMessageReceived(data.message);
        });
      }, [socket]);

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

  async function setChat(obj) {
    const response = await fetch(
      "http://localhost:6363/api/Auctions/auction",
      {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },        
        body: JSON.stringify(obj),
      }
    );
    const result = await response.json();
    console.log(result);
    return result;
  }



      return (
        <div className="App">
          <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
          <input
            placeholder="Message..."
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
          <button onClick={sendMessage}> Send Message</button>
          <h1> Message:</h1>
          {messageReceived}
        </div>
      );
}