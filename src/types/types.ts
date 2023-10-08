
export type postType = {
	createdAt: string,
	id: string,
	likeCounter: number,
	message: string,
	userId: number
}


export type contactsType = {
	github: string
	vk: string
	facebook: string
	instagram: string
	twitter: string
	website: string
	youtube: string
	mainLink: string
}
export type photosType = {
	small: string | null,
	large: string | null
}
export type userProfileType = {
	aboutMe: string
	userId: number,
	lookingForAJob: boolean,
	lookingForAJobDescription: string,
	fullName: string,
	contacts: contactsType,
	photos: photosType
}

export type userType = {
	id: number
	name: string
	status: string
	photos: photosType
	followed: boolean
}

export type componentsType = {
	profile: boolean,
	dialogs: boolean,
	users: boolean,
	settings: boolean,
	music: boolean,
	news: boolean
}
export type userSettingsType = {
	components: componentsType,
	language: string | null,
	themeMode: 'default' | 'black' | null
}