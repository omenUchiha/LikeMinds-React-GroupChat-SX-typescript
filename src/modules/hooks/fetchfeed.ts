import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { myClient } from "../..";
import {
  allChatroomMembersDm,
  dmChatFeed,
  getChatRoomDetails,
  log,
} from "../../sdkFunctions";
import { FeedContext } from "../contexts/feedContext";
import { GeneralContext } from "../contexts/generalContext";

type feedArrayContent = {
  header: string;
  list: Array<{}>;
};

export function useFetchFeed(
  shouldLoadMoreHome: React.Dispatch<boolean>,
  setShouldLoadMoreAll: React.Dispatch<boolean>
) {
  const { mode, operation = "", id = "" } = useParams();
  const feedContext = useContext(FeedContext);
  const generalContext = useContext(GeneralContext);
  useEffect(() => {
    async function fetchFeed() {
      try {
        switch (mode) {
          case "groups": {
            fetchActiveGroupFeeds({
              setFeedList: feedContext.setHomeFeed,
              currentFeedList: feedContext.homeFeed,
              setShouldLoadMore: shouldLoadMoreHome,
            });
            fetchAllGroupFeeds({
              setShouldLoadMore: setShouldLoadMoreAll,
              currentFeedList: feedContext.allFeed,
              setFeedList: feedContext.setAllFeed,
            });
            break;
          }
          case "direct-messages": {
            fetchActiveHomeFeeds({
              setFeedList: feedContext.setHomeFeed,
              currentFeedList: feedContext.homeFeed,
              setShouldLoadMore: shouldLoadMoreHome,
            });
            fetchAllDMFeeds({
              setShouldLoadMore: setShouldLoadMoreAll,
              currentFeedList: feedContext.allFeed,
              setFeedList: feedContext.setAllFeed,
            });
          }
        }
      } catch (error) {}
    }
    fetchFeed();
  }, [mode]);

  useEffect(() => {
    async function setFeeds() {
      try {
        const feedcall: any = await getChatRoomDetails(myClient, id);
        log(id);
        generalContext.setCurrentProfile(feedcall.data);
        generalContext.setCurrentChatroom(feedcall.data.chatroom);
        log(feedcall);
      } catch (error) {
        log(error);
      }
    }

    if (id != "") {
      setFeeds();
    }
  }, [id]);
}

//fetches the current feed with secret chatrooms and returns and
type fetchActiveFeedType = {
  setShouldLoadMore: React.Dispatch<boolean> | any;
  setFeedList: React.Dispatch<Array<{}>> | any;
  currentFeedList: Array<{}>;
};

export async function fetchActiveGroupFeeds({
  setShouldLoadMore,
  setFeedList,
  currentFeedList,
}: fetchActiveFeedType) {
  try {
    const currentChatroomLength = currentFeedList.length;
    const pageNo = Math.floor(currentChatroomLength / 10) + 1;
    const call = await myClient.getHomeFeedData({
      communityId: parseInt(sessionStorage.getItem("communityId")!),
      page: pageNo,
    });
    const chatrooms = call.my_chatrooms;
    if (chatrooms.length < 10) {
      setShouldLoadMore(false);
    }
    let newChatrooms = currentFeedList.concat(chatrooms);
    setFeedList(newChatrooms);
    return true;
  } catch (error) {
    log(`error under function fetchActiveGroupFeed: ${error} `);
    return false;
  }
}

//fetches all available feeds with secret chatrooms and returns and
type fetchAllFeedType = {
  setShouldLoadMore: React.Dispatch<boolean>;
  setFeedList: React.Dispatch<Array<{}>> | any;
  currentFeedList: Array<{}>;
};

export async function fetchAllGroupFeeds({
  setShouldLoadMore,
  setFeedList,
  currentFeedList,
}: fetchAllFeedType) {
  try {
    const currentChatroomLength = currentFeedList.length;
    const pageNo = Math.floor(currentChatroomLength / 10) + 1;
    const call = await myClient.fetchFeedData({
      community_id: parseInt(sessionStorage.getItem("communityId")!),
      page: pageNo,
      order_type: 0,
    });
    const chatrooms = call.chatrooms;
    if (chatrooms.length < 10) {
      setShouldLoadMore(false);
    }
    let newChatrooms = currentFeedList.concat(chatrooms);
    setFeedList(newChatrooms);
    return true;
  } catch (error) {
    log(`error under function fetchAllGroupFeed: ${error} `);
    return false;
  }
}

export async function fetchActiveHomeFeeds({
  setShouldLoadMore,
  setFeedList,
  currentFeedList,
}: fetchActiveFeedType) {
  try {
    let pageNo = Math.floor(currentFeedList.length / 10) + 1;
    let call: any = await dmChatFeed(
      sessionStorage.getItem("communityId")!,
      pageNo
    );
    const chatrooms = call.data.dm_chatrooms;
    if (chatrooms.length < 10) {
      setShouldLoadMore(false);
    }
    let newChatrooms = currentFeedList.concat(chatrooms);
    setFeedList(newChatrooms);
  } catch (error) {}
}

export async function fetchAllDMFeeds({
  setShouldLoadMore,

  currentFeedList,
  setFeedList,
}: fetchAllFeedType) {
  try {
    const currentChatroomLength = currentFeedList.length;
    const pageNo = Math.floor(currentChatroomLength / 10) + 1;
    const call: any = await allChatroomMembersDm(
      sessionStorage.getItem("communityId"),
      pageNo
    );
    log(call);
    const chatrooms = call.data.members;
    if (chatrooms.length < 10) {
      setShouldLoadMore(false);
    }
    let newChatrooms = currentFeedList.concat(chatrooms);
    log(`setting new all dm feed ${newChatrooms}`);
    setFeedList(newChatrooms);
    return true;
  } catch (error) {
    log(`error under function fetchAllDmFeed: ${error} `);
    return false;
  }
}

export const markReadChatroom = async (
  chatroomId: any,
  feedList: [],
  setFeedList: any
) => {
  try {
  } catch (error) {}
};
