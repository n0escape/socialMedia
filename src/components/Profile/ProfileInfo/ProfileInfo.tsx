import React from "react";
import s from './ProfileInfo.module.css';
import usersPhoto from './../../../assets/images/users.png';
import truePhoto from './../../../assets/images/true.png';
import falsePhoto from './../../../assets/images/false.png';
import ProfileStatus from "./ProfileStatus";
import ContactsList from "./Contacts/ContactsList";
import ProfileDataReduxForm from './ProfileDataForm';
import { userProfileType } from 'types/types';

type propsType = {
	editMode: boolean
	setEditMode: (editMode: boolean) => void
	isOwner: boolean
	updateUserPhoto: (file: File) => void
	userStatus: string
	updateUserStatus: (status: string) => void
	changeProfileData: (userProfile: userProfileType) => void
	userProfile: userProfileType
}

const ProfileInfo: React.FC<propsType> = ({ 
	editMode, setEditMode, changeProfileData, 
	isOwner, updateUserPhoto, userStatus, 
	updateUserStatus, userProfile
}) => {

	const {
		// fullName, aboutMe, lookingForAJob, lookingForAJobDescription, 
		contacts
	} = userProfile

	let onChangePhoto = (e: React.ChangeEvent<HTMLInputElement> ) => {
		if(e.target.files?.length){ 
			updateUserPhoto(e.target.files[0])
		}
	}
	let onSubmit = ( formData: userProfileType ) => {
		changeProfileData(formData)
	}
	return(
		<div className={s.description}>
			<div> 
				<img src={ userProfile.photos.small || usersPhoto }
				alt='user avatar'/>
				{isOwner && <input type={"file"} onChange={onChangePhoto}></input>}
			</div>

			{
			editMode
				?<ProfileDataReduxForm 
				onSubmit={onSubmit} 
				profile={userProfile} 
				initialValues={userProfile}
				/>
				:<ProfileData 
				onEditModeChange={()=>setEditMode(true)} isOwner={isOwner} 
				userStatus={userStatus} updateUserStatus={updateUserStatus}
				userProfile={userProfile}/>
			}
		</div>
	);
}

export default ProfileInfo;

type profileDataPropsType = {
	onEditModeChange: () => void
	isOwner: boolean
	userStatus: string
	updateUserStatus: (status: string) => void
	userProfile: userProfileType
}

const ProfileData: React.FC<profileDataPropsType> = ({onEditModeChange, isOwner, userStatus, updateUserStatus, 
	userProfile:{fullName, aboutMe, lookingForAJob, lookingForAJobDescription, contacts}}) => (
		<div>
		{isOwner && <button onClick={onEditModeChange}>Change Profile</button>}

		<h2> {fullName} </h2>

		<b> Status </b>
		<ProfileStatus userStatus={userStatus} updateUserStatus={updateUserStatus}/>

		<div>
			<b> About me: </b>
			{aboutMe}
		</div>

		<div className={s.employment}>
			<b>Looking for job </b> 
			<img src={lookingForAJob ? truePhoto : falsePhoto } alt='employment'/>
		</div>

		<div> {lookingForAJobDescription} </div>
		
		<b> Contacts </b>
		<ContactsList contacts={contacts}/>
	</div>
)
