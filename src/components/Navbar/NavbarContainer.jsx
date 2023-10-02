import { compose } from "redux";
import NavBar from "./Navbar";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getUserSettingsJSON } from './../../redux/settingsReducer.ts';

const NavBarContainer = ({isAuth, userId, friends, userSettings, getUserSettingsJSON}) => {
	
	useEffect(() => {
		if(isAuth){
			getUserSettingsJSON(userId);
		}
	}, [userId, getUserSettingsJSON, isAuth]);

	const filterObj = (components) => {
		let filteredObject = {}
		Object.keys(components).map( key => {
			if (components[key] === true) {
				filteredObject[key] = true;
			}
			return filteredObject
		})
		return filteredObject
	}
	
	if(isAuth) return <NavBar friends={friends} components={filterObj(userSettings.components)} />
	return <NavBar friends={friends} components={userSettings.components} />
}

let mapStateToProps = (state) => ({
	friends: state.navBar.friends,
	userSettings: state.settings.userSettings,
	userId: state.auth.userId,
	isAuth: state.auth.isAuth
})


export default compose(
	connect(mapStateToProps, {getUserSettingsJSON})
)(NavBarContainer)