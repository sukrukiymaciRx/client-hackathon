import React, { useEffect, useState, useRef } from "react";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import CenterImage from "./CenterImage";

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);

  // useEffect(() => {
  //   socket.on("messageResponse", (data) => setMessages([...messages, data]));
  // }, [socket, messages]);

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
        />
        <ChatFooter socket={socket} />
      </div>
      <CenterImage messages={messages} lastMessageRef={lastMessageRef}/>
    </div>
  );
};

export default ChatPage;
