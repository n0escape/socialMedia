import React from 'react'
import { createField } from '../../common/FormsControls/FormsControls'
import { required } from '../../../utils/validators/validators'
import s from './ProfileDataForm.module.css'
import { reduxForm } from 'redux-form'

const ProfileDataForm = ({handleSubmit, error, contacts}) => {
	
	return <form onSubmit={handleSubmit}>

	<button>Save</button>
	{ error && <div className={s.formSummaryError}>
			{ error }
		</div> }
	{createField('input', 'fullName', [required], 'fullName', 'text', 'Full name')}
	{createField('textarea', 'aboutMe', [required], 'Text about you', 'text', 'About me')}
	{createField('input', 'lookingForAJob', [required], null, 'checkbox', 'Looking for a job')}
	{createField('textarea', 'lookingForAJobDescription', [required], 'Text about your skills/motivation', 'text', 'Looking For A Job Description')}
	
	<b> Contacts </b>
	{Object.keys(contacts).map( key => {
		return <div key={key}>
		{createField('input', 'contacts.' + key, null, key, 'text', key+":")}
		</div>
	})}

</form>
}

const ProfileDataReduxForm = reduxForm({form: 'profileData', destroyOnUnmount: false})(ProfileDataForm)
export default ProfileDataReduxForm