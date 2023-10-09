import React from "react";
import s from "./Message.module.css";

type propsType = {
	message: string
}

const Message: React.FC<propsType> = ({message}) => {
	return(
		<div className={s.item}>
			<span>{message}</span>
		</div>
	);
}

export default Message;