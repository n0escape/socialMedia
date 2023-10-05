import { photosType, userProfileType } from 'types/types';
import { APIResponseType, instanse } from "./api";

type updateUserPhotoResponseDataType = {
	photos: photosType
}

export const profileAPI = {
	async getUserProfile(currUserId = 2) {
		const response = await instanse.get<userProfileType>(`profile/` + currUserId);
		return response.data;
	},
	async getUserStatus(currUserId: number) {
		const response = await instanse.get<string>(`profile/status/` + currUserId);
		return response.data;
	},
	async updateUserStatus(status: string) {
		const response = await instanse.put<APIResponseType>(`profile/status/`, { status: status });
		return response.data;
	},
	async updateUserPhoto(avatarFile: any) {
		const formData = new FormData();
		formData.append("image", avatarFile);
		const response = await instanse.put<APIResponseType<updateUserPhotoResponseDataType>>(`profile/photo/`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
		return response.data;
	},
	async updateProfileData(profile: userProfileType) {
		const response = await instanse.put<APIResponseType>(`profile/`, profile);
		return response.data;
	}
};
