import React from "react"
import s from "./FormsControls.module.css"
import { Field, InjectedFormProps, WrappedFieldProps } from "redux-form"
import { reduxForm } from 'redux-form';
import { fieldValidatorType, maxLengthCreator } from "../../../utils/validators/validators";
// import { newMessageFormValuesType, newMessageFormValuesTypeKeys } from "components/Dialogs/Dialogs";
// import { newPostFormValuesType, newPostFormValuesTypeKeys } from "components/Profile/MyPosts/MyPosts";

type FormControlPropsType = {
	child: "input" | "select" | "textarea",
	name: string, validators?: Array<fieldValidatorType>,
	placeholder?: string, type?: string, text?: string, value?: string,
}

// ComponentType<WrappedFieldProps & P>
export const FormControl: React.FC<WrappedFieldProps & FormControlPropsType> = ({input, meta, ...restProps}) => {
	const hasError = meta.touched && meta.error
	return(
		<div className={`${s.formControl} ${hasError && s.error}`}>
			<div>
				<restProps.child {...restProps} {...input}/>
			</div>
			<div>
				{hasError && <span>{meta.error}</span>}
			</div>
		</div>
	)
}


export function createField <formKeysType extends string> (
	child: "input" | "select" | "textarea", 
	name: formKeysType, 
	validators?: Array<fieldValidatorType>, 
	placeholder?: string | null, 
	type?: string | null, 
	text?: string | null, 
	value?: string | null, props={}
) {
	
	return (
		<div>
			{ text }
			<Field
				child={child}
				component={FormControl} //error with props
				validate={validators}
				placeholder={placeholder}
				name={name}
				type={type}
				{...props} //другие возможные параметры поля - это объект, например: {type: password}
			/>
		</div>
	)
}

// type ownPropsType = {
// 	textLength: number
// 	textButton: string
// 	name: fieldTypeKey
// }
// type fieldType = newMessageFormValuesType | newPostFormValuesType
// type fieldTypeKey = newMessageFormValuesTypeKeys | newPostFormValuesTypeKeys

// const AddingTextForm: React.FC<InjectedFormProps<{}, ownPropsType> & ownPropsType> = ({
// 	handleSubmit, textLength, textButton, name
// }) => {
// 	const maxLength = maxLengthCreator(textLength)
// 	return(
// 		<form onSubmit={handleSubmit}>
// 			{createField("textarea", name, [maxLength], "Type message...", "text")}
// 			<div>
// 				<button>{textButton}</button>
// 			</div>
// 		</form>
// 	)
// }

// export const AddingTextReduxForm = reduxForm<{}, ownPropsType>({form: "defaultFormName"})(AddingTextForm)