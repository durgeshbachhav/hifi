import React, { useEffect, useState } from "react";
import { axiosClient } from "../utils/axiosClient";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { BiMessageSquareAdd } from "react-icons/bi";
import InputEmoji from "react-input-emoji";
import { useRef } from "react";
import { Link } from "react-router-dom";

const MessageSide = ({
  chat,
  currentUserId,
  setSendMessage,
  receivedMessage,
}) => {
  const myprofile = useSelector((state) => state.appConfig.myProfile);
  const userprofile = useSelector((state) => state.userProfile.userProfile);

  const [userData, setUserData] = useState(null);
  const [messages, setmessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();

  // Handle input field changes
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  // Fetch user data for the chat header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUserId);
    try {
      const getUserData = async () => {
        const response = await axiosClient.post(`/user/get-user-profile`, {
          userId,
        });
        setUserData(response.result);
      };
      if (chat !== null) getUserData();
    } catch (error) {
      console.log(error);
    }
  }, [chat, currentUserId]);

  // Fetch chat messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosClient.get(`/message/${chat?._id}`);
        setmessages(response.result.messages);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat, newMessage]);

  // Always scroll to the last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  let receiverId;
  // Handle sending a message
  const handleSendMsg = async (e) => {
    e.preventDefault();
    const messageData = {
      senderId: currentUserId,
      receiverId:receiverId,
      text: newMessage,
      chatId: chat._id,
    };
    receiverId = chat.members.find((id) => id !== currentUserId);
    setNewMessage({ ...messages, receiverId });
    setNewMessage("");
    try {
      const response = await axiosClient.post(`/message/`, messageData);
      setmessages([...messages, response.result]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (receivedMessage !== null && receivedMessage?.chatId === chat._id) {
      setmessages((prevMessages) => [...prevMessages, receivedMessage]);
    }
  }, [receivedMessage]);

  // Send message to socket server

  return (
    <div className="relative flex flex-col gap-1">
      {/* User-side component directly handled here */}
      {chat && (
        <Link
          to={`/profile/${receiverId}`}
          className="px-2 py-2 bg-gray-300 rounded-lg hover:bg-blue-500 cursor-pointer sticky top-0 mt-2"
        >
          <div className="flex items-center">
            <div>
              <img
                className="w-8 h-8 rounded-full"
                src={userData?.avatar?.url}
                alt=""
              />
            </div>
            <div className="ml-2">
              <h2 className="text-lg   font-bold">{userData?.username}</h2>
            </div>
          </div>
        </Link>
      )}

      {chat && (
        <div
          style={{ height: "80vh" }}
          className="overflow-scroll scroll-smooth py-2 bg-special-color rounded-md"
        >
          {messages?.map((message) => (
            <div
              ref={scroll}
              className={`${
                message?.senderId === currentUserId
                  ? "bg-secondary-color right-message"
                  : "bg-special-color left-message"
              } p-2 m-2 rounded-lg max-w-md`}
              key={message?.id}
            >
              <div className="flex flex-col gap-1 relative">
                <span className="text-sm top-0">{message.text}</span>
                <span className="text-xs w-32 bottom-0 left-0 text-blue-400">
                  {format(message.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      {chat && (
        <div className="flex gap-1 px-4 sticky  bg-special-color rounded-md ">
          <div className="flex items-center justify-center cursor-pointer">
            <BiMessageSquareAdd color="white" size={25} />
          </div>
          <InputEmoji value={newMessage} onChange={handleChange} />
          <div className="flex items-center justify-center">
            <button
              className=" bg-blue-400 px-4 py-1 rounded-md hover:bg-blue-500"
              onClick={handleSendMsg}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {!chat && (
        <div className="flex items-center justify-center font-bold mt-10 text-white">
          Tap on Chats to start conversation
        </div>
      )}
    </div>
  );
};

export default MessageSide;
