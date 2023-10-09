import React from "react";
import s from "./Dialogs.module.css";
import Chat from "./Chat/Chat"
import Message from "./Message/Message";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import { activeLink } from "../../utils/customLinks/customLinks";
import { initialStateType } from "redux/dialogReducer";

export type newMessageFormValuesType = {
	newMessageText: string
}
type propsType = {
	dialogsPage: initialStateType
	addMessage: (newMessageText: string) => void
}

const Dialogs: React.FC<propsType> = ({dialogsPage:{chats, messages}, addMessage}) => {

	let chatsElem = chats.map( 
		ch => <Chat key={ch.id} activeLink={ activeLink } id={ch.id} name={ch.name}/>);
	
	let messagesElem = messages.map( 
		m => <Message key={m.id} message={m.message}/>);

	let addNewMessage = (values: newMessageFormValuesType) => { 
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
					{/* <AddingTextReduxForm 
							form="dialogsAddMessage"
							onSubmit={addNewMessage}
							textLength={30}
							textButton="Send"
							name="newMessageText"
					/> */}
					<AddMessageForm onSubmit={addNewMessage} />
				</div>
			</div>
		</div>
	);
}

export default Dialogs;