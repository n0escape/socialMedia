import { userSettingsType } from 'types/types';
import { instanseJSON } from "./api";


export const userSettingsJsonAPI = {
	async getUserSettingsJSON(userId: number) {
		const response = await instanseJSON.get<userSettingsType>(`/userSettings/${userId}`);
		return response.data;
	},
	async updateUserLanguageSettingJSON(userId: number, language: string) {
		const response = await instanseJSON.patch(`/userSettings/${userId}`, { language: language });
		return response.data;
	},
	async updateUserComponentsSettingJSON(userId: number, userSettings: userSettingsType) {
		const response = await instanseJSON.patch(`/userSettings/${userId}`, {
			components: { ...userSettings.components }
		});
		return response.data;
	},
};
