import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useParams } from "react-router-dom";
import { groupMainPath } from "../../../routes";
import { log, markRead } from "../../../sdkFunctions";
import { FeedContext } from "../../contexts/feedContext";
import { GeneralContext } from "../../contexts/generalContext";
import { RouteContext } from "../../contexts/routeContext";
import {
  fetchActiveGroupFeeds,
  useFetchFeed,
  fetchAllGroupFeeds,
} from "../../hooks/fetchfeed";
import GroupAllFeedTile from "../feed-tiles/groupAllFeedTile";
import { GroupHomeTile } from "../feed-tiles/groupHomeTile";

const Feeds: React.FC = () => {
  const [loadMoreHomeFeed, setLoadMoreHomeFeed] = useState<boolean>(true);
  const [loadMoreAllFeed, setLoadMoreAllFeed] = useState<boolean>(true);
  const { mode, id } = useParams();
  const feedContext = useContext(FeedContext);
  const { homeFeed, setHomeFeed, allFeed, setAllFeed } = feedContext;
  const generalContext = useContext(GeneralContext);
  const routeContext = useContext(RouteContext);
  useFetchFeed(setLoadMoreHomeFeed, setLoadMoreAllFeed);
  return (
    <>
      <div
        id="home-feed-container"
        className="min-h-[350px] max-h-[400px] overflow-auto border-b border-solid border-[#EEEEEE]"
      >
        <InfiniteScroll
          hasMore={loadMoreHomeFeed}
          next={() => {
            fetchActiveGroupFeeds({
              setShouldLoadMore: setLoadMoreHomeFeed,
              currentFeedList: homeFeed,
              setFeedList: setHomeFeed,
            });
          }}
          dataLength={homeFeed.length}
          loader={null}
          scrollableTarget="home-feed-container"
        >
          {homeFeed.map((group: any, groupIndex) => {
            if (mode == "groups") {
              return (
                <Link
                  to={groupMainPath + "/" + group?.chatroom?.id}
                  onClick={() => {
                    log(group);
                    if (id != group.chatroom.id) {
                      generalContext.setShowLoadingBar(true);
                    } else {
                      markRead(group.chatroom.id);
                    }
                    routeContext.setIsNavigationBoxOpen(
                      !routeContext.isNavigationBoxOpen
                    );
                  }}
                  key={group.chatroom.id + groupIndex + group.chatroom.header}
                >
                  <div>
                    <GroupHomeTile
                      key={group.chatroom.id + groupIndex}
                      groupTitle={group.chatroom.header}
                      chatroomId={group.chatroom.id}
                      isSecret={group.chatroom.is_secret}
                      unseenConversationCount={
                        group.chatroom.unseen_conversation_count
                      }
                    />
                  </div>
                </Link>
              );
            }else{
              
            }
          })}
        </InfiniteScroll>
      </div>
      <div className="flex justify-between text-[20px] mt-[10px] py-4 px-5 items-center">
        <span>{mode === "groups" ? "All Public Groups" : "All Members"}</span>
      </div>
      <div className="max-h-[400px] overflow-auto" id="all-feed-container">
        <InfiniteScroll
          loader={null}
          dataLength={allFeed.length}
          hasMore={loadMoreAllFeed}
          scrollableTarget="all-feed-container"
          next={() => {
            fetchAllGroupFeeds({
              setShouldLoadMore: setLoadMoreAllFeed,
              currentFeedList: allFeed,
              setFeedList: setAllFeed,
            });
          }}
        >
          {allFeed.map((group: any, groupIndex) => {
            return (
              <GroupAllFeedTile
                groupTitle={group.header}
                chatroomId={group.id}
                followStatus={group.follow_status}
                key={group.title + groupIndex}
              />
            );
          })}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Feeds;
