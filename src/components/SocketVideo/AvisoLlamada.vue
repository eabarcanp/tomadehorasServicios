<template>
  <div id="AvisoLlamada">
    <!-- <v-dialog v-model="dialog" width="700"> -->
      <v-container v-model="VideoLlamada" style="background:white; height:400px">
        <v-row>
          <v-col>
            <div class="text-end">
            <v-btn @click="dialog = false" x-large color="black" icon><v-icon color="#2250B3">mdi-close</v-icon></v-btn>
            </div>
          </v-col>
        </v-row>

        <v-row class="mt-10">
          <v-col>
            <div class="text-center">
            <p style="color:#2250B3" class="display-1">Conectando Video</p>
            </div>
          </v-col>
        </v-row>

        <v-row class="mt-8">
          <v-col>
            <div class="text-center">
              <SocketVideo :cerrar="closedialog"/>
            </div>
          </v-col>
        </v-row>
      </v-container>
  </div>
</template>

<script>
 import SocketVideo from './SocketVideo'
export default {
  components: {SocketVideo},
  props: ['entrevista'],
  name: "AvisoLlamada",
  data() {
    return {
      VideoLlamada: false,
    };
  },
  methods: {
      ingresar(){
        this.VideoLlamada = true
        // this.$store.commit('setModalVideollamada', this.entrevista)
      },
      closedialog(){
        this.VideoLlamada = false
      }
    },
}
</script>
