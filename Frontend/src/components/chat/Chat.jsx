import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";

// Custom MongoDB ObjectID validator for client-side
const isValidMongoId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

const socket = io(import.meta.env.VITE_SERVER_URL || "http://localhost:3000", {
  auth: { token: localStorage.getItem("token") },
  transports: ["websocket", "polling"],
});

const Chat = () => {
  const [activeTab, setActiveTab] = useState("People");
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  // Track sent messages to avoid duplicates
  const sentMessageIds = useRef(new Set());

  // Scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle Socket.IO connection and errors
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });
    socket.on("connect_error", (err) => {
      setError("Failed to connect to server: " + err.message);
      console.error("Socket.IO connection error:", err.message);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
    };
  }, []);

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      setError(null);
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_URL || "http://localhost:3000"
          }/api/get-all-user`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUsers(response.data.data || []);
      } catch (err) {
        setError("Failed to fetch users: " + err.message);
        console.error("Error fetching users:", err.message);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  // Fetch messages for the active chat and join room
  useEffect(() => {
    if (activeChat) {
      const userId = user.id;
      if (!isValidMongoId(userId) || !isValidMongoId(activeChat.id)) {
        setError(
          "Invalid user or chat selection. Please try logging in again."
        );
        console.error("Invalid IDs:", { userId, receiverId: activeChat.id });
        return;
      }

      const roomId = [userId, activeChat.id].sort().join("_");
      console.log("Joining room:", roomId, {
        userId,
        receiverId: activeChat.id,
      });
      setMessages((prev) => ({
        ...prev,
        [roomId]: prev[roomId] || [],
      }));
      socket.emit("joinRoom", roomId);

      const fetchMessages = async () => {
        setLoadingMessages(true);
        setError(null);
        try {
          const response = await axios.get(
            `${
              import.meta.env.VITE_SERVER_URL || "http://localhost:3000"
            }/api/messages/${activeChat.id}`,
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setMessages((prev) => ({
            ...prev,
            [roomId]: Array.isArray(response.data) ? response.data : [],
          }));
          // Clear sentMessageIds to avoid stale entries
          sentMessageIds.current.clear();
        } catch (err) {
          setError("Failed to fetch messages: " + err.message);
          console.error("Error fetching messages:", err.message);
          setMessages((prev) => ({ ...prev, [roomId]: [] }));
        } finally {
          setLoadingMessages(false);
        }
      };
      fetchMessages();

      // Cleanup when activeChat changes
      return () => {
        socket.emit("leaveRoom", roomId);
        sentMessageIds.current.clear();
      };
    }
  }, [activeChat]);

  // Listen for incoming messages and errors
  useEffect(() => {
    const handleReceiveMessage = ({
      text,
      sender,
      timestamp,
      senderId,
      roomId,
      messageId,
    }) => {
      console.log("Received message:", {
        text,
        sender,
        timestamp,
        senderId,
        roomId,
        messageId,
      });

      // Skip if message is from the current user or already processed
      if (
        senderId === user.id ||
        sentMessageIds.current.has(messageId || `${senderId}_${timestamp}`)
      ) {
        console.log(
          "Skipping duplicate or self-sent message:",
          messageId || `${senderId}_${timestamp}`
        );
        return;
      }

      // Add message to state
      setMessages((prev) => {
        const currentMessages = Array.isArray(prev[roomId]) ? prev[roomId] : [];
        // Double-check for duplicates in state
        if (
          currentMessages.some(
            (msg) =>
              (msg.messageId || `${msg.senderId}_${msg.timestamp}`) ===
              (messageId || `${senderId}_${timestamp}`)
          )
        ) {
          console.log(
            "Message already in state:",
            messageId || `${senderId}_${timestamp}`
          );
          return prev;
        }
        return {
          ...prev,
          [roomId]: [
            ...currentMessages,
            {
              text,
              sender: sender || "Unknown",
              timestamp,
              senderId,
              messageId,
            },
          ],
        };
      });

      // Scroll to bottom only if the message is for the active chat
      if (
        activeChat?.id &&
        roomId === [user.id, activeChat.id].sort().join("_")
      ) {
        scrollToBottom();
      } else {
        console.warn(
          "Message received for inactive or incorrect room:",
          roomId
        );
      }
    };

    const handleError = ({ message }) => {
      setError(message);
      console.error("Socket error:", message);
    };

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("error", handleError);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("error", handleError);
    };
  }, [activeChat, user.id]);

  // Scroll to bottom when messages update for active chat
  useEffect(() => {
    if (activeChat) {
      const roomId = [user.id, activeChat.id].sort().join("_");
      if (messages[roomId]?.length > 0) {
        scrollToBottom();
      }
    }
  }, [messages, activeChat, user.id]);

  // Handle sending messages
  const handleSendMessage = () => {
    if (!input.trim() || !activeChat) return;
    const userId = user.id;
    const username = user.username;
    if (!username) {
      setError("Username not found. Please log in again.");
      console.error("Username missing in localStorage");
      return;
    }
    if (!isValidMongoId(userId) || !isValidMongoId(activeChat.id)) {
      setError("Invalid user or chat selection. Please try logging in again.");
      console.error("Invalid IDs:", { userId, receiverId: activeChat.id });
      return;
    }

    const roomId = [userId, activeChat.id].sort().join("_");
    const messageId = `${userId}_${Date.now()}`; // Unique ID for the message
    const message = {
      text: input,
      sender: username,
      senderId: userId,
      timestamp: new Date().toISOString(),
      messageId,
    };
    console.log("Sending message:", { roomId, ...message });

    // Add to sent messages to prevent duplication
    sentMessageIds.current.add(messageId);

    // Add message to local state for optimistic update
    setMessages((prev) => {
      const currentMessages = Array.isArray(prev[roomId]) ? prev[roomId] : [];
      return {
        ...prev,
        [roomId]: [...currentMessages, message],
      };
    });

    // Emit message to server
    socket.emit("sendMessage", {
      roomId,
      text: input,
      receiverId: activeChat.id,
      sender: username,
      senderId: userId,
      messageId,
    });
    setInput("");
    scrollToBottom();
  };

  return (
    <div className="flex h-[56vh] bg-black rounded-lg m-4 border-neutral-600 text-white font-sans">
      <div className="w-64 border border-neutral-600 flex flex-col ">
        <div className="flex border  border-neutral-600">
          {["People"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-center text-sm ${
                activeTab === tab
                  ? "bg-neutral-900 text-white"
                  : "bg-black text-neutral-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto">
          {loadingUsers ? (
            <p className="text-neutral-500 text-center p-4">Loading users...</p>
          ) : error && activeTab === "People" ? (
            <p className="text-red-500 text-center p-4">{error}</p>
          ) : users.length === 0 ? (
            <p className="text-neutral-500 text-center p-4">No users found</p>
          ) : (
            activeTab === "People" &&
            users.map((person) => (
              <div
                key={person._id}
                onClick={() =>
                  setActiveChat({ id: person._id, name: person.username })
                }
                className={`p-3 cursor-pointer text-sm border-b border-neutral-600 ${
                  activeChat?.id === person._id
                    ? "bg-neutral-900"
                    : "hover:bg-neutral-900"
                }`}
              >
                <p>{person.username}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="flex-1 flex flex-col bg-neutral-950">
        {activeChat ? (
          <>
            <div className="p-4 border border-neutral-600 text-sm font-medium">
              {activeChat.name}
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-2 text-sm">
              {loadingMessages ? (
                <p className="text-neutral-500 text-center">
                  Loading messages...
                </p>
              ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
              ) : messages[[user.id, activeChat.id].sort().join("_")]?.length >
                0 ? (
                messages[[user.id, activeChat.id].sort().join("_")].map(
                  (msg, idx) => (
                    <div
                      key={msg.messageId || idx}
                      className={`max-w-xs px-3 py-2 rounded-md ${
                        msg.senderId === user.id
                          ? "bg-blue-600 text-white ml-auto"
                          : "bg-neutral-600 text-neutral-200"
                      }`}
                    >
                      <div className="text-xs text-neutral-400">
                        {msg.sender || "Unknown"} •{" "}
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      {msg.text}
                    </div>
                  )
                )
              ) : (
                <p className="text-neutral-500 text-center">No messages yet</p>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border border-neutral-600 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-neutral-900 border border-neutral-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-600"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 px-4 py-2 rounded-md text-sm hover:bg-blue-500"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center  text-lg">
            Select a person to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
