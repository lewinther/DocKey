import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Stores
import useChatStore from "../stores/ChatStore";
import useUserStore from "../stores/UserStore";

// CSS import
import "../../src/styles.css";

// Components
import NewsCardContainer from "../components/NewsCardContainer";
import ChatListCardContainer from "../components/ChatListCardContainer";
import NavbarBottom from '../components/NavbarBottom';

export default function Home() {
  const {user, profile} = useUserStore();
  const {
    countUnreadMessagesForThread, 
    chats, 
    fetchAllMessagesAndStoreAsChats, 
    markThreadAsRead, 
    fetchChatPartnerProfile,
    fetchPotentialChatPartners,
    chatPartners
  } = useChatStore();
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) return;
    async function updateViewData(){
      await fetchAllMessagesAndStoreAsChats(user.id);
      await fetchPotentialChatPartners();
    }
    (async () => {
      await updateViewData();
    })();
  }, [user]);

  const handleChatClick = async (chatPartnerID) => {
    await markThreadAsRead(chatPartnerID);
    navigate(`/Chat`, { state: { chatPartnerID, userId: user.id } });
  };

  if(!chatPartners)
    return (<div></div>);

  return (
    <Fragment>
      <div className="in-column height-100-percent">
        {(user && profile) && (
          <>
          <h1>Welcome, {profile.firstName}! </h1>
          <NewsCardContainer />
          <div className='wrapper'>
            <h3 className='h3-home'> Your Messages </h3>
          </div>
          <ChatListCardContainer 
            chats={chats} 
            compact={true} 
            user={user}
            navigateToChat={handleChatClick}
            countUnreadMessagesForThread={countUnreadMessagesForThread}
            fetchChatPartnerProfile={fetchChatPartnerProfile}  
          />
          <NavbarBottom activeItem={"Home"} />
          </>
        )}
      </div>
    </Fragment>
  );
}

