import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

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
	async unfollowUser(userId) {
		const response = await instanse.delete(`follow/${userId}`);
		return response.data.resultCode;
	},
	async followUser(userId) {
		const response = await instanse.post(`follow/${userId}`);
		return response.data.resultCode;
	},
	getUserProfile(currUserId = 2) {
		console.warn('Obsolete method. Please use profileAPI obj')
		return profileAPI.getUserProfile(currUserId)
	},
	getAuthData() {
		console.warn('Obsolete method. Please use authAPI obj')
		return authAPI.me()
	}
}

export const profileAPI = {
	async getUserProfile(currUserId = 2) {
		const response = await instanse.get(`profile/` + currUserId);
		return response.data;
	},
	async getUserStatus(currUserId){
		const response = await instanse.get(`profile/status/` + currUserId)
		return response.data;
	},
	async updateUserStatus(status){
		const response = await instanse.put(`profile/status/`, {status: status})
		return response.data;
	},
	async updateUserPhoto(avatar){
		const formData = new FormData();
		formData.append("image", avatar)
		const response = await instanse.put(`profile/photo/`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		return response.data;
	},
	async updateProfileData(formData){
		const response = await instanse.put(`profile/`, formData)
		return response.data;
	}
}

export const authAPI = {
	async getAuthData(){
		const response = await instanse.get(`auth/me`);
		return response.data;
	},
	async login(email, password, rememberMe = false, captcha){
		const response = await instanse.post("auth/login", {email, password, rememberMe, captcha})
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
	async getUserSettingsJSON(userId){
		const response = await instanseJSON.get(`/userSettings/${userId}`);
		return response.data
	},
	async updateUserLanguageSettingJSON(userId, language){
		const response = await instanseJSON.patch(`/userSettings/${userId}`, {language: language});
		return response.data
	},
	async updateUserComponentsSettingJSON(userId, userSettings){
		const response = await instanseJSON.patch(`/userSettings/${userId}`, {
			components: { ...userSettings.components }
		});
		return response.data
	},
}

export const profileJsonAPI = {
	async getProfilePostsJSON(userId) {
		const response = await instanseJSON.get(`/profile/${userId}/posts`);
		const posts = response.data;
		
		// Сортируем посты в порядке добавления (по метке времени создания)
		// новый пост будет последним в массиве
		posts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
		
		return posts;
	},
	async addNewPostJSON(message = "new post text", userId = 29710) {
		const newPost = {
			id: uuidv4(), // Генерируем UUID для нового поста
			message: message,
			likeCounter: 0,
			userId: parseInt(userId),
			createdAt: new Date().toISOString() // Добавляем метку времени
		};

		const response = await instanseJSON.post(`/profile/${userId}/posts`, newPost);
		return response.data;
	},
	async deletePostJSON(userId, id) {
		const response = await instanseJSON.delete(`/profile/${userId}/posts/${id}`);
		return response.data;
	}
}
