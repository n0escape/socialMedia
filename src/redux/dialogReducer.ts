import { InferActionTypes } from './storeRedux'

type chatsType = {
	id: number,
	name: string
}
type 	messagesType = {
	id: number,
	message: string
}

let initialState = {
	chats: [
		{id: 1, name: 'Dima'},
		{id: 2, name: 'Darina'},
		{id: 3, name: 'Alina'},
		{id: 4, name: 'Masha'},
		{id: 5, name: 'Artem'},
		{id: 6, name: 'Bogdan'}
	] as Array<chatsType>,
	messages: [
		{id: 1, message: 'Hi'},
		{id: 2, message: 'Hello'},
		{id: 3, message: 'Yo'},
	] as Array<messagesType>
};

const dialogReducer = (state = initialState, action: actionTypes): initialStateType => {
	switch (action.type){
		case 'sn/dialog/ADD_MESSAGE': {
			let newMessage = {
				id: Object.keys(state.messages).length + 1,
				message: action.newMessageText,
			}
			return {
				...state,
				messages: [ ...state.messages, newMessage ]
			}
		}
		default:
			return state;
		}
}

export const actions = {
	addMessage: (newMessageText: string) => ( { type: 'sn/dialog/ADD_MESSAGE', newMessageText } as const )
}

export default dialogReducer;

export type initialStateType = typeof initialState;
export type actionTypes = InferActionTypes<typeof actions>