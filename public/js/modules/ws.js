import bus from './bus.js';

export default class Ws {

	constructor() {
		if (Ws.__instance) {
			return Ws.__instance;
		}
		const address = 'ws://localhost:5000/multiplayer/rand';
		this.ws = new WebSocket(address);
		this.ws.onopen = (event) => {
			console.log(`WebSocket on address ${address} opened`);
			bus.emit('connected', {});
			this.ws.onmessage = this.handleMessage.bind(this);

			this.ws.onclose = () => {
				console.log('WebSocket closed');
			};
		};
		Ws.__instance = this;
	}

	handleMessage(event) {
		const messageText = event.data;
		console.log('got message ', messageText);
		try {
			const message = JSON.parse(messageText);
			bus.emit(message.type, message.payload);
		} catch (err) {
			console.error('smth went wront in handleMessage: ', err);
		}
	}

	send(type, payload) {
		console.log('sent message: type - ', type, ' data - ', payload);
		this.ws.send(JSON.stringify({
			class: type,
			payload: payload
		}));
	}
}
