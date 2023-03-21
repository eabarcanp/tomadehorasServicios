<template>
  <v-container fluid style="background: #00000029; height: 100%;">
    <v-card height="100%">
      <v-row style="height: 100%;" no-gutters>
        <v-col :cols="getFirstCol()">
          <div class="d-flex flex-column justify-center fill-height" style="position:relative;">
            <div class="d-flex flex-row align-center justify-space-between pl-6 pr-2 w-100" style="background-color: #2250b3">
              <p class="mb-0 py-3 font-weight-bold white--text">
                Video Call Center
              </p>
              <div>
                <v-btn icon @click="sidebarType = 3" v-if="screenShareVideo && showSideBar">
                  <v-icon color="white">
                    mdi-monitor-share
                  </v-icon>
                </v-btn>
                <v-btn icon @click="sidebarType = 4" v-if="showSideBar">
                  <v-icon color="white">
                    mdi-chat
                  </v-icon>
                </v-btn>
                <!--                button to open ficha tecnica -->
                <v-btn icon @click="sidebarType = 5" v-if="showSideBar">
                  <v-icon color="white">
                    mdi-file-document
                  </v-icon>
                </v-btn>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        @click="showSideBar = !showSideBar"
                        v-bind="attrs"
                        v-on="on">
                      <v-icon color="white" v-if="$vuetify.breakpoint.mobile">
                        {{showSideBar ? 'mdi-close':'mdi-view-dashboard'}}
                      </v-icon>
                      <v-icon color="white" v-else>
                        {{showSideBar ? 'mdi-chevron-right':'mdi-chevron-left'}}
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>{{showSideBar ? 'Cerrar Panel':'Abrir Panel'}}</span>
                </v-tooltip>
              </div>
            </div>

            <div id="all-video-container" class="fill-height" >
              <div class="text-center fill-height" id="remotes-video" v-show="remoteVideoSet"></div>
              <div
                  id="remote-waiting"
                  class="d-flex flex-column justify-center align-center fill-height"
                  v-if="!remoteVideoSet"
              >
                <v-progress-circular v-if="esperando == 2" indeterminate color="#2250b3"></v-progress-circular>
                <p v-if="esperando == 2" class="mb-0">Esperando conexión {{ $store.state.userData && $store.state.userData.role === 'DOCTOR_ROLE' ? '' : 'del Operador' }} </p>
                <p v-if="esperando == 3" class="mb-0">
                  Fin de la video llamada
                </p>
              </div>

              <div class="local-view d-flex flex-column justify-center align-center" v-if="esperando != 3"
                   :style="$vuetify.breakpoint.mobile && salachat && showSideBar ? 'display: none!important;':''">
                <div v-if="localStream" id="operator-remote" v-show="localVideoSet">
                  <video muted autoplay :srcObject.prop="localStream"></video>
                </div>

                <div id="waiting-local" class="d-flex flex-column align-center justify-center" v-if="!localVideoSet">
                  <div class="text-center">
                    <v-progress-circular indeterminate color="#2250b3" size="22" width="2"></v-progress-circular>
                    <p class="caption mb-0">Esperando video</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="justify-center" :style="$vuetify.breakpoint.mobile && salachat && showSideBar ? 'margin-bottom: 300px;':''">
              <v-btn
                  @click="disconnect(), deleteChat(), DeleteGeneral()"
                  class="subtitle-1 font-weight-bold"
                  color="#b40c00"
                  dark
                  tile
                  x-large
                  block
              >
                <v-icon
                    left
                    dark
                >
                  mdi-phone-hangup
                </v-icon>
                Terminar Llamada
              </v-btn>
            </div>
            <v-scroll-y-reverse-transition>
              <div v-if="$vuetify.breakpoint.mobile && salachat" v-show="showSideBar" class="mobile-chat-container" style="height: 300px;">
                <div id="all-video-container"
                     class="fill-height"
                     style="background-color: white"
                     v-if="videoFromAdmin && sidebarType == 2">
                  <iframe width="100%" height="100%" :src="'https://www.youtube.com/embed/' + videoFromAdmin + '?autoplay=1&rel=0'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div id="all-video-container"
                     class="fill-height"
                     style="background-color: white"
                     v-show="sidebarType == 3">
                  <div class="text-center fill-height" id="remotes-video-screen-share" v-show="screenShareVideo"></div>
                  <div
                      id="remote-waiting"
                      class="d-flex flex-column justify-center align-center fill-height"
                      v-if="!screenShareVideo"
                  >
                    <v-progress-circular v-if="!screenShareVideo" indeterminate color="#2250b3"></v-progress-circular>
                    <p v-if="!screenShareVideo" class="mb-0">Conectando ...</p>
                  </div>
                </div>
                <Chat :salachat="salachat" v-show="sidebarType == 4" :hasChat="() => hasChat = true"/>
                <Ficha v-show="sidebarType == 5"/>
              </div>
            </v-scroll-y-reverse-transition>
          </div>
        </v-col>

        <v-col :cols="getSecondCol()" v-show="showSideBar" v-if="!$vuetify.breakpoint.mobile && salachat">
          <div id="all-video-container"
               class="fill-height"
               v-if="videoFromAdmin && sidebarType == 2">
            <iframe width="100%" height="100%" :src="'https://www.youtube.com/embed/' + videoFromAdmin + '?autoplay=1&rel=0'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div id="all-video-container"
               class="fill-height"
               style="background-color: white"
               v-show="sidebarType == 3">
            <div class="text-center fill-height" id="remotes-video-screen-share" v-show="screenShareVideo"></div>
            <div
                id="remote-waiting"
                class="d-flex flex-column justify-center align-center fill-height"
                v-if="!screenShareVideo"
            >
              <v-progress-circular v-if="!screenShareVideo" indeterminate color="#2250b3"></v-progress-circular>
              <p v-if="!screenShareVideo" class="mb-0">Conectando ...</p>
            </div>
          </div>
          <Chat :salachat="salachat" style="border-left: solid 1px grey;" v-if="sidebarType == 4" :hasChat="() => hasChat = true"/>
          <Ficha v-if="sidebarType == 5"/>

        </v-col>
      </v-row>
    </v-card>
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
} from "@/helpers/SocketClient/room";
import { getDatabase, ref, onValue, push, remove } from "firebase/database";
import { videollamada } from "@/helpers/click2call/api/calls";
import Chat from './Chat/Chat'
import Ficha from "@/components/Ficha/Ficha.vue";
export default {
  props: {
    videomail: {
      type: Function,
    },
    cerrar: {
      type: Function,
    },
    volver: {
      type: Function,
    },
  },
  components: {
    Ficha,
    Chat
  },
  data() {
    return {
      showSideBar: true,
      screenShareVideo: false,
      hasChat: false,
      sidebarType: 4,
      recordingtype: 1,
      companyId: null,
      VideoLlamada: false,
      esperando: 2,
      remoteVideoSet: false,
      localVideoSet: false,
      idOperator: null,
      salachat: null,
      userId: null,
      connected_at: true,
      ended_at: null,
      videoCallID: null,
      roomPrivate: this.$store.state.roomId,
      formSpeciality: {
        speciality: this.$store.state.specialityID,
      },

      localStream: null,
      media: {
        audio: true,
        video: {
          width: { min: 640, ideal: 1280, max: 1920 },
          height: { min: 480, ideal: 720, max: 1080 },
        },
      },
      videoContainerHeight: null,
      videoSizeObserver: null,
      videoFromAdmin: null,
      usersInRoom: {}
    };
  },
  watch: {
    "$store.state.roomVideoCall"(newValue) {
      console.log("Valor Detectado: ", newValue);
    },
  },

  mounted() {
    // this.getVideoDimensions()
    // this.startStreaming();
    const { sala_id, id } = this.$route.params
    this.userId = id
    this.roomPrivate = sala_id || this.roomPrivate
    this.videollamada()
    // this.salachat = '1234567890'
    this.volver;
    if(this.$vuetify.breakpoint.mobile){
      this.showSideBar = false
    }
  },
  methods: {
    getFirstCol(){
      if(this.showSideBar){
        if(this.$vuetify.breakpoint.mobile){
          return 12
        }
        if(this.sidebarType == 2 || this.sidebarType == 3){
          return 4
        }
        else{
          return 8
        }
      }
      return 12
    },
    getSecondCol(){
      if(this.$vuetify.breakpoint.mobile){
        return 12
      }
      if(this.sidebarType == 2 || this.sidebarType == 3){
        return 8
      }
      return 4
    },
    listenAdmin() {
      const db = getDatabase();
      const adminRef = ref(db, "roomAdmin/" + this.salachat);
      onValue(adminRef, (snapshot) => {
        const data = snapshot.val()
        if(data && data.videoPlay){
          this.videoFromAdmin = data.videoPlay.videoID
          this.sidebarType = 2
          this.showSideBar = true
        }
        else if(this.videoFromAdmin){
          this.videoFromAdmin = null
          this.sidebarType = 1
          this.showSideBar = false
        }
      });
    },
    getVideoDimensions(){
      const videoContainer = document.getElementById('all-video-container')
      if(videoContainer){
        this.videoSizeObserver = new ResizeObserver(this.changeVideoDimensions).observe(videoContainer)
      }
    },
    changeVideoDimensions (dims) {
      if (dims && dims[0] && dims[0].contentRect.height) {
        this.videoContainerHeight = dims[0].contentRect.height
      }
    },
    DeleteGeneral() {
      // this.writeNewPostSpecialyty();
      this.writeNewPost(this.videoCallID);
    },

    writeNewPost(sala) {
      const db = getDatabase();
      remove(ref(db, "notifications/" + this.companyId + "/" + "common/" + sala));
    },
    // writeNewPostSpecialyty() {
    //   const db = getDatabase();
    //   remove(ref(db, "notifications/" + this.info.company_id + "/" + this.info.id));
    //   //  console.log("funcionaEspecialidad?");
    // },

    clearMessage() {
      this.message = "";
    },
    deleteChat() {
      const db = getDatabase();
      remove(ref(db, "chat/" + this.salachat));
      // console.log("funciona?");
    },
    derivedTest() {
      this.$store.commit("setDerived", 1);
    },

    async videollamada() {
      const self = this;
      const data = this.formSpeciality;
      if (this.roomPrivate == null) {
        videollamada(data)
            .then(function(response) {
              self.companyId = response.data.company_id;
              if (response.success == true) {
                // self.message = "Autorizado para entrar a la sala";
                self.videoCallID = response.data.id;
                self.startStreaming(response.data.id);
                self.salachat = response.data.id;
                self.listenAdmin()
                // console.log(self.salachat)
              } else {
                // Se maneja error con un aviso al cliente
                console.log("Error socket");
              }
            })
            .catch((error) => {
              self.videomail();
              if (!error.success) {
                self.derivedTest();
                this.$store.commit("setStep", 1);
              }
              // console.log(error);
            });
      } else {
        console.log("SalaPrivada");
        self.startStreaming(this.roomPrivate);
        self.salachat = this.roomPrivate;
      }
    },

    startStreaming(id) {
      const userName = this.$store.state.userData && this.$store.state.userData.name ? this.$store.state.userData.name : "Cliente";
      const userId = this.$store.state.userData && this.$store.state.userData.id ? this.$store.state.userData.id : id;
      connectToSocket(
          "https://vcsocket.click2call.cl:8443/",
          () => {
            joinRoom(id, userName, userId, null, (response) => this.onJoin(response));
          },
          (message) => this.handleSocketMessage(message)
      );
      this.localVideoSet = true;
      console.log("idJoin", id);
    },

    onJoin(user) {
      this.addUserToRoom(user, true)
      start((localStream) => {
        this.localStream = localStream;
      }, this.media);
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
      console.log("STOP RECORDING");
      const self = this;
      // if (self.roomPrivate == null) {
      //   this.dialog = false;
      //   this.$store.commit("setStep", 1);
      //   this.$store.commit("setSpeciality", null);

      //   //Funcion para cerrar Drawer
      //   this.volver();
      //   console.log("Funciono");
      //   //
      // } else {

      this.dialog = false;
      this.$store.commit("setStep", 1);
      this.$store.commit("setSpeciality", null);

      //Funcion para cerrar Drawer
      this.volver();
      console.log("Funciono");
      this.$store.commit("setRoomId", null);

      // this.$route.name != 'Home' && this.$router.push({ name: "Home" });
      this.$router.back();
      // }
    },

    onNewUserInRoom(user) {
      this.addUserToRoom(user)
      if (user.mediaFlowingOut) {
        this.onVideoReady(user.socketID)
      }
    },
    addUserToRoom(user, local = false){
      const usersInRoom = Object.assign({}, this.usersInRoom)
      user.local = local
      usersInRoom[user.socketID] = user
      this.usersInRoom = usersInRoom
    },
    onVideoReady(socketID, containerID) {
      const videoElement = this.createVideoContainer(containerID);
      createNewReceivingPeer(socketID, videoElement);
    },
    onMultipleNewUserInRoom(usersInRoom) {
      usersInRoom.forEach((user) => this.onNewUserInRoom(user));
    },
    removeVideoElement(videoContainer = '#remotes-video video'){
      const element = document.querySelector(videoContainer)
      element && element.remove()
    },
    destroyConnectionWithRemote(socketID){
      const userInfo = this.usersInRoom[socketID]
      if(userInfo.isStreamer){
        this.sidebarType = 4
        this.removeVideoElement('#remotes-video-screen-share video')
      }
      delete this.usersInRoom[socketID]
      const keys = Object.keys(this.usersInRoom)
      if(keys.length <= 1){
        stopRecording();
        disconnectFromSocket();
        this.remoteVideoSet = false;
        this.localVideoSet = false;
        (this.esperando = 3),
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
          // startRecording(this.videoCallID, this.recordingtype);
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
.local-view{
  position: absolute;
  left: 10px;
  bottom: 10px;
  width: 240px;
  height: 140px;
  border-radius: 10px;
  background-color: #f2f2f2;
}
.local-view, .local-view video{
  height: 140px;
  max-height: 140px;
  width: fit-content;
}
.local-view.sidebar{
  position: static;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: white;
}
#all-video-container{
  position: relative;
}
#operator-remote video, #waiting-local{
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
  border: 1px solid grey;
}
.send-message-container{
  background-color: #f2f2f2;
  border-top: 1px solid #cbcbcb;
  min-height: 53px;
}
.message-container{
  background-color: #2250b3;
  position: relative;
  min-width: 40%;
  border-radius: 10px;
}
.message-container.secondary-user{
  background-color: #626262;
}
.message-time-container{
  position: absolute;
  bottom: 0px;
  right: 10px;
}
/deep/ #remotes-video video, #remote-waiting,
/deep/ #remotes-video-screen-share video {
  max-width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
.mobile-chat-container{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
</style>
