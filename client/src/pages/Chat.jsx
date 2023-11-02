import React, { useEffect, useState } from "react";
import UserSide from "../components/UserSide";
import MessageSide from "../components/MessageSide";
import { axiosClient } from "../utils/axiosClient";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useRef } from "react";

const Chat = () => {
  const myprofile = useSelector((state) => state.appConfig.myProfile);
  const [chatData, setChatData] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const socket = useRef();

  // Send a message to the socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Set up socket connection and handle user online status
  useEffect(() => {
    socket.current = io("http://localhost:4000");

    // Emit a new-user-add event with the user's ID to join the chat
    socket.current.emit("new-user-add", myprofile?._id);

    // Listen for updates to the list of online users
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [myprofile]);

  // Listen for incoming messages from the socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceivedMessage(data);
    });
  }, []);

  // Fetch user's chat data
  useEffect(() => {
    try {
      const getChats = async () => {
        const response = await axiosClient.get(`/chat/${myprofile?._id}`);
        setChatData(response.result.chat);
      };
      getChats();
    } catch (error) {
      console.log(error);
    }
  }, [myprofile]);

  // Check if a user is online or not in a given chat
  const checkOnlineStatus = (chat) => {
    const chatMember = chat?.members.find(
      (member) => member !== myprofile?._id
    );
    const online = onlineUsers.find((user) => user.userId === chatMember);

    return !!online; // Return true if online, false otherwise
  };

  return (
    <div
      style={{ width: "100%", height: "100vh" }}
      className="flex gap-2  mr-2 px-2"
    >
      <div
        style={{ width: "25%", height: "" }}
        className="bg-gray-500 my-2 px-4 rounded-md "
      >
        <h2 className="font-bold text-xl text-white my-3">Chats</h2>
        <div className="">
          {chatData?.map((chat, index) => (
            <div
              className="my-4"
              onClick={() => setCurrentChat(chat)}
              key={index}
            >
              <UserSide
                data={chat}
                currentUserId={myprofile?._id}
                online={checkOnlineStatus(chat)}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        style={{ width: "75%", height: "" }}
        className="bg-secondary-color  px-4  "
      >
        <MessageSide
          chat={currentChat}
          currentUserId={myprofile?._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
