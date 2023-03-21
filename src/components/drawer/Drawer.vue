<template>
  <div id="click2call-action-container" >
    <!-- <v-img
      v-if="this.$store.state.modalButton == 0"
      @click.stop="closeDrawer"
      eager
      :src="require('../assets/NewBtn.png')"
      :style="
        !$vuetify.breakpoint.mobile
          ? 'bottom: 300px;width: 275px;right: 30px;z-index: 10;position: fixed;float: right;'
          : 'bottom: 50px;width: 190px;z-index: 10;position: fixed;right: 10px;'
      "
    /> -->
    <v-btn
      @mouseover="closeDrawer"
      elevation="3"
      color="#2250B3"
      :width="$vuetify.breakpoint.mobile ? '75' : '120'"
      height="auto"
      v-if="this.$store.state.modalButton == 0"
      fixed
      style="
        top: 200px;
        z-index: 9999;
        border-radius: 10px 0 0 10px;
        right: 0;
      "
			class="click2call-action-inner"
    >
      <div class="d-flex align-center justify-center flex-column mt-3">
        <p style="color: white" class="display-1">
          C<span style="color: #fec12d" class="font-weight-bold">2</span>C
        </p>
        <!-- <div
          v-if="callback != false && working_hour != false"
          class="rounded-xl"
          style="border: solid 1px white"
        >
          <v-icon color="#fec12d" class="my-4 mx-2" size="40">
            mdi-phone-forward-outline
          </v-icon>
        </div> -->
        <div
          v-if="videoCall != false && working_hour != false"
          class="rounded-xl mt-4"
          style="border: solid 1px white"
        >
          <v-icon color="#fec12d" class="my-4 mx-2" size="40">
            mdi-video
          </v-icon>
        </div>
        <div class="rounded-xl my-4" style="border: solid 1px white">
          <v-icon color="#fec12d" class="my-4 mx-2" size="40">
            mdi-email-outline
          </v-icon>
        </div>
        <div class="rounded-xl mt-0 mb-10" style="border: solid 1px white">
          <v-icon color="#fec12d" class="my-4 mx-2" size="40">
            mdi-pencil
          </v-icon>
        </div>
      </div>
    </v-btn>

    <v-navigation-drawer
      v-scroll="onScroll"
      color="#2250B3"
      stateless
      hide-overlay
      :style="
        !$vuetify.breakpoint.mobile
          ? 'z-index: 9999; top: 100px'
          : 'z-index: 9999; top: 100px'
      "
      class="rounded-xl click2call-action-inner"
      v-model="drawer"
      fixed
      temporary
      right
      :width="$vuetify.breakpoint.mobile ? drawerWidthMobile : drawerWidth"
      :height="$vuetify.breakpoint.mobile ? '650' : ''"
    >
      <div class="d-flex flex-justify">
        <v-card
          width="1200"
          :height="$vuetify.breakpoint.mobile ? '650' : 'auto'"
          color="#3364D0"
          v-if="ModalLlamada"
        >
          <v-row>
            <v-col>
              <CallBack :volver="drawerBack" :videomail="MoVideoMail" />
            </v-col>
          </v-row>
        </v-card>

        <v-card
          elevation="0"
          width="1200"
          :height="$vuetify.breakpoint.mobile ? '650' : 'auto'"
          color="#3364D0"
          v-if="modalVideoCall"
        >
          <v-row class="fill-height">
            <v-col>
							<FormVideoCall :volver="drawerBack" v-if="$store.state.step == 1"/>
            </v-col>
          </v-row>
        </v-card>
        <v-card
          width="1200"
          :height="$vuetify.breakpoint.mobile ? '650' : 'auto'"
          color="#3364D0"
          v-if="modalVideomail"
        >
          <v-row>
            <v-col class="py-0">
              <VideoMail :volver="drawerBack" :ocultar="closeDrawer" />
            </v-col>
          </v-row>
        </v-card>

        <v-card
          elevation="0"
          width="1200"
          :height="$vuetify.breakpoint.mobile ? '650' : 'auto'"
          color="#3364D0"
          v-if="modalContacto"
        >
          <v-row>
            <v-col class="py-0">
              <Contacto :volver="drawerBack" :ocultar="closeDrawer" />
            </v-col>
          </v-row>
        </v-card>

        <v-container
          v-show="showDrawer"
          class="px-1"
          style="width: 100%; max-width: 320px"
        >
          <v-row class="mt-2">
            <v-col sm="2" md="2" lg="2" xl="2" cols="2">
              <v-btn @click.stop="() => testm()" class="" text
                ><v-icon style="font-size: 35px" color="#FEB62D"
                  >mdi-close-circle-outline</v-icon
                ></v-btn
              >
            </v-col>

            <v-col sm="10" md="10" lg="10" xl="10" cols="10">
              <div class="">
                <v-img
                  eager
                  :class="$vuetify.breakpoint.mobile ? ' ml-4' : 'ml-7'"
                  :src="require('../../assets/iconDrawer.svg')"
                  width="150"
                />
              </div>
            </v-col>
          </v-row>

          <v-row :class="working_hour != false ? 'mt-7' : ''">
            <v-col>
              <div class="text-center">
                <p class="mx-auto" style="color: white; width: 250px">
                  Hablar con un ejecutivo inmediatamente.
                </p>
              </div>
            </v-col>
          </v-row>

          <v-row class="mt-n3">
            <v-col class="text-center">
              <!-- <div v-if="callback != false && working_hour != false">
                <v-btn
                  @click="() => Mllamada()"
                  :width="$vuetify.breakpoint.mobile ? '200' : '300'"
                  height="60"
                  class="rounded-xl"
                  style="border: solid 1px; border-color: white"
                  text
                  ><v-icon
                    :size="$vuetify.breakpoint.mobile ? '20' : '30'"
                    color="#FEB62D"
                    :class="$vuetify.breakpoint.mobile ? ' mr-1' : 'mr-3'"
                    >mdi-phone-forward-outline</v-icon
                  >
                  <p
                    :class="
                      $vuetify.breakpoint.mobile
                        ? 'mt-4 caption font-weight-black'
                        : 'mt-4 title font-weight-black'
                    "
                    :style="
                      $vuetify.breakpoint.mobile
                        ? 'color: #feb62d;font-size:15px!important'
                        : 'color: #feb62d;'
                    "
                  >
                    Llamada Telefónica
                  </p></v-btn
                >

                <p
                  :class="
                    $vuetify.breakpoint.mobile ? 'mt-3 mx-3' : 'mt-3 mx-auto'
                  "
                  style="color: white"
                >
                  Comunícate por voz con nuestros operadores.
                </p>
              </div> -->

              <div v-if="videoCall != false && working_hour != false">
                <v-btn
                  @click="() => MoVideo()"
                  :width="$vuetify.breakpoint.mobile ? '200' : '300'"
                  height="60"
                  class="rounded-xl"
                  style="border: 1px solid white;"
                  text
                  ><v-icon
                    :size="$vuetify.breakpoint.mobile ? '25' : '35'"
                    color="#FEB62D"
                    :class="$vuetify.breakpoint.mobile ? ' mr-1' : 'mr-5'"
                    >mdi-video-outline</v-icon
                  >
                  <p
                    :class="
                      $vuetify.breakpoint.mobile
                        ? 'mt-4 title font-weight-black'
                        : 'mt-4 headline font-weight-black'
                    "
                    style="color: #feb62d"
                  >
                    Videollamada
                  </p></v-btn
                >

                <p class="mt-8 mx-3" style="color: white">
                  Comunícate por videollamada con nuestros operadores.
                </p>
              </div>

              <div v-if="video_mail != false">
                <v-btn
                  :width="$vuetify.breakpoint.mobile ? '200' : '300'"
                  height="60"
                  :class="
                    $vuetify.breakpoint.mobile
                      ? 'rounded-xl pr-5'
                      : 'rounded-xl pr-10'
                  "
                  style="border: 1px solid white;"
                  text
                  @click="() => MoVideoMail()"
                  ><v-icon
                    :size="$vuetify.breakpoint.mobile ? '25' : '35'"
                    color="#FEB62D"
                    :class="$vuetify.breakpoint.mobile ? ' mr-1' : 'mr-5'"
                    >mdi-arrow-top-left-thick</v-icon
                  >
                  <p
                    :class="
                      $vuetify.breakpoint.mobile
                        ? 'mt-4 title font-weight-black'
                        : 'mt-4 headline font-weight-black'
                    "
                    style="color: #feb62d"
                  >
                    Video Mail
                  </p></v-btn
                >
                <p class="mt-3" style="color: white">
                  Envía un video para que nuestros operadores se comuniquen
                  contigo posteriormente.
                </p>
              </div>

              <div>
                <v-btn
                  :width="$vuetify.breakpoint.mobile ? '200' : '300'"
                  height="60"
                  :class="
                    $vuetify.breakpoint.mobile
                      ? 'rounded-xl pr-5'
                      : 'rounded-xl pr-10'
                  "
                  style="border: 1px solid white;"
                  text
                  @click="() => MoContacto()"
                  ><v-icon
                    :size="$vuetify.breakpoint.mobile ? '25' : '35'"
                    color="#FEB62D"
                    :class="$vuetify.breakpoint.mobile ? ' mr-1' : 'mr-5'"
                    >mdi-pencil</v-icon
                  >
                  <p
                    :class="
                      $vuetify.breakpoint.mobile
                        ? 'mt-4 title font-weight-black'
                        : 'mt-4 headline font-weight-black'
                    "
                    style="color: #feb62d"
                  >
                    CONTACTO
                  </p></v-btn
                >
                <p class="mt-3" style="color: white">
                  Deja tus datos y te contactamos
                </p>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-navigation-drawer>
    <!-- <v-dialog
			v-if="$store.state.step == 2"
			v-model="dialog"
      fullscreen
			persistent
      transition="dialog-bottom-transition"
    >
			<NuevoSocketVideo
				:videomail="MoVideoMail"
				:volver="drawerBack"
				:cerrar="closeDrawer"
				ref="close"
			/>
		</v-dialog> -->
    <div
        v-if="$store.state.step == 2"
        style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(0, 0, 0, 0.8); z-index: 10000"
      >
			<NuevoSocketVideo
				:videomail="MoVideoMail"
				:volver="drawerBack"
				:cerrar="closeDrawer"
				ref="close"
			/>
		</div>
  </div>
</template>

<script>
import { getDatabase, ref, onValue } from "firebase/database";
import { getServices } from "@/helpers/click2call/api/calls";
import CallBack from "./CallBack.vue";
import VideoMail from "./VideoMail.vue";
import FormVideoCall from "../SocketVideo/FormVideoCall.vue";
import { mapState } from "vuex";
import NuevoSocketVideo from "../SocketVideo/NuevoSocketVideo.vue";
import Contacto from "./Contacto.vue";
export default {
  name: "Drawer",
  props: {hide: Boolean},
  components: {
    // AvisoLlamada,
    CallBack,
    VideoMail,
    FormVideoCall,
    NuevoSocketVideo,
    Contacto,
  },
  data() {
    return {
      callback: null,
      videoCall: null,
      working_hour: null,
      video_mail: null,
			dialog: true,
      drawer: true,
      showDrawer: true,
      hidenIcon: 0,
      drawerWidthMobile: this.hide ? 0 : 260,
      drawerWidth: this.hide ? 0 : 320,
      formNumero: false,
      ModalLlamada: false,
      modalVideoCall: false,
      modalContacto: false,
      VideoLlamada: false,
      videomail: false,
      modalVideomail: false,

      operador: null
    };
  },
  watch: {
    operador(newValue) {
      // console.log("operador", newValue);
      if (newValue) {
        this.operador = newValue;
      }
    },

    "$route.query.autovideo": {
      immediate: true,
      handler(id) {
        // console.log("ID:", id);
        if (id) {
          this.$store.commit("setStep", 2);
          setTimeout(() => {
            this.closeDrawer();
            this.MoVideo();
          }, 1000);
        }
      },
    },
    "$route.query.ShareLink": {
      immediate: true,
      handler(id) {
        // console.log("ID:", id);
        if (id) {
          this.$store.commit("setSpeciality", null);
          this.$store.commit("setStep", 2);
          setTimeout(() => {
            // this.closeDrawer();
            this.MoVideo();
          }, 1000);
        }
      },
    },

    "$route.query.privatevideo": {
      immediate: true,
      handler(id) {
        // console.log("ID:", id);
        if (id) {
          // console.log("Queviene?",id)
          this.$store.commit("setRoomId", id);
          this.$store.commit("setStep", 2);

          setTimeout(() => {
            this.drawer = true;
            this.$store.commit("setModalButton", 1);
            // this.closeDrawer();
            this.MoVideo();
          }, 1000);
        }
      },
    },
  },
  computed: {},
  mounted() {
    this.getServices();
  },
  methods: {
    onScroll() {
      // console.log("SeMovio");
      // this.closeDrawer()
      if (
        this.ModalLlamada == true ||
        this.modalContacto == true ||
        this.modalVideomail == true ||
        this.modalVideoCall == true
      ) {
        // console.log("TodoOk");
      } else {
        this.drawer = false;
        (this.modalVideoCall = false),
          (this.modalVideomail = false),
          (this.modalContacto = false),
          (this.ModalLlamada = false);
      this.$store.commit("setModalButton", 0);
      }

    },

    async getServices() {
      const services = await getServices({
        company_key: "67b41b98-7a0c-4fc4-8767-e81f4e617e06",
      });
      console.log(services);
      if (services.success == true) {
        (this.callback = services.data.callBack),
          (this.videoCall = services.data.videoCall),
          (this.video_mail = services.data.videoMail);
        this.working_hour = services.data.working_hours;
      }
      // console.log("Disponible",services);
      // console.log("Status",this.callback , this.videoCall , this.video_mail);
    },

    ListenAlert() {
      const db = getDatabase();
      // const starCountRef = ref(db, 'notifications/' + this.info.company_id + '/' + this.info.id);
      const starCountRef = ref(db, "connections/" + 1 + "/" + 1);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        // console.log(data);
        this.operador = data;
      });
    },

    testm() {
      this.drawer = false;
      this.$store.commit("setModalButton", 0);
      this.showDrawer = true;
      this.drawerWidth = 320;
      this.drawerWidthMobile = 260;
      this.formNumero = false;
      this.ModalLlamada = false;
      this.modalVideoCall = false;
      this.modalContacto = false;
      this.VideoLlamada = false;
      this.videmail = false;
      this.modalVideomail = false;
      this.$refs.close.leave();
    },

    closeDrawer() {
      this.drawer = !this.drawer;
      this.$store.commit("setModalButton", 1);
      this.drawerWidth = this.hide ? 0 :  320;
      this.drawerWidthMobile = this.hide ? 0 : 260;
      this.formNumero = false;
      this.ModalLlamada = false;
      this.modalVideoCall = false;
      this.modalContacto = false;
      this.VideoLlamada = false;
      this.videmail = false;
      this.modalVideomail = false;
      this.ListenAlert();
    },
    drawerBack() {
      this.showDrawer = true;
      this.drawerWidth = this.hide ? 0 :  320;
      this.drawerWidthMobile = this.hide ? 0 :  260;
      this.formNumero = false;
      this.ModalLlamada = false;
      this.modalVideoCall = false;
      this.VideoLlamada = false;
      this.modalContacto = false;
      this.videmail = false;
      this.modalVideomail = false;
      this.$store.commit("setStep", 1);
    },
    Mllamada() {
      this.ModalLlamada = true;
      this.formNumero = true;
      this.drawerWidth = 1200;

      this.modalVideomail = false;
      this.modalVideoCall = false;
      this.modalContacto = false;

      if (this.$vuetify.breakpoint.mobile) {
        this.drawerWidthMobile = 1000;
        this.showDrawer = false;
      }
    },
    MoVideo() {
      (this.modalVideoCall = true),
        (this.VideoLlamada = true),
        (this.drawerWidth = 1200),
        (this.ModalLlamada = false);
      this.modalVideomail = false;
      this.modalContacto = false;

      if (this.$vuetify.breakpoint.mobile) {
        this.drawerWidthMobile = 1000;
        this.showDrawer = false;
      }
    },

    MoVideoMail() {
      (this.modalVideomail = true),
        (this.videomail = true),
        (this.drawerWidth = 1200),
        (this.modalVideoCall = false),
        (this.ModalLlamada = false);
      this.modalContacto = false;

      if (this.$vuetify.breakpoint.mobile) {
        this.drawerWidthMobile = 1000;
        this.showDrawer = false;
      }
    },
    MoContacto() {
      (this.modalContacto = true),
        (this.modalVideomail = false),
        (this.videomail = false),
        (this.drawerWidth = 1200),
        (this.modalVideoCall = false),
        (this.ModalLlamada = false);

      if (this.$vuetify.breakpoint.mobile) {
        this.drawerWidthMobile = 1000;
        this.showDrawer = false;
      }
    },
  },
};
</script>

<style>
</style>
