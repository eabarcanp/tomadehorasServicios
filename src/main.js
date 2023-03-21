import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import VueMeta from 'vue-meta'
import router from './router'

Vue.use(VueMeta)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
