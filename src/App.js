import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
import UsersСontainer from './components/Users/UsersСontainer.tsx';
import SettingsContainer from './components/Settings/SettingsContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Login from './components/Login/Login.tsx';
import NotFoundPage from './components/NotFoundPage/NotFoundPage'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Provider, connect } from 'react-redux';
import { initializeApp } from './redux/appReducer.ts'
import Preloader from './components/common/Preloader/Preloader';
import { withRouter } from './hoc/withRouter';
import store from './redux/storeRedux';
import { withSuspense } from './hoc/withSuspense';
import ProfileContainerWithSuspense from './components/Profile/ProfileContainer'


// const ProfileContainer = React.lazy( () => import ('./components/Profile/ProfileContainer') )
const DialogsContainer = React.lazy( () => import ('./components/Dialogs/DialogsContainer') )
// const ProfileContainerWithSuspense = withSuspense(ProfileContainer)
const DialogsContainerWithSuspense = withSuspense(DialogsContainer)

class App extends React.Component {
	componentDidMount(){
		this.props.initializeApp();
	}
	
	components = {
		ProfileContainerWithSuspense,
		DialogsContainerWithSuspense,
		UsersСontainer,
		News,
		Music,
		SettingsContainer,
		Login,
		NotFoundPage
	}


	filterObj (components) {
		let filteredObject = {}
		Object.keys(components).map( key => {
			if (components[key] === true) {
				filteredObject[key] = true;
			}
			return filteredObject
		})
		return filteredObject
	}
	
	render(){
		if(!this.props.initialized) return <Preloader/>
		return (
			<div className='appWrapper'>
				<div className='header'>
					<HeaderContainer />
				</div>
				<div className='nav'>
					<NavbarContainer />
				</div>
				<div className='content'>
						{
						this.props.isAuth
							?withSettingsRoutes(this.filterObj(this.props.userSettings.components), this.components) //with user settings
							:withSettingsRoutes(this.props.userSettings.components, this.components) //standart settings
						}
				</div>
			</div>
		);
	}
}

const withSettingsRoutes = (settingsComponents, components) => {
	return <div>
	<Routes>
		{
			Object.keys(settingsComponents).map( key => {
				switch(key){
					case 'profile':
						return <Route key={key} path={key+'/:userId?'} element={<components.ProfileContainerWithSuspense />} />
					case 'dialogs':
						return <Route key={key} path={key} element={<components.DialogsContainerWithSuspense />} />
					case 'users':
						return <Route key={key} path={key} element={<components.UsersСontainer />} />
					case 'news':
						return <Route key={key} path={key} element={<components.News />} />
					case 'music':
						return <Route key={key} path={key} element={<components.Music />} />
					case 'settings':
						return <Route key={key} path={key} element={<components.SettingsContainer/>}/>
					default:
						return undefined
				}
			})
		}
		<Route path="/login" element={<components.Login/>}/>
		<Route path="*" element={<components.NotFoundPage />} />
	</Routes>
	</div>
}

const mapStateToProps = (state) => ({
	initialized: state.app.initialized,
	userSettings: state.settings.userSettings,
	isAuth: state.auth.isAuth
})

const AppWithHOC = compose(
	withRouter,
	connect(mapStateToProps, { initializeApp },
))(App);

const AppWithBrowserRouter = (props) => {
	return <BrowserRouter>
		<Provider store={store}>
			<AppWithHOC />
		</Provider>
	</BrowserRouter>
}

export default AppWithBrowserRouter