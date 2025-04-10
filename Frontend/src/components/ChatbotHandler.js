import react from "react";
import { useState } from "react";

function ChatbotHandler() {
  let [message, setMessage] = useState("");
  let [input, setInput] = useState("");

  const getResponse = (input) => {
    const response = input;

    return response;
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessage([message, input]);
    setInput("");

    setTimeout(() => {
      const response = getResponse(message);
      setMessage((prevMessage) => [prevMessage, response]);
    }, 500);
  };
}

export default ChatbotHandler;
