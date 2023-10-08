import React from "react";
import s from "./../Login.module.css";
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, getStringKeys } from "../../common/FormsControls/FormsControls.tsx";
import { required } from "../../../utils/validators/validators.ts";

export type loginFormValuesType = {
	email: string; password: string; rememberMe: boolean; captcha: string | null;
};
type loginFormValuesTypeKeys = getStringKeys<loginFormValuesType>;
type loginFormOwnProps = {
	captchaUrl: string | null;
};

const LoginForm: React.FC<InjectedFormProps<loginFormValuesType, loginFormOwnProps> & loginFormOwnProps> = (
	{ handleSubmit, error, captchaUrl }
) => {
	return (
		<form onSubmit={handleSubmit}>
			{createField<loginFormValuesTypeKeys>("input", "email", [required], "Email", "text")}
			{createField<loginFormValuesTypeKeys>("input", "password", [required], "Password", "password")}
			{createField<loginFormValuesTypeKeys>("input", "rememberMe", [], null, "checkbox", "Remeber me")}

			{captchaUrl && <img src={captchaUrl} />}
			{captchaUrl && createField<loginFormValuesTypeKeys>("input", "captcha", [required], "Symbols from img", "text")}

			{error && <div className={s.formSummaryError}>
				{error}
			</div>}
			<div>
				<button>Login</button>
			</div>
		</form>
	);
};
export const LoginReduxForm = reduxForm<loginFormValuesType, loginFormOwnProps>({ form: 'login' })(LoginForm);
