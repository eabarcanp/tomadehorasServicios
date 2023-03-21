<template>
  <div>
    <Header />
    <Home />
  </div>
</template>

<script>
import Home from "./Home.vue";
import Drawer from "../drawer/Drawer.vue";
import Header from "../commons/Header.vue";
import Footer from "../commons/Footer.vue";

export default {
  name: "Index",
  components: {
    Home,
    Drawer,
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
</style>