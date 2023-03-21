<template>
  <v-app
      class="app"
    >
    <div class="point"></div>
    <router-view />
    <Modals />
  </v-app>
</template>

<script>
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import vuetify from "@/plugins/vuetify";
import Modals from './components/Modals/Index'

export default {
  name: "App",
  vuetify,
  components: {Modals},
  mounted() {
    this.initFirebase();
  },
  methods: {
    initFirebase() {
      const firebaseConfig = {
        apiKey: "AIzaSyC__hpErbrF-l9vP_7mWI8FSXSjqJFAyG0",
        authDomain: "click2call-671d1.firebaseapp.com",
        databaseURL: "https://click2call-671d1-default-rtdb.firebaseio.com",
        projectId: "click2call-671d1",
        storageBucket: "click2call-671d1.appspot.com",
        messagingSenderId: "360045088915",
        appId: "1:360045088915:web:aa0f190408fd668efcfd66",
        measurementId: "G-J9DTZPLG1S",
      };

      //   const firebaseConfig = {
      //   apiKey: "AIzaSyD4yWqis7Qny7gfp5bugquN1o1c1ZCzxBU",
      //   authDomain: "click2call-dev-d9306.firebaseapp.com",
      //   databaseURL: "https://click2call-dev-d9306-default-rtdb.firebaseio.com",
      //   projectId: "click2call-dev-d9306",
      //   storageBucket: "click2call-dev-d9306.appspot.com",
      //   messagingSenderId: "643543297069",
      //   appId: "1:643543297069:web:1edbbfab15cf737cf51ca4",
      //   measurementId: "G-YPR9NQ3VW4"
      // };

      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
    },
  },

};
</script>

<style>
.app {
  background: linear-gradient(90deg, #0093EF 0%, #003CC7 100%) !important;
  height: 100vh;
}
.swal2-container {
  z-index: 20000 !important;
}
</style>
