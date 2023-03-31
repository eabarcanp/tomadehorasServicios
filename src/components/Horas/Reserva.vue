<template>
    <v-container fluid class="containerApp">
      <v-btn class="buttonLogin" large color="primary darken-1" rounded @click="goToLogin">Iniciar Sesión</v-btn>
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
