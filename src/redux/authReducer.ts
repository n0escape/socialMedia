import { stopSubmit } from "redux-form";
import {profileAPI, authAPI, securityAPI} from "../api/api";

const SET_AUTH_DATA = 'socialNetwork/auth/SET_AUTH_DATA',
			SET_USER_PHOTO = 'socialNetwork/auth/SET_USER_PHOTO',
			SET_CAPTCHA_URL = 'socialNetwork/auth/SET_CAPTCHA_URL';

let initialState = {
	userId: null as number | null,
	login: null as string | null,
	email: null as string | null,
	isAuth: false as boolean,
	userPhoto: null as string | null,
	captchaUrl: null as string | null,
};

export type initialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): initialStateType => {
	switch (action.type){
		case SET_AUTH_DATA: {
			return { ...state, ...action.data }
		}
		case SET_USER_PHOTO: {
			return { ...state, userPhoto: action.userPhoto }
		}
		case SET_CAPTCHA_URL: {
			return { ...state, captchaUrl: action.url }
		}
		default: return state;
		}
}

//action creators
type authDataType = {
	userId: number | null,
	login: string | null,
	email: string | null,
	isAuth: boolean
}
type setAuthDataActionType = {
	type: typeof SET_AUTH_DATA,
	data: authDataType
}
export const setAuthData = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): setAuthDataActionType => {
	return ({ type: SET_AUTH_DATA, data: {userId, login, email, isAuth} })
};
type setUserPhotoAuthActionType = {
	type: typeof SET_USER_PHOTO,
	userPhoto: string
}
export const setUserPhotoAuth = (userPhoto: string): setUserPhotoAuthActionType => {
	return ({ type: SET_USER_PHOTO, userPhoto })
};
type setCaptchaUrlActionType = {
	type: typeof SET_CAPTCHA_URL,
	url: string
}
export const setCaptchaUrl = (url: string): setCaptchaUrlActionType => {
	return ({ type: SET_CAPTCHA_URL, url })
};

//thunk creators
export const getAuthProfileData = () => async (dispatch: any) => {
	let authData = await authAPI.getAuthData()
	if (authData.resultCode === 0) {
		let {id, login, email} = authData.data;
		dispatch (setAuthData(id, login, email, true));

		let profileData = await profileAPI.getUserProfile(id)
		dispatch (setUserPhotoAuth(profileData.photos.small));
	}
	return authData
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null) => async (dispatch: any) => {
	let data = await authAPI.login(email, password, rememberMe, captcha)
	if (data.resultCode === 0) {
		dispatch(getAuthProfileData())
	} else {
		if (data.resultCode === 10) {
			dispatch(getCaptchaUrl())
		}
		let message = data.messages.length > 0 ? data.messages[0] : "Some error"
		dispatch(stopSubmit("login", {_error: message}))
	}
}
export const getCaptchaUrl = () => async (dispatch: any) => {
	let data = await securityAPI.getCaptchaUrl()
	dispatch(setCaptchaUrl(data.url))
}
export const logout = () => async (dispatch: any) => {
	let data = await authAPI.logout()
	if (data.resultCode === 0) dispatch(setAuthData(null, null, null, false))
}

export default authReducer;