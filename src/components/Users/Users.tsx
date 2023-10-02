import React from "react";
import Pagination from '../common/Pagination/Pagination.tsx'
import User from "./User/User.jsx";
import { usersType } from "../../types/types.ts";

type propsType = {
	totalUsersCount: number,
	pageSize: number,
	currentPage: number,
	onPageChanged: (pageNumber: number) => void,
	users: Array<usersType>,
	followingInProcess: Array<number>,
	unfollow: (userId: number) => void,
	follow: (userId: number) => void
}

const Users: React.FC<propsType> = (
	{totalUsersCount, pageSize, currentPage, onPageChanged, users, followingInProcess, unfollow, follow}
) => (
	<div>
		<Pagination 
			totalItemsCount={totalUsersCount}
			pageSize={pageSize}
			currentPage={currentPage}
			onPageChanged={onPageChanged}
		/>
		{ users.map( user =>
			<User 
				user={user}
				key={user.id}
				followingInProcess={followingInProcess}
				unfollow={unfollow}
				follow={follow}
			/>
		)}
	</div>
)

export default Users;