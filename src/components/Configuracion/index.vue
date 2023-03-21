<template>
  <div
    class="containerApp">
    <Header />
    <Configuracion />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/commons/Header";
import Configuracion from "@/components/Configuracion/Configuracion.vue";
import Footer from "@/components/commons/Footer.vue";
export default {
  name: "index",
  components: {
    Footer,
    Configuracion,
    Header,
  },
}
</script>

<style scoped>
.containerApp {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}
</style>
