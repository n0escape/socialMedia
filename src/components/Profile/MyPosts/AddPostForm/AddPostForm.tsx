import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField} from '../../../common/FormsControls/FormsControls';
import {maxLengthCreator} from '../../../../utils/validators/validators';
import { addPostFormValuesType } from '../MyPosts';

const maxLength30 = maxLengthCreator(30);

export type AddPostFormValuesType = {
	newPostText: string
}
type PropsType = {
}

type addPostFormValuesTypeKeys = Extract<keyof addPostFormValuesType, string>

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
	return (
					<form onSubmit={props.handleSubmit}>
							<div>
							{createField<addPostFormValuesTypeKeys>("textarea", 'newPostText', [maxLength30], "Type post...", "text")}
							</div>
							<div>
									<button>Add post</button>
							</div>
					</form>
	)
}

export default reduxForm<AddPostFormValuesType, PropsType>({form: 'addPostProfileForm'})(AddPostForm)