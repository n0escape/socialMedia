let subscribers = [] as subscriberType[]

let ws: WebSocket | null = null

const closeHandler = () => {
	console.log('CLOSE WS')
	setTimeout(createChanel, 3000)
}

const addMessageHandler = (e: MessageEvent) => {
	const newMessages = JSON.parse(e.data)
	subscribers.forEach( s => s(newMessages))
}

function createChanel() {
	ws?.removeEventListener('close', closeHandler)
	ws?.close()

	ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
	ws.addEventListener('close', closeHandler)
	ws.addEventListener('message', addMessageHandler)
}

export const globalChatAPI = {
	async start(){
		createChanel()
	},
	async stop(){
		subscribers = []
		ws?.removeEventListener('close', closeHandler)
		ws?.removeEventListener('message', addMessageHandler)
		ws?.close()
	},
	async subscribe(callback: subscriberType) {
		subscribers.push(callback)
		// отписка внутри подписки, через return 
		// при назначении в переменную результата вызова функции: let unsub = globalChatAPI.sub(...)
		// и вызов переменной как функции, произойдет отписка: unsub()
		// return () => {
		// 	subscribers = subscribers.filter( s => s != callback)
		// }
	},
	async unsubscribe(callback: subscriberType) {
		subscribers = subscribers.filter( s => s !== callback)
	},
	async sendMessage(message: string) {
		ws?.send(message)
	}

}

type subscriberType = (messages: messageType[]) => void

export type messageType = {
	message: string
	photo: string
	userId: number
	userName: string
}