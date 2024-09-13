//This is the ChatModal component that will be used to display the chat modal when the user clicks on the chat icon. The modal will contain the chat history and a text input field to send messages to the AI.
import React, { useState, useEffect } from "react";
import { useChat } from "../hooks/useChat";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { useAuthState } from "../store/authStore";
import { ChatHistoryItem } from "../services/chatService";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [newMessage, setNewMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const { createChatMutation } = useChat();
  const { user } = useAuthState();

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const userMessage = { role: "user", content: newMessage };
      setChatHistory((prev) => [...prev, userMessage]);

      createChatMutation.mutate(
        {
          newMessage,
          chatHistory: [...chatHistory],
        },
        {
          onSuccess: (data) => {

            console.log("Mutation Success:", data);
            const aiMessage: ChatHistoryItem = {
              role: "assistant",
              content: data,
            };
            setChatHistory((prev) => [...prev, aiMessage]);
            console.log("Updated Chat History:", chatHistory);
          },
          onError: (error) => {
            console.error("Error sending message:", error);
          },
        }
      );

      setNewMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-full max-w-3xl h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">HealthPadi AI</h2>
          <button onClick={onClose} className="text-red-500">
            Close
          </button>
        </div>

        <div className="chat-history overflow-y-auto flex-grow mb-4">
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`mb-2 flex items-center ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "ai" && (
                <Avatar className="mr-2 bg-white p-1">
                  <AvatarFallback className="bg-green-500 text-white">
                    AI
                  </AvatarFallback>
                </Avatar>
              )}
              <p
                className={`p-2 rounded-md mx-2 ${
                  message.role === "user" ? "bg-blue-100" : "bg-gray-200"
                }`}
              >
                {message.content}
              </p>
              {message.role === "user" && (
                <Avatar className="ml-2 bg-white p-1">
                  <AvatarFallback className="bg-green-500 text-white">
                    {user?.firstName?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow p-2 border border-gray-300 rounded-md"
            placeholder="Message HealthPadi AI..."
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-green-500 text-white p-2 rounded-md flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
