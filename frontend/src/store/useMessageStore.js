import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
import { useAuthStore } from "./useAuthStore";

export const useMessageStore= create((set,get)=>({
    messages: [],
    isGettingUsers: null,
    isLoadingMessages: null,
    users: [],
    selectedUser:null,

    setSelectedUser: async(user)=>{
        try {
            set({selectedUser: user});
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    getUsersForSidebar: async()=>{
        set({isGettingUsers:true});
        try {
            const res= await axiosInstance.get("/message/users");
            set({users: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            set({isGettingUsers:false});
        }
    },

    getMessages: async (userId) => {
    set({ isLoadingMessages: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoadingMessages: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

}))
