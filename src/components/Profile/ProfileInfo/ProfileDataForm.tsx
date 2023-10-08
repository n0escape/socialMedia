import React from 'react'
import { createField, getStringKeys } from '../../common/FormsControls/FormsControls'
import { required } from '../../../utils/validators/validators'
import s from './ProfileDataForm.module.css'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { contactsType, userProfileType } from 'types/types'

type PropsType = {
	profile: userProfileType
}
type ProfileTypeKeys = getStringKeys<userProfileType>

const ProfileDataForm: React.FC<InjectedFormProps<userProfileType, PropsType> & PropsType> = ({handleSubmit, error, profile:{contacts}}) => {
	
	return <form onSubmit={handleSubmit}>

	<button>Save</button>
	{ error && <div className={s.formSummaryError}>
			{ error }
		</div> }
	{createField<ProfileTypeKeys>('input', 'fullName', [required], 'fullName', 'text', 'Full name')}
	{createField<ProfileTypeKeys>('textarea', 'aboutMe', [required], 'Text about you', 'text', 'About me')}
	{createField<ProfileTypeKeys>('input', 'lookingForAJob', [required], null, 'checkbox', 'Looking for a job')}
	{createField<ProfileTypeKeys>('textarea', 'lookingForAJobDescription', [required], 'Text about your skills/motivation', 'text', 'Looking For A Job Description')}
	
	<b> Contacts </b>
	{Object.keys(contacts).map( key => {
		return <div key={key}>
		{createField('input', 'contacts.' + key, [], key, 'text', key+":")}
		</div>
	})}

</form>
}

const ProfileDataReduxForm = reduxForm<userProfileType, PropsType>({form: 'profileData', destroyOnUnmount: false})(ProfileDataForm)
export default ProfileDataReduxForm