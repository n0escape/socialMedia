import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, getStringKeys} from '../../common/FormsControls/FormsControls';
import {maxLengthCreator} from "../../../utils/validators/validators";
import {newMessageFormValuesType} from '../Dialogs';

const maxLength50 = maxLengthCreator(50);

type NewMessageFormValuesKeysType = getStringKeys<newMessageFormValuesType>

type PropsType = {}

const AddMessageForm: React.FC<InjectedFormProps<newMessageFormValuesType, PropsType> & PropsType> = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
				<div>
						{createField<NewMessageFormValuesKeysType>("textarea", 'newMessageText', [maxLength50], "Type message...", "text")}
				</div>
				<div>
						<button>Send</button>
				</div>
		</form>
	)
}

export default reduxForm<newMessageFormValuesType>({form: 'addMessageDialogForm'})(AddMessageForm);