import profileReducer, { addPostActionCreator, deletePost } from "./profileReducer";

let state = {
	posts: [
		{id: 1, message: "It is my first post!", likeCounter: 15},
		{id: 2, message: "It is my second post!", likeCounter: 20},
		{id: 3, message: "Hello everyone!", likeCounter: 30}
	]
};

test('length of posts should be incremented', () => {
	//1. set test data
	let action = addPostActionCreator("Bla bla bla new post")

	//2. action
	let changedState = profileReducer(state, action);

	//3. expectation
	expect(changedState.posts.length).toBe(4);
});

test('text of new post should be correct', () => {
	//1. set test data
	let action = addPostActionCreator("Bla bla bla new post")

	//2. action
	let changedState = profileReducer(state, action);

	//3. expectation
	expect(changedState.posts[3].message).toBe("Bla bla bla new post");
});

//unit test using TDD
//1 делаем ошибочный предполагаемый тест без реализованной логики
//2 добавляем action creator в reducer который диспатчится но пока не меняет state
//3 ломаем тест, добавляя expect. 
//Т.к action creator еще не меняет никак state то упадет ошибка теста в месте ожидания
//4 создаем кейс (в profileReducer) для обработки события из action creator


test('length of posts should be decremented by deleting post', () => {
	//1. set test data
	let action = deletePost(1)

	//2. action
	let changedState = profileReducer(state, action);

	//3. expectation
	expect(changedState.posts.length).toBe(2)
});

test('length of posts shouldn`t be changed by deleting post with wrong id', () => {
	//1. set test data
	let action = deletePost(100)

	//2. action
	let changedState = profileReducer(state, action);

	//3. expectation
	expect(changedState.posts.length).toBe(3)
});
