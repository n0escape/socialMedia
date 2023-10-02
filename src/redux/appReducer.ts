import { getAuthProfileData } from "./authReducer.ts";
import { getUserSettingsJSON } from "./settingsReducer.ts";

const INITIALIZING_SUCCESSED = 'INITIALIZING_SUCCESSED';

export type initialStateType = {
	initialized: boolean
};
let initialState: initialStateType = {
	initialized: false
};

const appReducer = (state = initialState, action: any): initialStateType => {
	switch (action.type){
		case INITIALIZING_SUCCESSED: {
			return { ...state, initialized: true }
		}
		
		default:
			return state;
		}
}

type initializingSuccessedActionType = {
	type: typeof INITIALIZING_SUCCESSED
}

//action creators
export const initializingSuccessed = (): initializingSuccessedActionType => ( { type: INITIALIZING_SUCCESSED })


//thunk creators
export const initializeApp = () => async (dispatch: any) => {
	let userSettings
	let authData = dispatch(getAuthProfileData()).then((response: any) => {
		if (response.resultCode !== 1){
			userSettings = dispatch(getUserSettingsJSON(response.data.id))
		}
	}
	)
	// promise.push(dispatch(getUserSettingsJSON()))
	await Promise.all([authData, userSettings])
	dispatch(initializingSuccessed())
}


export default appReducer;