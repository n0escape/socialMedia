import { Dispatch } from 'redux';
import { usersAPI } from 'api/usersAPI';
import { userType } from '../types/types';
import { updateObjectInArray } from '../utils/helpers/objectHelpers';
import { BaseThunkType, InferActionTypes } from './storeRedux';
import { APIResponseType } from 'api/api';

let initialState = {
	users: [ ] as Array<userType>,
	pageSize: 100 as number,				//количество людей на странице
	totalUsersCount: 20 as number,	// заглушка, на общее количество человек
	currentPage: 1 as number,
	isFetching: true as boolean,
	followingProcess: [ ] as Array<number>, //массив users ids
	filter: {
		term: '',
		friend: null as boolean | null
	}
}

const usersReducer = (state = initialState, action: actionTypes): initialStateType => {
	switch (action.type){
		case 'sn/users/FOLLOW': 
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', {followed: true} )
			}
		case 'sn/users/UNFOLLOW': 
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', {followed: false} )
			}
		case 'sn/users/SET_USERS':
			return { ...state, users: action.users }
		case 'sn/users/SET_CURRENT_USERS_PAGE':
			return { ...state, currentPage: action.currentPage }
		case 'sn/users/SET_TOTAL_USERS_COUNT':
				return { ...state, totalUsersCount: action.totalUsersCount }
		case 'sn/users/TOGGLE_IS_FETCHING':
			return { ...state, isFetching: action.isFetching }
		case 'sn/users/TOGGLE_IS_FOLLOWING_PROCESS':
			return {
				...state,
				followingProcess: action.followingProcess 
					? [...state.followingProcess, action.userId] //кнопка нажата и записываем айди и блокируем кнопку
					: state.followingProcess.filter( id => id !== action.userId ) //подписка(отписка) произошла и удаляем элемент массива по айди
			}
		case 'sn/users/SET_FILTER':
			return {...state, filter: action.payload}
		default:
			return state;
		}
}

//actions creators
export const actions = {
	followSuccess: (userId: number) => ({ type: 'sn/users/FOLLOW', userId } as const),
	unfollowSuccess: (userId: number) => ({ type: 'sn/users/UNFOLLOW', userId } as const),
	setUsers: (users: Array<userType>) => ({ type: 'sn/users/SET_USERS', users } as const),
	setCurrentUsersPage: (currentPage: number) => ({ type: 'sn/users/SET_CURRENT_USERS_PAGE', currentPage } as const),
	setFilter: (filter: filterType) => ({ type: 'sn/users/SET_FILTER', payload: filter } as const),
	setTotalUsersCount: (totalUsersCount: number) => ({ type: 'sn/users/SET_TOTAL_USERS_COUNT', totalUsersCount } as const),
	toggleIsFetching: (isFetching: boolean) => ({ type: 'sn/users/TOGGLE_IS_FETCHING', isFetching } as const),
	toggleIsFollowingProcess: (followingProcess: boolean, userId: number) => ({ type: 'sn/users/TOGGLE_IS_FOLLOWING_PROCESS', followingProcess, userId } as const)
}

//thunks (creators)
export const getUsers = (currentPage: number, pageSize: number, filter: filterType): thunkType => async (dispatch, getState) => {
	dispatch (actions.toggleIsFetching(true));
	dispatch(actions.setCurrentUsersPage(currentPage));
	dispatch(actions.setFilter(filter));
	let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
	dispatch (actions.toggleIsFetching(false));
	dispatch (actions.setUsers(data.items));
	dispatch (actions.setTotalUsersCount(data.totalCount))
}

const followUnfollowFlow = async (
	dispatch: dispatchType, 
	apiMethod: (userId: number) => Promise<APIResponseType>, 
	actionCreator: (userId: number) => actionTypes,
	userId: number
) => {
	dispatch (actions.toggleIsFollowingProcess(true, userId));
	let data = await apiMethod(userId)
	if(data.resultCode === 0) {
		dispatch (actionCreator(userId))
	}
	dispatch (actions.toggleIsFollowingProcess(false, userId))
}

export const unfollow = (userId: number): thunkType => async (dispatch) => {
	await followUnfollowFlow(dispatch, usersAPI.unfollowUser.bind(usersAPI), actions.unfollowSuccess, userId)
}
export const follow = (userId: number): thunkType => async (dispatch) => {
	await followUnfollowFlow(dispatch, usersAPI.followUser.bind(usersAPI), actions.followSuccess, userId)
}

export default usersReducer;

export type initialStateType = typeof initialState
export type filterType = typeof initialState.filter
export type actionTypes = InferActionTypes<typeof actions>
type dispatchType = Dispatch<actionTypes>
type thunkType = BaseThunkType<actionTypes>