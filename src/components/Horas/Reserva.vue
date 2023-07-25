<template>
    <v-container fluid class="containerApp">
      <v-app-bar
        class="appbar"
        color="#8B008B"
        app
        height="100px"
        elevation="0"
    >
    <div style="display:flex; justify-content:space-between; width:100%; align-items: center;">
      <img
      style="width: 220px;"
          src="@/assets/loespejo-logo.png"
          max-height="150"
          class=" d-none d-sm-block"
/>

      <v-btn style="color: white;" class="" large color="#003153" rounded @click="goToLogin">Iniciar Sesión</v-btn>
    </div>
    </v-app-bar>
      <Horas/>
    </v-container>
</template>

<script>
import Horas from "@/components/Horas/Horas.vue";
import Drawer from "@/components/drawer/Drawer.vue";

export default {
  name: "Reserva",
  components: {Drawer, Horas},
  methods: {
    goToLogin() {
      this.$router.push({name: "Login"});
    }
  }
}
</script>

<style scoped>
.containerApp{
  padding: 0;
  height: 100vh !important;
  overflow-y: auto;
}
.buttonLogin{
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
}
</style>
