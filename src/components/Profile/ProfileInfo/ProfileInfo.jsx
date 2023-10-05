import React from "react";
import s from './ProfileInfo.module.css';
import usersPhoto from './../../../assets/images/users.png';
import truePhoto from './../../../assets/images/true.png';
import falsePhoto from './../../../assets/images/false.png';
import ProfileStatus from "./ProfileStatus";
import ContactsList from "./Contacts/ContactsList";
import ProfileDataReduxForm from './ProfileDataForm';

const ProfileInfo = ({editMode, setEditMode, changeProfileData, owner, updateUserPhoto, userStatus, updateUserStatus,
	userProfile}) => {

	const {
		// fullName, aboutMe, lookingForAJob, lookingForAJobDescription, 
		contacts
	} = userProfile

	let onChangePhoto = (e) => {
		if(e.target.files.length){ 
			updateUserPhoto(e.target.files[0])
		}
	}
	let onSubmit = ( formData ) => {
		changeProfileData(formData);
	}
	return(
		<div className={s.description}>
			<div> 
				<img src={ userProfile.photos.small || usersPhoto }
				alt='user avatar'/>
				{owner && <input type={"file"} onChange={onChangePhoto}></input>}
			</div>

			{
			editMode
				?<ProfileDataReduxForm 
				onSubmit={onSubmit} 
				contacts={contacts} 
				initialValues={userProfile}
				/>
				:<ProfileData 
				onEditModeChange={()=>{setEditMode(true)}} owner={owner} 
				userStatus={userStatus} updateUserStatus={updateUserStatus}
				userProfile={userProfile}/>
			}
		</div>
	);
}

export default ProfileInfo;

const ProfileData = ({onEditModeChange, owner, userStatus, updateUserStatus, 
	userProfile:{fullName, aboutMe, lookingForAJob, lookingForAJobDescription, contacts}}) => (
		<div>
		{owner && <button onClick={onEditModeChange}>Change Profile</button>}

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
