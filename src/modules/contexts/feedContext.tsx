import React, { createContext, useState } from "react";

type childrenType = {
  children: any;
};

const FeedContextProvider: React.FC<childrenType> = ({
  children,
}: childrenType) => {
  const [homeFeed, setHomeFeed] = useState<Array<any>>([]);
  const [allFeed, setAllFeed] = useState<Array<any>>([]);
  const [currentFeed, setCurrentFeed] = useState<{}>({});

  return (
    <FeedContext.Provider
      value={{
        homeFeed,
        allFeed,
        setHomeFeed,
        setAllFeed,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

type feedContext = {
  homeFeed: Array<{}>;
  allFeed: Array<{}>;
  setHomeFeed: React.Dispatch<Array<{}>> | null;
  setAllFeed: React.Dispatch<Array<{}>> | null;
};

export const FeedContext = React.createContext<feedContext>({
  homeFeed: [],
  allFeed: [],
  setHomeFeed: null,
  setAllFeed: null,
});

export default FeedContextProvider;
