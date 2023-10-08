import React from "react";
import { connect } from "react-redux";
import { login } from '../../redux/authReducer.ts';
import { compose } from "redux";
import { Navigate } from "react-router-dom";
import { appStateType } from "redux/storeRedux.ts";
import { loginFormValuesType, LoginReduxForm } from "./LoginForm/LoginForm.tsx";

type mapStateToPropsType = {
	isAuth: boolean
	captchaUrl: string | null
}
type mapDispatchToPropsType = {
	login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
}
type loginComponentProps = mapStateToPropsType & mapDispatchToPropsType;

const Login: React.FC<loginComponentProps> = ({login, isAuth, captchaUrl}) => {

	const onSubmit = (formData: loginFormValuesType) => {
		login(formData.email, formData.password, formData.rememberMe, formData.captcha);
	}
	if (isAuth) return <Navigate to={"/profile"}/>
	return (
		<div>
			<h1>Login</h1>
			<LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
		</div>

	);
}
let mapStateToProps = (state: appStateType): mapStateToPropsType =>({
	isAuth: state.auth.isAuth,
	captchaUrl: state.auth.captchaUrl
})

export default compose(connect(mapStateToProps, {login}))(Login);