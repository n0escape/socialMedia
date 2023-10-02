import React from "react";
import s from "./Message.module.css";

const Message = ({message}) => {
	return(
		<div className={s.item}>
			<span>{message}</span>
		</div>
	);
}

export default Message;