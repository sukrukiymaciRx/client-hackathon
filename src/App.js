import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./components/Home"
import ChatPage from "./components/ChatPage";

const socket = new WebSocket("ws://165.232.134.254:8000/dr_claude");

socket.onopen = () => {
  console.log("WebSocket connection established.");
  const messageToSend = {
    type: "message",
    content: "Patient presents with abdominal cramps and nausea. He has a fever, but is feeling dizzy"
  };
  
  socket.send(JSON.stringify(messageToSend));
  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log("data", data)
  const messageToSend = {
    type: "message",
    content: "Hello, server! This is a test message."
  };
  
  socket.send(JSON.stringify(messageToSend));
  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
};



socket.onclose = (event) => {
  console.log("WebSocket connection closed:", event.code, event.reason);
};

function App() {
  return (
    <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home socket={socket}/>}></Route>
            <Route path="/chat" element={<ChatPage socket={socket}/>}></Route>
          </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
