import { getservicesCompany } from "@/helpers/click2call/api/calls";

export default {
  namespaced: true,
	state: {
		userDataRequestModal: false,
		clientData: null,
		videocallID: null,
		onVideoCall: false
	},
	mutations: {
		setOnVideoCall(state, onVideoCall){
			state.onVideoCall = onVideoCall
		},
		setVideocallID(state, videocallID){
			state.videocallID = videocallID
		},
		setClientData(state, clientData){
			state.clientData = clientData
		},
		setUserDataRequestModal(state, status){
			state.userDataRequestModal = status
		}
	},
	actions: {
	}
};
