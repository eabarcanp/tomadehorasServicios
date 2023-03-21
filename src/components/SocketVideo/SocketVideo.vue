<template>
  <div id="SocketVideo">
    <v-container fluid class="py-0" v-model="VideoLlamada">
      <v-row>
        <v-col sm="6" cols="10">
          <div class="mt-8 ml-7">
            <p
              style="color: #feb62d"
              :class="!$vuetify.breakpoint.mobile ? 'display-1' : 'display-1 '"
            >
              <v-icon
                :class="!$vuetify.breakpoint.mobile ? 'mt-n2' : 'mt-n3 '"
                color="#FEB62D"
                style="font-size: 65px"
                >mdi-video-outline</v-icon
              >
              Videollamada
            </p>
          </div>
        </v-col>
        <v-col sm="6" cols="2">
          <div
            :class="
              !$vuetify.breakpoint.mobile ? 'mt-12 text-end' : ' mt-9 ml-n10'
            "
          >
            <v-btn @click="volver(), leave(), deleteChat()" text
              ><v-icon color="#FEB62D" style="font-size: 50px"
                >mdi-arrow-left</v-icon
              ></v-btn
            >
          </div>
        </v-col>
      </v-row>
      <!-- <div class="mt-10 ml-8">
        <p style="color: #feb62d" class="display-2">
          <v-icon class="mt-n2" color="#FEB62D" style="font-size: 65px"
            >mdi-video-outline</v-icon
          >
          Video Call
        </p>
      </div> -->
      <div>
        <v-row>
          <v-col
            :class="!$vuetify.breakpoint.mobile ? 'px-0 ' : 'd-none d-sm-flex'"
            sm="4"
            cols="4"
          >
            <v-container style="height: 79.5%; background: #f7f7f7">
              <v-row>
                <v-col style="overflow: auto; height: 47vh">
                  <v-container
                    v-for="(messag, index) in listMessage"
                    :key="index"
                    style="color: #022d41"
                    class="rounded-lg"
                  >
                    <div
                      v-if="messag.user == 2"
                      class="d-flex flex-row-reverse"
                    >
                      <p
                        style="background: #ddd4d4"
                        class="pl-2 pr-5 ml-2 pt-2 pb-0 subtitle-1 rounded-lg"
                      >
                        {{ messag.mensaje }}<br />
                        <span
                          style="font-size: 10px; float: right"
                          class="blue-grey--text text--lighten-1 Datecontent"
                          >{{ messag.createdAt }}</span
                        >
                      </p>
                    </div>
                    <div v-else class="d-flex">
                      <p
                        style="background: white"
                        class="pl-2 pr-5 ml-2 pt-2 pb-0 subtitle-1 rounded-lg"
                      >
                        {{ messag.mensaje }}<br />
                        <span
                          style="font-size: 10px; float: right"
                          class="
                            blue-grey--text
                            text--lighten-2
                            Datecontent
                            ml-10
                          "
                          >{{ messag.createdAt }}</span
                        >
                      </p>
                    </div>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>

            <div class="mt-3" style="background: #ffffff">
              <v-row class="pt-4">
                <v-col cols="2">
                  <div class="d-flex flex-nowrap ml-5">
                    <v-file-input class="mt-n2 ml-2" />
                  </div>
                </v-col>

                <v-col class="d-flex flex-row" cols="10">
                  <v-text-field
                    style="max-width: 230px"
                    v-on:keyup.13="insertDb()"
                    filled
                    rounded
                    dense
                    placeholder="Escribe un mensaje aquí"
                    v-model="message"
                  >
                  </v-text-field>
                  <v-btn
                    @click="insertDb()"
                    @click.clear="clearMessage"
                    class="ml-2"
                    rounded
                    height="40"
                    width="40px"
                    style="background: #feb62d"
                    icon
                    :disabled="message === ''"
                  >
                    <v-icon class="ml-1" outlined color="white"
                      >mdi-send</v-icon
                    >
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-col>

          <v-col sm="8" cols="12">
            <v-row>
              <v-col class="px-0">
                <div
                  class="text-center"
                  id="remoteViewContainer"
                  v-show="remoteVideoSet"
                ></div>
                <div
                  id="remote-waiting"
                  class="d-flex flex-column justify-center align-center"
                  v-if="!remoteVideoSet"
                >
                  <v-progress-circular
                    v-if="esperando == 2"
                    indeterminate
                    color="#2250b3"
                  ></v-progress-circular>
                  <p v-if="esperando == 2" class="mb-0">
                    Esperando conexión del operador
                  </p>
                  <p v-if="esperando == 3" class="mb-0">
                    Fin de la video llamada
                  </p>
                </div>
              </v-col>
            </v-row>

            <v-row class="mt-5 mb-10">
              <v-col cols="12" sm="6">
                <div class="text-end">
                  <v-btn
                    @click="leave(), deleteChat()"
                    width="75"
                    height="75"
                    icon
                    :style="
                      !$vuetify.breakpoint.mobile
                        ? 'background-color: #cc2d2d;margin-top: -100px;margin-top: -100px;margin-right: -40px;'
                        : 'background-color: #cc2d2d;margin-top: -20px;margin-right:130px'
                    "
                    ><v-icon style="font-size: 40px" color="white"
                      >mdi-phone-hangup</v-icon
                    ></v-btn
                  >
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div
                  :class="
                    !$vuetify.breakpoint.mobile ? 'text-end' : 'text-start'
                  "
                  :style="
                    !$vuetify.breakpoint.mobile
                      ? 'margin-top: -45%'
                      : 'margin-top: -61%'
                  "
                  id="localViewContainer"
                ></div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";

import { getDatabase, ref, onValue, push, remove } from "firebase/database";
import Drawer from "../drawer/Drawer.vue";
import io from "socket.io-client";
import { videollamada } from "../../helpers/click2call/api/calls";
export default {
  name: "SocketVideo",
  components: {
    Drawer,
  },
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
  data() {
    return {
      infoError: null,

      esperando: 2,

      VideoLlamada: false,
      dialog: null,
      socket: null,
      pcPeers: [],
      remoteStream: null,
      localStream: null,
      close: null,
      idSala: null,
      remoteVideoSet: false,
      roomPrivate: this.$store.state.roomId,

      salachat: null,
      listMessage: [],
      message: "",
      formSpeciality: {
        speciality: this.$store.state.specialityID,
      },
    };
  },
  watch: {
    "$store.state.roomVideoCall"(newValue) {
      console.log("Valor Detectado: ", newValue);
    },
  },
  mounted() {
    // console.log("IDROOMPRIVATE",roomPrivate)
    this.socket = io("https://devapis.anubys.cl:16443/", {
      transports: ["websocket"],
      autoConnect: false,
      reconnect: true,
      forceNew: true,
    });
    // this.startVideollamada();
    this.videollamada();
    this.volver;

    // console.log("viendosala",this.salachat);
    // console.log("msn",this.listMessage);
  },
  methods: {
    clearMessage() {
      this.message = "";
    },

    deleteChat() {
      const db = getDatabase();
      remove(ref(db, "chat/" + this.salachat));
      // console.log("funciona?");
    },
    insertDb() {
      const db = getDatabase();
      push(ref(db, "chat/" + this.salachat), {
        mensaje: this.message,
        createdAt: moment(new Date()).format("HH:mm"),
        user: 2,
      });
      this.clearMessage();
      // console.log(this.salachat);
    },
    pushLog(err) {
      const db = getDatabase();
      push(ref(db, "ConsoleLog/"), {
        Error: err,
      });
    },

    ListenAlert() {
      const db = getDatabase();
      const starCountRef = ref(db, "chat/" + this.salachat);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        this.listMessage = data;
      });
      console.log(this.salachat);
    },

    startVideollamada(id) {
      const self = this;
      console.log("IDJoin", id);
      console.log("ROOM ID",self.roomPrivate);
      // this.dialog = true;
      // self.cerrar();
      // console.log("startVideollamada: ", room_id);
      this.socket.on("connect", function  ()  {
        console.log("Entro AL CONECT");
        // Esto se llama cuando te conectas al socket
        // Luego llamas al join para unirte a una sala
        // Esta sala es la que comentamos que iba a venir desde el backend para que en la app y en la web sea la misma
        // Ahora para efectos de prueba la sala es 123
        // self.join( self.$store.state.modalVideollamada.meeting_room )
        // self.join(room_id);
        if (self.roomPrivate != null) {
          console.log("Que room viene?: ", self.roomPrivate);
          self.join(self.roomPrivate);
        } else {
          console.log("Inicio el join");
          self.join(id);
          console.log("Room ID");
        }
      });

      this.socket.on("exchange", function (data) {
        self.exchange(data);
      });
      this.socket.on("leave", (socketId) => {
        self.remoteVideoSet = false;
        (self.esperando = 3),
          setTimeout(() => {
            self.cerrar();
            this.$store.commit("setModalButton", 0);
            this.leave();
            // this.$store.commit("setStep", 1);
          }, 5000);
        console.log("socketId", socketId);
      });

      // Conectamos al socket apenas se monta el componente, esto lo puedes manejar de otra forma o, si te sirve, así como está
      // También en esta función se pide el video del usuario si es que no lo ha pedido
      this.connectToSocket();
    },

    async connectToSocket() {
      if (!this.localStream) {
        this.localStream = await this.getUserMedia(true, true);
      }
      this.setVideo();
      this.socket.connect();
    },
    getUserMedia(video = true, audio = true) {
      return new Promise(function (resolve, reject) {
        let setTimeoutMedia = setTimeout(function () {
          reject();
        }, 40000);
        let videoOptions = false;
        if (video) {
          videoOptions = {
            width: { min: 426, ideal: 480, max: 1280 },
            height: { min: 240, ideal: 360, max: 720 },
            frameRate: { ideal: 15, max: 30 },
          };
        }

        navigator.mediaDevices
          .getUserMedia({
            video,
            audio,
          })
          .then(
            (localMediaStream) => {
              clearTimeout(setTimeoutMedia);
              resolve(localMediaStream);
            },
            (err) => {
              alert(
                "El navegador no ha permitido el uso de la cámara y/o micrófono. O es posible que el computador no tenga una cámara conectada. Por favor revisa la configuración de tu navegador para luego continuar con el monitoreo."
              );
            }
          );
      });
    },
    setVideo(remote = false) {
      if (remote) {
        var ViewAuxRemote = document.getElementById("remoteViewContainer");
        var remoteVideo = document.createElement("video");
        remoteVideo.id = "remote-view";
        remoteVideo.srcObject = this.remoteStream;
        remoteVideo.autoplay = "autoplay";
        remoteVideo.setAttribute("playsinline", true);
        ViewAuxRemote.appendChild(remoteVideo);
        this.remoteVideoSet = true;
      } else {
        var ViewAuxLocal = document.getElementById("localViewContainer");
        var localVideo = document.createElement("video");
        localVideo.id = "local-view";
        localVideo.muted = "muted";
        localVideo.srcObject = this.localStream;
        localVideo.autoplay = "autoplay";
        localVideo.setAttribute("playsinline", true);
        localVideo.muted = "muted";
        ViewAuxLocal.appendChild(localVideo);
      }
    },
    async videollamada() {
      const self = this;
      const data = this.formSpeciality;
      if (this.roomPrivate == null) {
        console.log("Incio la llamada normal");
        videollamada(data)
          .then( function (response)  {
            console.log("Clg", response);
            if (response.success == true) {
              // self.message = "Autorizado para entrar a la sala";
              self.startVideollamada(response.data.id);
              console.log(response.data.id);
              self.salachat = response.data.id;
              self.ListenAlert();
              // console.log(self.salachat)
            } else {
              // Se maneja error con un aviso al cliente
              console.log("Error socket");
            }
          })
          .catch((error) => {
            self.videomail();
            if (!error.success) {
              console.log("No hay operador", error);
              self.derivedTest();
              this.$store.commit("setStep", 1);
            }
            // console.log(error);
          });
      }
       else {
        self.startVideollamada();
        self.salachat = 99;
        self.ListenAlert();
      }
    },
    derivedTest() {
      this.$store.commit("setDerived", 1);
    },

    join(roomID) {
      const self = this;
      console.log("join: ", roomID);
      this.socket.emit("join", roomID, function (socketIds) {
        for (var i in socketIds) {
          var socketID = socketIds[i];
          // Al hacer join te muestra los id de los usuarios que ya están conectados al socket
          // Luego se llama a la función que crea los peer connections
          // Nos aseguramos que no se llame a si mismo con el if
          console.log("JOIN");
          if (socketID != self.socket.id) {
            self.createPC(socketID, true);
          }
        }
      });
    },

    leave() {
      const self = this;
      if (self.roomPrivate == null) {
        this.dialog = false;
        this.$store.commit("setStep", 1);
        this.$store.commit("setSpeciality", null);

        //Funcion para cerrar Drawer
        this.volver();
        console.log("Funciono");
        //
      } else {
        this.dialog = false;
        this.$store.commit("setStep", 1);
        this.$store.commit("setSpeciality", null);

        //Funcion para cerrar Drawer
        this.volver();
        console.log("Funciono");
        this.$store.commit("setRoomId", null);
        this.$router.push({ name: "Home" });
      }

      return new Promise(function () {
        self.pcPeers.forEach((pc) => {
          if (pc) {
            pc.close();
          }
        });
        let video = document.getElementById("remote-view");
        video && video.remove();
        let videoPIP = document.getElementById("monitor-remote-pip-view");
        videoPIP && videoPIP.remove();
        if (self.localStream) {
          self.localStream.getAudioTracks().forEach((track) => {
            track.enabled = false;
          });
          self.localStream.getVideoTracks().forEach((track) => {
            track.enabled = false;
          });
          self.localStream.getTracks().forEach(function (track) {
            track.stop();
          });
        }
        self.socket.disconnect();
        self.remoteStream = null;
        self.localStream = null;
        let videoLocal = document.getElementById("local-view");
        videoLocal && videoLocal.remove();
      });
    },
    exchange(data) {
      var fromId = data.from;
      var pc;
      const self = this;

      if (fromId in self.pcPeers) {
        pc = self.pcPeers[fromId];
      } else {
        pc = self.createPC(fromId, false);
      }

      if (data.sdp) {
        pc.setRemoteDescription(new RTCSessionDescription(data.sdp))
          .then(() => {
            if (pc.remoteDescription.type === "offer")
              pc.createAnswer()
                .then((desc) => {
                  pc.setLocalDescription(desc)
                    .then(() => {
                      self.socket.emit("exchange", {
                        to: fromId,
                        sdp: pc.localDescription,
                      });
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                })
                .catch(function (error) {
                  console.log(error);
                });
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        data.candidate !== null &&
          data.candidate &&
          pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    },

    createPC(socketId, isOffer) {
      const self = this;
      var configuration = {
        iceServers: [
          {
            urls: "turn:3.132.246.170:3478",
            username: "nphturnuser",
            credential: "bX8J9NbWfg2K6",
          },
        ],
      };
      var pc = new RTCPeerConnection(configuration);
      self.pcPeers[socketId] = pc;

      pc.onicecandidate = function (event) {
        if (event.candidate && event !== null && event.candidate !== null) {
          self.socket.emit("exchange", {
            to: socketId,
            candidate: event.candidate,
          });
        }
      };

      // function createOffer() {
      //     pc.createOffer(function(desc) {
      //         pc.setLocalDescription(desc,function () {
      //             self.socket.emit('exchange', {'to': socketId, 'sdp': pc.localDescription });
      //         },(error) => console.log(error,'error 2'));
      //     },(error) => console.log(error,'error 3'));
      // }
      async function createOffer() {
        const desc = await pc.createOffer();
        await pc.setLocalDescription(desc);
        self.socket.emit("exchange", {
          to: socketId,
          sdp: pc.localDescription,
        });
        // pc.createOffer().then((desc) => {
        //   console.log("createOffer", desc);
        //   pc.setLocalDescription(desc).then(() => {
        //     console.log("setLocalDescription", pc.localDescription);
        //     self.socket.emit("exchange", {
        //       to: socketId,
        //       sdp: pc.localDescription,
        //     });
        //   });
        // });
      }

      pc.onnegotiationneeded = function () {
        if (isOffer) {
          createOffer();
        }
      };

      pc.oniceconnectionstatechange = function (event) {
        if (event.target.iceConnectionState === "connected") {
          createDataChannel();
        }
      };

      pc.onsignalingstatechange = function (event) {
        if (event.target.connectionState === "disconnected") {
          // self.leave();
        }
      };

      // pc.onaddstream = function (event) {
      // 	self.remoteStream = event.stream;
      // 	self.setVideo(true);
      // };

      pc.addEventListener("track", function (event) {
        console.log("ONTEACK", event);
        if (event.track.kind == "video") {
          self.remoteStream = event.streams[0];
          self.setVideo(true);
        }
      });

      // pc.addStream(self.localStream);
      self.localStream
        .getTracks()
        .forEach((track) => pc.addTrack(track, self.localStream));

      function createDataChannel() {
        if (pc.textDataChannel) {
          return;
        }
        var dataChannel = pc.createDataChannel("text");
        dataChannel.onerror = function (error) {
          console.log(error);
        };
        dataChannel.onmessage = function (event) {
          console.log(event);
        };
        dataChannel.onopen = function () {};
        dataChannel.onclose = function () {};

        pc.textDataChannel = dataChannel;
      }

      return pc;
    },
  },
};
</script>

<style >
#localViewContainer video {
  max-width: 130px;
  border-radius: 10%;
}
#remoteViewContainer video,
#remote-waiting {
  width: 100%;
  height: 370px !important;
  max-height: 400px;
  background-color: #f5f5f5;
}
</style>