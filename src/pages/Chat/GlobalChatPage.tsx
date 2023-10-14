import { Avatar } from 'antd'
import { messageType } from 'api/globalChatAPI'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage, startMessagesListening, stopMessagesListening } from 'redux/globalChatReducer'
import { getMessages } from 'redux/globalChatSelectors'
import { appDispatch } from 'redux/storeRedux'

type GlobalChatPagePropsType = {}

const GlobalChatPage: React.FC<GlobalChatPagePropsType> = (props) => {
	return <div>
		<GlobalChat />
	</div>
}

export default GlobalChatPage

type globalChatPropsType = {}

const GlobalChat: React.FC<globalChatPropsType> = (props) => {

	const dispatch = useDispatch<appDispatch>()
	useEffect(()=>{
		console.log('we are in')
		dispatch(startMessagesListening())
		return () => {
			console.log('we are out')
			dispatch(stopMessagesListening())
		}
		// eslint-disable-next-line
	}, [])

	return <div>
		<Messages />
		<AddMessageForm />
	</div>
}

type messagesPropsType = {}
const Messages: React.FC<messagesPropsType> = (props) => {
	
	const messages = useSelector(getMessages)

	return <div style={{maxHeight: '400px', overflowY: 'auto'}}>
		{
			messages.map((m, index) => <Message key={index} message={m}/>)
		}
	</div>
}

type messagePropsType = {
	message: messageType
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

	const dispatch = useDispatch<appDispatch>()

	const sendMessageHandler = () => {
		if(!message) return;
		dispatch(sendMessage(message))
		setMessage('')
	}

	return <div>
		<div>
			<textarea onChange={ (e) => setMessage(e.currentTarget.value) } value={message}></textarea>
		</div>
		<div>
			<button disabled={false} onClick={sendMessageHandler}>Send</button>
		</div>
	</div>
}

