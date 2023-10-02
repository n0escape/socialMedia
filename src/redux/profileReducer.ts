// import { stopSubmit } from "redux-form";
import {profileAPI, profileJsonAPI} from "../api/api";
import { postsType, userProfileType, photosType } from "../types/types.ts";
import { setUserPhotoAuth } from "./authReducer.ts";

const ADD_POST = 'socialNetwork/profile/ADD_POST',
			SET_USER_PROFILE = 'socialNetwork/profile/SET_USER_PROFILE',
			SET_USER_STATUS = 'socialNetwork/profile/SET_USER_STATUS',
			DELETE_POST = 'socialNetwork/profile/DELETE_POST',
			UPDATE_USER_PHOTO = 'socialNetwork/profile/UPDATE_USER_PHOTO',
			SET_EDIT_MODE = 'socialNetwork/profile/SET_EDIT_MODE',
			SET_PROFILE_POSTS = 'socialNetwork/profile/SET_PROFILE_POSTS';


let initialState = {
	posts: [
		{id: 1, message: "Post template!", likeCounter: 15},
		{id: 2, message: "Post template!", likeCounter: 20},
		{id: 3, message: "Post template!", likeCounter: 30}
	] as Array<postsType>,
	userProfile: null as userProfileType | null,
	userStatus: "" as string,
	editMode: false as boolean
};

export type initialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): initialStateType => {
	switch (action.type){
		case ADD_POST: {
			let newPost = {
				id: Object.keys(state.posts).length + 1,
				message: action.newPostText,
				likeCounter: 0,
			};
			return {
				...state,
				posts: [ ...state.posts, newPost ]
			}
		}

		case SET_USER_PROFILE: 
			return { ...state, userProfile: action.userProfile }

		case SET_USER_STATUS: 
			return { ...state, userStatus: action.userStatus }

		case DELETE_POST:
			return { ...state, posts: state.posts.filter( p => p.id !== action.postId ) }
			
		case UPDATE_USER_PHOTO:
			return { ...state, userProfile: {...state.userProfile, photos: action.photos} as userProfileType }
			
		case SET_EDIT_MODE:
			return { ...state, editMode: action.editMode }

		case SET_PROFILE_POSTS:
			return { ...state, posts: action.posts }
			
		default: return state;
		}
}

//action creators
type addPostActionCreatorType = {
	type: typeof ADD_POST,
	newPostText: string
}
export const addPostActionCreator = (newPostText: string): addPostActionCreatorType => {
	return ({ type: ADD_POST, newPostText })
};
type setUserProfileType = {
	type: typeof SET_USER_PROFILE,
	userProfile: userProfileType
}
export const setUserProfile = (userProfile: userProfileType): setUserProfileType => {
	return ({ type: SET_USER_PROFILE, userProfile })
};
type setUserStatusType = {
	type: typeof SET_USER_STATUS,
	userStatus: string
}
export const setUserStatus = (userStatus: string): setUserStatusType => {
	return ({ type: SET_USER_STATUS, userStatus })
};
type deletePostType = {
	type: typeof DELETE_POST,
	postId: number
}
export const deletePost = (postId: number): deletePostType => {
	return ({ type: DELETE_POST, postId })
};
type setUserPhotoType = {
	type: typeof UPDATE_USER_PHOTO,
	photos: photosType
}
export const setUserPhoto = (photos: photosType): setUserPhotoType => {
	return ({ type: UPDATE_USER_PHOTO, photos })
};
type setEditModeType = {
	type: typeof SET_EDIT_MODE,
	editMode: boolean
}
export const setEditMode = (editMode: boolean): setEditModeType => {
	return ({ type: SET_EDIT_MODE, editMode })
};
type setProfilePostsType = {
	type: typeof SET_PROFILE_POSTS,
	posts: postsType
}
export const setProfilePosts = (posts: postsType): setProfilePostsType => {
	return ({ type: SET_PROFILE_POSTS, posts })
};


//thunk (creator)
export const getUserProfile = (currUserId: number) => async (dispatch: any) => {
	let data = await profileAPI.getUserProfile(currUserId)
	dispatch (setUserProfile(data))
}
export const getUserStatus = (currUserId: number) => async (dispatch: any) => {
	let data = await profileAPI.getUserStatus(currUserId)
	dispatch (setUserStatus(data)) 
}
export const updateUserStatus = (status: string) => async (dispatch: any) => {
	let data = await profileAPI.updateUserStatus(status)
	if(data.resultCode !== 1){
		dispatch (setUserStatus(status))
	}
}
export const updateUserPhoto = (avatar: any) => async (dispatch: any) => {
	let data = await profileAPI.updateUserPhoto(avatar)
	if(data.resultCode !== 1){
		dispatch(setUserPhoto(data.data.photos))
		dispatch(setUserPhotoAuth(data.data.photos.small))
	}
}
export const getProfilePostsJSON = (currUserId: number) => async (dispatch: any) => {
	let postsData = await profileJsonAPI.getProfilePostsJSON(currUserId)
	dispatch (setProfilePosts(postsData))
}
export const addNewPostJSON = (message: string, currUserId: number) => async (dispatch: any) => {
	await profileJsonAPI.addNewPostJSON(message, currUserId)
	dispatch (getProfilePostsJSON(currUserId))
}
export const deletePostJSON = (currUserId: number, postId: number) => async (dispatch: any) => {
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
export const changeProfileData = (formData: any) => async (dispatch: any, getState: any) => {
	const userId = getState().auth.userId
	let data = await profileAPI.updateProfileData(formData)
	if(data.resultCode !== 1){
		dispatch(setEditMode(false))
		dispatch(getUserProfile(userId))
	} else {
		dispatch(setEditMode(true))
		// dispatch(stopSubmit("profileData", { contacts: getErrorsFromMessages(data.messages)}))
	}
}


export default profileReducer;