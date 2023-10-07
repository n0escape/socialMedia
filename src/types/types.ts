
export type postsType = {
	createdAt: string,
	id: string,
	likeCounter: number,
	message: string,
	userId: number
}


export type contactsType = {
	github: string | null
	vk: string | null
	facebook: string | null
	instagram: string | null
	twitter: string | null
	website: string | null
	youtube: string | null
	mainLink: string | null
}
export type photosType = {
	small: string | null,
	large: string | null
}
export type userProfileType = {
	aboutMe: string | null
	userId: number,
	lookingForAJob: boolean,
	lookingForAJobDescription: string | null,
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