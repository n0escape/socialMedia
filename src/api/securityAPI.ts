import { instanse } from "./api";

type getCaptchaUrlResponseType = {
	url: string
}

export const securityAPI = {
	async getCaptchaUrl() {
		const response = await instanse.get<getCaptchaUrlResponseType>(`/security/get-captcha-url`);
		return response.data;
	},
};
