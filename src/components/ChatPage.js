import React, { useEffect, useState, useRef } from "react";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import CenterImage from "./CenterImage";

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [patientMessages, setPatientMessages] = useState([]);
  const [doctorMessages, setDoctorMessages] = useState([]);
  const [brainMessages, setBrainMessages] = useState([]);
  const [conditonMessages, setConditionMessages] = useState([]);

  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);
  const lastPatientMessageRef = useRef(null);
  const lastDoctorMessageRef = useRef(null);
  const [eventT, setEventT] = useState("");


  useEffect(() => {
    // socket.on("messageResponse", (data) => setMessages([...messages, data]));
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("brain", data)
      setEventT(event)
      if(data?.doctor) { 
        setMessages([...messages, data.doctor])
        setDoctorMessages([...doctorMessages, data.doctor])
      }
      else if(data?.patient) {
        setMessages([...messages, data.patient])
        setPatientMessages([...patientMessages, data.patient])
      }else if(data?.brain){
        // const formattedData = data?.brain.map(([condition, value]) => `${condition}: ${value}`).join("\n");
        // console.log("formatted Data ",formattedData )
        setBrainMessages([data.brain])
      }else if(data?.condition) {
        setConditionMessages([...conditonMessages, data.condition])
      }
      console.log("data", data)
      // const messageToSend = {
      //   type: "message",
      //   content: "Hello, server! This is a test message."
      // };
      
      // socket.send(JSON.stringify(messageToSend));
      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    };

  }, [socket, messages]);

  // useEffect(() => {
  //   socket.on("typingResponse", (data) => setTypingStatus(data));
  // }, [socket]);



  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat__main">
        <ChatBody
          messages={messages}
          typingStatus={typingStatus}
          lastMessageRef={lastMessageRef}
          eventT={eventT}
        />
        <ChatFooter socket={socket} />
      </div>
      <CenterImage lastPatientMessageRef={lastPatientMessageRef} lastDoctorMessageRef={lastDoctorMessageRef}
      conditonMessages={conditonMessages}
 patientMessages={patientMessages} doctorMessages={doctorMessages} messages={messages} lastMessageRef={lastMessageRef} brainMessages={brainMessages}/>
    </div>
  );
};

export default ChatPage;
