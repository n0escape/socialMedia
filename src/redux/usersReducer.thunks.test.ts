import { usersAPI } from '../api/usersAPI'
import { actions, follow, unfollow } from './usersReducer'
import { APIResponseType, resultCodesEnum } from 'api/api'
jest.mock('../api/usersAPI')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const APIResponse: APIResponseType = {
	resultCode: resultCodesEnum.Success,
	messages: [],
	data: {}
}

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
	dispatchMock.mockClear()
	getStateMock.mockClear()
	usersAPIMock.followUser.mockClear()
	usersAPIMock.unfollowUser.mockClear()
})

test ('Successed follow thunk', async () => {
	usersAPIMock.followUser.mockReturnValue(Promise.resolve(APIResponse))

	const thunk = follow(1)
	await thunk(dispatchMock, getStateMock, {})
	
	expect(dispatchMock).toBeCalledTimes(3)
	expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowingProcess(true, 1))
	expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
	expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowingProcess(false, 1))
})

test ('Successed follow thunk', async () => {
	usersAPIMock.unfollowUser.mockReturnValue(Promise.resolve(APIResponse))

	const thunk = unfollow(3)
	await thunk(dispatchMock, getStateMock, {})
	
	expect(dispatchMock).toBeCalledTimes(3)
	expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowingProcess(true, 3))
	expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(3))
	expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowingProcess(false, 3))
})