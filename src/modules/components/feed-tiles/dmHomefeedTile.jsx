import { useContext } from "react";
import { useParams } from "react-router-dom";
import { directMessageChatPath } from "../../../routes";
import { RouteContext } from "../../contexts/routeContext";


function DmTile({ profile }) {
    const userContext = useContext(UserContext);
    const {id} = useParams();
    const routeContext = useContext(RouteContext);
    return (
      <Link
        to={directMessageChatPath + "/" + id}
        style={{
          textDecoration: "none",
        }}
        onClick={() => {
          routeContext.setIsNavigationBoxOpen(!routeContext.isNavigationBoxOpen);
        }}
      >
        <div
          className="flex justify-between py-[16px] px-[20px] border-t border-solid border-[#EEEEEE] cursor-pointer"
          style={{
            backgroundColor:
              id === profile?.chatroom?.id.toString()
                ? "#ECF3FF"
                : "#FFFFFF",
          }}
        >
          <Typography
            component={"span"}
            className="text-base font-normal"
            sx={{
              color:
                id === profile?.chatroom?.id.toString()
                  ? "#3884F7"
                  : "#323232",
            }}
          >
            {userContext.currentUser.id === profile.chatroom.member.id
              ? profile.chatroom.chatroom_with_user.name
              : profile.chatroom.member.name}
          </Typography>
  
          <Typography
            component={"span"}
            className="text-sm font-light"
            sx={{
              color:
                profile.unseen_conversation_count != undefined
                  ? profile.unseen_conversation_count > 0
                    ? "#3884F7"
                    : "#323232"
                  : profile.unread_messages != undefined
                  ? profile.unread_messages > 0
                    ? "#3884F7"
                    : "#323232"
                  : "white",
              // display: shouldNotShow ? 'none' : 'inline'
            }}
          >
            {profile.unseen_conversation_count != undefined ? (
              profile.unseen_conversation_count > 0 ? (
                <>{profile.unseen_conversation_count} new messages</>
              ) : null
            ) : profile.unread_messages != undefined ? (
              profile.unread_messages > 0 ? (
                <>{profile.unread_messages} new messages</>
              ) : null
            ) : null}
          </Typography>
        </div>
      </Link>
    );
  }
  