import React, { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

const ChatBody = ({ messages, typingStatus, lastMessageRef, eventT }) => {
  const navigate = useNavigate();
  const counterRef = useRef(0);

  useEffect(() => {
    const data = eventT ? JSON.parse(eventT.data) : null;
    if (data?.doctor) {
      counterRef.current = 0; // Reset the counter to 0 for doctor messages
    } else if (data?.patient) {
      counterRef.current = 1; // Set the counter to 1 for patient messages
    }
  }, [eventT]);

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  const generateRandomKey = () => Math.random().toString(36).substr(2, 10);

  return (
    <>
      <header className='chat__mainHeader'>
        <p>Talk to your Doctor</p>
        <button className='leaveChat__btn' onClick={handleLeaveChat}>LEAVE CHAT</button>
      </header>

      <div className='message__container'>
        {messages.map((message) => {
          const isDoctor = counterRef.current === 0;
          counterRef.current = 1 - counterRef.current; // Toggle the counter
          
          return (
            <div className="message__chats" key={generateRandomKey()}>
              {isDoctor ? (
                <>
                  {/* <p className='sender__name'>Doctor</p> */}
                  <div className='message__sender'>
                    <p>{message}</p>
                  </div>
                </>
              ) : (
                <>
                  {/* <p>{localStorage.getItem("userName")}</p> */}
                  <div className='message__recipient'>
                    <p>{message}</p>
                  </div>
                </>
              )}
            </div>
          );
        })}
        <div className='message__status'>
          {/* <p>{typingStatus}</p> */}
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;
