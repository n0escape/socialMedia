import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './redux/storeRedux.ts';
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWithBrowserRouter from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

export let rerenderEntireTree = (state) => {
	root.render(
		<React.StrictMode>
			<AppWithBrowserRouter />
		</React.StrictMode>
	);
}


rerenderEntireTree(store.getState());
window.store= store
 
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();