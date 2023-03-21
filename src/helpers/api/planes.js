import {endpoints} from './endpoints'
import request from '../request'

export function getPaymentValue (data) {
	return new Promise((resolve) => {
		request({
			url: endpoints.getPaymentValue,
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

export function startPaymentPlan (data) {
	return new Promise((resolve) => {
		request({
			url: endpoints.startPaymentPlan,
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

export function getOrderStatusByToken(data) {
	return new Promise((resolve) => {
		request({
			url: endpoints.getOrderStatusByToken,
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