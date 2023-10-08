import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, getStringKeys} from '../../../common/FormsControls/FormsControls';
import {maxLengthCreator} from '../../../../utils/validators/validators';
import { addPostFormValuesType } from '../MyPosts';

const maxLength30 = maxLengthCreator(30);

type PropsType = {
}

type addPostFormValuesTypeKeys = getStringKeys<addPostFormValuesType>

const AddPostForm: React.FC<InjectedFormProps<addPostFormValuesType, PropsType> & PropsType> = (props) => {
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

export default reduxForm<addPostFormValuesType, PropsType>({form: 'addPostProfileForm'})(AddPostForm)