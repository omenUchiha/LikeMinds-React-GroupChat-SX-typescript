import { Box } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { groupInfoPath } from "../../../routes";
import Gap from "../../../styledAccessories/Gap";
import { MoreOptions } from "../../../styledAccessories/MoreOptions";
import SearchBar from "../../../styledAccessories/SearchBar";
import { GeneralContext } from "../../contexts/generalContext";
type propsTitle = {
  title: any;
  memberCount?: any;
};
const Tittle = ({ title, memberCount }: propsTitle) => {
  return (
    <Box className="flex">
      <div className="w-full flex border-b border-b-[#adadad] my-0 mr-[120px] ml-[28px] pt-0 px-0 pb-[10px] shadow-none z:max-md:mr-6">
        <TitleArea title={title} memberCount={memberCount} />
        <Gap />
        <OptionArea />
      </div>
      <Box className="flex" />
    </Box>
  );
};

function TitleArea({ title, memberCount }: propsTitle) {
  return (
    <Box className="text-left">
      {/* For Group Title */}
      <span className="font-semibold text-xl leading-6 cursor-pointer">
        {title ? title : ""}
      </span>

      {/* For Group Members */}
      <div />
      <span className="text-xs font-normal leading-[14.5px] text-[#ADADAD]">
        <Link to={groupInfoPath}>
          {memberCount ? memberCount + " members" : " "}
        </Link>
      </span>
    </Box>
  );
}

function OptionArea() {
  return (
    <Box>
      <SearchBar />
      <MoreOptions />
    </Box>
  );
}

export default Tittle;
