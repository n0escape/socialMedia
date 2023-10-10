import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { login } from '../../redux/authReducer';
import { compose } from "redux";
import { Navigate } from "react-router-dom";
import { appDispatch, appStateType } from "redux/storeRedux";
import { loginFormValuesType, LoginReduxForm } from "./LoginForm/LoginForm";

type propsType = {

}

export const Login: React.FC<propsType> = ({}) => {

	const isAuth = useSelector((state: appStateType) => state.auth.isAuth)
	const captchaUrl = useSelector((state: appStateType) => state.auth.captchaUrl)
	
	const dispatch = useDispatch<appDispatch>()

	const onSubmit = (formData: loginFormValuesType) => {
		dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
	}
	if (isAuth) return <Navigate to={"/profile"}/>
	return (
		<div>
			<h1>Login</h1>
			<LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
		</div>

	);
}