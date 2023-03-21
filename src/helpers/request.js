import axios from 'axios'
// const BASE = 'https://apiclick2call.loca.lt/' // Local Ulises
// const BASE = 'https://api.click2call.cl/' //Produccion
//const BASE = 'http://zonecam.naturalphone.cl:8024/' //Desarrollo
// const BASE = 'http://localhost:8024' //Local
// const BASE = 'https://devapis.anubys.cl:8024' //Desarrollo
const BASE = 'https://devapis.anubys.cl:8026/' //Desarrollo
//const BASE = 'https://2424-190-196-70-164.sa.ngrok.io' //Desarrollo



const service = axios.create({ baseURL: BASE })

service.defaults.timeout = 10000

service.interceptors.request.use(
  config => {
    const contentType = config.data instanceof FormData ? 'multipart/form-data':'application/json'
    const token = localStorage.getItem('userToken')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
		config.headers['company-key'] = '67b41b98-7a0c-4fc4-8767-e81f4e617e06'
		// config.headers['company-key'] = 'b6a8ac31-838c-4f3e-b592-58a7640a9f67'
    config.headers['Content-Type'] = contentType
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    //config.headers['ngrok-skip-browser-warning'] = 'a'
    return config
  },
  error => {
    console.log("API: ", error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      if (response.status === 403 || response.status === 50008 || response.status === 50012 || response.status === 50014) {
        // localStorage.removeItem('userToken')
        // // location.reload()
      }
      return Promise.reject(response || 'Error')
    } else {
      return response.data
    }
  },
  async error => {
    if(error.response && (error.response.status === 401)){
      await localStorage.removeItem('userToken')
      window.location.href = '/#/login'
    }
    return Promise.reject(error)
  }
)

export default service
