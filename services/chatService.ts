//this page is for the chat service and the chat history to

import axiosConfig from "../config/axios";
import { AxiosResponse } from "axios";

export interface ChatHistoryItem {
  role: string;
  content: string;
}

export interface Chat {
  chatHistory: ChatHistoryItem[];
  newMessage: string;
}

export interface GetAllChatsResponse {
  chats: Chat[];
}
export interface ChatRequest {
  newMessage: string;
  chatHistory: ChatHistoryItem[];
}

type ChatDetail = {
  chat: Chat;
};

type ChatDetailResponse = {
  chat: ChatDetail;
};

class ChatService {
  createChat(data: any) {
    throw new Error("Method not implemented.");
  }

  async getAllChats(): Promise<AxiosResponse<GetAllChatsResponse>> {
    return axiosConfig.post("/api/ai/ai-chat-bot");
  }

  async getChatById(id: string): Promise<AxiosResponse<ChatDetailResponse>> {
    return axiosConfig.post(`/chats/${id}`);
  }
}

export default new ChatService();
