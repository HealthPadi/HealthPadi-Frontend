import React, { useState, useEffect } from "react";
import { useChat } from "../../hooks/useChat"; // Custom hook for chat logic
import { Send } from "lucide-react"; // Importing Send icon from lucide-react
import { Avatar, AvatarFallback } from "../components/ui/avatar"; // Importing Avatar components
import { useAuthState } from "../../store/authStore"; // Custom hook for authentication
import { ChatHistoryItem } from "../../services/chatService";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [newMessage, setNewMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const { createChatMutation } = useChat();
  const { user } = useAuthState(); // Get the currently logged-in user

  // useEffect(() => {
  //   if (getChatQuery.data?.chats[0]?.chatHistory) {
  //     setChatHistory(getChatQuery.data.chats[0].chatHistory);
  //   }
  // }, [getChatQuery.data]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const userMessage = { role: "user", content: newMessage };
      setChatHistory((prev) => [...prev, userMessage]);

      createChatMutation.mutate(
        {
          newMessage,
          chatHistory: [...chatHistory], // Include the new user message in the chat history
        },
        {
          onSuccess: (data) => {
            console.log("Mutation Success:", data); // Debugging log
            const aiMessage: ChatHistoryItem = {
              role: "assistant",
              content: data,
            };
            setChatHistory((prev) => [...prev, aiMessage]);
            console.log("Updated Chat History:", chatHistory); // Debugging log
          },
          onError: (error) => {
            console.error("Error sending message:", error); // Debugging log
          },
        }
      );

      setNewMessage("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">HealthPadi AI</h2>
          <button onClick={onClose} className="text-red-500">
            Close
          </button>
        </div>

        <div className="chat-history overflow-y-auto max-h-60 mb-4">
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`mb-2 flex items-center ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <Avatar className="mr-2 bg-white p-1">
                  <AvatarFallback className="bg-green-500 text-white">
                    A
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
            className="flex-grow p-2 border border-gray-300 rounded-md"
            placeholder="Meassage HealthPadi AI..."
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
