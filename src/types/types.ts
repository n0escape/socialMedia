
export type postsType = {
	id: number,
	message: string,
	likeCounter: number
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

export type usersType = {
	id: number,
	name: string
	status: string,
	photos: photosType
}