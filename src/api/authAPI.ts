import { APIResponseType } from "./api";
import { instanse, resultCodeForCaptchaEnum, resultCodesEnum } from "./api";

type getAuthDataType = {
	id: number
	email: string
	login: string
}
type loginDataType = {
	userId: number
}
type loginRCType = resultCodeForCaptchaEnum | resultCodesEnum

export const authAPI = {
	async getAuthData() {
		const response = await instanse.get<APIResponseType<getAuthDataType>>(`auth/me`);
		return response.data;
	},
	async login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
		const response = await instanse.post<APIResponseType<loginDataType, loginRCType>>("auth/login", { email, password, rememberMe, captcha });
		return response.data;
	},
	async logout() {
		const response = await instanse.delete("auth/login");
		return response.data;
	},
};
