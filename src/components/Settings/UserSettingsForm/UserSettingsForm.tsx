import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, getStringKeys } from "../../common/FormsControls/FormsControls";
// import { userSettingsFormValuesType } from "../Settings";
import { userSettingsType } from "types/types";

// type UserSettingsFormValuesKeysType = getStringKeys<userSettingsFormValuesType>

type PropsType = {}

const UserSettingsForm: React.FC<InjectedFormProps<userSettingsType, PropsType> & PropsType> = ({
	handleSubmit, error, ...rest
}) => (
	<form onSubmit={handleSubmit}>
		{createField("input", "components.profile", [], null, "checkbox", "Profile")}
		{createField("input", "components.dialogs", [], null, "checkbox", "Dialogs")}
		{createField("input", "components.users", [], null, "checkbox", "Users")}
		{createField("input", "components.news", [], null, "checkbox", "News")}
		{createField("input", "components.music", [], null, "checkbox", "Music")}
		{createField("input", "components.globalChat", [], null, "checkbox", "Global Chat")}
		<button>Apply Settings</button>
	</form>
);
export const UserSettingsReduxForm = reduxForm<userSettingsType>({
	form: 'userSettings',
	destroyOnUnmount: false
})(UserSettingsForm);
