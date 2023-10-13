import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, NavLink } from 'react-router-dom'
import { compose } from 'redux';
import { Provider, connect } from 'react-redux'
//import 'antd/dist/antd.css'

import './App.css';
import {HeaderComponent} from './components/Header/HeaderComponent'
import {NavbarLink} from './components/NavbarLink/NavbarLink'
import {UsersPage} from './components/Users/UsersСontainer'
import SettingsContainer from './components/Settings/SettingsContainer'
import News from './components/News/News'
import Music from './components/Music/Music'
import {Login} from './components/Login/Login'
import NotFoundPage from './components/NotFoundPage/NotFoundPage'
import Preloader from './components/common/Preloader/Preloader'

import ProfileContainerWithSuspense from './components/Profile/ProfileContainer'

import { initializeApp } from './redux/appReducer'
import store, { appStateType } from './redux/storeRedux'
import { withRouter } from './hoc/withRouter'
import { withSuspense } from './hoc/withSuspense'

import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { componentsType } from 'types/types';
const { Header, Content, Footer, Sider } = Layout;


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem;
}
// const items: MenuItem[] = [
// 	getItem('Team', 'sub1', <TeamOutlined />, [
// 		getItem('Team 1', '6'),
// 		getItem('Team 2', '7')
// 	]),
// ]
const convertText = (text: string) => {
	return text[0].toUpperCase() + text.slice(1) 
	// изменяем первую букву и приписываем все кроме первой буквы
}

	// const ProfileContainer = React.lazy( () => import ('./components/Profile/ProfileContainer') )
const DialogsContainer = React.lazy( () => import ('./components/Dialogs/DialogsContainer') )
// const ProfileContainerWithSuspense = withSuspense(ProfileContainer)
const DialogsContainerWithSuspense = withSuspense(DialogsContainer)

type mapPropsType = ReturnType<typeof mapStateToProps>
type dispatchPropsType = {
	initializeApp: () => void
}

const App: React.FC<mapPropsType & dispatchPropsType> = React.memo(({initializeApp, initialized, userSettings, isAuth}) => {
	const catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
		alert('some error occured')
	}
	useEffect(() => {
		initializeApp();
		window.removeEventListener("unhandledrejection", catchAllUnhandledErrors);
	}, [])
	
	const components = {
		ProfileContainerWithSuspense,
		DialogsContainerWithSuspense,
		UsersPage,
		News,
		Music,
		SettingsContainer,
		Login,
		NotFoundPage
	}

	const filterObj = (objComps: componentsType) => {
		let filteredObject = {} as componentsType
		Object.keys(objComps).map( key => {
			if (objComps[key as keyof componentsType] === true) {
				filteredObject[key as keyof componentsType] = true;
			}
			return filteredObject
		})
		return filteredObject
	}

	const fillNavList = (objComps: componentsType) => {
		let list: MenuItem[] = [];
		Object.keys(objComps).map( (key, index) => 
			list.push(
				getItem(
					convertText(key), //текст ссылки
					index + 1, //порядковый номер ссылки
					<NavbarLink key={key} path={key} iconName={key}/> //ссылка на компоненту
				)
			)
		)
		return list;
	}
	const items: MenuItem[] = (isAuth)
		? fillNavList(filterObj(userSettings.components))
		: fillNavList(userSettings.components)
	
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer },
	} = theme.useToken()

	if(!initialized) return <Preloader/>
	return (

		<Layout style={{ minHeight: '100vh' }}>
			<Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
				<div className="demo-logo-vertical" />
				<Menu theme="dark" mode="inline" items={items} />
			</Sider>
			<Layout>
				<Header style={{ padding: 0, background: colorBgContainer }}>
					<HeaderComponent />
				</Header>
				<Content style={{ margin: '0 16px' }}>
					<Breadcrumb style={{ margin: '16px 0', textAlign: 'center' }}>
						<Breadcrumb.Item>User</Breadcrumb.Item>
						<Breadcrumb.Item>Bill</Breadcrumb.Item>
					</Breadcrumb>
					<div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
						{
							isAuth
							?withSettingsRoutes(filterObj( userSettings.components), components ) //with user settings
							:withSettingsRoutes( userSettings.components, components ) //standart settings
						}
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					Social Network ©2023 Created by AntDesign & Dima (NoEscape) Zavadovskyi
				</Footer>
			</Layout>
		</Layout>
	);
})

const withSettingsRoutes = (settingsComponents: any, components: any) => {
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
						return <Route key={key} path={key} element={<components.UsersPage />} />
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

const mapStateToProps = (state: appStateType) => ({
	initialized: state.app.initialized,
	userSettings: state.settings.userSettings,
	isAuth: state.auth.isAuth
})

const AppWithHOC = compose<React.ComponentType>(
	withRouter,
	connect(mapStateToProps, { initializeApp },
))(App);

const AppWithBrowserRouter: React.FC = () => {
	return <BrowserRouter>
		<Provider store={store}>
			<AppWithHOC />
		</Provider>
	</BrowserRouter>
}

export default AppWithBrowserRouter