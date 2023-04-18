import './ChatPage.css'
import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from 'react-router-dom';
import { Colors } from 'chart.js';

const socket = io.connect("http://localhost:6363");


export default function ChatPage(){
    const params=useParams()
    const [room, setRoom] = useState((params.aucid).replace(/ /g,''));
    const [message, setMessage] = useState([]);
    const [messageReceived, setMessageReceived] = useState("");
    const [Chat, setChat]=useState(undefined);
    const [dataToShow, setDataToShow]=useState(undefined);
    const [user, setUser]=useState(JSON.parse(localStorage.getItem('user')).name);
    const [newMessage, setNewMessage]=useState([]);
    const [R, setR]=useState('');
    let messageInputRef=useRef(null);
    console.log(params.aucid);


    useEffect(()=>{
        setR((params.aucid).replace(/ /g,''));
        if(room === (params.aucid).replace(/ /g,'') ){
          getChat(room);
        }
      },[]);


      useEffect(()=>{    
        if(Chat!=undefined){
        // setRoom(R);
        // setMessage(Chat.chatMessages);
        if(message){
          setDataToShow(Chat.chatMessages);
          console.log("DATA TO SHOW", dataToShow);
        }
      }
    },[Chat])

    useEffect(()=>{    
      if(room){
        joinRoom();
        // setMessage(Chat.chatMessages);
        // if(message){
        //   setDataToShow(Chat.chatMessages);
        //   console.log("DATA TO SHOW", dataToShow);
        // }
      }
      //  getChat(room);
    },[room])
   
    // useEffect(()=>{    
    //   if(message!=undefined){
    //     console.log(message);
    //     // sendMessage();
    //     // setDataToShow(message)
    //    }
    // },[message])
    useEffect(()=>{    
        sendMessage();
    },[newMessage]);

    useEffect(()=>{    
      if(messageReceived){
        setMessage(JSON.parse(messageReceived));
        setDataToShow(JSON.parse(messageReceived));
        updateHandler(room, JSON.parse(messageReceived));
       }
    },[messageReceived])

    // useEffect(()=>{
    //   console.log("Data to show useEffect", dataToShow);
    // },[dataToShow])

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
          setMessageReceived(JSON.stringify(data.message));
          
          console.log('messageReceived',messageReceived);
        });
      }, [socket]);

      function submitNewMessage(){
        if(messageInputRef.current.value!==""){
          const user=JSON.parse(localStorage.getItem('user')).name;
          const messageObj={};
          messageObj.user=user;
          messageObj.chatMes=messageInputRef.current.value; 
          setMessage([...message, messageObj]);
          setNewMessage(messageObj);
          messageInputRef.current.value="";
        }
          

      }

      async function updateHandler(rm, sms) {
        try {
          fetch(`http://localhost:6363/api/Chats/chat/${rm}`, {
            method: "PUT",
            body: JSON.stringify({
              chatMessages: sms,
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


      async function getChat(room) {
        const headers = new Headers();
        headers.append("content-type", "application/json");
        await fetch(`http://localhost:6363/api/Chats/Chat/${room}`)
          .then((res) => res.json())
          .then((res) => {
            setChat(res);
            setMessage(res.chatMessages);
            console.log("res GETTING Chat", res);
          });
      }

      async function updateHandler(room, biObj) {
        try {
          fetch(`http://localhost:6363/api/Chats/Chat/${room}`, {
            method: "PUT",
            body: JSON.stringify({
              chatMessages: biObj,
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
      const [myStyle, setMyStyle]=useState({});
      let lS={};
      let pstyle={}
      const lineStyleUser={
        justifyContent:"end",
        // background:"#AFE1AF"
      }
      const lineStyleNotUser={
        justifyContent:"start",
      }

      const userBackground={
        background:"#AFE1AF",
        color:"#333"
      }
      const notUserBackground={
        background:"#5a7da5"
      }

      return (
        <div className="chat-page">

        <div id='chat-container'>
         <div id='chat-area'>

         {dataToShow && dataToShow.map((S)=>{
          {S.user===user? lS=lineStyleUser: lS=lineStyleNotUser }
          {S.user===user? pstyle=userBackground: pstyle=notUserBackground }
           return <div id='message-div' style={lS}> <p id='message-content' style={pstyle}>{S.user} : {S.chatMes} </p> </div>
          })}

          </div>
        <div id='message-control'>
          <input
            placeholder="Message..."
            ref={messageInputRef}
            id='message-input'
            />
            <NavLink onClick={submitNewMessage} id='chat-Btn'>Send</NavLink>
          {/* <button onClick={submitNewMessage}>  Message</button> */}
            </div>
        </div>


        </div>
      );
}