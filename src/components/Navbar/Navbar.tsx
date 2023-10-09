import React from "react";
import { NavLink } from "react-router-dom";
import Friends from "./Friends/Friends";
import s from './Navbar.module.css';
import { activeLink } from '../../utils/customLinks/customLinks';
import { componentsType, friendsType } from "types/types";

type linkPropsType = {
	path: string
	activeLink: (tempIvent: any) => any
	text: string
}
const Link: React.FC<linkPropsType> = ({path, activeLink, text}) => {
	return <div className={s.item}>
		<NavLink to={path} className={ activeLink }>{text}</NavLink>
	</div>
}

type navbarPropsType = {
	friends: Array<friendsType>
	components: componentsType
}
const Navbar: React.FC<navbarPropsType> = ({friends, components}) => {
	
	let friendsElem = friends.map( fr => <Friends activeLink={activeLink} key={fr.userId} userId={fr.userId} name={fr.name}/>);

	const convertText = (text: string) => {
		return text[0].toUpperCase() + text.slice(1) 
		// изменяем первую букву и приписываем все кроме первой буквы
	}
	
	return(
		<nav className={s.contatiner}>
			{
				Object.keys(components).map( key =>
					<Link path={key} activeLink={activeLink} text={convertText(key)} key={key}/>
				)
			}
			<div className={s.item}>
				<h2>Friends</h2>
				<div className={s.friends}>
					{ friendsElem }
				</div>
			</div>
		</nav>
	);
}

export default Navbar;