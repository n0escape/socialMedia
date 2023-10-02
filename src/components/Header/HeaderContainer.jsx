import Header from "./Header"
import { connect } from "react-redux";
import { logout } from './../../redux/authReducer.ts';
import { compose } from "redux";

let mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login,
	userPhoto: state.auth.userPhoto
})

export default compose(
												connect(mapStateToProps, {logout})
)(Header)