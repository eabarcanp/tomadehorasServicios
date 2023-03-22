import {endpoints} from './endpoints'
import request from '../request'
import userStore from "@/store";


export function getListSpecialties() {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.specialties,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			redirect: 'follow'
		})
			.then(async function (response) {
				console.log("resp getListSpecialties: ", response)
				resolve(response)
			})
			.catch(function (error) {
				console.log("error getListSpecialties: ", error)
				reject(error)
			})
	})
}

export function getSpecialtyById(id) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.specialties + '/' + id,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			redirect: 'follow'
		})
			.then(async function (response) {
				console.log("resp getSpecialtyById: ", response)
				resolve(response)
			})
			.catch(function (error) {
				console.log("error getSpecialtyById: ", error)
				reject(error)
			})
	})
}

export function updateSpecialty(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.specialties + '/' + data.id,
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

export function deleteSpecialty(id) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.specialties + '/' + id,
			method: 'delete',
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

export function createSpecialty(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.specialties,
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

// start doctors api
export function createDoctor(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.doctors,
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

export function updateDoctor(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.doctors + '/' + data.id,
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



export function getListDoctors() {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.doctors,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			redirect: 'follow'
		})
			.then(async function (response) {
				console.log("resp getListDoctors: ", response)
				resolve(response)
			})
			.catch(function (error) {
				console.log("error getListDoctors: ", error)
				reject(error)
			})
	})
}

export function getDoctor(id) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.doctors + '/' + id,
			method: 'GET',
		})
			.then(async function (response) {
				console.log("resp getDoctor: ", response)
				resolve(response)
			})
			.catch(function (error) {
				console.log("error getDoctor: ", error)
				reject(error)
			})
	})
}

// end doctors api

// start doctor_specialties api

export function createDoctorSpecialty(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.doctor_specialties,
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

export function updateDoctorSpecialty(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.doctor_specialties + '/' + data.id,
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

export function getListDoctorSpecialties() {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.doctor_specialties,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			redirect: 'follow'
		})
			.then(async function (response) {
				console.log("resp getListDoctorSpecialties: ", response)
				resolve(response)
			})
			.catch(function (error) {
				console.log("error getListDoctorSpecialties: ", error)
				reject(error)
			})
	})
}

export const deleteDoctorSpecialty = (data) => {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.doctor_specialties + `/?id_doctor=${data.id_doctor}&id_specialty=${data.id_specialty}`,
			method: 'delete',
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

// update avatar
export  const updateAvatar = (id, data) => {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.users + `/avatar/${id}`,
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

export const updatePassword = (id, data) => {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.users + `/password/${id}`,
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

// end doctor_specialties api

// start schedules api

export function getListSchedules() {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.schedules,
			method: 'GET',
		})
			.then(async function (response) {
				console.log("resp getListSchedules: ", response)
				resolve(response)
			})
			.catch(function (error) {
				console.log("error getListSchedules: ", error)
				reject(error)
			})
	})
}

export function getScheduleByDoctor(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.schedules + `/${data.id_doctor}`,
			method: 'GET',
		})
			.then(async function (response) {
				console.log("resp getScheduleByDoctor: ", response)
				resolve(response)
			})
			.catch(function (error) {
				console.log("error getScheduleByDoctor: ", error)
				reject(error)
			})
	})
}

export function createSchedule(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.schedules,
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

export function updateSchedule(id, data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.schedules + '/' + id,
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

export function deleteSchedule(id) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.schedules + '/' + id,
			method: 'delete',
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

// end schedules api

// start patients api

export function createPatient(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.patients,
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

export function updatePatient(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.patients + '/' + data.id,
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

export function deletePatient(id) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.patients + '/' + id,
			method: 'delete',
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

export function getPatientById(id) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.patients + '/' + id,
			method: 'get',
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

export function getPatientByRut(rut) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.patients + `/rut/${rut}`,
			method: 'get',
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

export function getListPatients() {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.patients,
			method: 'get',
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

// end patients api


// start appointments api

export function getBookingSlotsBySpecialty(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.medical_appointments + '/specialties',
			method: 'GET',
			params: data
		})
			.then(async function (response) {
				console.log("resp getBookingSlotsBySpecialty: ", response)
				resolve(response)
			})
			.catch(function (error) {
				console.log("error getBookingSlotsBySpecialty: ", error)
				reject(error)
			})
	})
}

export function getBookingSlotsBySpecialtyTelemedicine(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.medical_appointments + '/specialties_telemedicine',
			method: 'GET',
			params: data
		})
			.then(async function (response) {
				console.log("resp getBookingSlotsBySpecialtyTelemedicine: ", response)
				resolve(response)

			})
			.catch(function (error) {
				console.log("error getBookingSlotsBySpecialtyTelemedicine: ", error)
				reject(error)

			})
	})
}

export function getBookingSlotsByDoctor(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.medical_appointments + '/slots',
			method: 'GET',
			params: data
		})
			.then(async function (response) {
				console.log("resp getBookingSlotsByDoctor: ", response)
				resolve(response)
			})
			.catch(function (error) {
				console.log("error getBookingSlotsByDoctor: ", error)
				reject(error)
			})
	})
}

export function getBookingSlotsByDoctorTelemedicine(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.medical_appointments + '/slots_telemedicine',
			method: 'GET',
			params: data
		})
			.then(async function (response) {
				console.log("resp getBookingSlotsByDoctorTelemedicine: ", response)
				resolve(response)
			})
			.catch(function (error) {
				console.log("error getBookingSlotsByDoctorTelemedicine: ", error)
				reject(error)
			})
	})
}

export function createAppointment(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.medical_appointments,
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

export function updateAppointment(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.medical_appointments + '/' + data.id,
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

export function getAppointmentByIdDoctor(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.medical_appointments + '/doctors',
			method: 'get',
			params: data
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

export function deleteAppointment(id) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.medical_appointments + '/' + id,
			method: 'delete',
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
export function confirmAppointment(id) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.medical_appointments + '/' + id + '/confirm',
			method: 'get',
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

export function getAppointmentByRut(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.medical_appointments + '/patients',
			method: 'get',
			params: data
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

// end appointments api

// start users api

export function getUserById(id) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.users + '/' + id,
			method: 'get',
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

export function getUserData() {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.users + '/token',
			method: 'get',
		})
			.then(async function (response) {
				resolve(response)
				userStore.commit('setUserData', response)
				console.log(response)
			})
			.catch(function (error) {
				reject(error)
				console.log(error)
			});
	})
}

export function getListUsers() {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.users,
			method: 'get',
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

export function createUser(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.users,
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

export function updateUser(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.users + '/' + data.id,
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

export function deleteUser(id) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.users + '/' + id,
			method: 'delete',
		})
			.then(async function (response) {
				resolve(response)
				console.log(response)
			})
			.catch(function (error) {
				reject(error)
				console.log(error)
			});
	});
}

// end users api
// start medical records api

export function getMedicalRecords(id) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.medical_records + '/' + id,
			method: 'get',
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

export function createMedicalRecord(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.medical_records,
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

// end medical records api

// getGeneralParams
export function getGeneralParams() {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.general_parameters,
			method: 'get',
		})
			.then(async function (response) {
				resolve(response.data)
			})
			.catch(function (error) {
				reject(error)
				console.log(error)
			});
	})
}
export function putGeneralParams(data, id) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.general_parameters + '/' + id,
			method: 'put',
			data
		})
			.then(async function (response) {
				resolve(response.data)
			})
			.catch(function (error) {
				reject(error)
				console.log(error)
			});
	})
}

// shortener url
export function createShortUrls(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.short_urls,
			method: 'post',
			data
		})
			.then(async function (response) {
				resolve(response.data)
			})
			.catch(function (error) {
				reject(error)
				console.log(error)
			});
	})
}

export function getShortUrls(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.short_urls + '/' + data,
			method: 'get',
		})
			.then(async function (response) {
				resolve(response)
			})
			.catch(function (error) {
				reject(error)
				console.log(error)
			});
	})
}

// end shortener url

export function getStatistics(id) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.medical_appointments + '/statistics/' + id,
			method: 'get',
		})
			.then(async function (response) {
				resolve(response)
			})
			.catch(function (error) {
				reject(error)
				console.log(error)
			});
	})
}

export function sendMedicalAppointment(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.medical_appointments + '/send',
			method: 'post',
			data
		})
			.then(async function (response) {
				resolve(response)
			})
			.catch(function (error) {
				reject(error)
				console.log(error)
			});
	})
}


// WA

export function sendWhatsapp(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.whatsapp + '/send',
			method: 'post',
			data
		})
			.then(async function (response) {
				resolve(response)
			})
			.catch(function (error) {
				reject(error)
				console.log(error)
			});
	})
}

export function sendWhatsappFile(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.whatsapp + '/sendFile',
			method: 'post',
			data
		})
			.then(async function (response) {
				resolve(response)
			})
			.catch(function (error) {
				reject(error)
				console.log(error)
			});
	})
}
