import {endpoints} from './endpoints'
import request from '../request'
import userStore from '../../store';

export function login (email, pass) {
	return new Promise((resolve, reject) => {
		const data = {
			email: email,
			password: pass
		}
		request({
			url: endpoints.login,
			method: 'post',
			data
		})
			.then(async function (response) {
				setUserToken(response.token)
				userStore.commit('setUserData', response.usuario)
				resolve(response)
			})
			.catch(function (error) {
				reject(error)
			})
	})
}

export function register(data){
	return new Promise((resolve, reject) => {
    request({
      url: endpoints.register,
      method: 'post',
	  data
    })
		  .then(async function (response) {
		    resolve(response)
			console.log(response)
		  })
		  .catch(function (error) {
		    reject(error)
			console.log(error)
		  });
	})
}

export function resetPass (data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.resetPass,
			method: 'post',
			data
		})
			.then(async function (response) {
				console.log("resp reset: ", response)
				resolve(response)
			})
			.catch(function (error) {
				console.log("error reset: ", error)
				reject(error)
			})
	})
}

function setUserToken (token) {
	localStorage.setItem('userToken', token)
}
// function removeUserToken () {
// 	localStorage.removeItem('userToken')
// }

export function validatePass (data) {
	return new Promise((resolve) => {
		request({
			url: endpoints.validatePass,
			method: 'post',
			data
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			})
	})
}

export function getUser () {
	return new Promise((resolve) => {
		request({
			url: endpoints.users,
			method: 'get'
		})
			.then(function (response) {
				userStore.commit('setUserData', response.user)
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			})
	})
}

export function lostMyPhoneData () {
	return new Promise((resolve) => {
		request({
			url: endpoints.lostMyPhoneData,
			method: 'post'
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			})
	})
}

export function startLostMyPhone (data) {
	return new Promise((resolve) => {
		request({
			url: endpoints.startLostMyPhone,
			method: 'post',
			data
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			})
	})
}

export function stopLostMyPhone (data) {
	return new Promise((resolve) => {
		request({
			url: endpoints.stopLostMyPhone,
			method: 'post',
			data
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			})
	})
}

export function changeLostMyPhoneStatus (data) {
	return new Promise((resolve) => {
		request({
			url: endpoints.changeLostMyPhoneStatus,
			method: 'post',
			data
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			})
	})
}

export function getLostMyPhoneInfo (data) {
	return new Promise((resolve) => {
		request({
			url: endpoints.getLostMyPhoneInfo,
			method: 'post',
			data
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			})
	})
}

export function lockMyPhone (data) {
	return new Promise((resolve) => {
		request({
			url: endpoints.lockMyPhone,
			method: 'post',
			data
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			})
	})
}

export function wipePhoneData (data) {
	return new Promise((resolve) => {
		request({
			url: endpoints.wipePhoneData,
			method: 'post',
			data
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			})
	})
}

export function getFBAuthToken(){
	return new Promise((resolve) => {
		const device_id = 'userpanelsosclick-' + userStore.state.userData.id
		request({
			url: endpoints.createFirebaseAuthToken,
			method: 'post',
			data: {device_id}
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			});
	})
}

export function checkToken(token){
	return new Promise((resolve) => {
		request({
			url: endpoints.checkToken,
			method: 'post',
			data: {token}
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			});
	})
}

export function getPlanes(){
	return new Promise((resolve) => {
		request({
			url: endpoints.getPlanes,
			method: 'post'
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			});
	})
}

export function getSecurityNet(){
	return new Promise((resolve) => {
		request({
			url: endpoints.getSecurityNet,
			method: 'post'
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			});
	})
}

export function getSecurityExternal(){
	return new Promise((resolve) => {
		request({
			url: endpoints.getSecurityExternal,
			method: 'post'
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			});
	})
}

export function sendInvitation(data){
	return new Promise((resolve) => {
		request({
			url: endpoints.sendInvitation,
			method: 'post',
			data
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			});
	})
}

export function paisesActivos(){
	return new Promise((resolve) => {
		request({
			url: endpoints.paisesActivos,
			method: 'post'
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			});
	})
}

export function regionesActivas(data){
	return new Promise((resolve) => {
		request({
			url: endpoints.regionesActivas,
			method: 'post',
			data
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			});
	})
}

export function comunasActivas(data){
	return new Promise((resolve) => {
		request({
			url: endpoints.comunasActivas,
			method: 'post',
			data
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			});
	})
}

export function updateUserAvatar(data){
	return new Promise((resolve) => {
		request({
			url: endpoints.updateUserAvatar,
			method: 'post',
			data
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			});
	})
}

export function updateUserInfo(data){
	return new Promise((resolve) => {
		request({
			url: endpoints.updateUserInfo,
			method: 'post',
			data
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			});
	})
}

export function getUserByCode(data){
	return new Promise((resolve) => {
		request({
			url: endpoints.getUserByCode,
			method: 'post',
			data
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			});
	})
}

export function signUpByCode(data){
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.signUpByCode,
			method: 'post',
			data
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				reject(error.response.data)
			});
	})
}

