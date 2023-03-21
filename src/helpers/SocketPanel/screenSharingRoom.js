/**
 * Este componente facilita la conexión en una video conferencia multipunto.
 * Maneja la conexión con el socket, los usuarios en la sala y la transmisión de video de cada usuario.
 * Estas son funciones top level, no son necesarias pero facilitan la conexión de acuerdo a lo mencionado.
 */
import { getConnectionStatus, subscribeToMessages, setSocket, connect, join, sendMessage, leaveRoom, disconnect } from './screenSharingSocketConnection'
import { createSendingPeer, createReceivingPeer } from './videoCall'

let turnServer = {}
let localWebRtc = null
let webRtcPeerRec = {}

/**
 *
 * @param {String} socketUrl Url del socket al que debe conectarse
 * @param {requestCallback} onConnect Función donde se devuelve el aviso de conexión con el socket
 * @param {requestCallback} onMessage Función donde se manejan los mensaje entrantes del socket
 */
export function connectToSocket (socketUrl, onConnect, onMessage, onVideoReady) {
	const status = getConnectionStatus()
	if (status) {
		subscribeToMessages(onMessage)
		onConnect()
	} else {
		setSocket({ socketUrl })
		connect(onConnect,
			(message) => {
				// if (message.id !== 'videoStats') {
				handleSocketMessage(message)
				if (onMessage && (
					message.id !== 'startResponse' &&
					message.id !== 'iceCandidate' &&
					message.id !== 'remoteResponse' &&
					message.id !== 'remoteIceCandidate'
				)
				) { onMessage(message) }
				// }
			}
		)
	}
}

/**
 *
 * @param {String} roomName Nombre de la sala a unirse
 * @param {String} userName Nombre del usuario
 * @param {String} userAvatar Avatar del usuario (url directa)
 * @param {Number} userID ID del usuario
 * @param {Boolean} [isAdmin] Si es o no administrador de la sala
 * @param {Boolean} [privateRoom] Si es o no una sala privada, por defecto si lo es
 * @param {Number} [videoCallID] ID de la videollamada para grabación
 */
export function joinRoom (roomName, userName, userID, userAvatar, onJoin, isAdmin = false, isStreamer = false, privateRoom = true, videoCallID = null) {
	join({ roomName, userName, userID, isAdmin, isStreamer, userAvatar, privateRoom, videoCallID },
		(joinResponse) => {
			setTurnServer(joinResponse)
			onJoin && onJoin(joinResponse)
		}
	)
}

/**
 *
 * @param {requestCallback} onLocalStream Recibe funcion para entregar el stream local
 * @param {Object} [mediaConstraintsOptions]  Objeto mediaConstraints: https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API/Constraints
 * @param {String} sendSource Tipo de video: webcam o screen
 */
export function start (onLocalStream, mediaConstraintsOptions = null, sendSource = 'webcam', onError) {
	const iceServers = [turnServer]
	const mediaConstraints = mediaConstraintsOptions || {
		audio: false,
		video: {
			width: { min: 640, ideal: 1280, max: 1920 },
			height: { min: 480, ideal: 720, max: 1080 }
		}
	}
	createSendingPeer(iceServers, mediaConstraints, sendSource, onLocalStream,
		(iceCandidate) => {
			const message = { id: 'onIceCandidate', candidate: iceCandidate }
			sendMessage(message)
		},
		(newLocalWebRtc) => { localWebRtc = newLocalWebRtc },
		(offerSdp) => {
			const message = { id: 'start', sdpOffer: offerSdp }
			sendMessage(message)
		},
		onError
	)
}

export function createNewReceivingPeer (socketID, videoElement, onError) {
	const iceServers = [turnServer]
	createReceivingPeer(iceServers, videoElement,
		(iceCandidate) => {
			const message = { id: 'onIceCandidateRemote', socketID, candidate: iceCandidate }
			sendMessage(message)
		},
		(remoteWebRtc) => { webRtcPeerRec[socketID] = remoteWebRtc },
		(offerSdp) => {
			const message = { id: 'newRemoteOffer', socketID, sdpOffer: offerSdp }
			sendMessage(message)
		},
		onError
	)
}

/**
 *
 * @param {Number} videoCallID Se debe enviar el id de la videollamada para enlazar la grabación a ella
 * @param {Number} recordingType Esto por ahora no tiene implicancia
 */
export function startRecording (videoCallID = null, recordingType = 2) {
	const message = { id: 'startRecording', recordingType, videoCallID }
	sendMessage(message)
}

export function stopRecording () {
	const message = { id: 'stopRecording' }
	sendMessage(message)
}

/**
 *
 * @param {Object} newTurnServer Objeto con los parámetros para el turn
 * @param {Object} newTurnServer.turn_ip IP pública del servidor turn
 * @param {Object} newTurnServer.turn_port Puerto del servidor turn
 * @param {Object} newTurnServer.turn_user Usuario para autenticar en el turn
 * @param {Object} newTurnServer.turn_password Contraseña para el usuario
 * @param {Boolean} forced Si es true fuerza el cambio de turn aunque ya esté asignado
 */
export function setTurnServer (newTurnServer, forced = false) {
	if (turnServer.turn_ip && turnServer.turn_port && turnServer.turn_user && turnServer.turn_password && forced) {
		turnServer = {
			urls: 'turn:' + newTurnServer.turn_ip + ':' + newTurnServer.turn_port,
			username: newTurnServer.turn_user,
			credential: newTurnServer.turn_password
		}
	} else if (!turnServer.turn_ip || !turnServer.turn_port || !turnServer.turn_user || !turnServer.turn_password) {
		turnServer = {
			urls: 'turn:' + newTurnServer.turn_ip + ':' + newTurnServer.turn_port,
			username: newTurnServer.turn_user,
			credential: newTurnServer.turn_password
		}
	}
}

export function disconnectFromSocket () {
	disconnect()
	localWebRtc && localWebRtc.dispose()
	Object.keys(webRtcPeerRec).forEach((key) => {
		webRtcPeerRec[key].dispose()
	})
	turnServer = {}
	localWebRtc = null
	webRtcPeerRec = {}
}

/**
 *
 * @param {String} socketRoom ID de la sala de la que se desea salir
 */
export function leavePrivateRoom (socketRoom) {
	leaveRoom(socketRoom)
}

/**
 *
 * @param {String} chatMessage Mensaje que será enviado al resto de usuarios en la sala
 */
export function sendChatMessageToRoom (chatMessage) {
	const message = { id: 'chatMessage', message: chatMessage }
	sendMessage(message)
}

export function addAttentionRequest () {
	const message = { id: 'addAttentionRequest' }
	sendMessage(message)
}

/**
 *
 * @param {String} removeSocketID El socketid del usuario a remover del listado de atenciones, si no se envía el socket asume que es el propio usuario el que se está removiendo del listado
 */
export function removeAttentionRequest (removeSocketID = null) {
	const message = { id: 'removeAttentionRequest', removeSocketID }
	sendMessage(message)
}

/**
 *
 * @param {String} userSocketID El socket id del usuario con el que voy a conectar
 * @param {String} socketRoom El id de la sala para el privado
 */
export function startPrivateAttention (userSocketID, socketRoom) {
	const message = { id: 'startPrivateAttention', userSocketID, socketRoom }
	sendMessage(message)
}

/**
 *
 * @param {String} newStatus Estado del streaming: 'inactive', 'active', 'in_private'
 */
export function changeStreamingStatus (newStatus) {
	const message = { id: 'streamingStatusChange', newStatus }
	sendMessage(message)
}

/**
 *
 * @param {Object} product Objeto con la información del producto que se debe mostrar (no enviar todo)
 */
export function presentedProductChange (product) {
	const message = { id: 'presentedProductChange', product }
	sendMessage(message)
}

/**
 *
 * @param {Boolean} status Estado del audio: true: activo, false: inactivo
 */
export function setAudio (status) {
	localWebRtc.audioEnabled = status
}

/**
 *
 * @param {Boolean} status Estado del video: true: activo, false: inactivo
 */
export function setVideo (status) {
	localWebRtc.videoEnabled = status
}

function startResponse (sdpAnswer) {
	localWebRtc.processAnswer(sdpAnswer)
}
function processIceCandidateMessage (iceCandidate) {
	localWebRtc.addIceCandidate(iceCandidate)
}
function remoteResponse (remoteSocketID, sdpAnswer) {
	webRtcPeerRec[remoteSocketID].processAnswer(sdpAnswer)
}
function processRemoteIceCandidateMessage (remoteSocketID, iceCandidate) {
	webRtcPeerRec[remoteSocketID].addIceCandidate(iceCandidate)
}
function destroyConnectionWithRemote (remoteSocketID) {
	if (webRtcPeerRec[remoteSocketID]) {
		webRtcPeerRec[remoteSocketID].dispose()
		delete webRtcPeerRec[remoteSocketID]
	}
}

function handleSocketMessage (message) {
	switch (message.id) {
	case 'startResponse':
		startResponse(message.sdpAnswer)
		break
	case 'iceCandidate':
		processIceCandidateMessage(message.candidate)
		break
	case 'remoteResponse':
		remoteResponse(message.remoteSocketID, message.sdpAnswer)
		break
	case 'remoteIceCandidate':
		processRemoteIceCandidateMessage(message.remoteSocketID, message.candidate)
		break
	// case 'mediaFlowStateChange':
	// 	console.log('mediaFlowStateChange: ', message)
	// 	break
	case 'userLeaveRoom':
		destroyConnectionWithRemote(message.socketID)
		break
	}
}
