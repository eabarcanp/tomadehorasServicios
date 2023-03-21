<template>

  <!-- loading para toda la vista  -->
  <v-progress-linear
    v-if="loading"
    :indeterminate="loading"
    color="success"
    height="5"
  ></v-progress-linear>

</template>

<script>
import {getShortUrls} from "@/helpers/api/horas_medicas";

export default {
  name: "Redirect",
  data() {
    return {
      loading: true,
      id: null,
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.redirect();
  },
  methods: {
    async redirect() {
      console.log(this.id);
      this.loading = true;
      await getShortUrls(this.id).then((res) => {
        this.loading = false;
        window.location.href = res
      }).catch((err) => {
        this.loading = false;
        console.log(err);
        this.$router.push({name: "Home"});
      });
    },
  },

}
</script>

<style scoped>

</style>
