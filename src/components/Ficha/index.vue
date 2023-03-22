<template>
  <div>
    <Header />
      
    <div style="margin-top: 100px">
    <Ficha />
    </div>
  </div>
</template>

<script>
import Ficha from "@/components/Ficha/Ficha";
import Header from "@/components/commons/Header";
export default {
  name: "index",
  components: {
    Header,
    Ficha
  },
}
</script>

<style scoped>

</style>
