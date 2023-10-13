import { Avatar, message } from 'antd'
import React, { useEffect, useState } from 'react'

const wsChanel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

type GlobalChatPagePropsType = {}

const GlobalChatPage: React.FC<GlobalChatPagePropsType> = (props) => {
	return <div>
		<GlobalChat />
	</div>
}

export default GlobalChatPage

type globalChatPropsType = {}

const GlobalChat: React.FC<globalChatPropsType> = (props) => {
	return <div>
		<Messages />
		<AddMessageForm />
	</div>
}

type messagesPropsType = {}

const Messages: React.FC<messagesPropsType> = (props) => {
	
	const [messages, setMessages] = useState<Array<messageType>>([])
	useEffect(() => {
		wsChanel.addEventListener('message', (e: MessageEvent) => {
			let newMessages = JSON.parse(e.data)
			setMessages( (prevMessages) => [...prevMessages, ...newMessages] )
		})
	}, [])

	return <div style={{maxHeight: '400px', overflowY: 'auto'}}>
		{
			messages.map((m, index) => <Message key={index} message={m}/>)
		}
	</div>
}

type messagePropsType = {
	message: messageType
}
type messageType = {
	message: string
	photo: string
	userId: number
	userName: string
}

const Message: React.FC<messagePropsType> = ({message}) => {
	return <div>
		{
			message.photo != null
				? <Avatar src={message.photo} size={40}/>
				: <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}> {message.userName[0].toUpperCase()} </Avatar>
		}
		<b>{message.userName}</b>
		<br />
		{message.message}
		<hr />
	</div>
}

type addMessageFormPropsType = {}

const AddMessageForm: React.FC<addMessageFormPropsType> = (props) => {

	const [message, setMessage] = useState('')
	const sendMessage = () => {
		if(!message) return;
		wsChanel.send(message)
		setMessage('')
	}

	return <div>
		<div>
			<textarea onChange={ (e) => setMessage(e.currentTarget.value) } value={message}></textarea>
		</div>
		<div>
			<button onClick={sendMessage}>Send</button>
		</div>
	</div>
}

