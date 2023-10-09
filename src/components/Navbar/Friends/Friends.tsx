import React from "react";
import { NavLink } from "react-router-dom";
import s from './Friends.module.css';

type propsType = {
	userId: number | null
	name: string
	activeLink: (tempIvent: any) => any
}

const Friends: React.FC<propsType> = ({activeLink, userId, name}) => {

	let path = "/profile/" + userId;

	return(
		<div className={s.item}>
			<NavLink to={path} className = { activeLink }>
				<div>
					<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9wfQBmHUK8fspQb_4VM4TtWK40nk86WYPMi-vJG0vZw&s' alt='avatar'/>
				</div>
				<div>
					{name}
				</div>
			</NavLink>
		</div>
	);
}

export default Friends;