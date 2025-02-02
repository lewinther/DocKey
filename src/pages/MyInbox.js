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
  const {user} = useUserStore();
  const {
    countUnreadMessagesForThread, 
    markThreadAsRead, 
    filterLatestMessageInThreadsBySearchTerm, 
    fetchAllMessagesAndStoreAsChats, 
    fetchChatPartnerProfile,
    fetchPotentialChatPartners,
    chatPartners
  } = useChatStore();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) return;
    async function updateViewData(){
      await fetchAllMessagesAndStoreAsChats(user.id);
      if(!chatPartners)
        await fetchPotentialChatPartners();
    }
    (async () => {
      await updateViewData();
    })();
  }, [user, chatPartners]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleChatClick = async (chatPartnerID) => {
    await markThreadAsRead(chatPartnerID);
    navigate(`/Chat`, { state: { chatPartnerID, userId: user.id } });
  };

  if(!chatPartners)
    return(<div></div>);

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
          fetchChatPartnerProfile={fetchChatPartnerProfile}
        />
        <NavbarBottom activeItem={"Inbox"} />
      </div>
    </Fragment>
  );
}
