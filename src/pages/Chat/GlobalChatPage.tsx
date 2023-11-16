import { Avatar } from 'antd'
import { messageAPIType } from 'api/globalChatAPI'
import { withAuthRedirect } from 'hoc/withAuthRedirect'
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { compose } from 'redux'
import { sendMessage, startMessagesListening, stopMessagesListening } from 'redux/globalChatReducer'
import { getMessages, getStatus } from 'redux/globalChatSelectors'
import { appDispatch } from 'redux/storeRedux'
import s from './GlobalChat.module.css';

type GlobalChatPagePropsType = {}

const GlobalChatPage: React.FC<GlobalChatPagePropsType> = (props) => {
	return <div>
		<GlobalChat />
	</div>
}

export default compose<React.ComponentType>(
	withAuthRedirect,
)(GlobalChatPage)

type globalChatPropsType = {}
const GlobalChat: React.FC<globalChatPropsType> = (props) => {
	
	const status = useSelector(getStatus)
	const dispatch = useDispatch<appDispatch>()
	useEffect(()=>{
		dispatch(startMessagesListening())
		return () => {
			dispatch(stopMessagesListening())
		}
		// eslint-disable-next-line
	}, [])

	return <div>
		{status === 'error' && <div>Some error occured. Please refresh the page</div>}
		<>
			<Messages />
			<AddMessageForm />
		</>
	</div>
}

type messagesPropsType = {}
const Messages: React.FC<messagesPropsType> = (props) => {
	const messages = useSelector(getMessages)
	const messagesAnchorRef = useRef<HTMLDivElement>(null)
	const [isAutoScroll, setIsAutoScroll] = useState(false)

	const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
		const element = e.currentTarget
		if( Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight ) < 150 ) {
			!isAutoScroll && setIsAutoScroll(true)
		} else {
			isAutoScroll && setIsAutoScroll(false)
		}
	}

	useEffect(()=>{
		isAutoScroll && messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
	// eslint-disable-next-line
	}, [messages])
	return <div className={s.messagesContainer} onScroll={scrollHandler}>
		{messages.map((m, index) => <Message key={m.id} message={m}/>)}
		<div ref={messagesAnchorRef}></div>
	</div>
}

type messagePropsType = {
	message: messageAPIType
}
const Message: React.FC<messagePropsType> = React.memo(({message}) => {
	console.log('>>>>>Message')
	return <div className={s.messagesItem}>
		<div>
			{
				message.photo != null
					? <Avatar src={message.photo} size={40}/>
					: <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}> {message.userName[0].toUpperCase()} </Avatar>
			}
			<span className={s.userName}>{message.userName}</span>
		</div>
		{message.message}
	</div>
})

type addMessageFormPropsType = {}
const AddMessageForm: React.FC<addMessageFormPropsType> = (props) => {
	const [message, setMessage] = useState('')
	const dispatch = useDispatch<appDispatch>()
	const status = useSelector(getStatus)
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
			<button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
		</div>
	</div>
}

