import io from 'socket.io-client'

let socket = null

export function getConnectionStatus () {
	return socket && socket.connected
}

/**
 *
 * @param {Object} payload Objeto que recibe la url del socket y la setea para posterior conexión
 * @returns
 */
export function setSocket (payload) {
	if (socket && socket.connected) { return 'SocketUrl has already been set and is connected, please disconnect first to set a new socket.' }
	socket = io(payload.socketUrl, { transports: ['websocket'], autoConnect: false, reconnect: true, forceNew: true })
	return true
}

/**
 *
 * @param {requestCallback} onMessage Función que recibe y maneja un mensaje que llega desde el socket
 * @param {requestCallback} onConnect Función que se llama cuando se establece conexión con el socket
 * @returns {(Boolean|Error)} Error o true
 */
export function connect (onConnect, onMessage) {
	try {
		if (onConnect) {
			socket.on('connect', (data) => {
				onConnect(data || true)
			})
		}
		if (onMessage) {
			subscribeToMessages(onMessage)
		}
		socket.connect()
		return true
	} catch (e) {
		return e
	}
}

export function subscribeToMessages (onMessage) {
	socket.on('message', (data) => {
		onMessage(data)
	})
}

/**
 *
 * @param {Object} payload Objeto con datos para ingresar a la sala
 * @param {String} payload.roomName Nombre de la sala a ingresar
 * @param {String} payload.userName Nombre del usuario
 * @param {String} payload.userID ID del usuario
 * @param {Boolean} [payload.isAdmin] Boolean para definir si es el administrador de la sala
 * @param {Number} [payload.videoCallID] ID de la videollamada, para identificar la grabación
 * @param {requestCallback} onJoinResponse Función que recibe los datos de respuesta del socket después del join: {}
 * @returns
 */
export function join (payload, onJoinResponse) {
	try {
		const { roomName, userName, userID, isAdmin, isStreamer, userAvatar, privateRoom, videoCallID } = payload
		socket.emit('join', { roomName, userName, userID, isAdmin, userAvatar, isStreamer, privateRoom, videoCallID }, (response) => {
			if (onJoinResponse) {
				onJoinResponse(response)
			}
		})
	} catch (e) {
		return e
	}
}

/**
 *
 * @param {Object} payload Objeto con el id y el mensaje
 * @param {String} payload.id Tipo de mensaje
 * @param {String} payload.otros Se deben enviar diferentes tipos de mensaje, estos se puede estandarizar en un futuro a sólo un objeto adicional
 * @returns
 */
export function sendMessage (payload) {
	try {
		socket.emit('message', payload)
	} catch (e) {
		return e
	}
}

export function leaveRoom (socketRoom) {
	try {
		socket.leave(socketRoom)
	} catch (e) {
		return e
	}
}

export function disconnect () {
	try {
		socket.close()
	} catch (e) {
		return e
	}
}
