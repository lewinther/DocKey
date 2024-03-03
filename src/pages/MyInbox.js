import { useState, Fragment, useEffect} from "react";
import { useNavigate } from "react-router-dom";

// CSS import
import "../../src/styles.css";


//import stores
import useUserStore from "../stores/UserStore";
import useChatStore from "../stores/ChatStore";

//Components import
import SearchBar from "../components/SearchBar";
import ChatListCardContainer from "../components/ChatListCardContainer";
import NavbarBottom from '../components/NavbarBottom';

export default function MyInbox() {
  const {user, fetchChatPartnerProfile} = useUserStore();
  const {countUnreadMessagesForThread, markThreadAsRead, filterLatestMessageInThreadsBySearchTerm, fetchAllMessagesAndStoreAsChats} = useChatStore();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function updateViewData(){
      await fetchAllMessagesAndStoreAsChats(user.id);
    }
    (async () => {
      await updateViewData();
    })();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleChatClick = async (chatPartnerID) => {
    await markThreadAsRead(chatPartnerID);
    navigate(`/Chat`, { state: { chatPartnerID, userId: user.id } });
  };

  return (
    <Fragment>
      <div className="in-column height-100-percent">
        <h1>Inbox</h1>
        <SearchBar onSearch={handleSearch} />
        <ChatListCardContainer 
          chats={filterLatestMessageInThreadsBySearchTerm(searchTerm.toLowerCase())} 
          compact={false} 
          user={user}
          navigateToChat={handleChatClick}
          countUnreadMessagesForThread={countUnreadMessagesForThread}
          getChatPartnerProfileById={fetchChatPartnerProfile}
        />
        <NavbarBottom activeItem={"Inbox"} />
      </div>
    </Fragment>
  );
}
