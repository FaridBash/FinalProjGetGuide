import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket=io.connect('http://localhost:6363/')
export default function Chat(){
    const [room, setRoom] = useState("");
    const [sms, setSms]=useState("")
    const [smsRecieved, setSmsRecieved]=useState("")
    useEffect(()=>{
        socket.on("recieve-message", (d)=>{
            setSmsRecieved(d.sms)
        })
    },[socket])

    const joinRoom = () => {
        if (room !== "") {
          socket.emit("join_room", room);
        }
      };

    const sendMessage=()=>{
        socket.emit("send-message", {sms, room})
    }

    return <div>
        <h1>CHAT PAGE</h1>
        <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
        <input type="text" placeholder='Message...' onChange={(e)=>{
            setSms(e.target.value);
      }}/>
      <button onClick={sendMessage}>Send</button>
      <h1>Message:</h1>
        {smsRecieved}
        </div>
}