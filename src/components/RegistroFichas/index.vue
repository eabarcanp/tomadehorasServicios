<template>
  <div style="background-color: #58727E;">
    <Header />
      
    <div style="margin-top: 100px">
    <RegistroFichas />
    </div>
    <Footer />
  </div>
</template>

<script>
import RegistroFichas from "@/components/RegistroFichas/RegistroFichas";
import Header from "@/components/commons/Header";
import Footer from "@/components/commons/Footer";
export default {
  name: "index",
  components: {
    Header,
    RegistroFichas,
    Footer
  },
}
</script>

<style scoped>

</style>
