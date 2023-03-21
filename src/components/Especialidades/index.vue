<template>
  <div
      class="containerApp"
  >
    <Header />
    <Especialidades  class="bodyApp"/>
    <Footer />
  </div>
</template>

<script>
import Especialidades from "./Especialidades.vue";
import Header from "../commons/Header.vue";
import Footer from "../commons/Footer.vue";

export default {
  name: "Index",
  components: {
    Especialidades,
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
