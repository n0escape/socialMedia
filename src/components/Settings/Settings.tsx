import React from "react";
import { userSettingsType } from "types/types";
import { UserSettingsReduxForm } from "./UserSettingsForm/UserSettingsForm";
//import s from "./Settings.module.css";
import { componentsType } from 'types/types.ts';

// export type userSettingsFormValuesType = {
// 	components: Array <keyof componentsType>
// }

type propsType = {
	userId: number | null
	userSettings: userSettingsType
	updateUserComponentsSettingJSON: (userId: number | null, userSettings: any) => void
}

const Settings: React.FC<propsType> = ({
	userId, userSettings, updateUserComponentsSettingJSON
}) => {
	const onSubmitButton = (userSettings: userSettingsType) => {
		updateUserComponentsSettingJSON(userId, userSettings)
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

export default Settings;