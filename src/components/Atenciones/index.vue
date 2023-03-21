<template>
  <div
      class="containerApp"
  >
    <Header />
    <Atenciones class="bodyApp"/>

    <drawer :hide="true"
    />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/commons/Header";
import Footer from "@/components/commons/Footer.vue";
import Atenciones from "@/components/Atenciones/Atenciones.vue";
import Drawer from "@/components/drawer/Drawer.vue";
export default {
  name: "index",
  components: {
    Drawer,
    Atenciones,
    Footer,
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
.bodyApp {
  flex: 1;
  overflow-y: scroll;
}
</style>
