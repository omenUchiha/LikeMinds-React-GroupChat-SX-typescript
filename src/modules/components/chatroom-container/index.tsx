import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getConversationsForGroup, log } from "../../../sdkFunctions";
import ChatroomContext from "../../contexts/chatroomContext";
import Input from "../input-box";
import { DateSpecifier } from "../message-boxes-components";
import MessageBlock from "../message-boxes-components/MessageBlock";
import { useFirebaseChatConversations } from "../../hooks/firebase";
import BufferStack from "../buffer-stack";
import { GeneralContext } from "../../contexts/generalContext";

const ChatContainer: React.FC = () => {
  const { id = "" } = useParams();
  const chatroomContext = useContext(ChatroomContext);
  const [loadMoreConversations, setLoadMoreConversations] = useState(true);
  const [bufferMessage, setBufferMessage] = useState(null);
  const ref = useRef(null);
  const scrollTop = useRef<HTMLDivElement>(null);
  const generalContext = useContext(GeneralContext);
  // Update height
  const updateHeight = () => {
    const el = document.getElementById("chat");
    if (el != null) {
      if (chatroomContext.conversationList.length <= 55) {
        el.scrollTop = el.scrollHeight;
        sessionStorage.setItem(
          "currentContainerSize",
          el.scrollHeight.toString()
        );
      } else {
        let newScrollHeight = el.scrollHeight;
        let oldHeight = sessionStorage.getItem("currentContainerSize");
        let newHeightToSet = newScrollHeight - parseInt(oldHeight!);
        el.scrollTop = newHeightToSet;
        sessionStorage.setItem(
          "currentContainerSize",
          el.scrollHeight.toString()
        );
      }
    }
  };

  const setNewHeight = () => {
    const el = document.getElementById("chat");
    if (el != null) {
      el.scrollTop = el.scrollHeight;
      sessionStorage.setItem(
        "currentContainerSize",
        el.scrollHeight.toString()
      );
    }
  };

  // get chatroom conversations
  const getChatroomConversations = async (chatroomId: string, pageNo: any) => {
    let optionObject = {
      chatroomID: chatroomId,
      page: pageNo,
    };
    let response: any = await getConversationsForGroup(optionObject);
    if (!response.error) {
      let conversations = response.data;
      sessionStorage.setItem("dmLastConvo", conversations[0].id);
      chatroomContext.setConversationList(conversations);
    } else {
      log(response.errorMessage);
    }
  };

  // paginate chatroom conversation
  const paginateChatroomConversations = async (
    chatroomId: any,
    pageNo: any
  ) => {
    let optionObject = {
      chatroomID: chatroomId,
      page: pageNo,
      conversation_id: sessionStorage.getItem("dmLastConvo"),
      scroll_direction: 0,
    };
    let response: any = await getConversationsForGroup(optionObject);
    if (!response.error) {
      let conversations = response.data;
      if (conversations.length < 50) {
        setLoadMoreConversations(false);
      } else {
        setLoadMoreConversations(true);
      }
      let newConversationArray = [];
      sessionStorage.setItem("dmLastConvo", conversations[0].id);

      newConversationArray = [
        ...conversations,
        ...chatroomContext.conversationList,
      ];
      chatroomContext.setConversationList(newConversationArray);
      return true;
    } else {
      log(response.errorMessage);
      return false;
    }
  };

  useEffect(() => {
    getChatroomConversations(id, 100);
  }, [id]);

  useEffect(() => {
    updateHeight();
    generalContext.setShowLoadingBar(false);
  }, [chatroomContext.conversationList]);
  useEffect(() => {
    setNewHeight();
  }, [generalContext.currentChatroom.id]);
  // firebase listener
  useFirebaseChatConversations(getChatroomConversations, setBufferMessage);
  return (
    <>
      <div
        id="chat"
        className="relative overflow-x-hidden overflow-auto flex-[1]
        "
        // style={{ height: "calc(100vh - 270px)" }}
        ref={scrollTop}
        onScroll={() => {
          if (!!!loadMoreConversations) {
            return;
          }
          let node = scrollTop.current!;
          let current = node.scrollTop;
          let currentHeight = scrollTop?.current?.scrollHeight;
          currentHeight = currentHeight;
          if (current < 200 && current % 150 == 0) {
            paginateChatroomConversations(id, 50);
          }
        }}
      >
        {chatroomContext.conversationList.map(
          (convo: any, index: any, convoArr: any) => {
            let lastConvoDate;
            if (index === 0) {
              lastConvoDate = "";
            } else {
              lastConvoDate = convoArr[index - 1].date;
            }
            return (
              <div
                className="ml-[28px] mr-[114px] pt-5 z:max-md:mr-[28px] z:max-sm:ml-2  z:max-sm:mr-0"
                key={convo.id}
              >
                {convo.date != lastConvoDate ? (
                  <DateSpecifier
                    dateString={convo.date}
                    // key={convo.id + index}
                  />
                ) : null}
                <MessageBlock
                  userId={convo.member.id}
                  conversationObject={convo}
                />
              </div>
            );
          }
        )}
        {!!bufferMessage ? (
          <BufferStack
            bufferMessage={bufferMessage}
            updateHeight={updateHeight}
          />
        ) : null}
      </div>
      <Input setBufferMessage={setBufferMessage} />
    </>
  );
};
export default ChatContainer;
