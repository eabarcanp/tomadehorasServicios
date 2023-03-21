<template>
  <div>
    <Header />
    <Ficha />
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
