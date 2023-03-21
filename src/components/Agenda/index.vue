<template>
  <div
      class="containerApp"
  >
    <Header />
    <Agenda class="bodyApp"/>
    <Footer />
  </div>
</template>

<script>
import Agenda from "@/components/Agenda/Agenda";
import Header from "@/components/commons/Header";
import Footer from "@/components/commons/Footer.vue";
export default {
  name: "index",
  components: {
    Footer,
    Header,
    Agenda
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
