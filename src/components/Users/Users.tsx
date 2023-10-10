import React, { useEffect } from 'react';
import Pagination from '../common/Pagination/Pagination.tsx'
import User from './User/User.tsx';
import { UsersSearchForm } from './UsersSearchForm.tsx';
import { filterType, getUsers } from 'redux/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getFollowingInProcess, getPageSize, getStateUsersReselect, getTotalUsersCount, getUsersFilter } from 'redux/usersSelectors.ts';
import { appDispatch } from 'redux/storeRedux.ts';
import { follow, unfollow } from './../../redux/usersReducer';

type propsType = {
	
}

const Users: React.FC<propsType> = ({}) => {

	const users = useSelector(getStateUsersReselect)
	const totalUsersCount = useSelector(getTotalUsersCount)
	const pageSize = useSelector(getPageSize)
	const currentPage = useSelector(getCurrentPage)
	const filter = useSelector(getUsersFilter)
	const followingInProcess = useSelector(getFollowingInProcess)

	const dispatch = useDispatch<appDispatch>()

	useEffect(() => {
		dispatch(getUsers(currentPage, pageSize, filter))
	}, [])

	const onPageChanged = (currentPageNumb: number) => {
		dispatch(getUsers(currentPageNumb, pageSize, filter))
	}
	const onFilterChanged = (filter: filterType) => {
		dispatch(getUsers(1, pageSize, filter))
	}
	const onFollow = (userId: number) => {
		dispatch(follow(userId))
	}
	const onUnFollow = (userId: number) => {
		dispatch(unfollow(userId))
	}

	return <div>
		<UsersSearchForm onFilterChanged={onFilterChanged} />
		<Pagination
			totalItemsCount={totalUsersCount}
			pageSize={pageSize}
			currentPage={currentPage}
			onPageChanged={onPageChanged}
		/>
		{ users.map( user =>
			<User
				key={user.id}
				user={user}
				followingInProcess={followingInProcess}
				unfollow={onUnFollow}
				follow={onFollow}
			/>
		)}
	</div>
}

export default Users;


