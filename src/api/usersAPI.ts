import { userType } from "types/types";
import { APIResponseType, instanse } from "./api";

type getUsersType = {
	items: Array<userType>
	totalCount: number
	error: string
}

export const usersAPI = {
	async getUsers(currentPage = 1, pageSize = 100, term: string = '', friend: null | boolean = null) {
		const response = await instanse.get<getUsersType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`));
		return response.data;
	},
	async unfollowUser(userId: number) {
		const response = await instanse.delete<APIResponseType>(`follow/${userId}`)
		return response.data;
		//as Promise<APIResponseType>
	},
	async followUser(userId: number) {
		const response = await instanse.post<APIResponseType>(`follow/${userId}`);
		return response.data;
	},
};
