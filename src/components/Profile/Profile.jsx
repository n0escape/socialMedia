import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainter from "./MyPosts/MyPostsContainer";
import Preloader from '../common/Preloader/Preloader';

const Profile = ({currUserId, editMode, setEditMode, authorizedUserId, changeProfileData, owner, updateUserPhoto, userProfile, userStatus, updateUserStatus}) => {
	if (!userProfile) {
		<Preloader />
	} else {
		return(
			<div>
				<ProfileInfo editMode={editMode} setEditMode={setEditMode} authorizedUserId={authorizedUserId} changeProfileData={changeProfileData} updateUserPhoto={updateUserPhoto} owner={owner} userProfile={userProfile} userStatus={userStatus} updateUserStatus={updateUserStatus}/>
				<MyPostsContainter currUserId={currUserId} />
			</div>
		);
	}
}

export default Profile;