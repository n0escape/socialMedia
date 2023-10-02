import React, { ChangeEvent, useEffect, useState } from "react";

type propsType = {
	userStatus: string,
	updateUserStatus: (userStatus: string) => void
}


const ProfileStatus: React.FC<propsType> = (props) => {

	const [editMode, setEditMode] = useState(false)
	const [userStatus, setUserStatus] = useState(props.userStatus)

	useEffect( () => {
		setUserStatus(props.userStatus)
	}, [props.userStatus] )

	const activateEditMode = () => {
		setEditMode(true)
	}
	const deactivateEditMode = () => {
		setEditMode(false)
		props.updateUserStatus(userStatus)
	}
	const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
		//колбек на отображение изменяемого текста статуса
		setUserStatus(e.target.value)
	}

	return <>
	{!editMode &&
		<div>
			<span onDoubleClick={activateEditMode}>{props.userStatus || "________"}</span>
		</div>
	}
	{editMode &&
		<div>
			<input autoFocus={true} onChange={onStatusChange} onBlur={deactivateEditMode} value={userStatus} />
		</div>
	}
	</>
}

export default ProfileStatus;