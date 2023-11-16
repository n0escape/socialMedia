import { FormAction } from 'redux-form';
import { BaseThunkType, InferActionTypes } from './storeRedux';
import { globalChatAPI, messageAPIType, statusType } from 'api/globalChatAPI';
import { Dispatch } from 'redux';
import { v1 } from 'uuid';

type messageType = messageAPIType & {id: string}

let initialState = {
	messages: [] as messageType[],
	status: 'pending' as statusType
};

const globalChatReducer = (state = initialState, action: actionTypes): initialStateType => {
	switch (action.type){
		case 'sn/globalChat/MESSAGES_RECEIVED': 
			return { ...state, 
				messages: [
					...state.messages, 
					...action.payload.messages
						.map( m => ({...m, id: v1()}))
				]
						.filter((m, index, array) => index >= array.length - 100)
			}
		case 'sn/globalChat/CLEANING_MESSAGES': 
			return { ...state, messages: [] }
			case 'sn/globalChat/STATUS_SHANGED': 
		return { ...state, status: action.payload.status }
		default: return state;
		}
}

//action creators
export const actions = {
	messagesReceived: (messages: messageAPIType[]) => ( { type: 'sn/globalChat/MESSAGES_RECEIVED', payload: {messages} } as const ),
	cleaningMessages: () => ( { type: 'sn/globalChat/CLEANING_MESSAGES' } as const ),
	statusChanged: (status: statusType) => ( { type: 'sn/globalChat/STATUS_SHANGED', payload: {status} } as const ),
}

//thunk creators
let _newMessageHandler: ((messages: messageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
	if(_newMessageHandler === null){ // если сообщений нет - пихаем сообщения из сервера
		_newMessageHandler = (messages) => { // принимаем массив сообщений из сервера
			dispatch(actions.messagesReceived(messages)) // диспатчим экшн с переданными сообщениями
		}
	}
	return _newMessageHandler
}
let _statusChangedHandler: ((status: statusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
	if(_statusChangedHandler === null){ // если сообщений нет - пихаем сообщения из сервера
		_statusChangedHandler = (status) => { // принимаем массив сообщений из сервера
			dispatch(actions.statusChanged(status)) // диспатчим экшн с переданными сообщениями
		}
	}
	return _statusChangedHandler
}

export const startMessagesListening = (): thunkType => async (dispatch) => {
	//старт подключения и отслеживание сообщений
	globalChatAPI.start()
	globalChatAPI.subscribe( 'messagesReceived', newMessageHandlerCreator(dispatch) ) //добавит отслеживание сообщений
	globalChatAPI.subscribe( 'statusChanged', statusChangedHandlerCreator(dispatch) ) //добавит отслеживание сообщений
	// globalChatAPI.subscribe() добавляет отслеживание для разных действий передавая dispatch экшна
	// это нужно для взаимодействия с bll из dal
}
export const stopMessagesListening = (): thunkType => async (dispatch) => {
	
	dispatch(actions.cleaningMessages()) //очистка state
	globalChatAPI.unsubscribe( 'messagesReceived', newMessageHandlerCreator(dispatch) ) //прекращение отслеживания сообщений
	globalChatAPI.unsubscribe( 'statusChanged', statusChangedHandlerCreator(dispatch) ) //прекращение отслеживания сообщений
	globalChatAPI.stop() //отключение канала и последующая зачистка
}
export const sendMessage = (message: string): thunkType => async (dispatch) => {
	globalChatAPI.sendMessage(message) //отправка сообшения на сервер
}


export default globalChatReducer;

export type initialStateType = typeof initialState;
export type actionTypes = InferActionTypes<typeof actions>
type thunkType = BaseThunkType<actionTypes | FormAction>
