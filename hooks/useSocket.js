import React, { useEffect, useState, useCallback } from "react";
import io from "socket.io-client";
import connectionURL from "../Constants/connectionURL";
export default (setMessage) => {
  console.log("inside hook");
  const [socket, setSocket] = useState(null);
  const openSocket = () => {
    console.log("USE CALL BACK");
    let socket;
    socket = io(connectionURL);
    socket.on("Chat", (data) => {
      setMessage(data);
    });
    setSocket(socket);
  };

  useEffect(() => {
    console.log("in use effect");
    openSocket();
  }, []);

  return [socket];
};
