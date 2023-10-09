import React from "react";
import s from './Header.module.css';
import { NavLink } from "react-router-dom";
import usersPhotoDefault from '../../assets/images/users.png';
import { mapDispatchToPropsType, mapStateToPropsType } from "./HeaderContainer";

type propsType = mapDispatchToPropsType & mapStateToPropsType

const Header: React.FC<propsType> = ({isAuth, logout, userPhoto, login}) => {
	return( 
		<header className={s.container}>
				<img src='https://upload.wikimedia.org/wikipedia/commons/1/1e/RPC-JP_Logo.png' alt='logo'/>
				<div className={s.loginBlock}>
					{isAuth 
					? <div>
							<button onClick={logout}>Logout</button>
							<img src={userPhoto || usersPhotoDefault} alt='user avatar'/>
							<span>{login}</span>
						</div>
					: <NavLink to={'/login'}>Login</NavLink>}
				</div>
		</header>
	);
}

export default Header;