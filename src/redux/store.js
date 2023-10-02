import dialogReducer from "./dialogReducer";
import navBarReducer from "./navbarReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";

let store = {
	_state: {
		contentBar:{
			dialogsPage: {
				chats: [
					{id: 1, name: 'Dima'},
					{id: 2, name: 'Darina'},
					{id: 3, name: 'Alina'},
					{id: 4, name: 'Masha'},
					{id: 5, name: 'Artem'},
					{id: 6, name: 'Bogdan'}
				],
				messages: [
					{id: 1, message: "Hi"},
					{id: 2, message: "Hello"},
					{id: 3, message: "Yo"},
				],
				newMessageText: "",
			},
			profilePage: {
				posts: [
					{id: 1, message: "It is my first post!", likeCounter: 15},
					{id: 2, message: "It is my second post!", likeCounter: 20},
					{id: 3, message: "Hello everyone!", likeCounter: 30}
				],
				newPostText: "",
			},
			usersPage:{
				
			}
		},
		navBar: {
			friends: [
				{userId:1, name: 'Dima'},
				{userId:2, name: 'Alina'},
				{userId:3, name: 'Darina'},
				{userId:4, name: 'Artem'}
			]
		}
	},
	_callSubscriber() {
		console.log('State changed');
	},

	getState() {
		return this._state;
	},
	subscriber(observer) {
		this._callSubscriber = observer; //наблюдатель(observer) - патерн
	},

	dispatch(action) {
		this._state.contentBar.dialogsPage = dialogReducer(this._state.contentBar.dialogsPage, action);
		this._state.contentBar.profilePage = profileReducer(this._state.contentBar.profilePage, action);
		this._state.navBar = navBarReducer(this._state.navBar, action);
		this._state.sample = usersReducer(this._state.sample, action);
		this._callSubscriber(this._state);
	},

}

export default store;
window.store = store;