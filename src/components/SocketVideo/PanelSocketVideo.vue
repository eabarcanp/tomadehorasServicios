<template>
  <v-container fluid style="background: #00000029; height: 100%;">
    <v-card height="100%">
      <v-row style="height: 100%;" no-gutters>
        <v-col :cols="showSideBar ? sidebarType !== 4 ? 7 : 9 : 12">
          <div class="d-flex flex-column justify-center fill-height">
            <div class="d-flex flex-row align-center justify-space-between pl-6 pr-2 w-100"
                 style="background-color: #2250b3">
              <p class="mb-0 py-3 font-weight-bold white--text">
                Video Call Center
              </p>
<!--              <p class="mb-0 py-3 font-weight-bold white&#45;&#45;text">-->
<!--                IP: {{ (clientInfo && clientInfo.ip) ? clientInfo.ip : '' }}, URL: {{ (clientInfo &&-->
<!--                  clientInfo.url) ? clientInfo.url : ''-->
<!--                }}-->
<!--              </p>-->
              <div>
                <v-btn icon @click="$store.commit('Videocall/setUserDataRequestModal', true)" v-if="$store.state.userData && $store.state.userData.role === 'DOCTOR_ROLE'">
                  <v-icon color="white">
                    mdi-account-details-outline
                  </v-icon>
                </v-btn>
                <v-btn icon @click="sidebarType = 1" v-if="$store.state.userData && $store.state.userData.role === 'DOCTOR_ROLE'">
                  <v-icon color="white">
                    mdi-youtube
                  </v-icon>
                </v-btn>
<!--                <v-btn icon @click="sidebarType = 2"-->
<!--                       v-if="$store.state.userData && $store.state.userData.role === 'DOCTOR_ROLE'">-->
<!--                  <v-icon color="white">-->
<!--                    mdi-help-box-->
<!--                  </v-icon>-->
<!--                </v-btn>-->
                <v-btn icon @click="sidebarType = 3"
                       v-if="$store.state.userData && $store.state.userData.role === 'DOCTOR_ROLE'">
                  <v-icon color="white">
                    mdi-message-bulleted
                  </v-icon>
                </v-btn>
                <v-btn icon @click="sidebarType = 4"
                       v-if="$store.state.userData && $store.state.userData.role === 'DOCTOR_ROLE'">
                  <v-icon color="white">
                    mdi-chat
                  </v-icon>
                </v-btn>
                <v-btn icon @click="toggleScreenSharing"
                       v-if="$store.state.userData && $store.state.userData.role === 'DOCTOR_ROLE'">
                  <v-icon color="white">
                    {{ sidebarType == 5 || localScreenStream ?
                      'mdi-monitor-off' : 'mdi-monitor-share'
                    }}
                  </v-icon>
                </v-btn>

                <v-btn icon @click="showSideBar = !showSideBar">
                  <v-icon color="white">
                    {{ showSideBar ? 'mdi-chevron-right' : 'mdi-chevron-left' }}
                  </v-icon>
                </v-btn>
              </div>
            </div>

            <div id="all-video-container" class="fill-height"
                 :style="'height:' + videoContainerHeight + 'px'">
              <div class="text-center fill-height" id="remotes-video" v-show="remoteVideoSet"></div>
              <div id="remote-waiting" class="d-flex flex-column justify-center align-center fill-height"
                   v-if="!remoteVideoSet">
                <v-progress-circular v-if="esperando == 2" indeterminate color="#2250b3">
                </v-progress-circular>
                <p v-if="esperando == 2" class="mb-0">Esperando conexión</p>
                <p v-if="esperando == 3" class="mb-0">
                  Fin de la video llamada
                </p>
              </div>

              <div class="local-view d-flex flex-column justify-center align-center"
                   v-if="esperando != 3">
                <div v-if="localStream" id="operator-remote" v-show="localVideoSet">
                  <video muted autoplay :srcObject.prop="localStream"></video>
                </div>

                <div id="waiting-local" class="d-flex flex-column align-center justify-center"
                     v-if="!localVideoSet">
                  <div class="text-center">
                    <v-progress-circular indeterminate color="#2250b3" size="22" width="2">
                    </v-progress-circular>
                    <p class="caption mb-0">Esperando video</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="justify-center">
              <v-btn @click="disconnect(), deleteChat(), $store.commit('setCardFormStateVideoCall', true)"
                     class="subtitle-1 font-weight-bold" color="#b40c00" dark tile x-large block>
                <v-icon left dark>
                  mdi-phone-hangup
                </v-icon>
                Terminar Llamada
              </v-btn>
            </div>
          </div>
        </v-col>

        <v-col :cols="sidebarType !== 4 ? 5 : 3" v-show="showSideBar">
          <div class="fill-height" style="overflow-y: scroll; max-height: 100vh;"
               v-if="sidebarType === 1 || sidebarType === 2 || sidebarType === 3 || sidebarType === 5">
            <div class="youtube-video-container pa-1" v-if="sidebarType === 1">
              <VideosContainer :roomID="salachat" />
            </div>
            <div class="px-1" v-else-if="sidebarType === 2">
<!--              <v-expansion-panels accordion mandatory dark v-model="panel">-->
<!--                <v-expansion-panel>-->
<!--                  <v-expansion-panel-header color="#2250b3">-->
<!--                    <p class="mb-0 font-weight-bold white&#45;&#45;text">-->
<!--                      Speech para prospectos de trabajo desde casa-->
<!--                    </p>-->
<!--                  </v-expansion-panel-header>-->
<!--                  <v-expansion-panel-content>-->
<!--                    <Speech />-->
<!--                  </v-expansion-panel-content>-->
<!--                </v-expansion-panel>-->
<!--              </v-expansion-panels>-->
            </div>
            <div class="pa-1" v-else-if="sidebarType === 3">
              <p class="my-2 font-weight-bold text-center">
                Preguntas Frecuentes
              </p>
              <p class="body-1 text-center">Estas preguntas están consideradas, para el primer contacto
                con el prospecto, por ende, no tratan de producto (porque aún no lo conoce), ni de
                comisiones, ya que aún no las ha visto, sólo le hemos hablado en términos generales. Por
                lo tanto, todas las respuestas referentes a esos temas se responderán en su debido
                momento.</p>
              <FAQ />
            </div>
            <div class="pa-1 fill-height" v-else-if="sidebarType === 5">
              <div class="local-screen-sharing fill-height" style="background-color: white">
                <video muted autoplay :srcObject.prop="localScreenStream"
                       v-show="localScreenStream"></video>
                <div id="remote-waiting"
                     class="d-flex flex-column justify-center align-center fill-height"
                     v-if="!localScreenStream">
                  <v-icon color="#2250b3" large>mdi-monitor-share</v-icon>
                  <p class="mb-0">Por favor seleccione el elemento que desea compartir</p>
                </div>
              </div>
            </div>
          </div>
          <Chat :salachat="salachat" v-else />
        </v-col>
      </v-row>
    </v-card>
    <FormFinalizacion />
    <ClientData v-if="this.$store.state.Videocall.userDataRequestModal"/>
  </v-container>
</template>

<script>
import {
  connectToSocket,
  joinRoom,
  start,
  createNewReceivingPeer,
  disconnectFromSocket,
  startRecording,
  stopRecording,
} from "@/helpers/SocketPanel/room";
import {
  connectToSocket as screenSharingConnectToSocket,
  joinRoom as screenSharingJoinRoom,
  start as screenSharingStart,
  createNewReceivingPeer as screenSharingCreateNewReceivingPeer,
  disconnectFromSocket as screenSharingDisconnectFromSocket,
  startRecording as screenSharingStartRecording,
  stopRecording as screenSharingStopRecording,
} from "@/helpers/SocketPanel/screenSharingRoom.js";
import moment from "moment";
import { UpdateInfoVideoCall } from "@/helpers/click2call/api/calls";
import { getDatabase, ref, onValue, push, remove } from "firebase/database";
import FormFinalizacion from "./SocketVideoPanel/FormFinalizacion.vue";
import Speech from './Cati/Speech'
import FAQ from './Cati/FAQ'
import VideosContainer from './Cati/VideosContainer'
import Chat from './Cati/Chat/Chat'
import ClientData from './Cati/ClientData/ClientData'

export default {
  components: {
    FormFinalizacion,
    Speech,
    FAQ,
    VideosContainer,
    Chat,
    ClientData
  },
  data() {
    return {
      esperando: 2,
      remoteVideoSet: false,
      localVideoSet: false,
      idOperator: null,
      salachat: null,
      connected_at: true,
      ended_at: null,

      videoCallID: null,
      recordingtype: 2,

      localStream: null,
      localScreenStream: null,
      media: {
        audio: true,
        video: {
          width: { min: 640, ideal: 1280, max: 1920 },
          height: { min: 480, ideal: 720, max: 1080 },
        },
      },
      showSideBar: true,
      sidebarType: this.$store.state.userData && this.$store.state.userData.role === 'DOCTOR_ROLE' ? 4 : 4,
      chatContainerHeight: null,
      chatSizeObserver: null,
      videoContainerHeight: null,
      videoSizeObserver: null,
      panel: 0,
      usersInRoom: {}
    };
  },
  beforeDestroy(){
    this.$store.commit("Videocall/setOnVideoCall", false)
  },
  mounted() {
    this.getVideoDimensions()
    const { sala_id } = this.$route.params
    const { id } = this.$route.params

    this.$store.commit("setIdRoomForm", sala_id)
    this.idOperator = id
    if (sala_id) {
      this.$store.commit("Videocall/setOnVideoCall", true)
      this.videoCallID = sala_id

      this.salachat = sala_id
      this.startStreaming()
      // this.UpdateInfoVideoCall({
      //   id: this.salachat,
      //   operator_id: this.idOperator,
      //   connected_at: this.connected_at
      // })
    }
    this.volver;
  },
  methods: {
    getVideoDimensions(){
      const videoContainer = document.getElementById('all-video-container')
      if (videoContainer) {
        this.videoSizeObserver = new ResizeObserver(this.changeVideoDimensions).observe(videoContainer)
      }
    },
    changeVideoDimensions(dims) {
      if (dims && dims[0] && dims[0].contentRect.height) {
        this.videoContainerHeight = dims[0].contentRect.height
      }
    },
    async UpdateInfoVideoCall(payload = {}, checkClient = true) {
      const videocall = await UpdateInfoVideoCall(payload)
      if(videocall.success && videocall.data && videocall.data.client){
        this.$store.commit('Videocall/setClientData', videocall.data.client)
      }
      else if(checkClient){
        this.$store.commit('Videocall/setUserDataRequestModal', true)
      }
    },
    deleteChat() {
      const db = getDatabase();
      remove(ref(db, "chat/" + this.salachat));
      // console.log("funciona?");
    },
    volvermenu() {
      router.push({ path: "panel" });
    },

    startStreaming() {
      const userName = this.$store.state.userData ? this.$store.state.userData.name : 'Operador'
      connectToSocket(
          "https://vcsocket.click2call.cl:8443/",
          () => {
            joinRoom(this.salachat, userName, this.idOperator, null, (rsponse) => this.onJoin(rsponse), true);
          },
          (message) => this.handleSocketMessage(message)
      );
      this.localVideoSet = true;
    },
    toggleScreenSharing() {
      if (this.localScreenStream) {
        if (this.sidebarType != 5) {
          this.sidebarType = 5
          return false
        }
        this.stopScreenSharing()
      }
      else {
        this.startScreenSharing()
      }
    },
    startScreenSharing() {
      const userName = this.$store.state.userData ? this.$store.state.userData.name : 'ScreenSharing'
      screenSharingConnectToSocket(
          "https://vcsocket.sosdenuncias.com:8443/",
          () => {
            screenSharingJoinRoom(this.salachat, userName, this.idOperator, null, () => this.onJoinScreenShare(), true, true);
          },
          (message) => { }
      );
    },
    onJoinScreenShare() {
      this.sidebarType = 5
      screenSharingStart(
          (localScreenStream) => {
            this.localScreenStream = localScreenStream
            this.setScreenSharingListeners()
          },
          { video: true },
          'screen',
          () => {
            this.stopScreenSharing()
          }
      )
    },
    setScreenSharingListeners() {
      this.localScreenStream.getVideoTracks()[0].addEventListener('ended', () => {
            this.stopScreenSharing()
          }
      )
    },
    stopScreenSharing() {
      screenSharingDisconnectFromSocket()
      this.localScreenStream = null
      this.sidebarType = this.$store.state.userData && this.$store.state.userData.role === 'DOCTOR_ROLE' ? 4 : 4
    },
    onJoin(user) {
      this.addUserToRoom(user, true)
      start(
          (localStream) => {
            this.localStream = localStream;
          },
          this.media
      )
    },
    createVideoContainer(containerID = 'remotes-video') {
      const parentVideoElement = document.getElementById(containerID);
      const videoElement = document.createElement("video");
      videoElement.id = "remote-video";
      videoElement.autoplay = "autoplay";
      videoElement.playsInline = "playsinline";
      parentVideoElement.appendChild(videoElement);
      this.remoteVideoSet = true;
      return videoElement;
    },
    disconnect() {
      stopRecording();
      disconnectFromSocket();
      this.stopScreenSharing()
      this.ended_at = true;
      this.connected_at = null;
      // this.UpdateInfoVideoCall({
      //   id: this.salachat,
      //   operator_id: this.idOperator,
      //   ended_at: this.ended_at
      // }, false)
      this.localVideoSet = false;
      this.remoteVideoSet = false;
      this.esperando = 3;
    },
    onNewUserInRoom(user) {
      this.addUserToRoom(user)
      if (user.mediaFlowingOut) {
        this.onVideoReady(user.socketID);
      }
    },
    addUserToRoom(user, local = false) {
      const usersInRoom = Object.assign({}, this.usersInRoom)
      user.local = local
      usersInRoom[user.socketID] = user
      this.usersInRoom = usersInRoom
    },
    onVideoReady(socketID) {
      const videoElement = this.createVideoContainer();
      createNewReceivingPeer(socketID, videoElement);
    },
    onMultipleNewUserInRoom(usersInRoom) {
      usersInRoom.forEach((user) => this.onNewUserInRoom(user));
    },
    destroyConnectionWithRemote(socketID) {
      const userInfo = this.usersInRoom[socketID]
      if (userInfo.isStreamer) {
        this.sidebarType = this.$store.state.userData && this.$store.state.userData.role === 'DOCTOR_ROLE' ? 2 : 4
      }
      delete this.usersInRoom[socketID]
      const keys = Object.keys(this.usersInRoom)
      if (keys.length <= 1) {
        stopRecording()
        disconnectFromSocket()
        screenSharingDisconnectFromSocket()
        this.remoteVideoSet = false
        this.localVideoSet = false
        this.esperando = 3
        setTimeout(() => {
          this.cerrar();
          this.$store.commit("setModalButton", 0);
          !this.hasChat && this.$store.commit("setStep", 1);
        }, 5000);
      }
    },
    handleSocketMessage(message) {
      console.log("message", message);
      switch (message.id) {
        case "usersInRoom":
          this.onMultipleNewUserInRoom(message.usersInRoom);
          break;
        case "newUserInRoom":
          this.onNewUserInRoom(message.user);
          break;
        case "onVideoReady":
          this.onVideoReady(message.socketID, 'remotes-video');
          break;
        case "onStreamerVideoReady":
          this.showSideBar = true
          this.sidebarType = 3
          setTimeout(() => {
            this.screenShareVideo = true
            this.onVideoReady(message.socketID, 'remotes-video-screen-share')
          }, 500)
          break;
        case "onUserVideoReady":
          startRecording(this.videoCallID, this.recordingtype);
          break;
        case "userLeaveRoom":
          this.destroyConnectionWithRemote(message.socketID)
          break;
        default:
          // console.log("Unrecognized message", message);
      }
    },
  },
};
</script>

<style scoped>
.local-view {
  position: absolute;
  left: 10px;
  bottom: 10px;
  width: 240px;
  height: 140px;
  border-radius: 10px;
  background-color: white;
}

#all-video-container {
  position: relative;
}

#operator-remote video,
#waiting-local {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
  border: 1px solid grey;
}

.send-message-container {
  background-color: #f2f2f2;
  border-top: 1px solid #cbcbcb;
  min-height: 53px;
}

.message-container {
  background-color: #2250b3;
  position: relative;
  min-width: 40%;
  border-radius: 10px;
}

.message-container.secondary-user {
  background-color: #626262;
}

.message-time-container {
  position: absolute;
  bottom: 0px;
  right: 10px;
}

/deep/ #remotes-video video,
#remote-waiting,
/deep/ .local-screen-sharing video {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
</style>
