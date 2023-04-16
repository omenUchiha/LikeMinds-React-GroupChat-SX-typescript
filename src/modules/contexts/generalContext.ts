import { createContext } from "react";

export const GeneralContext = createContext<{
  showSnackBar: any;
  setSnackBarMessage: any;
  snackBarMessage: any;
  setShowSnackBar: any;
  showLoadingBar: any;
  setShowLoadingBar: any;
  currentChatroom: any;
  setCurrentChatroom: any;
  currentProfile: any;
  setCurrentProfile: any;
}>({
  showSnackBar: false,
  setSnackBarMessage: () => {},
  snackBarMessage: "",
  setShowSnackBar: () => {},
  showLoadingBar: false,
  setShowLoadingBar: () => {},
  currentChatroom: {},
  setCurrentChatroom: () => {},
  currentProfile: {},
  setCurrentProfile: null,
});
