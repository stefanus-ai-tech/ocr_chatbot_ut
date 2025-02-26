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

  // Store conversation history for context
  const [conversationHistory, setConversationHistory] = useState<
    Array<{ role: string; content: string }>
  >([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to UI immediately
    setMessages((prev) => [...prev, { text: message, sender: "user" }]);

    // Add to conversation history for API
    const userMessage = { role: "user", content: message };
    const updatedHistory = [...conversationHistory, userMessage];
    setConversationHistory(updatedHistory);

    // Determine API URL depending on the environment
    const isDevelopment = process.env.NODE_ENV !== "production";
    const apiUrl = isDevelopment
      ? "http://localhost:8086/api/chat" // local API endpoint for development
      : "https://ocr-chatbot-ut.netlify.app/api/chat";

    try {
      setIsLoading(true);
      setError(""); // Clear any previous errors

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // using no-cors mode; response becomes opaque
        body: JSON.stringify({ messages: updatedHistory }),
      });

      // With an opaque response you cannot access response.ok or response.json()
      // ...existing code for handling response (this part may need adjustment)...
    } catch (error) {
      console.error("Error sending message:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );

      // Add a fallback message in case of error
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I couldn't process your request. Please try again later.",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        {isLoading && <div className="loading-indicator">Bot is typing...</div>}
      </div>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          className="message-input"
        />
        <button type="submit" disabled={isLoading} className="send-button">
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Chat;
