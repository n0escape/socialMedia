import React, { useEffect } from 'react';
import Profile from './Profile.tsx';
import { connect } from 'react-redux';
import { actions } from '../../redux/profileReducer.ts';
import { getUserProfile, getUserStatus, updateUserStatus, updateUserPhoto, changeProfileData, getProfilePostsJSON } from '../../redux/profileReducer.ts';
import { withAuthRedirect } from '../../hoc/withAuthRedirect.tsx';
import { compose } from 'redux';
import { withRouter } from '../../hoc/withRouter.tsx';
import { Location, NavigateFunction, RouteProps } from 'react-router-dom';
import { appStateType } from 'redux/storeRedux.ts';
import { userProfileType } from 'types/types.ts';

type mapPropsType = ReturnType<typeof mapStateToProps>
type mapDispatch = {
	setEditMode: (editMode: boolean) => void,
	getUserProfile: (currUserId: number| null) => void
	getUserStatus: (currUserId: number| null) => void
	updateUserStatus: (status: string) => void
	updateUserPhoto: (file: File) => void
	changeProfileData: (userProfile: userProfileType) => void
	getProfilePostsJSON: (currUserId: number| null) => void
}
type withRouterProps = {
		router: {
			location: Location;
			navigate: NavigateFunction;
			params: Record<string, string | undefined>;
		};
}


const ProfileContainer: React.FC<mapPropsType & mapDispatch & withRouterProps> = ({
	getProfilePostsJSON,
	editMode, updateUserPhoto,
	authorizedUserId, getUserProfile, getUserStatus, userProfile,
	userStatus, updateUserStatus, changeProfileData, ...props}) => {

	let currUserId = props.router.params.userId || authorizedUserId
	const userId = typeof currUserId === 'string' ? parseInt(currUserId, 10) : currUserId

	useEffect(() => {
		getUserProfile(userId);
		getUserStatus(userId);
		getProfilePostsJSON(userId)
	}, [currUserId, getUserProfile, getUserStatus, getProfilePostsJSON]);
	
	return (
		<div>
				<Profile 
					currUserId={userId}
					editMode={editMode}
					setEditMode={props.setEditMode}
					updateUserPhoto={updateUserPhoto} 
					isOwner={!props.router.params.userId} 
					userProfile={userProfile} 
					userStatus={userStatus} 
					updateUserStatus={updateUserStatus}
					changeProfileData={changeProfileData}
				/>
		</div>
	);
}

let mapStateToProps = (state: appStateType) => ({
	userProfile: state.contentBar.profilePage.userProfile,
	userStatus: state.contentBar.profilePage.userStatus,
	isAuth: state.auth.isAuth,
	authorizedUserId: state.auth.userId,
	editMode: state.contentBar.profilePage.editMode
})

export default compose(
	withRouter,
	connect( mapStateToProps, { 
		setEditMode: actions.setEditMode,
		getUserProfile, getUserStatus, updateUserStatus,
		updateUserPhoto, changeProfileData, getProfilePostsJSON }),
	withAuthRedirect,
)(ProfileContainer)