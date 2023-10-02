import { createSelector } from "reselect"
import { appStateType } from "./storeRedux"

const getStateUsers = (state: appStateType) => {
	return state.contentBar.usersPage.users
}

export const getStateUsersReselect = createSelector(getStateUsers, (users) => {
	//логика сложного селектора - сейчас тупо создали массив на основе предыдущего
	//передав поочередно все значения
	return users.filter( u => true )
})

export const getPageSize = (state: appStateType) => {
	return state.contentBar.usersPage.pageSize
}
export const getTotalUsersCount = (state: appStateType) => {
	return state.contentBar.usersPage.totalUsersCount
}
export const getCurrentPage = (state: appStateType) => {
	return state.contentBar.usersPage.currentPage
}
export const getIsFetching = (state: appStateType) => {
	return state.contentBar.usersPage.isFetching
}
export const getFollowingInProcess = (state: appStateType) => {
	return state.contentBar.usersPage.followingProcess
}