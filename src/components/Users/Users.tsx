import React from 'react';
import Pagination from '../common/Pagination/Pagination.tsx'
import User from './User/User.tsx';
import { userType } from '../../types/types.ts';
import { UsersSearchForm } from './UsersSearchForm.tsx';
import { filterType } from 'redux/usersReducer';

type propsType = {
	totalUsersCount: number
	pageSize: number
	currentPage: number
	onPageChanged: (pageNumber: number) => void
	users: Array<userType>
	followingInProcess: Array<number>
	unfollow: (userId: number) => void
	follow: (userId: number) => void
	onFilterChanged: (filter: filterType) => void
}

const Users: React.FC<propsType> = ({
	totalUsersCount, pageSize, currentPage, onPageChanged, users, followingInProcess, unfollow, follow, onFilterChanged
}) => (
	<div>
		<UsersSearchForm onFilterChanged={onFilterChanged} />
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


