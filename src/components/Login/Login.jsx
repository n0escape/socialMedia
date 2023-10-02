import React from "react";
import s from "./Login.module.css";
import { reduxForm } from "redux-form";
import { createField } from "../common/FormsControls/FormsControls";
import { required } from "../../utils/validators/validators";
import { connect } from "react-redux";
import { login } from './../../redux/authReducer.ts';
import { compose } from "redux";
import { Navigate } from "react-router-dom";

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
	return(
		<form onSubmit={handleSubmit}>
			{createField("input", [required], "Email", "email", "text")}
			{createField("input", [required], "Password", "password", "password")}
			{createField("input", null, null, "rememberMe", "checkbox", "Remeber me")}
			
			{captchaUrl && <img src={captchaUrl} />}
			{captchaUrl && createField("input", [required], "Symbols from img", "captcha", "text")}

			{ error && <div className={s.formSummaryError}>
				{ error }
			</div>}
			<div>
				<button>Login</button>
			</div>
		</form>
	)
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = ({login, isAuth, captchaUrl}) => {

	const onSubmit = (formData) => {
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
let mapStateToProps = (state) =>({
	isAuth: state.auth.isAuth,
	captchaUrl: state.auth.captchaUrl
})

export default compose(connect(mapStateToProps, {login}))(Login);