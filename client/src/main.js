import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



Vue.config.productionTip = false

new Vue({
  created() {
    const loggedIn = sessionStorage.getItem("users");
    if (loggedIn) {
      store.commit("auth", JSON.parse(loggedIn));
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
