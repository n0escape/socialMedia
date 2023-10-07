import React from "react";
import { connect } from "react-redux";
import { follow, unfollow, getUsers } from "../../redux/usersReducer.ts";
import Users from "./Users.tsx";
import Preloader from "../common/Preloader/Preloader.jsx";
import { compose } from "redux";
import { getCurrentPage, getIsFetching, getFollowingInProcess,
	 getPageSize, getStateUsersReselect, getTotalUsersCount } from '../../redux/usersSelectors.ts';
import { userType } from "../../types/types.ts";
import { appStateType } from "../../redux/storeRedux.ts";

type mapStateToPropsType = {
	currentPage: number,
	pageSize: number,
	totalUsersCount: number,
	isFetching: boolean,
	users: Array<userType>,
	followingInProcess: Array<number>,
}
type mapDispatchToPropsType = {
	getUsers: (currentPage: number, pageSize: number) => void,
	unfollow: (userId: number) => void,
	follow: (userId: number) => void,
}
type ownPropsType = {
	// own props
}
type propsType = mapStateToPropsType & mapDispatchToPropsType & ownPropsType

class UsersContainer extends React.Component<propsType> {

	componentDidMount () {
		let {currentPage, pageSize}= this.props
		this.props.getUsers(currentPage, pageSize)
	}

	onPageChanged = (currentPageNumb: number) => {
		let {pageSize}= this.props
		this.props.getUsers(currentPageNumb, pageSize)
	}

	render () {
		return <>
			{this.props.isFetching ? <Preloader /> : null}
			<Users	totalUsersCount={this.props.totalUsersCount}
							pageSize={this.props.pageSize}
							onPageChanged={this.onPageChanged}
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
	followingInProcess: getFollowingInProcess(state)
})

export default compose(
	connect<mapStateToPropsType, mapDispatchToPropsType, ownPropsType, appStateType>(
		mapStateToProps,
		{follow, unfollow, getUsers})
)(UsersContainer)