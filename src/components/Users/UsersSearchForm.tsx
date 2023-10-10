import React from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { filterType } from 'redux/usersReducer';

const usersSearchFormValidate = (values: any) => {
	const errors = {};
	return errors;
}

type propsType = {
	onFilterChanged: (filter: filterType) => void
}

type formType = {
	term: string
	friend: string
}

export const UsersSearchForm: React.FC<propsType> = React.memo(({onFilterChanged}) => {

	const submit = (values: formType, {setSubmitting}: FormikHelpers<formType>) => {
		// convert friend to bool | number
		const filter: filterType = {
			term: values.term,
			friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
		} 

		onFilterChanged(filter)
		setSubmitting(false)
	};

	return <div>
		<Formik
			initialValues={{ term: '', friend: 'null' }}
			validate={usersSearchFormValidate}
			onSubmit={submit}
		>
			{({ isSubmitting }) => (
				<Form>
					<Field type='text' name='term' />
					<Field name="friend" as="select">
						<option value="null">All</option>
						<option value="true">Only followed</option>
						<option value="false">Only unfollowed</option>
					</Field>
					<button type='submit' disabled={isSubmitting}>
						Find
					</button>
				</Form>
			)}
		</Formik>
	</div>;
})
