import { FormAction, stopSubmit } from "redux-form";
import {resultCodesEnum, resultCodeForCaptchaEnum, APIResponseType} from "../api/api";
import { securityAPI } from "api/securityAPI";
import { authAPI, getAuthDataType } from "api/authAPI";
import { profileAPI } from "api/profileAPI";
import { BaseThunkType, InferActionTypes } from "./storeRedux";

let initialState = {
	userId: null as number | null,
	login: null as string | null,
	email: null as string | null,
	isAuth: false as boolean,
	userPhoto: null as string | null,
	captchaUrl: null as string | null,
};

const authReducer = (state = initialState, action: actionTypes): initialStateType => {
	switch (action.type){
		case 'sn/auth/SET_AUTH_DATA': 
			return { ...state, ...action.data }
		
		case 'sn/auth/SET_USER_PHOTO': 
			return { ...state, userPhoto: action.userPhoto }
		
		case 'sn/auth/SET_CAPTCHA_URL': 
			return { ...state, captchaUrl: action.url }
		
		default: return state;
		}
}

//action creators
export const actions = {
	setAuthData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => 
	( { type: 'sn/auth/SET_AUTH_DATA', data: {userId, login, email, isAuth} } as const ),
	setUserPhotoAuth: (userPhoto: string | null) => ( { type: 'sn/auth/SET_USER_PHOTO', userPhoto } as const ),
	setCaptchaUrl: (url: string) => ({ type: 'sn/auth/SET_CAPTCHA_URL', url } as const )
}

//thunk creators
export const getAuthProfileData = (): getAuthProfileDataThunkType => async (dispatch) => {
	let authData = await authAPI.getAuthData()
	if (authData.resultCode === resultCodesEnum.Success) {
		let {id, email, login} = authData.data;
		dispatch (actions.setAuthData(id, email, login, true));

		let profileData = await profileAPI.getUserProfile(id)
		dispatch (actions.setUserPhotoAuth(profileData.photos.small));
	}
	 return authData //баг с возвращаемым значением
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): thunkType => 
async (dispatch) => {
	let data = await authAPI.login(email, password, rememberMe, captcha)
	if (data.resultCode === resultCodesEnum.Success) {
		dispatch(getAuthProfileData())
	} else {
		if (data.resultCode === resultCodeForCaptchaEnum.CaptchaIsRequired) {
			dispatch(getCaptchaUrl())
		}
		let message = data.messages.length > 0 ? data.messages[0] : "Some error"
		dispatch(stopSubmit("login", {_error: message}))
	}
}
export const getCaptchaUrl = (): thunkType => async (dispatch) => {
	let data = await securityAPI.getCaptchaUrl()
	dispatch(actions.setCaptchaUrl(data.url))
}
export const logout = (): thunkType => async (dispatch) => {
	let data = await authAPI.logout()
	if (data.resultCode === 0) dispatch(actions.setAuthData(null, null, null, false))
}

export default authReducer;

export type initialStateType = typeof initialState;
export type actionTypes = InferActionTypes<typeof actions>
type thunkType = BaseThunkType<actionTypes | FormAction>
type getAuthProfileDataThunkType = BaseThunkType<actionTypes, APIResponseType<getAuthDataType>>