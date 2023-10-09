import usersReducer, { actions, initialStateType } from './usersReducer'

let state: initialStateType;

beforeEach(() => {
	state = {
		users: [
			{
				id: 1,
				name: 'Dima 1',
				status: 'some status 1',
				photos: { small: null, large: null },
				followed: false
			},
			{
				id: 2,
				name: 'Dima 2',
				status: 'some status 2',
				photos: { small: null, large: null },
				followed: false
			},
			{
				id: 3,
				name: 'Dima 3',
				status: 'some status 3',
				photos: { small: null, large: null },
				followed: true
			},
			{
				id: 4,
				name: 'Dima 4',
				status: 'some status 4',
				photos: { small: null, large: null },
				followed: true
			},
		],
		pageSize: 100, //количество людей на странице
		totalUsersCount: 20,	// заглушка, на общее количество человек
		currentPage: 1,
		isFetching: false,
		followingProcess: [ ] //массив users ids
	}
})


test ('follow Successed', () => {

	const newState = usersReducer(state, actions.followSuccess(1))

	expect(newState.users[0].followed).toBeTruthy();
	expect(newState.users[1].followed).toBeFalsy();

})
test ('unfollow Successed', () => {
	
	const newState = usersReducer(state, actions.unfollowSuccess(3))

	expect(newState.users[2].followed).toBeFalsy();
	expect(newState.users[3].followed).toBeTruthy();

})