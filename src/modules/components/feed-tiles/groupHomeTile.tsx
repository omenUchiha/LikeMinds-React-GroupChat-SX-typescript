import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

type GroupHomeTileProps = {
  groupTitle: any;
  chatroomId: any;
  isSecret: any;
  unseenConversationCount: any;
};
function GroupHomeTile({
  groupTitle,
  chatroomId,
  isSecret,
  unseenConversationCount,
}: GroupHomeTileProps) {
  const { id } = useParams();
  return (
    <div
      className="flex justify-between py-4 px-5 border-[#EEEEEE] border-t-[1px] items-center"
      style={{
        backgroundColor: chatroomId == id ? "#ECF3FF" : "#FFFFFF",
      }}
    >
      <Typography
        sx={{
          color: chatroomId == id ? "#3884f7" : "#000000",
        }}
        component={"span"}
        className="text-4 text-[#323232] leading-[17px]"
      >
        {groupTitle}
        {isSecret === true ? (
          <span className="bg-[#FFEFC6] rounded-[4px] px-[6px] py-[5px] text-[#F6BD2A] line-height-[12px] text-[10px] font-medium m-1">
            Private
          </span>
        ) : null}
      </Typography>

      {unseenConversationCount > 0 && chatroomId !== id ? (
        <span className="text-[#3884f7] text-xs">
          {unseenConversationCount} new messages
        </span>
      ) : null}
    </div>
  );
}
export { GroupHomeTile };
