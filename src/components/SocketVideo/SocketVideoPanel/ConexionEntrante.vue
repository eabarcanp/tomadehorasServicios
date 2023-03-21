<template>
  <v-container style="background: #2250b3; height: 100vh">
    <v-row>
      <v-col cols="7">
        <div class="text-end">
          <p style="color: white" class="display-1">Solicitudes de conexión</p>
        </div>
      </v-col>
      <v-col>
        <div class="d-flex justify-end">
          <v-card class="d-flex aling-center justify-center" width="200">
            <v-switch
              v-model="operador"
              :label="`Estado: ${operador.toString()}`"
            ></v-switch>
          </v-card>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="(sala, index) in Object.keys(alert)"
        :key="index"
        cols="4"
        xl="3"
      >
        <v-card class="px-2 py-3">
          <div class="d-flex flex-row align-center">
            <div class="text-center">
              <v-icon size="50" color="#2250b3"> mdi-video </v-icon>
              <p class="caption">
                {{ alert[sala].tipo == 2 ? "Videollamada" : "Solicitud Cliente" }}
              </p>
            </div>
            <div class="text-center justify-center" style="width: 100%">
              <v-btn
                @click="stopSong(alert[sala])"
                color="#FEC12D"
                style="color: white"
                class="rounded-lg"
              >
                Atender Solicitud
              </v-btn>
              <p class="mb-0 caption text--secondary">
                Conéctate con el cliente
              </p>
            </div>
            <!-- <div class="text-center mt-5">
								<v-btn color="#FEC12D" style="color:white" class="rounded-lg">Entrar</v-btn>
						</div> -->
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { userData } from "../../../helpers/api/calls";
import { getDatabase, ref, onValue, set } from "firebase/database";

import AvisoConexion from "./AvisoConexion.vue";
export default {
  components: {
    AvisoConexion,
  },
  data() {
    return {
      info: [],
      alert: [],
      sonido: null,

      //Operador test
      operador: false,
    };
  },
  watch:{
  operador(newValue){
  console.log("watch",newValue);
  this.insertDb();

},
'$store.state.userData'(newValue){
  if(newValue){
    this.userData()
  }
}
  },
  mounted() {
    // this.userData();
    this.sonido = new Audio(require("@/assets/sounds/notification2.mp3"));
  },
  methods: {
    userData() {
      // const info = await userData();
      this.info = this.$store.state.userData;
      console.log(this.info);

      (this.operador = true),
      this.insertDb();
      this.ListenAlert();
    },
    stopSong(sala) {
      this.$router.push({
        name: "SocketVideoPanel",
        params: { sala_id: sala.sala_id },
      });
      this.sonido.pause();
      // console.log(sala);
    },

    song() {
      this.sonido.play();
    },

    insertDb() {
      const db = getDatabase();
      set(ref(db, "connections/" + this.info.company_id + "/" + this.info.id), {
        id_user: this.info.id,
        status: this.operador,
        ocupacion: "operador",
      });
      // console.log("insert", db);
    },

    ListenAlert() {
      const db = getDatabase();
      // const starCountRef = ref(db, 'notifications/' + this.info.company_id + '/' + this.info.id);
      // const starCountRef = ref(db, "notifications/" + this.info.company_id + '/' + this.info.id);
      const starCountRef = ref(db, "notifications/" + this.info.company_id + '/' + "common");
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        this.alert = data;
        console.log("data",this.alert);
        
        // console.log("informacionData",data);
        
        
        

        if (this.alert) {
          this.song();
        }
      });
    },
  },
};
</script>

<style>
</style>