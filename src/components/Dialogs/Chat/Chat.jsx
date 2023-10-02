import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Chat.module.css";

const Chat = ({id, activeLink, name}) => {

	let path = "/dialogs/" + id;

	return(
		<div className={s.item}>
			<NavLink to={path} className = { activeLink }>
				<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9wfQBmHUK8fspQb_4VM4TtWK40nk86WYPMi-vJG0vZw&s' alt='avatar'/>
				{name}
			</NavLink>
		</div>
	);
}

export default Chat;