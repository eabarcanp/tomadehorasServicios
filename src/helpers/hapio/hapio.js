import {endpoints} from './endpoints'
import request from './request'

// import userStore from '../../store';

export function createService(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.services,
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

export function updateService(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.services + '/' + data.id,
			method: 'put',
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

export function getListServices() {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.services,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			redirect: 'follow'
		})
			.then(async function (response) {
				console.log("resp getListServices: ", response)
				resolve(response)
			})
			.catch(function (error) {
				console.log("error getListServices: ", error)
				reject(error)
			})
	})
}

export function getListBookableServices(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.services + '/' + data.service_id + '/bookable-slots?from=' + data.from + '&to=' + data.to + '&location=' + data.location,
			method: 'get',
		})
			.then(async function (response) {
				console.log("resp getListBookableServices: ", response)
				resolve(response)
			})
			.catch(function (error) {
				console.log("error getListBookableServices: ", error)
				reject(error)
			})
	})
}


export function deleteService(data) {
	return new Promise((resolve) => {
		request({
			url: endpoints.services + '/' + data.service_id,
			method: 'delete',
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			})
	})
}

export function associateResourceService(data) {
	return new Promise((resolve) => {
		request({
			url: endpoints.services + '/' + data.service_id + '/resources/' + data.resource_id,
			method: 'put'
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			})
	})
}

export function dissociateResourceService(data) {
	return new Promise((resolve) => {
		request({
			url: endpoints.services + '/' + data.service_id + '/resources/' + data.resource_id,
			method: 'delete'
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			})
	})
}

export function getListResources() {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.resources,
			method: 'get',
		})
			.then(async function (response) {
				console.log("resp getListResources: ", response)
				resolve(response)
			})
			.catch(function (error) {
				console.log("error getListResources: ", error)
				reject(error)
			})
	})
}

export function getResources(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.resources + '/' + data.resource_id,
			method: 'get',
		})
			.then(async function (response) {
				console.log("resp getListResources: ", response)
				resolve(response)
			})
			.catch(function (error) {
				console.log("error getListResources: ", error)
				reject(error)
			})
	})
}

export function createResource(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.resources,
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

export function deleteResource(data) {
	return new Promise((resolve) => {
		request({
			url: endpoints.resources + '/' + data.resource_id,
			method: 'delete',
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			})
	})
}

export function replaceResource(data) {
	return new Promise((resolve) => {
		request({
			url: endpoints.resources + '/' + data.id,
			method: 'put',
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

export function getResourceService(data) {
	return new Promise((resolve) => {
		request({
			url: endpoints.resources + '/' + data.resource_id + '/services',
			method: 'get',
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			})
	})
}


export function getBookings() {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.bookings,
			method: 'get',
		})
			.then(async function (response) {
				console.log("resp getBookings: ", response)
				resolve(response)
			})
			.catch(function (error) {
				console.log("error getBookings: ", error)
				reject(error)
			})
	})
}

export function createBooking(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.bookings,
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

export function deleteBooking(data) {
	return new Promise((resolve) => {
		request({
			url: endpoints.bookings + '/' + data.booking_id,
			method: 'delete',
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			})
	})
}

export function replaceBooking(data) {
	return new Promise((resolve) => {
		request({
			url: endpoints.bookings + '/' + data.booking_id,
			method: 'put',
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

export function getLocations() {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.locations,
			method: 'get',
		})
			.then(async function (response) {
				console.log("resp getLocations: ", response)
				resolve(response)
			})
			.catch(function (error) {
				console.log("error getLocations: ", error)
				reject(error)
			})
	})
}

export function createLocation(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.locations,
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

export function deleteLocation(data) {
	return new Promise((resolve) => {
		request({
			url: endpoints.locations + '/' + data.location_id,
			method: 'delete',
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			})
	})
}

export function replaceLocation(data) {
	return new Promise((resolve) => {
		request({
			url: endpoints.locations + '/' + data.location_id,
			method: 'put',
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

export function getListRecurringSchedules(data) {
	return new Promise((resolve) => {
		request({
			url: endpoints.resources + '/' + data.resource_id + '/recurring-schedules/',
			method: 'get',
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			})
	})
}
export function getListRecurringSchedulesBlocks(data) {
	return new Promise((resolve) => {
		request({
			url: endpoints.resources + '/' + data.resource_id + '/recurring-schedules/' + data.recurring_schedule_id + '/schedule-blocks',
			method: 'get',
		})
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				resolve(error)
			})
	})
}

export function replaceRecurringScheduleBlocks(data) {
	return new Promise((resolve) => {
		request({
			url: endpoints.resources + '/' + data.resource_id + '/recurring-schedules/' + data.recurring_schedule_id + '/schedule-blocks/' + data.schedule_block_id,
			method: 'put',
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

export function createRecurringScheduleBlocks(data) {
	return new Promise((resolve) => {
		request({
			url: endpoints.resources + '/' + data.resource_id + '/recurring-schedules/' + data.recurring_schedule_id + '/schedule-blocks',
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

export function createRecurringSchedule(data) {
	return new Promise((resolve) => {
		request({
			url: endpoints.resources + '/' + data.resource_id + '/recurring-schedules',
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
