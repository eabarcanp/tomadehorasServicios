<template>
  <div
      class="containerApp"
  >
    <Header />
    <Medicos class="bodyApp"/>
    <Footer />
  </div>
</template>

<script>
import Medicos from "./Medicos.vue";
import Header from "../commons/Header.vue";
import Footer from "../commons/Footer.vue";

export default {
  name: "Index",
  components: {
    Medicos,
    Header,
    Footer,
  },
  data() {
    return {
      key: 0,
    };
  },
  methods: {},
  mounted() {
  },
};
</script>

<style>
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
