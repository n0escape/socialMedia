import { userSettingsType } from "types/types";
import { userSettingsJsonAPI } from "../api/api"

const INITIALIZING_USER_SETTINGS = 'INITIALIZING_USER_SETTINGS'

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
		themeMode: "default"
	} as userSettingsType
};

export type initialStateType = typeof initialState;

const settingsReducer = (state = initialState, action: any): initialStateType => {
	switch(action.type){
		case INITIALIZING_USER_SETTINGS:
			return {...state, userSettings: action.userSettings}
		
		default: 
			return state;
	}
}

export const intializingUserSettings = (userSettings: userSettingsType) => ( { type: INITIALIZING_USER_SETTINGS, userSettings })


export const getUserSettingsJSON = (userId: number) => async (dispatch: any) => {
	let data = await userSettingsJsonAPI.getUserSettingsJSON(userId);
	dispatch(intializingUserSettings(data))
}
export const updateUserLanguageSettingJSON = (userId: number, language: string) => async (dispatch: any) => {
	await userSettingsJsonAPI.updateUserLanguageSettingJSON(userId, language);
	dispatch(getUserSettingsJSON(userId))
}
export const updateUserComponentsSettingJSON = (userId: number, userSettings: userSettingsType) => async (dispatch: any) => {
	await userSettingsJsonAPI.updateUserComponentsSettingJSON(userId, userSettings);
	dispatch(getUserSettingsJSON(userId))
}

export default settingsReducer;