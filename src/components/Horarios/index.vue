<template>
  <div>
    <Header />
    <Horarios />
  </div>
</template>

<script>
import Horarios from "@/components/Horarios/Horarios";
import Header from "@/components/commons/Header";
export default {
  name: "index",
  components: {
    Header,
    Horarios
  },
}
</script>

<style scoped>

</style>
