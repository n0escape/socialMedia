import { FormAction } from 'redux-form';
import { BaseThunkType, InferActionTypes } from './storeRedux';
import { globalChatAPI, messageType } from 'api/globalChatAPI';
import { Dispatch } from 'redux';

let initialState = {
	messages: [] as messageType[]
};

const globalChatReducer = (state = initialState, action: actionTypes): initialStateType => {
	switch (action.type){
		case 'sn/globalChat/MESSAGES_RECEIVED': 
			return { ...state, messages: [...state.messages, ...action.payload.messages] }
		case 'sn/globalChat/CLEANING_MESSAGES': 
			return { ...state, messages: [] }
		default: return state;
		}
}

//action creators
export const actions = {
	messagesReceived: (messages: messageType[]) => ( { type: 'sn/globalChat/MESSAGES_RECEIVED', payload: {messages} } as const ),
	cleaningMessages: () => ( { type: 'sn/globalChat/CLEANING_MESSAGES' } as const ),
}

//thunk creators
let _newMessageHandler: ((messages: messageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
	if(_newMessageHandler === null){
		_newMessageHandler = (messages: messageType[]) => {
			dispatch(actions.messagesReceived(messages))
		}
	}
	return _newMessageHandler
}

export const startMessagesListening = (): thunkType => async (dispatch) => {
	globalChatAPI.start()
	globalChatAPI.subscribe( newMessageHandlerCreator(dispatch) )
}
export const stopMessagesListening = (): thunkType => async (dispatch) => {
	dispatch(actions.cleaningMessages())
	globalChatAPI.unsubscribe( newMessageHandlerCreator(dispatch) )
	globalChatAPI.stop()
}
export const sendMessage = (message: string): thunkType => async (dispatch) => {
	globalChatAPI.sendMessage(message)
}


export default globalChatReducer;

export type initialStateType = typeof initialState;
export type actionTypes = InferActionTypes<typeof actions>
type thunkType = BaseThunkType<actionTypes | FormAction>
