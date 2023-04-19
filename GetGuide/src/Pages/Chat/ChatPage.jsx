import './ChatPage.css'
import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from 'react-router-dom';
import { Colors } from 'chart.js';

const socket = io.connect("http://localhost:6363");


export default function ChatPage(){
    const params=useParams()
    const [room, setRoom] = useState((params.aucid).replace(/ /g,''));
    const [roomToChat, setRoomToChat] = useState(undefined);
    const [messageReceived, setMessageReceived] = useState("");
    const [message, setMessage] = useState([]);
    const [Chat, setChat]=useState(undefined);
    const [dataToShow, setDataToShow]=useState(undefined);
    const [user, setUser]=useState(JSON.parse(localStorage.getItem('user')).name);
    const [newMessage, setNewMessage]=useState("");
    const [R, setR]=useState('');
    let messageInputRef=useRef(null);
    console.log(params.aucid);

    useEffect(()=>{
      getChat(room);
      // if(Chat){
      //   // setMessageReceived(Chat.chatMessages)
      //   // console.log(newMessage);
      //   // setMessage(Chat.chatMessages);
      //   set
      // }
    },[])
    useEffect(()=>{
      if(Chat!=undefined){
        console.log(Chat);
        setRoomToChat(Chat._id);
        setMessage(Chat.chatMessages);
        if(message){
          setDataToShow(Chat.chatMessages);
        }
      }
    },[Chat])

    useEffect(() => {
      if (roomToChat) {
        joinRoom();
      }
    }, [roomToChat]);

    useEffect(() => {
      console.log("newMessage", newMessage);
      sendMessage();
    }, [newMessage]);
    useEffect(() => {
      console.log("newMessage", newMessage);
      if(newMessage===""){
        setNewMessage(message);
      }
    }, [message]);

    useEffect(() => {
      if (messageReceived) {
        setMessage((messageReceived));
        console.log((messageReceived));
        setDataToShow((messageReceived));
        updateHandler(Chat._id, (messageReceived));
      }
    }, [messageReceived]);
    

    useEffect(() => {
      socket.on("receive-message", (data) => {
        setMessageReceived((data.message));
        updateChatRoomWithNewMessage(data.newMessage);
      });
    }, [socket]);
    

    function updateChatRoomWithNewMessage(newMessage) {
      setChat((prevChat) => {
        const updatedMessages = [...prevChat.chatMessages, newMessage];
        return { ...prevChat, chatMessages: updatedMessages };
      });
    }



    const joinRoom = () => {
        if (roomToChat) {
          socket.emit("join_room", roomToChat);
          console.log("Room Joined",roomToChat);
        }
      };

      const sendMessage = () => {
        socket.emit("send-message", { message, roomToChat });
      };
    
     

      function submitNewMessage(){
        if(messageInputRef.current.value!==""){
          if(user){
            const user=JSON.parse(localStorage.getItem('user')).name;
            const messageObj={};
            messageObj.user=user;
            messageObj.chatMes=messageInputRef.current.value; 
            setMessage([...message, messageObj]);
            setNewMessage(messageObj);
            messageInputRef.current.value="";
          }
        }

        console.log("dataToShow",dataToShow);
          

      }

      async function updateHandler(rm, sms) {
        try {
          fetch(`http://localhost:6363/api/Chats/chat/update/${rm}`, {
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
            console.log("res from getChat", res);
            setChat(res);
            // setMessage(res.chatMessages);
            console.log("res GETTING Chat", res);
          });
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

         {Array.isArray(dataToShow) && dataToShow.map((S)=>{
          { user && S && S.user===user? lS=lineStyleUser: lS=lineStyleNotUser }
          { user && S && S.user===user? pstyle=userBackground: pstyle=notUserBackground }

          {  return <div id='message-div' style={lS}> <p id='message-content' style={pstyle}>{S.chatMes} </p> </div>}
           
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