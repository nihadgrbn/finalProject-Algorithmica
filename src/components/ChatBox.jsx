import { useState } from "react";
import styles from "./ChatBox.module.css";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = {
      contents: [
        {
          parts: [
            {
              text: userInput,
            },
          ],
        },
      ],
    };

    const updatedMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(updatedMessages);
    setUserInput("");
    setLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userMessage),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (error) {
      console.error("API error:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "An error occurred." }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className={styles.chatBox}>
      <button className={styles.toggleButton} onClick={handleToggle}>
        {isOpen ? "Close Chat" : "Chat"}
      </button>
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>Planetarium Assistant</div>
          <div className={styles.chatMessages}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={msg.sender === "user" ? styles.userMessage : styles.botMessage}
              >
                <strong>{msg.sender === "user" ? "You" : "Gemini"}:</strong> {msg.text}
              </div>
            ))}
            {loading && <p className={styles.loadingMessage}>Loading...</p>}
          </div>
          <div className={styles.chatInputContainer}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              className={styles.chatInput}
            />
            <button onClick={sendMessage} className={styles.sendButton}>
              Send
            </button>
            <button onClick={clearChat} className={styles.clearButton}>
              Clear Chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
