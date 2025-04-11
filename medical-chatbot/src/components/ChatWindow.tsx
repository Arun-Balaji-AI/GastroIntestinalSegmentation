import { useState } from "react";
import Message from "./Message";


interface MessageType {
  sender: "user" | "bot";
  text: string;
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export default function ChatWindow() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [userInput, setUserInput] = useState("");

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");

    try {
      if (!API_KEY) {
        throw new Error("API key is missing. Please set VITE_GEMINI_API_KEY in your .env file");
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text:
                      "You are a professional Gastroenterologist assistant. Provide medically accurate, simple, and parent-friendly responses to health questions. " +
                      userInput,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("Gemini Response:", data);

      const botText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't understand that.";

      setMessages([...newMessages, { sender: "bot", text: botText }]);
    } catch (error) {
      console.error("Error in handleSend:", error);
      const errorText =
        "Error: " + (error instanceof Error ? error.message : "Unknown error");
      setMessages([...newMessages, { sender: "bot", text: errorText }]);
    }
  };

  return (
    <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 flex flex-col h-[80vh]">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
      <div className="welcome-text">
      Welcome, how can I assist you?
    </div>

        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender} text={msg.text} />
        ))}
      </div>
  
      <div className="flex justify-center items-center w-full px-4 py-10 bg-black rounded-b-xl">
        
          <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            className="flex-1 px-4 py-3 rounded-md border border-gray-600 text-white bg-black text-lg focus:outline-none"
            placeholder="Ask your question"
            style={{ height: '38px', width: '50%' }} 
          />
          <button
            onClick={handleSend}
            
          >
            Send
          </button>
        </div>
      </div>
    
  );
}
