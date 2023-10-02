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
	{createField('input', [required], 'fullName', 'fullName', 'text', 'Full name')}
	{createField('textarea', [required], 'Text about you', 'aboutMe', 'text', 'About me')}
	{createField('input', [required], null, 'lookingForAJob', 'checkbox', 'Looking for a job')}
	{createField('textarea', [required], 'Text about your skills/motivation', 'lookingForAJobDescription', 'text', 'Looking For A Job Description')}
	
	<b> Contacts </b>
	{Object.keys(contacts).map( key => {
		return <div key={key}>
		{createField('input', null, key, 'contacts.' + key, 'text', key+":")}
		</div>
	})}

</form>
}

const ProfileDataReduxForm = reduxForm({form: 'profileData', destroyOnUnmount: false})(ProfileDataForm)
export default ProfileDataReduxForm