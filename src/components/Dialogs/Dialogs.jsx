import React from "react";
import s from "./Dialogs.module.css";
import Chat from "./Chat/Chat"
import Message from "./Message/Message";
import { AddingTextReduxForm } from "../common/FormsControls/FormsControls";
import { activeLink } from "../../utils/customLinks/customLinks";

const Dialogs = ({dialogsPage:{chats, messages}, addMessage}) => {

	let chatsElem = chats.map( 
		ch => <Chat activeLink={ activeLink } key={ch.id} id={ch.id} name={ch.name}/>);
	
	let messagesElem = messages.map( 
		m => <Message message={m.message} key={m.id}/>);

	let addNewMessage = (values) => { 
		addMessage(values.newMessageText);
	}

	return (
		<div className={s.dialogs}>
			<div className={s.chats}>
				{ chatsElem }
			</div>
			<div className={s.dialogsPage}>
				<div className={s.messages}>
					{ messagesElem }
				</div>
				<div className={s.newMessage}>
					<AddingTextReduxForm 
							form="dialogsAddMessage"
							onSubmit={addNewMessage}
							textLength={30}
							textButton="Send"
							fieldProps={{
								child: "textarea",
								placeholder: "Type message...",
								name: "newMessageText",
								type: "text"
							}}
						/>
				</div>
			</div>
		</div>
	);
}

export default Dialogs;