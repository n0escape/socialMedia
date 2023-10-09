import React, { useEffect } from "react";
import { compose } from "redux";
import Settings from "./Settings.tsx";
import { connect } from "react-redux";
import { updateUserComponentsSettingJSON, getUserSettingsJSON } from '../../redux/settingsReducer.ts';
import { withAuthRedirect } from "../../hoc/withAuthRedirect.tsx";
import { appStateType } from "redux/storeRedux.ts";
import { userSettingsType } from "types/types.ts";

type mapState = {
	userId: number | null,
	userSettings: userSettingsType
}
type mapDispatch = {
	getUserSettingsJSON: (userId: number | null) => void
	updateUserComponentsSettingJSON: (userId: number | null, userSettings: userSettingsType) => void
}

const SettingsContainer: React.FC<mapState & mapDispatch> = ({
	userId, userSettings, getUserSettingsJSON, updateUserComponentsSettingJSON
}) => {

	useEffect(() => {
    getUserSettingsJSON(userId);
  }, [userId, getUserSettingsJSON]);

	return <Settings 
		userId={userId}
		userSettings={userSettings}
		updateUserComponentsSettingJSON={updateUserComponentsSettingJSON}
	/>
}

let mapStateToProps = (state: appStateType) => ({
	userId: state.auth.userId,
	userSettings: state.settings.userSettings
})

export default compose<React.ComponentType>(
	connect(
		mapStateToProps, 
		{getUserSettingsJSON, updateUserComponentsSettingJSON}),
	withAuthRedirect,
	)(SettingsContainer)
