<template>
  <v-container fluid>
    <v-dialog width="600" v-model="avisoConexion">
      <v-card height="300">
        <div class="text-center pt-3">
          <p class="display-1">Conexion Entrante</p>
          <p class="title">Sala:</p>
          <v-avatar size="70" color="indigo">
            <v-icon size="50" dark> mdi-account-circle </v-icon>
          </v-avatar>
        </div>
    <div class="text-center">
      <v-btn
        :to="{name: 'SocketVideoPanel'}"
        color="#FEC12D"
        style="color: white"
        class="rounded-lg mt-5"
        >Entrar</v-btn
      >
    </div>
      </v-card>
    </v-dialog>

    <div class="text-center">
      <v-btn
        @click="avisoConexion = true"
        color="#FEC12D"
        style="color: white"
        class="rounded-lg"
        >Atender Solicitud</v-btn
      >
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      avisoConexion: false,
    };
  },
};
</script>

<style>
</style>