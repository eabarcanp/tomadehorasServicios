// import {endpoints} from './endpoints'
import request from '../request'
import {endpoints} from '../../api/endpoints'





export function speciality(){
	return new Promise((resolve, reject) => {
    request({
      url: endpoints.speciality,
      method: 'get',
    })
		  .then(async function (response) {
		    resolve(response)
			console.log(response);
		  })
		  .catch(function (error) {
		    reject(error)
			console.log(error);
		  });
	})
}


export function newToken(){
	return new Promise((resolve, reject) => {
    request({
      url: 'auth/newTokenCtoCTest',
      method: 'post'
    })
		  .then(async function (response) {
		    resolve(response)
		  })
		  .catch(function (error) {
		    reject(error)
		  });
	})
}

// CallBack

export function callReturn(data){
	return new Promise((resolve, reject) => {
    request({
      url: '/api/calls/callBack',
      method: 'post',
	  data
    })
		  .then(async function (response) {
			  resolve(response)
			  console.log(response);
		  })
		  .catch(function (error) {
			  reject(error)
			  console.log(error);
		  });
	})
}
export function tokencallback(data){
	return new Promise((resolve, reject) => {
    request({
      url: '/api/calls/callBack/newCallBack',
      method: 'post',
	  data
    })
		  .then(async function (response) {
			  resolve(response)
			  console.log(response);
		  })
		  .catch(function (error) {
			  reject(error)
			  console.log(error);
		  });
	})
}

//VideoEmail

export function videollamada(data){
	return new Promise((resolve, reject) => {
    request({
      url: endpoints.videollamada,
      method: 'post',
	  data: data,
    })
		  .then(async function (response) {
		    resolve(response)
			console.log(response);

		  })
		  .catch(function (error) {
		    reject(error)
			console.log(error);

		  });
	})
}

export function videoEmail(formData){
	return new Promise((resolve, reject) => {
    request({
      url: endpoints.videoEmail,
      method: 'post',
	  data: formData
    })
		  .then(async function (response) {
			  resolve(response)
			  console.log(response);
		  })
		  .catch(function (error) {
			  reject(error)
			  console.log(error);
		  });
	})
}

export function VideoEmailDowload(data){
	return new Promise((resolve, reject) => {
    request({
      url: '/api/calls/videoMail/download',
      method: 'post',
	  data
    })
		  .then(async function (response) {
		    resolve(response)
		  })
		  .catch(function (error) {
		    reject(error)
		  });
	})
}
export function callEvent(){
	return new Promise((resolve, reject) => {
    request({
      url: endpoints.callEvent,
      method: 'post'
    })
		  .then(async function (response) {
		    resolve(response)
		  })
		  .catch(function (error) {
		    reject(error)
		  });
	})
}

export function postFormContac(data){
	return new Promise((resolve, reject) => {
    request({
      url: endpoints.postFormContact,
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

export function token() {
	return new Promise((resolve, reject) => {
	  request({
		url: endpoints.getToken,
		method: "get",
	  })
		.then(function(response) {
		  resolve(response);
		})
		.catch(function(error) {
		  reject(error);
		});
	});
  }
export function getServices(data) {
	return new Promise((resolve, reject) => {
	  request({
		url: endpoints.getServices,
		method: "get",
		data

	  })
		.then(function(response) {
		  resolve(response);
		})
		.catch(function(error) {
		  reject(error);
		});
	});
  }



//

export function UpdateInfoVideoCall(data) {
	return new Promise((resolve, reject) => {
		request({
			url: endpoints.UpdateInfoVideoCall + "/" + data.id,
			method: "put",
			params: data,
		})
			.then(function(response) {
				resolve(response);
				// console.log(response);
			})
			.catch(function(error) {
				reject(error);
				// console.log(error);
			});
	});
}
