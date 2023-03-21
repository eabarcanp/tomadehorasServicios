import {endpoints} from './endpoints'
import request from '../request'

export function fileUpload(data, onUploadProgress = null) {
	return new Promise((resolve, reject) => {

		const formData = new FormData()
		formData.append('attachment', data.attachment)
		request({
			url: endpoints.fileUpload.replace('{videoCallID}', data.videoCallID),
			method: 'post',
			data: formData,
			onUploadProgress,
			timeout: 3600000
		})
			.then(async function (response) {
				resolve(response)
			})
			.catch(function (error) {
				reject(error)
			})

	})
}
export function getFilePublicUrl(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.getFilePublicUrl + data.attachmentID,
			method: 'get',
			data
		})
			.then(async function (response) {
				resolve(response)
			})
			.catch(function (error) {
				reject(error)
			})

	})
}