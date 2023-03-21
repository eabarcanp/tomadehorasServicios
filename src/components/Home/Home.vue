
<template>
  <v-main>
    <v-container fluid>
      general
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data: () => ({
    toPayPlan: {
      plan_id: 1,
      months_paid: 6,
    },
    loading: false,
    requestedStatus: false,
    playing: false,
  }),
  mounted() {
  },
  methods: {
  },
};
</script>

<style>
</style>