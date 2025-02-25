import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { marked } from "marked";
import { useToast } from "@/hooks/use-toast";
import { MessagesSquare, Send, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "assistant" | "user";
  content: string;
}

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Halo! ada yang bisa saya bantu?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput("");

    try {
      const response = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
      };
      setMessages((msgs) => [...msgs, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((msgs) => [
        ...msgs,
        {
          role: "assistant",
          content: "Maaf, terjadi kesalahan saat memproses pesan Anda.",
        } as Message,
      ]);
    }
  };

  return (
    <Card
      className={cn(
        "fixed bottom-4 right-4 shadow-xl transition-all duration-300 ease-in-out",
        isExpanded
          ? "w-[400px] max-h-[600px] flex flex-col"
          : "w-14 h-14 rounded-full cursor-pointer hover:scale-110"
      )}
      onClick={() => !isExpanded && setIsExpanded(true)}
    >
      {isExpanded ? (
        <>
          <div className="p-4 border-b bg-primary text-primary-foreground flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessagesSquare className="h-5 w-5" />
              <h2 className="font-semibold">Chatbot Universitas Terbuku</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:text-primary-foreground/80"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex mb-2 ${
                  message.role === "assistant" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === "assistant"
                      ? "bg-muted"
                      : "bg-primary text-primary-foreground"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(message.content),
                  }}
                ></div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground rounded-full">
          <MessagesSquare className="h-6 w-6" />
        </div>
      )}
    </Card>
  );
};
