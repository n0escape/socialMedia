import {applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import dialogReducer from "./dialogReducer.ts";
import profileReducer from "./profileReducer.ts";
import navBarReducer from "./navbarReducer.ts";
import usersReducer from "./usersReducer.ts";
import authReducer from "./authReducer.ts";
import { reducer as formReducer } from "redux-form"
import appReducer from "./appReducer.ts";
import settingsReducer from "./settingsReducer.ts";

const rootReducer = combineReducers({
	contentBar: combineReducers({
		dialogsPage: dialogReducer,
		profilePage: profileReducer,
		usersPage: usersReducer
	}),
	navBar: navBarReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer,
	settings: settingsReducer,
});

type rootReducerType = typeof rootReducer; // (globalState: appStateType) => appStateType
export type appStateType = ReturnType<rootReducerType>

//@ts-ignore
//composeEnhancers works only with chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;

// в новой версии store с редюсорами объявляется так.
// export const store = configureStore({
// 	reducer: rootReducer
// })