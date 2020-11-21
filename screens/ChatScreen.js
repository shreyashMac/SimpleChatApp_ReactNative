import React, { useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Header } from "react-native-elements";
import { GiftedChat } from "react-native-gifted-chat";
import useSocket from "../hooks/useSocket";

export default ChatScreen = () => {
  const [message, setMessage] = useState([]);
  const [socket] = useSocket(setMessage);

  const sendToSocket = (message) => {
    socket.emit("Chat", ...message);
  };
  const handleSend = useCallback(
    (data) => {
      console.log("inside call back");
      sendToSocket(data);
      setMessage((previousMess) => {
        return GiftedChat.append(previousMess, message);
      });
    },
    [socket]
  );
  return (
    <View style={styles.container}>
      <Header
        centerComponent={{
          text: "Chat Room",
          style: { fontSize: 20, fontWeight: "400" },
        }}
      />
      <GiftedChat
        messages={message}
        user={{ _id: 1 }}
        onSend={handleSend}
        isTyping
        alwaysShowSend
        messagesContainerStyle={{
          marginBottom: 20,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    flexDirection: "column",
  },
});
