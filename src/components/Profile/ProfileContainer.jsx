import React, { useEffect } from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { actions } from './../../redux/profileReducer.ts';
import { getUserProfile, getUserStatus, updateUserStatus, updateUserPhoto, changeProfileData, getProfilePostsJSON } from './../../redux/profileReducer.ts';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { withRouter } from '../../hoc/withRouter';

const ProfileContainer = ({
	getProfilePostsJSON,
	editMode, updateUserPhoto,
	authorizedUserId, getUserProfile, getUserStatus, userProfile,
	userStatus, updateUserStatus, changeProfileData, ...props}) => {

	let currUserId = props.router.params.userId || authorizedUserId

	useEffect(() => {
		getUserProfile(currUserId);
		getUserStatus(currUserId);
		getProfilePostsJSON(currUserId)
	}, [currUserId, getUserProfile, getUserStatus, getProfilePostsJSON]);
	
	return (
		<div>
				<Profile 
					currUserId={currUserId}
					editMode={editMode}
					setEditMode={actions.setEditMode}
					updateUserPhoto={updateUserPhoto} 
					owner={!props.router.params.userId} 
					userProfile={userProfile} 
					userStatus={userStatus} 
					updateUserStatus={updateUserStatus}
					changeProfileData={changeProfileData}
					authorizedUserId={authorizedUserId}
				/>
		</div>
	);
}

let mapStateToProps = (state) => ({
	userProfile: state.contentBar.profilePage.userProfile,
	userStatus: state.contentBar.profilePage.userStatus,
	isAuth: state.auth.isAuth,
	authorizedUserId: state.auth.userId,
	editMode: state.contentBar.profilePage.editMode
})

export default compose(
	withRouter,
	connect( mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, updateUserPhoto, changeProfileData, getProfilePostsJSON }),
	withAuthRedirect,
)(ProfileContainer)