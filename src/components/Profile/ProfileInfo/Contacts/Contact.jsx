import React from "react";
import s from './Contact.module.css';
// import usersPhoto from './../../../../assets/images/socialNetworks/facebookIcon.png';

const Contact = (props) => {
	return(
		<div className={s.contactLinks}>
			<a href={props.link}>
				<img src={props.icon} alt={props.contact+'link'}/>
			</a>
		</div>
	);
}

export default Contact;