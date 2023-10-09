import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainter from "./MyPosts/MyPostsContainer";
import Preloader from '../common/Preloader/Preloader';
import { userProfileType } from "types/types";

type PropsType = {
	isOwner: boolean
	currUserId: number | null
	editMode: boolean
	setEditMode: (editMode: boolean) => void
	changeProfileData: (userProfile: userProfileType) => void
	updateUserPhoto: (file: File) => void
	userProfile: userProfileType | null
	userStatus: string
	updateUserStatus: (status: string) => void
}

const Profile: React.FC<PropsType> = ({
	currUserId, editMode, setEditMode, changeProfileData, 
	isOwner, updateUserPhoto, userProfile,
	userStatus, updateUserStatus
}) => {
	if (!userProfile) {
		<Preloader />
	} else {
		return(
			<div>
				<ProfileInfo 
					editMode={editMode} setEditMode={setEditMode}
					changeProfileData={changeProfileData} updateUserPhoto={updateUserPhoto}
					isOwner={isOwner} userProfile={userProfile}
					userStatus={userStatus} updateUserStatus={updateUserStatus}
				/>
				<MyPostsContainter currUserId={currUserId} />
			</div>
		);
	}
}

export default Profile;