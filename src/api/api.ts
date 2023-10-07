import axios from "axios";
import { userType } from "types/types";

export let instanse = axios.create({
	withCredentials: true,
	baseURL: `https://social-network.samuraijs.com/api/1.0/`,
	headers: {
		"API-KEY": "1304f4fa-251a-4311-a81b-7e2e18cf6ee7"
	}
})

export let instanseJSON = axios.create({
	withCredentials: true,
	baseURL: `http://localhost:3001/`
})

export enum resultCodesEnum {
	Success = 0,
	Error = 1,
}
export enum resultCodeForCaptchaEnum {
	CaptchaIsRequired = 10
}

export type getItemsType = {
	items: Array<userType>
	totalCount: number
	error: string | null
}
export type APIResponseType<D = {}, RC = resultCodesEnum> = {
	data: D;
	messages: Array<string>;
	resultCode: RC;
};
