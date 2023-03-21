import Vue from 'vue'
import Vuex from 'vuex'
import Videocall from "@/store/Videocall";

Vue.use(Vuex)

const token = localStorage.getItem('userToken')

export default new Vuex.Store({
  state: {
    isAuthenticated: token,
		userData: null,
    primaryDB: null,
    derived: null,
    step: 1,
    specialityID: null,
    modalButton: 1,
    modalVideoState: false,
    roomId: null,
    idRoomForm: null,
    patientData: null,

    modalsStates: {
      notAllowed: false,
      lockDevice: false,
      lostPhone: false,
      wipeData: false,
      securityNet: false,
      editProfile: false,
      paymentStatus: {open: false, data: null}
      // paymentStatus: {
      //   open: true, data: {
      //     status: 1,
      //     flowOrder: "2",
      //     amount: "1000",
      //     forma: "1000",
      //     fecha: "1000"
      //   }
      // }
    },
    specialities: [],
    location: "",
    generalParams: null,
  },
  mutations: {
    setUserData (state, user) {
			state.userData = user
			state.isAuthenticated = localStorage.getItem('userToken')
		},
    logoutUser (state) {
			state.userData = null
			state.isAuthenticated = null
			localStorage.removeItem('userToken')
		},
    setRoomId(state, val) {
      // console.log("setRoomId", val )
      state.roomId = val
      // this.roomId = val
      // console.log(this.roomId)
    },
    setIdRoomForm(state, val) {
      state.idRoomForm = val;
      // console.log("setIdRoomForm: ",val)
    },
    setModalButton(state, val) {
      state.modalButton = val
      // console.log("estado modal drawer:",val)
    },
    setPrimaryDB(state, value) {
      state.primaryDB = value
    },
    setDerived(state, val) {
      state.derived = val
      // console.log("val",val);
    },
    setStep(state, val) {
      state.step = val
      // console.log("step funciono",val);
    },
    setSpeciality(state, val) {
      state.specialityID = val
      console.log("Speciality ID", val);
    },
    setModalVideoState(state, modalData) {
      state.modalVideoState = modalData
    },
    setModalsStates(state, value) {
      const modalsStates = Object.assign({}, state.modalsStates, value)
      state.modalsStates = modalsStates
    },
    setSpecialities(state, value) {
      state.specialities = value
    },
    setLocation(state, value) {
      state.location = value
    },
    setGeneralParams(state, value) {
      state.generalParams = value
    },
    setPatientData(state, value) {
      state.patientData = value
    }
  },
  getters: {
		userData: state => {
			return state.userData
		},
    isAuthenticated: state => {
      return state.isAuthenticated
    },
    specialities: state => {
      return state.specialities
    }
  },
  actions: {
  },
  modules: {
    Videocall
  }
})
