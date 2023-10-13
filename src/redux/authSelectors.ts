// import { createSelector } from 'reselect'
import { appStateType } from './storeRedux'

export const getIsAuth = (state: appStateType) => {
	return state.auth.isAuth
}
export const getLogin = (state: appStateType) => {
	return state.auth.login
}
export const getUserPhoto = (state: appStateType) => {
	return state.auth.userPhoto
}
