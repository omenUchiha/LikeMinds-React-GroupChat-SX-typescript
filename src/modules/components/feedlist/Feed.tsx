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
  fetchActiveHomeFeeds,
  loadGroupFeed,
  invitationResponse,
} from "../../hooks/fetchfeed";
import GroupAllFeedTile from "../feed-tiles/groupAllFeedTile";
import { GroupHomeTile } from "../feed-tiles/groupHomeTile";
import DmTile from "../feed-tiles/dmHomefeedTile";
import DmMemberTile from "../feed-tiles/DmAllMemberTiles";
import Searchbar from "../feed-search-bar";
import GroupInviteTile from "../feed-tiles/invitationTiles";

const Feeds: React.FC = () => {
  const [loadMoreHomeFeed, setLoadMoreHomeFeed] = useState<boolean>(true);
  const [loadMoreAllFeed, setLoadMoreAllFeed] = useState<boolean>(true);
  const { mode, id } = useParams();
  const feedContext = useContext(FeedContext);
  const { homeFeed, setHomeFeed, allFeed, setAllFeed } = feedContext;
  const generalContext = useContext(GeneralContext);
  const routeContext = useContext(RouteContext);
  useFetchFeed(
    setLoadMoreHomeFeed,
    setLoadMoreAllFeed,
    loadMoreHomeFeed,
    loadMoreAllFeed
  );

  function getFeed() {
    switch (mode) {
      case "groups": {
        return (
          <GroupFeedContainer
            loadMoreHome={loadMoreHomeFeed}
            loadMoreAll={loadMoreAllFeed}
            setShouldLoadMoreHome={setLoadMoreHomeFeed}
            setShouldLoadMoreAll={setLoadMoreAllFeed}
          />
        );
      }
      case "direct-messages": {
        return (
          <DirectMessagesFeedContainer
            loadMoreHome={loadMoreHomeFeed}
            loadMoreAll={loadMoreAllFeed}
            setShouldLoadMoreHome={setLoadMoreHomeFeed}
            setShouldLoadMoreAll={setLoadMoreAllFeed}
          />
        );
      }
    }
  }

  return (
    <>
      <Searchbar />
      {/* <div
        id="home-feed-container"
        className="min-h-[350px] max-h-[400px] overflow-auto border-b border-solid border-[#EEEEEE]"
      >
        <InfiniteScroll
          hasMore={loadMoreHomeFeed}
          next={() => {
            if (mode == "groups") {
              fetchActiveGroupFeeds({
                setShouldLoadMore: setLoadMoreHomeFeed,
                currentFeedList: homeFeed,
                setFeedList: setHomeFeed,
              });
            } else {
              fetchActiveHomeFeeds({
                setShouldLoadMore: setLoadMoreHomeFeed,
                currentFeedList: homeFeed,
                setFeedList: setHomeFeed,
              });
            }
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
                    if (id != group.chatroom.id) {
                      generalContext.setShowLoadingBar(true);
                    }
                    routeContext.setIsNavigationBoxOpen(
                      !routeContext.isNavigationBoxOpen
                    );
                  }}
                  key={group.chatroom.id + groupIndex + group.chatroom.header}
                >
                  <GroupHomeTile
                    key={group.chatroom.id + groupIndex}
                    groupTitle={group.chatroom.header}
                    chatroomId={group.chatroom.id}
                    isSecret={group.chatroom.is_secret}
                    unseenConversationCount={group.unseen_conversation_count}
                  />
                </Link>
              );
            } else {
              return <DmTile profile={group} />;
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
            if (mode == "groups") {
              return (
                <GroupAllFeedTile
                  groupTitle={group.header}
                  chatroomId={group.id}
                  followStatus={group.follow_status}
                  key={group.title + groupIndex}
                />
              );
            } else {
              return <DmMemberTile profile={group} />;
            }
          })}
        </InfiniteScroll>
      </div> */}
      {getFeed()}
    </>
  );
};

export default Feeds;

function GroupFeedContainer({
  loadMoreHome,
  loadMoreAll,
  setShouldLoadMoreHome,
  setShouldLoadMoreAll,
}: any) {
  const { mode, id = "" } = useParams();
  const feedContext = useContext(FeedContext);
  const generalContext = useContext(GeneralContext);
  const routeContext = useContext(RouteContext);
  const {
    secretChatrooms,
    setSecretChatrooms,
    homeFeed,
    setHomeFeed,
    allFeed,
    setAllFeed,
  } = feedContext;
  return (
    <div
      id="home-feed-container"
      className="max-h-[100%] overflow-auto border-b border-solid border-[#EEEEEE]"
    >
      <InfiniteScroll
        hasMore={loadMoreHome || loadMoreAll}
        next={() => {
          loadGroupFeed(
            setSecretChatrooms,
            homeFeed,
            setHomeFeed,
            allFeed,
            setAllFeed,
            loadMoreHome,
            setShouldLoadMoreHome,
            loadMoreAll,
            setShouldLoadMoreAll
          );
        }}
        dataLength={homeFeed.length}
        loader={null}
        scrollableTarget="home-feed-container"
      >
        {secretChatrooms.map((group: any) => {
          return (
            <GroupInviteTile
              title={group.chatroom.header}
              id={group.chatroom.id}
              response={invitationResponse}
            />
          );
        })}
        {homeFeed.map((group: any, groupIndex) => {
          return (
            <Link
              to={groupMainPath + "/" + group?.chatroom?.id}
              onClick={() => {
                if (id != group.chatroom.id) {
                  generalContext.setChatroomUrl(
                    group?.chatroom?.chatroom_image_url!
                  );
                  generalContext.setShowLoadingBar(true);
                }
                routeContext.setIsNavigationBoxOpen(
                  !routeContext.isNavigationBoxOpen
                );
              }}
              key={group.chatroom.id + groupIndex + group.chatroom.header}
            >
              <GroupHomeTile
                key={group.chatroom.id + groupIndex}
                groupTitle={group.chatroom.header}
                chatroomId={group.chatroom.id}
                isSecret={group.chatroom.is_secret}
                unseenConversationCount={group.unseen_conversation_count}
              />
            </Link>
          );
        })}
        <div className="flex justify-between text-[20px] mt-[10px] py-4 px-5 items-center">
          <span>{"All Members"}</span>
        </div>
        {allFeed.map((group: any) => {
          return (
            <GroupAllFeedTile
              groupTitle={group.header}
              chatroomId={group.id}
              followStatus={group.follow_status}
              key={group.id}
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
}

function DirectMessagesFeedContainer({
  loadMoreHome,
  loadMoreAll,
  setShouldLoadMoreHome,
  setShouldLoadMoreAll,
}: any) {
  const { mode, id = "" } = useParams();
  const feedContext = useContext(FeedContext);
  const { homeFeed, setHomeFeed, allFeed, setAllFeed } = feedContext;
  return (
    <>
      <div
        id="home-feed-container"
        className="min-h-[350px] max-h-[400px] overflow-auto border-b border-solid border-[#EEEEEE]"
      >
        <InfiniteScroll
          hasMore={loadMoreHome}
          next={() => {
            fetchActiveHomeFeeds({
              setShouldLoadMore: setShouldLoadMoreHome,
              currentFeedList: homeFeed,
              setFeedList: setHomeFeed,
            });
          }}
          dataLength={homeFeed.length}
          loader={null}
          scrollableTarget="home-feed-container"
        >
          {homeFeed.map((group: any) => {
            return <DmTile profile={group} />;
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
          hasMore={loadMoreAll}
          scrollableTarget="all-feed-container"
          next={() => {
            fetchAllGroupFeeds({
              setShouldLoadMore: setShouldLoadMoreAll,
              currentFeedList: allFeed,
              setFeedList: setAllFeed,
            });
          }}
        >
          {allFeed.map((group: any) => {
            return <DmMemberTile profile={group} />;
          })}
        </InfiniteScroll>
      </div>
    </>
  );
}
