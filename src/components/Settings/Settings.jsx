import React from "react";
import { reduxForm } from "redux-form";
import { createField } from "../common/FormsControls/FormsControls";
//import s from "./Settings.module.css";

const Settings = ({
	userId, userSettings, updateUserComponentsSettingJSON
}) => {
	const onSubmitButton = (formData) => {
		updateUserComponentsSettingJSON(userId, formData)
	}
	return (
		<div>
{/* 			
			<button onClick={()=>this.props.getUserSettingsJSON(29710)}>getUserSettings</button>
			<button onClick={()=>this.props.updateUserLanguageSettingJSON(29710, 'English')}>changeLanguageToEng</button>
			<button onClick={()=>this.props.updateUserComponentsSettingJSON(29710)}>changeComponents</button>
		 */}
		<UserSettingsReduxForm
			onSubmit={onSubmitButton} 
			initialValues={userSettings} 
		/>
		</div>
	);
}

const UserSettingsForm = ({handleSubmit, error, ...rest}) => (
	<form onSubmit={handleSubmit}>
		{createField("input", null, null, "components.profile", "checkbox", "Profile")}
		{createField("input", null, null, "components.dialogs", "checkbox", "Dialogs")}
		{createField("input", null, null, "components.users", "checkbox", "Users")}
		{createField("input", null, null, "components.news", "checkbox", "News")}
		{createField("input", null, null, "components.music", "checkbox", "Music")}
		<button>Apply Settings</button>
	</form>
)

const UserSettingsReduxForm = reduxForm({
	form: 'userSettings',
	destroyOnUnmount: false
})(UserSettingsForm)

export default Settings;