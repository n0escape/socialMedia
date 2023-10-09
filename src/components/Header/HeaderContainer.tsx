import Header from "./Header.tsx"
import { connect } from "react-redux";
import { logout } from '../../redux/authReducer.ts';
import { compose } from "redux";
import { appStateType } from "redux/storeRedux.ts";

export type mapStateToPropsType = {
	isAuth: boolean
	login: string | null
	userPhoto: string | null
}
export type mapDispatchToPropsType = {
	logout: () => void
}


let mapStateToProps = (state: appStateType) => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login,
	userPhoto: state.auth.userPhoto
})

export default compose(
	connect<mapStateToPropsType, mapDispatchToPropsType, {}, appStateType>(
		mapStateToProps, {logout}
	)
)(Header)