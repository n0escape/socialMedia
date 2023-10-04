import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { postsType, userProfileType, userSettingsType } from 'types/types';

let instanse = axios.create({
	withCredentials: true,
	baseURL: `https://social-network.samuraijs.com/api/1.0/`,
	headers: {
		"API-KEY": "1304f4fa-251a-4311-a81b-7e2e18cf6ee7"
	}
})

let instanseJSON = axios.create({
	withCredentials: true,
	baseURL: `http://localhost:3001/`
})

export const usersAPI = {
	async getUsers(currentPage = 1, pageSize = 100) {
		const response = await instanse.get(`users?page=${currentPage}&count=${pageSize}`);
		return response.data;
	},
	async getAllUsers() {
		const response = await instanse.get(`users/`);
		return response.data;
	},
	async unfollowUser(userId: number) {
		const response = await instanse.delete(`follow/${userId}`);
		return response.data.resultCode;
	},
	async followUser(userId: number) {
		const response = await instanse.post(`follow/${userId}`);
		return response.data.resultCode;
	},
	getUserProfile(currUserId = 2) {
		console.warn('Obsolete method. Please use profileAPI obj')
		return profileAPI.getUserProfile(currUserId)
	},
	getAuthData() {
		console.warn('Obsolete method. Please use authAPI obj')
		return authAPI.getAuthData()
	}
}

export const profileAPI = {
	async getUserProfile(currUserId = 2) {
		const response = await instanse.get(`profile/` + currUserId);
		return response.data;
	},
	async getUserStatus(currUserId: number){
		const response = await instanse.get(`profile/status/` + currUserId)
		return response.data;
	},
	async updateUserStatus(status: string){
		const response = await instanse.put(`profile/status/`, {status: status})
		return response.data;
	},
	async updateUserPhoto(avatarFile: any){
		const formData = new FormData();
		formData.append("image", avatarFile)
		const response = await instanse.put(`profile/photo/`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		return response.data;
	},
	async updateProfileData(profile: userProfileType){
		const response = await instanse.put(`profile/`, profile)
		return response.data;
	}
}

export enum resultCodesEnum {
	Success = 0,
	Error = 1,
}
export enum resultCodeForCaptcha {
	CaptchaIsRequired = 10
}

type getAuthDataResponseType = {
	data: {
		id: number
		email: string
		login: string
	}
	fieldsErrors: any
	messages: Array<string>
	resultCode: resultCodesEnum
}
type loginResponseType = {
	data: {
		userId: number
	}
	messages: Array<string>
	resultCode: resultCodesEnum | resultCodeForCaptcha
}

export const authAPI = {
	async getAuthData(){
		const response = await instanse.get<getAuthDataResponseType>(`auth/me`);
		return response.data;
	},
	async login(email: string, password: string, rememberMe = false, captcha: string | null = null){
		const response = await instanse.post<loginResponseType>("auth/login", {email, password, rememberMe, captcha})
		return response.data
	},
	async logout(){
		const response = await instanse.delete("auth/login")
		return response.data
	},
}

export const securityAPI = {
	async getCaptchaUrl(){
		const response = await instanse.get(`/security/get-captcha-url`);
		return response.data;
	},
}

export const userSettingsJsonAPI = {
	async getUserSettingsJSON(userId: number){
		const response = await instanseJSON.get(`/userSettings/${userId}`);
		return response.data
	},
	async updateUserLanguageSettingJSON(userId: number, language: string){
		const response = await instanseJSON.patch(`/userSettings/${userId}`, {language: language});
		return response.data
	},
	async updateUserComponentsSettingJSON(userId: number, userSettings: userSettingsType){
		const response = await instanseJSON.patch(`/userSettings/${userId}`, {
			components: { ...userSettings.components }
		});
		return response.data
	},
}

export const profileJsonAPI = {
	async getProfilePostsJSON(userId: number) {
		const response = await instanseJSON.get(`/profile/${userId}/posts`);
		const posts = response.data;
		
		// Сортируем посты в порядке добавления (по метке времени создания)
		// новый пост будет последним в массиве
		posts.sort((a: postsType, b: postsType) => {
			const dateA = new Date(a.createdAt);
			const dateB = new Date(b.createdAt);

			if (dateA < dateB) {
				return -1;
			} else if (dateA > dateB) {
				return 1;
			} else {
				return 0;
			}
		});
		
		return posts;
	},
	async addNewPostJSON(message = "new post text", userId = 29710) {
		const newPost = {
			id: uuidv4(), // Генерируем UUID для нового поста
			message: message,
			likeCounter: 0,
			userId: userId,
			createdAt: new Date().toISOString() // Добавляем метку времени
		} as postsType;
		console.log(newPost)

		const response = await instanseJSON.post(`/profile/${userId}/posts`, newPost);
		return response.data;
	},
	async deletePostJSON(userId: number, id: number) {
		const response = await instanseJSON.delete(`/profile/${userId}/posts/${id}`);
		return response.data;
	}
}
