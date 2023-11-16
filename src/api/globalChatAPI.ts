const subscribers = {
	'messagesReceived': [] as messagesReceivedSubscriberType[],
	'statusChanged': [] as statusChangedSubscriberType[]
}

let ws: WebSocket | null = null
type eventsNamesType = 'messagesReceived' | 'statusChanged'

const closeHandler = () => {
	console.log('CLOSE WS')
	notifySubscribersAboutStatus('pending')
	setTimeout(createChanel, 3000) //переподключение к каналу через 3 секунды
}

const addMessageHandler = (e: MessageEvent) => {
	const newMessages = JSON.parse(e.data) // получаем сообщения с сервера
	subscribers['messagesReceived'].forEach( s => s(newMessages)) // возможна ошибка если колбек будет не только для сообщений
	//если subscribers не пустой массив
	//значит отслеживаем сообщения и каждому колбеку передаем тсообщения в виде массива объектов
}
const openHandler = () => {
	console.log('WS IS READY')
	notifySubscribersAboutStatus('ready')
}
const errorHandler = () => {
	console.log('REFRESH PAGE')
	notifySubscribersAboutStatus('error')
}

const cleanUp = () => {
	window.removeEventListener("offline", closeHandler)
	ws?.removeEventListener('close', closeHandler)
	ws?.removeEventListener('message', addMessageHandler)
	ws?.removeEventListener('open', openHandler)
	ws?.removeEventListener('error', errorHandler)
	ws?.close() //закрытие канала	
}

const notifySubscribersAboutStatus = (status: statusType) => subscribers['statusChanged'].forEach(s=> s(status))

function createChanel() {
	cleanUp() //зачистка ивентов

	ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
	notifySubscribersAboutStatus('pending')
	window.addEventListener("offline", closeHandler) // отслеживание интернет соединения
	ws.addEventListener('close', closeHandler) // отслеживание закрытия канала
	ws.addEventListener('message', addMessageHandler) // отслеживание отправки сообщения
	ws.addEventListener('open', openHandler) // отслеживание открытия канала
	ws.addEventListener('error', errorHandler) // отслеживание ошибки подключения канала
}
export const globalChatAPI = {
	async start(){
		createChanel() //инициализация подключение
	},
	async stop(){
		subscribers['messagesReceived'] = [] //зачистка подписчиков на сообщения
		subscribers['statusChanged'] = [] //зачистка подписчиков на статус
		cleanUp() //зачистка ивентов
	},
	async subscribe( eventName: eventsNamesType, callback: messagesReceivedSubscriberType | statusChangedSubscriberType) {
		//@ts-ignore
		subscribers[eventName].push(callback) //подписка на изменения
		// если происходит ивент (новые сообщения) вызываем колбек из bll 

		// отписка внутри подписки, через return 
		// при назначении в переменную результата вызова функции: let unsub = globalChatAPI.sub(...)
		// и вызов переменной как функции, произойдет отписка: unsub()
		// return () => {
		// subscribers[eventName] = subscribers[eventName]
		// 	.filter( s => s !== callback)
		// }
	},
	async unsubscribe( eventName: eventsNamesType, callback: messagesReceivedSubscriberType | statusChangedSubscriberType) {
		//@ts-ignore
		subscribers[eventName] = subscribers[eventName]
			.filter( s => s !== callback)
		// прекращение отслеживания в зависимости от переданного колбека
	},
	async sendMessage(message: string) {
		ws?.send(message) //отправка сообщения на сервер
	}

}

type messagesReceivedSubscriberType = (messages: messageAPIType[]) => void
type statusChangedSubscriberType = (status: statusType) => void

export type messageAPIType = {
	message: string
	photo: string
	userId: number
	userName: string
}
export type statusType = 'pending' | 'ready' | 'error'