import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import ChatContainer from ".";
import ChatroomContext from "../../contexts/chatroomContext";
import { GeneralContext } from "../../contexts/generalContext";
import Tittle from "../chatroom-title";
import SelectChatroom from "../select-chatroom";
import { CircularProgress } from "@mui/material";

const ChatroomWrapper: React.FC = () => {
  const [conversationList, setConversationList] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState({});
  const [isSelectedConversation, setIsSelectedConversation] = useState(false);

  const generalContext = useContext(GeneralContext);
  const { operation = "" } = useParams();

  return (
    <ChatroomContext.Provider
      value={{
        conversationList,
        setConversationList,
        selectedConversation,
        setSelectedConversation,
        isSelectedConversation,
        setIsSelectedConversation,
      }}
    >
      {operation != "" ? (
        <Tittle
          title={generalContext?.currentChatroom?.header}
          memberCount={generalContext.currentProfile.participant_count}
        />
      ) : null}
      {getChatroomComponents(operation)}
    </ChatroomContext.Provider>
  );
};

const getChatroomComponents = (operation: string) => {
  switch (operation) {
    case "/":
      return <SelectChatroom />;
    case "main":
      return <ChatContainer />;
    // case 'profile': return <ProfileInfo/>
    // case 'invitation': return <InvitationScreen/>
    default:
      return <SelectChatroom />;
  }
};

export default ChatroomWrapper;
