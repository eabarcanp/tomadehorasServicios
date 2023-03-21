<template>
  <v-main>

    <v-container class="fill-height" fluid>
    <Login />
    </v-container>
  </v-main>
</template>

<script>
import Login from "./Login.vue";
export default {
  name: "index.vue",
  components: {
    Login,
  },
  data() {
    return {};
  },
}
</script>

<style scoped>

</style>