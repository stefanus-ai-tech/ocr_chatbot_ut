import React, { useState } from "react";

interface Message {
  text: string;
  sender: string;
}

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [{ role: "user", content: message }] }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { text: message, sender: "user" },
        { text: data.message, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
      setMessage("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit" disabled={isLoading}>
          Send
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      <div>
        {messages.map((msg, index) => (
          <p key={index} className={msg.sender}>
            {msg.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Chat;
