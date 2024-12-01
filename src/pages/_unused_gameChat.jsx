import React, { useState, useEffect, useRef } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

let socket;

function _unused_gameChat() {
  //unity player
  const { unityProvider, requestFullscreen } = useUnityContext({
    loaderUrl: "/assets/BshipWide.loader.js",
    dataUrl: "/assets/BshipWide.data.unityweb",
    frameworkUrl: "/assets/BshipWide.framework.js.unityweb",
    codeUrl: "/assets/BshipWide.wasm.unityweb",
  });

  //chat
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket = new WebSocket("ws://localhost:4000/ws");

    socket.onmessage = function (event) {
      const msg = JSON.parse(event.data);
      setChat((prevChat) => [...prevChat, msg.message]);
    };

    socket.onerror = function (error) {
      console.error("WebSocket error:", error);
    };

    socket.onopen = function () {
      console.log("WebSocket is open");
    };

    socket.onclose = function (event) {
      console.log("WebSocket closed:", event);
    };

    return () => {
      if (socket) {
        socket.close(1000, "Component unmounted");
      }
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("Sending message:", message);
    if (message.trim()) {
      const msg = { message };
      console.log("WebSocket state:", socket.readyState);
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(msg));
        setMessage("");
      } else {
        console.error("WebSocket is not open");
      }
    }
  };

  function handleClickEnterFullscreen() {
    requestFullscreen(false);
  }

  window.onload = requestFullscreen;
  
  

  return (
    <div style={{ display: "grid", gridTemplateRows: "auto auto", gap: "20px" }}>
      {/* Unity Component */}
      <div>
        <Unity
          style={{
            width: "calc(100vh - 20px)",
            height: "calc(100vh - 20px)",
            justifySelf: "center",
            alignSelf: "center"
          }}
          unityProvider={unityProvider}
          className="Battleship"
          devicePixelRatio={window.devicePixelRatio}
          tabIndex={1}
        />
        <button onClick={handleClickEnterFullscreen}>Enter Fullscreen</button>
      </div>

      {/* Chat Component */}
      <div style={{ padding: "20px", borderTop: "1px solid #ccc" }}>
        <h2>Chat</h2>
        <div style={{ maxHeight: "200px", overflowY: "auto", backgroundColor: "#f9f9f9", padding: "10px", border: "1px solid #ddd" }}>
          {chat.map((msg, idx) => (
            <p key={idx}>{msg}</p>
          ))}
        </div>
        <form onSubmit={sendMessage} style={{ marginTop: "10px" }}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            style={{ width: "80%", padding: "10px", fontSize: "16px" }}
            tabIndex={2}
          />
          <button 
            type="submit" 
            style={{ padding: "10px", fontSize: "16px", marginLeft: "10px" }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default _unused_gameChat;