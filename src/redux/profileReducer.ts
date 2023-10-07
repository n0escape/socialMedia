import { FormAction, stopSubmit } from "redux-form";
import { profileJsonAPI } from "api/profileJsonAPI.ts";
import { profileAPI } from "api/profileAPI.ts";
import { postsType, userProfileType, photosType } from "../types/types.ts";
import { actions as authActions } from "./authReducer.ts";
import { BaseThunkType, InferActionTypes } from "./storeRedux.ts";

let initialState = {
	posts: [ ] as Array<postsType>,
	userProfile: null as userProfileType | null,
	userStatus: "" as string,
	editMode: false as boolean
};

const profileReducer = (state = initialState, action: actionTypes): initialStateType => {
	switch (action.type){
		case 'sn/profile/SET_USER_PROFILE': 
			return { ...state, userProfile: action.userProfile }

		case 'sn/profile/SET_USER_STATUS': 
			return { ...state, userStatus: action.userStatus }

		case 'sn/profile/DELETE_POST':
			return { ...state, posts: state.posts.filter( p => p.id !== action.postId ) }
			
		case 'sn/profile/UPDATE_USER_PHOTO':
			return { ...state, userProfile: {...state.userProfile, photos: action.photos} as userProfileType }
			
		case 'sn/profile/SET_EDIT_MODE':{ console.log('+')
			return { ...state, editMode: action.editMode }}

		case 'sn/profile/SET_PROFILE_POSTS':
			return { ...state, posts: action.posts }
			
		default: return state;
		}
}

//action creators
export const actions = {
	setUserProfile: (userProfile: userProfileType) => ({ type: 'sn/profile/SET_USER_PROFILE', userProfile } as const),
	setUserStatus: (userStatus: string) => ({ type: 'sn/profile/SET_USER_STATUS', userStatus } as const),
	deletePost: (postId: string) => ({ type: 'sn/profile/DELETE_POST', postId } as const),
	setUserPhoto: (photos: photosType) => ({ type: 'sn/profile/UPDATE_USER_PHOTO', photos } as const),
	setEditMode: (editMode: boolean) => {console.log('we are in ' + editMode ); return({ type: 'sn/profile/SET_EDIT_MODE', editMode } as const)},
	setProfilePosts: (posts: Array<postsType>) => ({ type: 'sn/profile/SET_PROFILE_POSTS', posts } as const)
}

//thunk (creator)
export const getUserProfile = (currUserId: number): thunkTypes => async (dispatch) => {
	let data = await profileAPI.getUserProfile(currUserId)
	dispatch (actions.setUserProfile(data))
}
export const getUserStatus = (currUserId: number): thunkTypes => async (dispatch) => {
	let data = await profileAPI.getUserStatus(currUserId)
	dispatch (actions.setUserStatus(data)) 
}
export const updateUserStatus = (status: string): thunkTypes => async (dispatch) => {
	let data = await profileAPI.updateUserStatus(status)
	if(data.resultCode !== 1){
		dispatch (actions.setUserStatus(status))
	}
}
export const updateUserPhoto = (avatar: File): thunkTypes => async (dispatch) => {
	let data = await profileAPI.updateUserPhoto(avatar)
	if(data.resultCode !== 1){
		dispatch(actions.setUserPhoto(data.data.photos))
		dispatch(authActions.setUserPhotoAuth(data.data.photos.small))
	}
}
export const getProfilePostsJSON = (currUserId: number): thunkTypes => async (dispatch) => {
	let postsData = await profileJsonAPI.getProfilePostsJSON(currUserId)
	dispatch (actions.setProfilePosts(postsData))
}
export const addNewPostJSON = (message: string, currUserId: number): thunkTypes => async (dispatch) => {
	await profileJsonAPI.addNewPostJSON(message, currUserId)
	dispatch (getProfilePostsJSON(currUserId))
}
export const deletePostJSON = (currUserId: number, postId: number): thunkTypes => async (dispatch) => {
	await profileJsonAPI.deletePostJSON(currUserId, postId)
	dispatch (getProfilePostsJSON(currUserId))
}
const getErrorsFromMessages = (messages: any) => {
	let errors = Object.keys(messages).reduce((acc, key) => {
		let errorMessage = messages[key].split("->");
		errorMessage = errorMessage[1]
			.slice(0, errorMessage[1].length - 1)
			.toLowerCase();
		return { ...acc, [errorMessage]: messages[key] };
	}, {});
	return errors;
};
export const changeProfileData = (profile: userProfileType): thunkTypes => async (dispatch, getState) => {
	const userId = getState().auth.userId
	let data = await profileAPI.updateProfileData(profile)
	if(data.resultCode !== 1){
		if(userId != null) {
			dispatch(actions.setEditMode(false))
			dispatch(getUserProfile(userId))
		} else throw new Error('userId cant be null')
	} else {
		dispatch(actions.setEditMode(true))
		dispatch(stopSubmit("profileData", { contacts: getErrorsFromMessages(data.messages)}))
	}
}

export default profileReducer;

export type initialStateType = typeof initialState
export type actionTypes = InferActionTypes<typeof actions>
type thunkTypes = BaseThunkType<actionTypes | FormAction>