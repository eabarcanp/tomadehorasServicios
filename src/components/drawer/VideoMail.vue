<template>
  <div>
    <v-container fluid class="py-0" v-model="formVideoEmail">
      <v-row>
        <v-col sm="6" cols="9">
          <div :class="!$vuetify.breakpoint.mobile ? 'mt-10 ml-7' : 'mt-10'">
            <p
              style="color: #feb62d"
              :class="!$vuetify.breakpoint.mobile ? 'display-2' : 'display-1'"
            >
              <v-icon
                :class="!$vuetify.breakpoint.mobile ? 'mt-n2' : 'mt-n2 mb-2 '"
                color="#FEB62D"
                style="font-size: 65px"
                >mdi-email-outline</v-icon
              >
              Video Mail
            </p>
          </div>
        </v-col>
        <v-col sm="6" cols="3">
          <div class="mt-12 text-end">
            <v-btn @click="volver" text
              ><v-icon color="#FEB62D" style="font-size: 50px"
                >mdi-arrow-left</v-icon
              ></v-btn
            >
          </div>
        </v-col>
      </v-row>

      <div class="mt-10">
        <v-row
          :class="
            !$vuetify.breakpoint.mobile ? '' : 'd-flex flex-column-reverse'
          "
        >
          <v-col
            :class="!$vuetify.breakpoint.mobile ? 'px-0' : 'px-0 pb-0 pt-0'"
            sm="4"
            cols="12"
          >
            <v-container style="background: #f7f7f7; height: 450px">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  solo
                  class="mx-auto mt-2"
                  style="max-width: 300px"
                  dense
                  v-model="formEmail.email"
                  :rules="emailRules"
                  label="Correo electronico"
                  required
                ></v-text-field>

                <v-text-field
                  solo
                  class="mx-auto"
                  style="max-width: 300px"
                  dense
                  v-model="formEmail.name"
                  label="Nombre Completo"
                  :rules="requireRule"
                  required
                ></v-text-field>

                <v-text-field
                  prepend-inner-icon="mdi-phone"
                  v-model="formEmail.phone_number"
                  solo
                  class="mx-auto"
                  style="max-width: 300px"
                  :error-messages="errors"
                  label="Numero Telefonico"
                  required
                  :rules="requireRule"
                ></v-text-field>

                <v-textarea
                  no-resize
                  solo
                  background-color="white"
                  outlined
                  class="mx-auto"
                  style="max-width: 300px"
                  height="120"
                  maxlength="360"
                  v-model="formEmail.message"
                  :rules="requireRule"
                  placeholder="Informacion personal"
                ></v-textarea>
              </v-form>
              <div class="text-center">
                <v-btn
                  :loading="loading"
                  @click="() => videoEmail()"
                  style="background: #feb62d"
                  text
                  :disabled="!disnableBtn"
                  height="50"
                  width="160"
                  class="rounded-xl"
                >
                  <p style="color: white" class="mt-4">Enviar</p>
                </v-btn>
              </div>
            </v-container>
          </v-col>

          <v-col sm="8" cols="12">
            <v-row>
              <v-col
                :class="!$vuetify.breakpoint.mobile ? 'px-0' : 'px-0 pt-0 pb-0'"
              >
                <div v-if="modalOne">
                  <v-img
                    :src="require('../../assets/GrabarMensaje.png')"
                    height="450"
                    eager
                    ><div
                      :style="
                        !$vuetify.breakpoint.mobile
                          ? 'margin-top:174px;margin-left:130px'
                          : 'margin-top:180px;margin-left:45px'
                      "
                    >
                      <v-btn
                        rounded
                        width="300px"
                        height="70"
                        color="white"
                        class="my-4 subtitle-2"
                        @click="test()"
                        >Grabar nuevo video</v-btn
                      >
                    </div>
                  </v-img>
                </div>

                <v-container v-if="modalTwo" style="background: #eff3f2">
                  <div :class="!$vuetify.breakpoint.mobile ? '' : 'ml-3'"></div>
                  <v-row>
                    <v-col>
                      <div class="text-center">
                        <video
                          controls
                          autoplay
                          class="ml-n3 mt-n2"
                          playsinline
                          ref="video"
                          :style="
                            !$vuetify.breakpoint.mobile ? '' : 'width:90%'
                          "
                          height="363"
                          width="580"
                        ></video>
                      </div>

                      <div class="text-center">
                        <div class="pt-5">
                          <v-btn
                            outlined
                            rounded
                            class="mb-2 subtitle-2"
                            id="btn-start-recording"
                            :disabled="disabled"
                            @click="startRec"
                            >Comenzar a grabar</v-btn
                          >
                          <v-btn
                            rounded
                            :class="
                              !$vuetify.breakpoint.mobile ? 'ml-5 mb-2' : 'mb-2'
                            "
                            color="#FD2A22"
                            style="color: white"
                            id="btn-stop-recording"
                            :disabled="!disabled"
                            @click="stopRec"
                            >Terminar Grabación</v-btn
                          >
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-snackbar color="#FEC12D" v-model="snackbar" :timeout="timeout">
          <p style="color: white" class="text-center subtitle">{{ text }}</p>
        </v-snackbar>
      </div>
    </v-container>
  </div>
</template>

<script>
// import {mapState} from 'vuex'
import { getMetadata, getThumbnails, Video } from 'video-metadata-thumbnails';
import RecordRTC from "recordrtc";
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
import { videoEmail } from "../../helpers/click2call/api/calls";
export default {
  props: {
    volver: { type: Function },
    ocultar: {
      type: Function,
    },
    derived: {
      type: Number,
    },
  },
  components: { videoPlayer },
  data() {
    return {
      loader:null,
      loading: false,
      desactivar:true,

      valid: false,

      text: "El VideoEmail Fue enviado con exito",
      snackbar: false,
      timeout: 5000,

      multiLine: true,
      video: false,

      recorder: null,
      disabled: false,
      blobRecorderVideo: null,
      errors: null,
      formVideoEmail: false,
      dialog: false,

      modalOne: true,
      modalTwo: false,
      blobRecorderVideoTwo: true,

      formEmail: {
        thumbnail: null,
        email: "",
        name: "",
        phone_number: `+56`,
        message: "",
        videoMail: null,
        is_derived: this.$store.state.derived,
      },
      requireRule:[
        v => ( v && v.length >= 1 ) || "Debe completar este campo.",
      ],
      emailRules: [
        (v) => !!v || "El Correo es requerido",
        (v) => /.+@.+\..+/.test(v) || "El correo es incorrecto",
      ],
    };
  },
  mounted() {
    this.volver;
    // console.log("derived",this.is_derived);
  },
  computed: {
    disnableBtn() {
      return this.formEmail.thumbnail != null &&
      this.formEmail.email != "" &&
      this.formEmail.name != "" &&
      this.formEmail.phone_number != `569` &&
      this.formEmail.message != ""
    }
  },

  methods: {
  async thumbnail(){
  const thumbnails = await getThumbnails(this.formEmail.videoMail, {
  interval: 1,
  start: 0,
  end: 0
});
this.formEmail.thumbnail = thumbnails[0].blob;
console.log("testenaodo set,",this.formEmail.thumbnail);
console.log('Preview thumbnails :V: ', thumbnails[0]);
},

    async videoEmail() {
      const data = this.formEmail;
      const self = this;
      this.loading = true;
      const formData = new FormData();
      formData.append("email", this.formEmail.email);
      formData.append("name", this.formEmail.name);
      formData.append("phone_number", this.formEmail.phone_number);
      formData.append("videoMail", this.formEmail.videoMail);
      formData.append("thumbnail", this.formEmail.thumbnail);
      formData.append("message", this.formEmail.message);
      formData.append("is_derived", this.formEmail.is_derived);

      console.log("contenido", formData);
      console.log(this.formEmail);

      videoEmail(formData)
        .then((res)=> {
          if (res.success) {
            console.log("Funciona", res);
            this.loading = false,
            self.snackbar = true;
            setTimeout(() => {
              self.ocultar();
              this.$store.commit('setModalButton', 0)
            }, 5000);
          }
          console.log(reponse);
        })
        .catch(function(error) {
          if (error.false) console.log("Fallo");
          this.loading = false
        });
    },

    startRec() {
      this.disabled = true;
      this.captureCamera((camera) => {
        const video = this.$refs["video"];
        video.muted = true;
        video.volume = 0;
        video.srcObject = camera;
        this.recorder = RecordRTC(camera, {
          type: "video",
          mimeType: "video/webm;codecs=vp8",
        });
        this.recorder.startRecording();
        this.recorder.camera = camera;

        this.disabled = true;
      });
    },
    stopRec() {
      this.disabled = false;
      this.recorder.stopRecording(this.stopRecordingCallback);
      this.blobRecorderVideoTwo = false;
    },
    captureCamera(callback) {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then(function(camera) {
          callback(camera);
        })
        .catch(function(error) {
          alert("Unable to capture your camera. Please check console logs.");
          console.error(error);
        });
    },
    stopRecordingCallback() {
      const video = this.$refs["video"];
      video.src = video.srcObject = null;
      video.muted = false;
      video.volume = 1;
      // this.blobRecorderVideo = this.recorder.getBlob();
      this.formEmail.videoMail = this.recorder.getBlob();
      // video.src = URL.createObjectURL(this.blobRecorderVideo);
      video.src = URL.createObjectURL(this.formEmail.videoMail);
      this.thumbnail();

      this.recorder.camera.stop();
      this.recorder.destroy();
      this.recorder = null;
      // console.log(this.blobRecorderVideo);
      console.log(this.formEmail.videoMail);
    },

    test() {
      this.dialog = true;
      this.modalOne = false;
      this.modalTwo = true;
    },
  },
};
</script>

<style scoped>
.v-btn--disabled{
  background: #feb52d41 !important;
}
</style>
