// import chatService{
//     createChatRequest,
//     GetAllChatsResponse
// } from "../services/chatService";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { AxiosError } from "axios";
// import { GetAllChatsResponse } from '../services/chatService';

// const useChat = () => {
//   const getChatQuery = useQuery({
//     queryKey: ["chats"],
//     queryFn: async () => {
//       const response = await chatService.getAllChats();
//       return response.data;
//     },
//   });

//   const createChatMutation = useMutation({
//     mutationFn: async (data: any) => {
//       const response = await chatService.createChat(data);
//       return response.data;
//     },
//     onError: (error: AxiosError) => {
//       console.error(error);
//     },
//   });

//   return {
//     getChatQuery,
//     createChatMutation,
//   };
// };

// export default useChat;
