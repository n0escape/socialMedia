import { Dispatch } from "redux";
import { usersAPI } from "api/usersAPI";
import { usersType } from "../types/types";
import { updateObjectInArray } from "../utils/helpers/objectHelpers";
import { InferActionTypes, appStateType } from "./storeRedux";
import { ThunkAction } from "redux-thunk";
import { actionTypes } from "redux-form";

let initialState = {
	users: [ ] as Array<usersType>,
	pageSize: 100 as number,				//количество людей на странице
	totalUsersCount: 20 as number,	// заглушка, на общее количество человек
	currentPage: 1 as number,
	isFetching: true as boolean,
	followingProcess: [ ] as Array<number> //массив users ids
}

export type initialStateType = typeof initialState

const usersReducer = (state = initialState, action: actionTypes): initialStateType => {
	switch (action.type){
		case 'FOLLOW': 
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, "id", {followed: true} )
			}
		case 'UNFOLLOW': 
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, "id", {followed: false} )
			}
		case 'SET_USERS':
			return { ...state, users: action.users }
		case 'SET_CURRENT_USERS_PAGE':
			return { ...state, currentPage: action.currentPage }
		case 'SET_TOTAL_USERS_COUNT':
				return { ...state, totalUsersCount: action.totalUsersCount }
		case 'TOGGLE_IS_FETCHING':
			return { ...state, isFetching: action.isFetching }
		case 'TOGGLE_IS_FOLLOWING_PROCESS':
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

type actionTypes = InferActionTypes<typeof antions>

//actions creators
export const antions = {
	setCurrentUsersPage: (currentPage: number) => ({ type: 'SET_CURRENT_USERS_PAGE', currentPage } as const),
	followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),
	setUsers: (users: Array<usersType>) => ({ type: 'SET_USERS', users } as const),
	unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
	setTotalUsersCount: (totalUsersCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', totalUsersCount } as const),
	toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
	toggleIsFollowingProcess: (followingProcess: boolean, userId: number) => ({ type: 'TOGGLE_IS_FOLLOWING_PROCESS', followingProcess, userId } as const)
}

//thunks (creators)
type dispatchType = Dispatch<actionTypes>
type getStateType = () => appStateType
type thunkType = ThunkAction<Promise<void>, appStateType, unknown, actionTypes>

export const getUsers = (currentPage: number, pageSize: number): thunkType => async (dispatch, getState) => {
	dispatch (antions.toggleIsFetching(true));
	dispatch(antions.setCurrentUsersPage(currentPage));
	let data = await usersAPI.getUsers(currentPage, pageSize)
	dispatch (antions.toggleIsFetching(false));
	dispatch (antions.setUsers(data.items));
	dispatch (antions.setTotalUsersCount(data.totalCount))
}

const followUnfollowFlow = async (
	dispatch: dispatchType, 
	apiMethod: any, 
	actionCreator: (userId: number) => actionTypes, 
	userId: number
) => {
	dispatch (antions.toggleIsFollowingProcess(true, userId));
	let resultCode = await apiMethod(userId)
	if(resultCode === 0) {
		dispatch (actionCreator(userId))
	}
	dispatch (antions.toggleIsFollowingProcess(false, userId))
}

export const unfollow = (userId: number): thunkType => async (dispatch) => {
	followUnfollowFlow(dispatch, usersAPI.unfollowUser.bind(usersAPI), antions.unfollowSuccess, userId)
}
export const follow = (userId: number): thunkType => async (dispatch) => {
	followUnfollowFlow(dispatch, usersAPI.followUser.bind(usersAPI), antions.followSuccess, userId)
}

export default usersReducer;