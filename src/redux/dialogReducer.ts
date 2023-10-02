const ADD_MESSAGE = 'socialNetwork/dialog/ADD_MESSAGE'

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
		{id: 1, message: "Hi"},
		{id: 2, message: "Hello"},
		{id: 3, message: "Yo"},
	] as Array<messagesType>
};

export type initialStateType = typeof initialState;

const dialogReducer = (state = initialState, action: any): initialStateType => {
	switch (action.type){
		case ADD_MESSAGE: {
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
type addMessageActionType = {
	type: typeof ADD_MESSAGE,
	newMessageText: string
}
export const addMessageActionCreator = (newMessageText: string): addMessageActionType => {
	return ({ type: ADD_MESSAGE, newMessageText })
};

export default dialogReducer;