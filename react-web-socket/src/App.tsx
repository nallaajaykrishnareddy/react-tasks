import { useCallback, useEffect } from "react";
import "./App.css";

function App() {
  const createWebSocket = useCallback(() => {
    let socket: any;
    if (!socket || socket.readyState === WebSocket.CLOSED) {
      socket = new WebSocket("ws://localhost:8081/ws");
    }

    socket.onopen = () => {
      console.log("Connected to server");
    };

    socket.onclose = () => {
      console.log("Hello");

      console.log("Connection closed. Reconnecting...");
      setTimeout(createWebSocket, 3000); // Attempt reconnect after 1 second
    };

    socket.onmessage = (event) => {
      console.log("Message from server:", event.data);
    };
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    createWebSocket();
  }, [createWebSocket]);

  return null;
}

export default App;
