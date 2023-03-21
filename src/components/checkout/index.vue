<template>
  <div>
    <Header />
    <Checkout />
    <Footer />
    <Drawer />
  </div>
</template>

<script>
import Checkout from "./Checkout.vue";
import Drawer from "../drawer/Drawer.vue";
import Header from "../commons/Header.vue";
import Footer from "../commons/Footer.vue";

export default {
  name: "Index",
  components: {
    Checkout,
    Drawer,
    Header,
    Footer,
  },
  data() {
    return {
    };
  },
  methods: {},

}
</script>

<style>
</style>