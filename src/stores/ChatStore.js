import { create } from "zustand";
import {getAllMessages, markMessagesAsRead, sendMessage} from "../api/connections/chats";
import {fetchPotentialChatPartners} from "../api/connections/users";
export default create((set, get) => ({

    chats:[],
    chatPartners: undefined,
    latestMessageInThreads:[],
    imageFile: null,
    fetchAllMessagesAndStoreAsChats: async(userId) => {
      const messages = await getAllMessages();
      //Sort all messages into list of threads
      const distinctChats = [];
      messages.forEach(message => {
        //if user is sender, then we only have to consider the reciever.
        if(userId === message.sender) {
          AddMessageToThread(message.receiver, message, distinctChats);
        }
        else if(userId === message.receiver) {
          AddMessageToThread(message.sender, message, distinctChats);
        }
      });

      //Sort and store latest messages
      const latestMessageInThreads = [];
      distinctChats.forEach(chat => {
        //Sort messages to get the newest to oldest
        chat.messages = chat.messages.sort((a,b) => a.message_date - b.message_date);
        //Save the latest message of each thread
        latestMessageInThreads.push({chatPartner:chat.chatPartner, messages: [chat.messages[0]]});
        //Reverse messages to get the latest to oldest
        chat.messages = chat.messages.reverse();
      });

      //store in zustand
      set({ chats: distinctChats, latestMessageInThreads: latestMessageInThreads });
    },
    markThreadAsRead: async(chatPartner) => {
      const thread = get().chats.find(x => x.chatPartner === chatPartner);
      const unreadMessages = thread.messages.filter(message => {
        if(!message.isRead) return message.id;
      })
      if(unreadMessages.length > 0)
        markMessagesAsRead(unreadMessages);
      //TODO: either re-collect all messages, or setup realtime connection to messages table.
    },
    filterLatestMessageInThreadsBySearchTerm(searchTerm) {
      const threads = get().latestMessageInThreads;
      const filteredChats = searchTerm
      ? threads.filter((thread) =>
          thread.message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
          thread.message.receiver.toLowerCase().includes(searchTerm.toLowerCase()) ||
          thread.message.text.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : threads;
      return filteredChats;
    },
    fetchPotentialChatPartners: async () => {
      let chatPartners = await fetchPotentialChatPartners();
      set({chatPartners});
    },
    fetchChatPartnerProfile: (chatPartnerID) => {
      // if(!get().chatPartners) await get().fetchPotentialChatPartners();
      let partner = get().chatPartners.find(x => x.userId == chatPartnerID);
      if(partner)
        return partner;
      throw new Error("No partner with id: "+chatPartnerID);
    },
    //sender = chatpartner
    //reciever = viewing user
    doGetMessagesForThread: async (chatPartnerId, currentUserId) => {
      await get().fetchAllMessagesAndStoreAsChats(currentUserId);
      const thread = get().chats.find(x => x.chatPartner === chatPartnerId);
      return thread;
    },
    countUnreadMessagesForThread: (chatPartner) => {
      const thread = get().chats.find(x => x.chatPartner === chatPartner);
      return thread.messages.filter(x => x.isRead === false).length;
    },
    handleSendMessage: async (sender_id, receiver_id, messageContent) => {
      try {
        if (!receiver_id){
          return "Receiver is null";
        }
        if (!messageContent){
          return "Message is null";
        }
        if (!sender_id){
          return "Sender is null";
        }

        const { imageFile } = get();
        console.log("hello from handle send message");
        let result = await sendMessage(receiver_id, sender_id, messageContent, imageFile);
        set({ imageFile: null }); // Reset the image file state after sending
        return result;
      }
      catch (error) {
        console.error('Error while sending message:', error);
        return `Failed to send message: ${error.message}`;
      }
    },
    setImageFile: (file) => {
      set({ imageFile: file });
    },
}));

function AddMessageToThread(chatPartner, message, distinctChats) {
  const idx = distinctChats.findIndex(distinctChat => distinctChat.chatPartner === chatPartner);
  if(idx === -1)
    distinctChats.push({chatPartner:chatPartner, messages:[message]});
  else 
    distinctChats[idx].messages.push(message);
}