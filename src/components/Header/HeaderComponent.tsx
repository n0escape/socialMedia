import React from "react";
import s from './Header.module.css';
import { NavLink } from "react-router-dom";
//import usersPhotoDefault from '../../assets/images/users.png';
import { useDispatch, useSelector } from "react-redux";
import { getIsAuth, getLogin, getUserPhoto } from "redux/authSelectors";
import { appDispatch } from "redux/storeRedux";
import { logout } from "redux/authReducer";
import { Avatar, Button } from "antd";

type propsType = {}

export const HeaderComponent: React.FC<propsType> = (props) => {

	const isAuth = useSelector(getIsAuth)
	const userPhoto = useSelector(getUserPhoto)
	const login = useSelector(getLogin) as string

	const dispatch = useDispatch<appDispatch>()
	const onLogout = () => {
		dispatch(logout())
	}

	return( 
		// todo: add responsive to less than 280px width
		<header className={s.container}>
				<img src='https://upload.wikimedia.org/wikipedia/commons/1/1e/RPC-JP_Logo.png' alt='logo'/>
				<div className={s.loginBlock}>
					{
						isAuth 
							? <div>
									<Button onClick={onLogout}>Logout</Button>
									{
										userPhoto != null
											? <Avatar src={<img src={userPhoto} alt={login} />} />
											: <Avatar style={{ backgroundColor: '#fadb14', color: 'black' }}>
													{login[0].toUpperCase()}
												</Avatar>
									}
								</div>
							: <div>
									<Button><NavLink to={'/login'}>Login</NavLink></Button>
								</div>
					}
				</div>
		</header>
	);
}
