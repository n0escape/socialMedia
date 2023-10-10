import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, getUsers, filterType } from '../../redux/usersReducer.ts';
import Users from './Users.tsx';
import Preloader from '../common/Preloader/Preloader.tsx';
import { compose } from 'redux';
import { getCurrentPage, getIsFetching, getFollowingInProcess,
	 getPageSize, getStateUsersReselect, getTotalUsersCount, getUsersFilter } from '../../redux/usersSelectors.ts';
import { userType } from '../../types/types.ts';
import { appStateType } from '../../redux/storeRedux.ts';

type mapStateToPropsType = {
	currentPage: number
	pageSize: number
	totalUsersCount: number
	isFetching: boolean
	users: Array<userType>
	followingInProcess: Array<number>
	filter: filterType
}
type mapDispatchToPropsType = {
	getUsers: (currentPage: number, pageSize: number, filter: filterType) => void
	unfollow: (userId: number) => void
	follow: (userId: number) => void
}
type ownPropsType = {
	// own props
}
type propsType = mapStateToPropsType & mapDispatchToPropsType & ownPropsType

class UsersContainer extends React.Component<propsType> {

	componentDidMount () {
		const {currentPage, pageSize, filter}= this.props
		this.props.getUsers(currentPage, pageSize, filter)
	}

	onPageChanged = (currentPageNumb: number) => {
		const {pageSize, filter}= this.props
		this.props.getUsers(currentPageNumb, pageSize, filter)
	}

	onFilterChanged = (filter: filterType) => {
		const {pageSize}= this.props
		this.props.getUsers(1, pageSize, filter) //(currentPage, pageSize, filter)
	}

	render () {
		return <>
			{this.props.isFetching ? <Preloader /> : null}
			<Users	totalUsersCount={this.props.totalUsersCount}
							pageSize={this.props.pageSize}
							onPageChanged={this.onPageChanged}
							onFilterChanged={this.onFilterChanged}
							currentPage={this.props.currentPage}
							users={this.props.users}
							unfollow={this.props.unfollow}
							follow={this.props.follow}
							followingInProcess={this.props.followingInProcess}
			/>
		</>
	}
}

//return obj of props parametrs
let mapStateToProps = (state: appStateType): mapStateToPropsType => ({
	users: getStateUsersReselect(state),
	pageSize: getPageSize(state),
	totalUsersCount: getTotalUsersCount(state),
	currentPage: getCurrentPage(state),
	isFetching: getIsFetching(state),
	followingInProcess: getFollowingInProcess(state),
	filter: getUsersFilter(state)
})

export default compose(
	connect<mapStateToPropsType, mapDispatchToPropsType, ownPropsType, appStateType>(
		mapStateToProps,
		{follow, unfollow, getUsers})
)(UsersContainer)