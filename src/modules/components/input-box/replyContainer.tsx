import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { getString } from "../../../sdkFunctions";

type ReplyBoxType = {
  openReplyBox: boolean;
  memberName: string;
  answer: string;
  setIsSelectedConversation: any;
  setSelectedConversation: any;
};

const ReplyBox: React.FC<ReplyBoxType> = ({
  openReplyBox,
  memberName,
  answer,
  setIsSelectedConversation,
  setSelectedConversation,
}) => {
  return (
    <>
      <div
        className="w-full justify-between shadow-sm overflow-auto bg-white absolute h-[80px] rounded-[5px]"
        style={{
          display: openReplyBox ? "flex" : "none",
          transform: "translate(0, -105%)",
        }}
      >
        <div className="border-l-4 border-l-green-500 px-2 text-[14px]">
          <p className="mb-3 mt-2 text-green-500">{memberName}</p>
          <div>{getString(answer)}</div>
        </div>
        <div>
          <IconButton
            onClick={() => {
              setIsSelectedConversation(false);
              setSelectedConversation({});
            }}
          >
            <Close />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default ReplyBox;
