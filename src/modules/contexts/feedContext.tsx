import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { log } from "../../sdkFunctions";

type childrenType = {
  children: any;
};

const FeedContextProvider: React.FC<childrenType> = ({
  children,
}: childrenType) => {
  const [homeFeed, setHomeFeed] = useState<Array<any>>([]);
  const [allFeed, setAllFeed] = useState<Array<any>>([]);
  const [modeCounter, setModeCounter] = useState(0);
  const { mode } = useParams();
  useEffect(() => {
    setHomeFeed([]);
    setAllFeed([]);
    setModeCounter(0);
  }, [mode]);
  useEffect(() => {
    log(homeFeed.length + " " + allFeed.length + " " + modeCounter);
    if (homeFeed.length == 0 && allFeed.length == 0) {
      setModeCounter(1);
    }
  }, [homeFeed, allFeed]);
  return (
    <FeedContext.Provider
      value={{
        homeFeed,
        allFeed,
        setHomeFeed,
        setAllFeed,
      }}
    >
      {modeCounter == 1 ? children : null}
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
