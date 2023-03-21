const endpoints = {
	auth: '/api/auth',
	doctor_specialties: '/api/doctor_specialties',
	doctors: '/api/doctors',
	general_parameters: '/api/general_parameters',
	login: '/api/auth/login',
	medical_appointments: '/api/medical_appointments',
	medical_records: '/api/medical_records',
	patients: '/api/patients',
	register: '/api/auth/register',
	schedules: '/api/schedules',
	specialties: '/api/specialties',
	users: '/api/users',
	short_urls: '/api/short_url',

	whatsapp: '/api/whatsapp',
	// Click2Call
	userData: '/api/userData',
	user: '/api/app/user/details',
	videollamada: '/api/calls/videoCall',
	videoEmail: '/api/calls/videoMail',
	speciality: '/api/company/specialities',
	callEvent: '/api/events',
	postFormContact: '/api/attention/contact',
	paisesActivos: '/api/auth/getPaisesActivos',
	regionesActivas: '/api/auth/getRegionesActivas',
	comunasActivas: '/api/auth/getComunasActivas',
	UpdateInfoVideoCall: '/api/calls/videoCall',


//payment
	getPaymentValue: '/api/app/planes/getToPayData',
	startPaymentPlan: '/api/app/pagos/createPurchaseOrder', // /app/pagos/createPurchaseOrder?product_id=1&qty=1
	getOrderStatusByToken: '/api/auth/getOrderStatusByToken',

//Registro
	getToken: 'api/token',

//SERVICIOS
	getServices: '/api/company/serviceStatus',

	fileUpload: 'api/calls/videoCall/{videoCallID}/publicAttachment',
	getFilePublicUrl: 'api/attachments/'

//     userData: '/api/userData',
//     user: '/api/app/user/details',
//     videollamada: '/api/calls/videoCall',
//     videoEmail: '/api/calls/videoMail',
//     speciality: '/api/company/specialities',
//     callEvent: '/api/events',
//     postFormContact: '/api/attention/contact',
//     paisesActivos: '/api/auth/getPaisesActivos',
//     regionesActivas: '/api/auth/getRegionesActivas',
//     comunasActivas: '/api/auth/getComunasActivas',
//
// //payment
//     getPaymentValue: '/api/app/planes/getToPayData',
//     startPaymentPlan: '/api/app/pagos/createPurchaseOrder', // /app/pagos/createPurchaseOrder?product_id=1&qty=1
//     getOrderStatusByToken: '/api/auth/getOrderStatusByToken',
//
// //Registro
//
//     getToken: 'api/token',
//
// //SERVICIOS
//     getServices: '/api/company/serviceStatus',
//
//     fileUpload: 'api/calls/videoCall/{videoCallID}/publicAttachment',
//     getFilePublicUrl: 'api/attachments/'
}

export {endpoints}
