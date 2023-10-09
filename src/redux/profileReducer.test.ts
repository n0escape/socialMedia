
import profileReducer, { actions } from './profileReducer';

let state = {
	posts: [
		{id: '1', message: 'It is my first post!', likeCounter: 15, createdAt:'', userId:1},
		{id: '2', message: 'It is my second post!', likeCounter: 20, createdAt:'', userId:3},
		{id: '3', message: 'Hello everyone!', likeCounter: 30, createdAt:'', userId:2}
	],
	userProfile: null,
	userStatus: '',
	editMode: false
};

test('patern', () => {
	//1. set test data

	//2. action

	//3. expectation
});
//unit test using TDD
//1 делаем ошибочный предполагаемый тест без реализованной логики
//2 добавляем action creator в reducer который диспатчится но пока не меняет state
//3 ломаем тест, добавляя expect. 
//Т.к action creator еще не меняет никак state то упадет ошибка теста в месте ожидания
//4 создаем кейс (в profileReducer) для обработки события из action creator




test('length of posts shouldn`t be changed by deleting post with wrong id', () => {
	//1. set test data
	let action = actions.deletePost('100')

	//2. action
	let changedState = profileReducer(state, action);

	//3. expectation
	expect(changedState.posts.length).toBe(3)
});
