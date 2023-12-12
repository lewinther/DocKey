import create from 'zustand';
import { fetchDockNumbers, sendMessage, uploadImage } from '../parse/parseHelper';

const useNewMessageStore = create((set,get) => ({
  dockNumbers: [],
  dockNumberToUserIdMapping: {},
  imageFile: null,

  // Fetching dock numbers
  fetchAndSetDockNumbers: async () => {
    try {
      const { docks, dockToUserId } = await fetchDockNumbers();
      set({ dockNumbers: docks, dockNumberToUserIdMapping: dockToUserId });
    } catch (error) {
      console.error('Error fetching dock numbers:', error);
    }
  },

  // Handle sending message
  handleSendMessage: async (selectedDock, messageContent, user) => {
    try {
      if (!selectedDock || !messageContent) {
        alert("Ensure a dock number has been selected or enter a message");
        return;
      }
    
      const receiverId = get().dockNumberToUserIdMapping[selectedDock];
      if (!receiverId) {
        alert("Invalid dock number selected");
        return;
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
      alert(`Failed to send message: ${error.message}`);
    }
  },

  // Handle image file changes
  setImageFile: (file) => {
    set({ imageFile: file });
  },
}));

export default useNewMessageStore;
