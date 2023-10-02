//const ACTION_TYPE = 'ACTION_TYPE';

type friendsType = {
	userId: number,
	name: string
}

let initialState = {
	friends: [
		{userId:1, name: 'Dima'},
		{userId:2, name: 'Alina'},
		{userId:3, name: 'Darina'},
		{userId:4, name: 'Artem'}
	] as Array<friendsType>
}

export type initialStateType = typeof initialState

const navBarReducer = (state = initialState, action: any): initialStateType => {
	return state;
}

export default navBarReducer;