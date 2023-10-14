import { appStateType } from "./storeRedux";

export const getMessages = (state: appStateType) => {
	return state.globalChat.messages
}