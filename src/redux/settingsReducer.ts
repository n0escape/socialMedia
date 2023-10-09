import { userSettingsType } from 'types/types';
import { userSettingsJsonAPI } from 'api/userSettingsJsonAPI';
import { BaseThunkType, InferActionTypes } from './storeRedux';

let initialState = {
	userSettings: {
		components: {
			profile: true,
			dialogs: true,
			users: true,
			settings: true,
			music: true,
			news: true
		},
		language: null,
		themeMode: 'default'
	} as userSettingsType
};

const settingsReducer = (state = initialState, action: actionTypes): initialStateType => {
	switch(action.type){
		case 'sn/settings/INITIALIZING_USER_SETTINGS':
			return {...state, userSettings: action.userSettings}
		
		default: 
			return state;
	}
}

export const actions = {
	intializingUserSettings: (userSettings: userSettingsType) => 
	( { type: 'sn/settings/INITIALIZING_USER_SETTINGS', userSettings } as const )
}


export const getUserSettingsJSON = (userId: number | null): thunkTypes => async (dispatch) => {
	let data = await userSettingsJsonAPI.getUserSettingsJSON(userId);
	dispatch(actions.intializingUserSettings(data))
}
export const updateUserLanguageSettingJSON = (userId: number, language: string): thunkTypes => async (dispatch) => {
	await userSettingsJsonAPI.updateUserLanguageSettingJSON(userId, language);
	dispatch(getUserSettingsJSON(userId))
}
export const updateUserComponentsSettingJSON = (userId: number, userSettings: userSettingsType): thunkTypes => async (dispatch) => {
	await userSettingsJsonAPI.updateUserComponentsSettingJSON(userId, userSettings);
	dispatch(getUserSettingsJSON(userId))
}

export default settingsReducer;


export type initialStateType = typeof initialState;
export type actionTypes = InferActionTypes<typeof actions>
type thunkTypes = BaseThunkType<actionTypes>