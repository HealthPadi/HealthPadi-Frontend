//This is the chat hook that is used to fetch chats. It uses the useQuery and useMutation hooks from react-query to fetch and create chats. It also uses the chatService to fetch and create chats. It returns the getChatQuery and createChatMutation functions that can be used to fetch and create chats.
import { useMutation, useQuery } from "@tanstack/react-query";
import chatService, { ChatRequest } from "../services/chatService";

export const useChat = () => {
  const getChatQuery = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const response = await chatService.getAllChats();
      return response.data;
    },
  });

  const createChatMutation = useMutation({
    mutationFn: async (data: ChatRequest) => {
      const response = await chatService.createChat(data);
      console.log("AI Response:", response.data);
      return response.data;
    },
  });

  return {
    getChatQuery,
    createChatMutation,
  };
};
