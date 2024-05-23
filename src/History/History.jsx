import React, { useState, useEffect, useRef } from "react";
import "./chatbos.css"; // Đảm bảo tạo file này để thêm CSS
import { getChatBotAnswer } from "./chatservice";

function History() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const interactWithChat = async (content) => {
    const response = await getChatBotAnswer(0, content);
    const newBotMessage = {
      text: response,
      isUser: false,
      timestamp: new Date().toLocaleTimeString("vn-VN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
    setMessages((prevMessages) => [...prevMessages, newBotMessage]);
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    if (input.trim() !== "") {
      const newChatMessage = {
        text: input,
        isUser: true,
        timestamp: new Date().toLocaleTimeString("vn-VN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };
      setMessages((prevMessages) => [...prevMessages, newChatMessage]);
      setInput("");
      interactWithChat(newChatMessage.text);
    }
  };

  return (
    <div className="chat-box">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.isUser ? "user-message" : "other-message"
            }`}
          >
            <img
              src={
                message.isUser
                  ? "./img/user_profile.jpg"
                  : "./img/logo_page.jpg"
              }
              className="avatar"
              alt="avatar"
            />
            <div className="text-and-time">
              <p>{message.text}</p>
              <span className="timestamp">{message.timestamp}</span>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <form onSubmit={sendMessage} className="message-form">
        <input
          type="text"
          className="form-control"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          style={{
            backgroundColor: "#38393A",
          }}
          type="submit"
          className="btn send-button"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default History;