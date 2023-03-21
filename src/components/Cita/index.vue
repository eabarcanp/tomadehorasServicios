<template>
  <div
      class="containerApp"
  >
    <Header />
    <Cita class="bodyApp"/>
    <Footer />
  </div>
</template>

<script>
import Cita from "@/components/Cita/Cita.vue";
import Header from "@/components/commons/Header.vue";
import Footer from "@/components/commons/Footer.vue";

export default {
  name: "index",
  components: {
    Header,
    Cita,
    Footer
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
.bodyApp {
  flex: 1;
  overflow-y: auto;
}
</style>
