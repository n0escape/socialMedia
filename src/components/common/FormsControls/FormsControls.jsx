import React from "react"
import s from "./FormsControls.module.css"
import { Field } from "redux-form"
import { reduxForm } from 'redux-form';
import { maxLengthCreator } from "../../../utils/validators/validators";

export const FormControl = ({input, meta, ...restProps}) => {
	const hasError = meta.touched && meta.error
	return(
		<div className={`${s.formControl} ${hasError && s.error}`}>
			<div>
				<restProps.child {...restProps} {...input} />
			</div>
			<div>
				{hasError && <span>{meta.error}</span>}
			</div>
		</div>
	)
}

export const createField = (child, validators, placeholder, name, type=null, text=null, value=null, props={}) => {
	return (
		<div>
			{ text }
			<Field
				child={child}
				component={FormControl}
				validate={validators}
				placeholder={placeholder}
				name={name}
				type={type}
				{...props} //другие возможные параметры поля - это объект, например: {type: password}
			/>
		</div>
	)
}

const AddingTextForm = ({
	handleSubmit, textLength, textButton, 
	fieldProps:{child, placeholder, name, type}
}) => {
	const maxLength = maxLengthCreator(textLength)
	return(
		<form onSubmit={handleSubmit}>
			{createField(child, [maxLength], placeholder, name, type)}
			<div>
				<button>{textButton}</button>
			</div>
		</form>
	)
}

export const AddingTextReduxForm = reduxForm({form: "defaultFormName"})(AddingTextForm)