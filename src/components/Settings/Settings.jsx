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
		{createField("input", "components.profile", null, null, "checkbox", "Profile")}
		{createField("input", "components.dialogs", null, null, "checkbox", "Dialogs")}
		{createField("input", "components.users", null, null, "checkbox", "Users")}
		{createField("input", "components.news", null, null, "checkbox", "News")}
		{createField("input", "components.music", null, null, "checkbox", "Music")}
		<button>Apply Settings</button>
	</form>
)

const UserSettingsReduxForm = reduxForm({
	form: 'userSettings',
	destroyOnUnmount: false
})(UserSettingsForm)

export default Settings;