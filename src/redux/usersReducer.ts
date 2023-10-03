import { usersAPI } from "../api/api";
import { usersType } from "../types/types";
import { updateObjectInArray } from "../utils/helpers/objectHelpers";

const FOLLOW = 'socialNetwork/users/FOLLOW',
			UNFOLLOW = 'socialNetwork/users/UNFOLLOW',
			SET_USERS = 'socialNetwork/users/SET_USERS',
			SET_CURRENT_USERS_PAGE = 'socialNetwork/users/SET_CURRENT_USERS_PAGE',
			SET_TOTAL_USERS_COUNT = 'socialNetwork/users/SET_TOTAL_USERS_COUNT',
			TOGGLE_IS_FETCHING = 'socialNetwork/users/TOGGLE_IS_FETCHING',
			TOGGLE_IS_FOLLOWING_PROCESS = 'socialNetwork/users/TOGGLE_IS_FOLLOWING_PROCESS';

let initialState = {
	users: [ ] as Array<usersType>,
	pageSize: 100 as number,				//количество людей на странице
	totalUsersCount: 20 as number,	// заглушка, на общее количество человек
	currentPage: 1 as number,
	isFetching: true as boolean,
	followingProcess: [ ] as Array<number> //массив users ids
}

export type initialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): initialStateType => {
	switch (action.type){
		case FOLLOW: 
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, "id", {followed: true} )
			}

		case UNFOLLOW: 
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, "id", {followed: false} )
			}

		case SET_USERS:
			return { ...state, users: action.users }

		case SET_CURRENT_USERS_PAGE:
			return { ...state, currentPage: action.currentPage }
		
		case SET_TOTAL_USERS_COUNT:
				return { ...state, totalUsersCount: action.totalUsersCount }

		case TOGGLE_IS_FETCHING:
			return { ...state, isFetching: action.isFetching }
			
		case TOGGLE_IS_FOLLOWING_PROCESS:
			return {
				...state,
				followingProcess: action.followingProcess 
					? [...state.followingProcess, action.userId] //кнопка нажата и записываем айди и блокируем кнопку
					: state.followingProcess.filter( id => id !== action.userId ) //подписка(отписка) произошла и удаляем элемент массива по айди
			}
		default:
			return state;
		}
}

//actions creators
type followSuccessType = { type: typeof FOLLOW, userId: number }
export const followSuccess = (userId: number): followSuccessType => ({ type: FOLLOW, userId })
type unfollowSuccessType = { type: typeof UNFOLLOW, userId: number }
export const unfollowSuccess = (userId: number): unfollowSuccessType => ({ type: UNFOLLOW, userId })
type setUsersType = { type: typeof SET_USERS, users: Array<usersType> }
export const setUsers = (users: Array<usersType>): setUsersType => ({ type: SET_USERS, users })
type setCurrentUsersPageType = { type: typeof SET_CURRENT_USERS_PAGE, currentPage: number }
export const setCurrentUsersPage = (currentPage: number): setCurrentUsersPageType => ({ type: SET_CURRENT_USERS_PAGE, currentPage })
type setTotalUsersCountType = { type: typeof SET_TOTAL_USERS_COUNT, totalUsersCount: number }
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountType => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount })
type toggleIsFetchingType = { type: typeof TOGGLE_IS_FETCHING, isFetching: boolean }
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingType => ({ type: TOGGLE_IS_FETCHING, isFetching })
type toggleIsFollowingProcessType = { type: typeof TOGGLE_IS_FOLLOWING_PROCESS, followingProcess: boolean, userId: number }
export const toggleIsFollowingProcess = (followingProcess: boolean, userId: number): toggleIsFollowingProcessType => ({ type: TOGGLE_IS_FOLLOWING_PROCESS, followingProcess, userId })

//thunks (creators)
export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: any) => {
	dispatch (toggleIsFetching(true));
	dispatch(setCurrentUsersPage(currentPage));
	let data = await usersAPI.getUsers(currentPage, pageSize)
	dispatch (toggleIsFetching(false));
	dispatch (setUsers(data.items));
	dispatch (setTotalUsersCount(data.totalCount))
}

const followUnfollowFlow = async (dispatch: any, apiMethod: any, actionCreator: any, userId: number	) => {
	dispatch (toggleIsFollowingProcess(true, userId));
	let resultCode = await apiMethod(userId)
	if(resultCode === 0) {
		dispatch (actionCreator(userId))
	}
	dispatch (toggleIsFollowingProcess(false, userId))
}

export const unfollow = (userId: number) => async (dispatch: any) => {
	followUnfollowFlow(dispatch, usersAPI.unfollowUser.bind(usersAPI), unfollowSuccess, userId)
}
export const follow = (userId: number) => async (dispatch: any) => {
	followUnfollowFlow(dispatch, usersAPI.followUser.bind(usersAPI), followSuccess, userId)
}

export default usersReducer;