import { getAuthProfileData } from './authReducer.ts';
import { getUserSettingsJSON } from './settingsReducer.ts';
import { BaseThunkType, InferActionTypes } from './storeRedux.ts';

let initialState = {
	initialized: false
};

const appReducer = (state = initialState, action: actionTypes): initialStateType => {
	switch (action.type){
		case 'sn/app/INITIALIZING_SUCCESSED': 
			return { ...state, initialized: true }
		
		default:
			return state;
		}
}

//action creators
export const actions = {
	initializingSuccessed: () => ( { type: 'sn/app/INITIALIZING_SUCCESSED' } as const)
}

//thunk creators
export const initializeApp = ():thunkType => async (dispatch) => {
	let userSettings
	let authData = dispatch(getAuthProfileData()).then((response) => {
		if (response.resultCode !== 1){
			userSettings = dispatch(getUserSettingsJSON(response.data.id))
		}
	}
	)
	// promise.push(dispatch(getUserSettingsJSON()))
	await Promise.all([authData, userSettings])
	dispatch(actions.initializingSuccessed())
}

export default appReducer;

export type initialStateType = typeof initialState
export type actionTypes = InferActionTypes<typeof actions>
type thunkType = BaseThunkType<actionTypes>