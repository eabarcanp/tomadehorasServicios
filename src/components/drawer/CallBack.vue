<template>
  <div>
    <v-container fluid>
      <v-row :class="!$vuetify.breakpoint.mobile ? 'ml-10 mt-1' : 'mt-1'">
        <v-col sm="1" cols="3">
          <v-img
            eager
            :class="!$vuetify.breakpoint.mobile ? 'mt-2 mx-auto' : ' ml-4'"
            :src="require('../../assets/iconPhone.png')"
            :max-width="!$vuetify.breakpoint.mobile ? '60px' : '50px'"
          />
        </v-col>
        <v-col sm="7" cols="6">
          <p
            style="color:#FEB62D"
            :class="!$vuetify.breakpoint.mobile ? 'display-2 font-weight-bold mt-2' : 'display-1 font-weight-bold mt-4 text-center'"
          >Llamada Telefónica</p>
        </v-col>
        <v-col sm="4" cols="3">
          <div class="mt-4 mr-5 text-end">
            <v-btn @click="volver" text>
              <v-icon color="#FEB62D" style="font-size:50px">mdi-arrow-left</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="formNumero" style="background: #3364D0">
      <v-row class="mt-15">
        <v-col>
          <div
            class="mx-auto"
            style="background: #FEB62D;border-radius: 100%;width: 150px;height: 150px;"
          >
            <v-img
              eager
              class="mx-auto"
              :src="require('../../assets/WomanChico.png')"
              max-width="150"
              style="border-radius: 100%"
            />
          </div>
          <p
            v-if="llamar == 1"
            style="color:white"
            class="text-center mt-4"
          >Comunicate con un operador</p>
          <p v-if="llamar == 0" style="color:white" class="text-center mt-4">Terminar la llamada</p>
          <p v-if="termino" style="color:white" class="text-center mt-4">Fin de la llamada</p>
        </v-col>
      </v-row>

      <v-row v-if="termino">
        <v-col class="text-center">
          <v-btn
            @click="volver()"
            height="50"
            text
            width="250"
            style="border:solid 2px white"
            rounded
          >
            <p style="color: white" class="mt-4">Cerrar</p>
          </v-btn>
        </v-col>
      </v-row>

      <v-row v-if="llamar == 1">
        <v-col class="text-center">
          <v-btn
            @click=" (llamar = 0), setupClient()"
            height="50"
            text
            width="250"
            style="border:solid 2px white"
            rounded
          >
            <p style="color: white" class="mt-4">Llamar</p>
          </v-btn>
        </v-col>
      </v-row>

      <v-row v-if="llamar == 0">
        <v-col class="text-center">
          <v-btn
            @click="endCall()"
            height="50"
            text
            width="250"
            style="border:solid 2px white"
            rounded
          >
            <p style="color: white" class="mt-4">Terminar</p>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {Device} from 'twilio-client'
// import { Device } from '@twilio/voice-sdk';
import { newToken, callReturn, caall, tokencallback,callEvent, token } from '../../helpers/click2call/api/calls.js'
export default {
  props: {
    volver: {
      type: Function
    },
    videomail: {
      type: Function,
    },
  },
  data() {
    return {
      llamada: true,
      formNumero: true,
      valid: false,
      deviceStatus: 9,
      llamar: 1,
      termino: false,
      device: null,
      token: null,
    };
  },
  mounted() {
    this.volver;
    // this.setupClient();
  },
  methods: {
    setupClient() {
      token()
        .then((res) => {
          this.token = res;
          this.callReturn()
          // console.log("token: ", this.token)
        })
        .catch((err) => {
          console.error(err);
        });
    },
    
      callReturn() {
        // console.log("Llego hasta qui")
      this.device = new Device();
      this.device.setup(this.token);
      this.device.ready((device) => {
        this.device.connect({
          company_key: "1e61da5a-8d27-4a35-8cac-f92a676d63a2",
        });
      });

      this.setupHandlers(this.device);
    },

  setupHandlers(device) {
      device.on("ready", function(_device) {});

      /* Report any errors to the call status display */
      device.on("error", function(error) {
        console.log(error);
      });

      /* Callback for when Twilio Client initiates a new connection */
      device.on("connect", function(connection) {
        console.log(connection);
      });

      /* Callback for when a call ends */
      device.on("disconnect", (connection) => {
        console.log(connection)
        this.endCall();
      });

      /* Callback for when Twilio Client receives a new incoming call */
      device.on("incoming", function(connection) {
        console.log(connection)
      });
    },     


    endCall() {
      this.termino = true
      this.llamar = 3
      this.deviceStatus = 9
      this.device.destroy()
      console.log("Se Elimino")
      this.device = null
    },
    isNumber(event) {
      let char = String.fromCharCode(event.keyCode);
      if (/^[0-9]+$/.test(char)) return true;
      else event.preventDefault();
    }
  }
};

</script>

<style>
</style>