import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField} from '../../common/FormsControls/FormsControls';
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {newMessageFormValuesType} from '../Dialogs';

const maxLength50 = maxLengthCreator(50);

type NewMessageFormValuesKeysType = Extract<keyof newMessageFormValuesType, string>

type PropsType = {}

const AddMessageForm: React.FC<InjectedFormProps<newMessageFormValuesType, PropsType> & PropsType>
    = (props) => {
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