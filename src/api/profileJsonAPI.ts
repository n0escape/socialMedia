import { v4 as uuidv4 } from 'uuid';
import { postsType } from 'types/types';
import { instanseJSON } from "./api";


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
			id: uuidv4(),
			message: message,
			likeCounter: 0,
			userId: userId,
			createdAt: new Date().toISOString() // Добавляем метку времени
		} as postsType;

		const response = await instanseJSON.post(`/profile/${userId}/posts`, newPost);
		return response.data;
	},
	async deletePostJSON(userId: number, id: number) {
		const response = await instanseJSON.delete(`/profile/${userId}/posts/${id}`);
		return response.data;
	}
};
