import { create } from 'zustand';
import { fetchDockNumbers, sendMessage, uploadImage } from '../parse/parseHelper';

const useNewMessageStore = create((set,get) => ({
  dockNumbers: [],
  dockNumberToUserIdMapping: {},
  imageFile: null,

  // Fetching dock numbers
  fetchAndSetDockNumbers: async (currentUserId) => {
    try {
      const { docks, dockToUserId } = await fetchDockNumbers(currentUserId);
      set({ dockNumbers: docks, dockNumberToUserIdMapping: dockToUserId });
    } catch (error) {
      console.error('Error fetching dock numbers:', error);
    }
  },

  // Handle sending message
  handleSendMessage: async (selectedDock, messageContent, user) => {
    try {
      if (!selectedDock || !messageContent) {
        return("Ensure a dock number has been selected or enter a message");
      }
    
      const receiverId = get().dockNumberToUserIdMapping[selectedDock];
      if (!receiverId) {
        return("Invalid dock number selected");
      }

      let ImageObject;
      const { imageFile } = get();

      if (imageFile && imageFile.file) {
        ImageObject = await uploadImage(imageFile.file);
      }

      await sendMessage(receiverId, user.id, messageContent, ImageObject);

      set({ imageFile: null }); // Reset the image file state after sending
    } catch (error) {
      console.error('Error while sending message:', error);
      return(`Failed to send message: ${error.message}`);
    }
  },

  handleSendMessage_Lena: async (sender_id, receiver_id, messageContent) => {
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

      let ImageObject;
      const { imageFile } = get();

      if (imageFile && imageFile.file) {
        ImageObject = await uploadImage(imageFile.file);
      }
      let result = await sendMessage(receiver_id, sender_id, messageContent, ImageObject);
      set({ imageFile: null }); // Reset the image file state after sending
      return result;
    }
    catch (error) {
      console.error('Error while sending message:', error);
      return `Failed to send message: ${error.message}`;
    }
  },

  // Handle image file changes
  setImageFile: (file) => {
    set({ imageFile: file });
  },
}));

export default useNewMessageStore;
