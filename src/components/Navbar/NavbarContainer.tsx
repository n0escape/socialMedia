import { compose } from "redux";
import NavBar from "./Navbar.tsx";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getUserSettingsJSON } from '../../redux/settingsReducer.ts';
import { appStateType } from "redux/storeRedux.ts";
import { componentsType, friendsType, userSettingsType } from "types/types.ts";

type mapStateToPropsType = {
	friends: Array<friendsType>
	userSettings: userSettingsType
	userId: number | null
	isAuth: boolean
}
type mapDispatchToPropsType = {
	getUserSettingsJSON: (userId: number | null) => void
}

const NavBarContainer: React.FC<mapStateToPropsType & mapDispatchToPropsType> = ({
	isAuth, userId, friends, userSettings, getUserSettingsJSON
}) => {
	
	useEffect(() => {
		if(isAuth){
			getUserSettingsJSON(userId);
		}
	}, [userId, getUserSettingsJSON, isAuth]);

	const filterObj = (components: componentsType) => {
		let filteredObject = {} as componentsType
		Object.keys(components).map( key => {
			if (components[key as keyof componentsType] === true) {
				filteredObject[key as keyof componentsType] = true;
			}
			return filteredObject
		})
		return filteredObject
	}
	
	if(isAuth) return <NavBar friends={friends} components={filterObj(userSettings.components)} />
	return <NavBar friends={friends} components={userSettings.components} />
}

let mapStateToProps = (state: appStateType) => ({
	friends: state.navBar.friends,
	userSettings: state.settings.userSettings,
	userId: state.auth.userId,
	isAuth: state.auth.isAuth
})


export default compose(
	connect<mapStateToPropsType, mapDispatchToPropsType, {}, appStateType>(
		mapStateToProps,
		{getUserSettingsJSON}
	)
)(NavBarContainer)