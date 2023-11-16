import { appStateType } from "./storeRedux";

export const getMessages = (state: appStateType) => {
	return state.globalChat.messages
}
export const getStatus= (state: appStateType) => {
	return state.globalChat.status
}