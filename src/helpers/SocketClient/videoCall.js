import kurentoUtils from 'kurento-utils'

/**
 *
 * @param {Array} iceServers Array de objetos con los iceServers que correspondan
 * @param {Object} mediaConstraints Objeto mediaConstraints: https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API/Constraints
 * @param {requestCallback} onAddLocalStream Función donde se pasará el video local
 * @param {requestCallback} onIceCandidate Función que maneja los ice candidates del peer en kurento, se envía un mensaje al socket con esto
 * @param {requestCallback} onOffer Función que recibe y envía un mensaje al socket con la oferta del peer
 * @param {requestCallback} onLocalWebRtcPeer Función que recibe el peer local
 */
export function createSendingPeer (iceServers, mediaConstraints, onAddStream, onIceCandidate, onWebRtcPeer, onOffer) {
	const options = {
		onaddstream: onAddStream,
		onicecandidate: onIceCandidate,
		configuration: { iceServers },
		mediaConstraints
	}
	const webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function (error) {
		if (error) { return console.log(error) }
		this.generateOffer((error, offerSdp) => {
			if (error) { return console.log(error) }
			onOffer(offerSdp)
		})
		onAddStream(this.getLocalStream())
	})
	onWebRtcPeer(webRtcPeer)
}

export function createReceivingPeer (iceServers, domVideoElement, onIceCandidate, onWebRtcPeer, onOffer) {
	const options = {
		configuration: { iceServers },
		remoteVideo: domVideoElement,
		onicecandidate: onIceCandidate
	}
	const webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function (error) {
		if (error) { return console.log(error) }
		this.generateOffer((error, offerSdp) => {
			if (error) { return console.log(error) }
			onOffer(offerSdp)
		})
	})
	onWebRtcPeer(webRtcPeer)
}
