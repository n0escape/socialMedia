import React, { useEffect } from "react";
import { compose } from "redux";
import Settings from "./Settings";
import { connect } from "react-redux";
import { updateUserComponentsSettingJSON, getUserSettingsJSON } from './../../redux/settingsReducer.ts';
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

const SettingsContainer = ({
	userId, userSettings, getUserSettingsJSON, updateUserComponentsSettingJSON
}) => {

	useEffect(() => {
    getUserSettingsJSON(userId);
  }, [userId, getUserSettingsJSON]);

	return <div>
		<Settings 
			userId={userId}
			userSettings={userSettings}
			updateUserComponentsSettingJSON={updateUserComponentsSettingJSON}
		/>
	</div>
}

let mapStateToProps = state => ({
	userId: state.auth.userId,
	userSettings: state.settings.userSettings
})

export default compose(
	connect(mapStateToProps, {getUserSettingsJSON, updateUserComponentsSettingJSON}),
	withAuthRedirect,
	)(SettingsContainer)
