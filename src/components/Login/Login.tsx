import React from "react";
import s from "./Login.module.css";
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField } from "../common/FormsControls/FormsControls.tsx";
import { required } from "../../utils/validators/validators.ts";
import { connect } from "react-redux";
import { login } from '../../redux/authReducer.ts';
import { compose } from "redux";
import { Navigate } from "react-router-dom";
import { appStateType } from "redux/storeRedux.ts";


type loginFormValuesType = {
	email: string, password: string, rememberMe: boolean, captcha: string | null
}
type loginFormValuesTypeKeys = Extract<keyof loginFormValuesType, string>

type loginFormOwnProps = {
	captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<loginFormValuesType, loginFormOwnProps> & loginFormOwnProps> = (
	{handleSubmit, error, captchaUrl}
) => {
	return(
		<form onSubmit={handleSubmit}>
			{createField<loginFormValuesTypeKeys>("input", "email", [required], "Email", "text")}
			{createField<loginFormValuesTypeKeys>("input", "password", [required], "Password", "password")}
			{createField<loginFormValuesTypeKeys>("input", "rememberMe", [], null, "checkbox", "Remeber me")}
			
			{captchaUrl && <img src={captchaUrl} />}
			{captchaUrl && createField<loginFormValuesTypeKeys>("input", "captcha", [required], "Symbols from img", "text")}

			{ error && <div className={s.formSummaryError}>
				{ error }
			</div>}
			<div>
				<button>Login</button>
			</div>
		</form>
	)
}

const LoginReduxForm = reduxForm<loginFormValuesType, loginFormOwnProps>({form: 'login'})(LoginForm)

type loginComponentProps = mapStateToPropsType & mapDispatchToPropsType;

type mapStateToPropsType = {
	isAuth: boolean
	captchaUrl: string | null
}
type mapDispatchToPropsType = {
	login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
}

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