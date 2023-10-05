import { usersType } from "types/types";
import { APIResponseType, instanse } from "./api";

type getUsersType = {
	items: Array<usersType>
	totalCount: number
	error: string
}

export const usersAPI = {
	async getUsers(currentPage = 1, pageSize = 100) {
		const response = await instanse.get<getUsersType>(`users?page=${currentPage}&count=${pageSize}`);
		return response.data;
	},
	async unfollowUser(userId: number) {
		const response = await instanse.delete(`follow/${userId}`)
		return response.data as Promise<APIResponseType>
	},
	async followUser(userId: number) {
		const response = await instanse.post<APIResponseType>(`follow/${userId}`);
		return response.data.resultCode;
	},
};
