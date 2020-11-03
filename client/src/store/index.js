import Vue from 'vue'
import Vuex from 'vuex'
import * as API from "@/api";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isOpen: false,
    dataEmail: [],
    auth: {
      loggedIn: false,
      error: false,
      token: null,
      user: {
        role: "user",
      },
    },
  },
  mutations: {
   
    TOGGLE_SIDE_MENU(state) {
      state.isOpen = !state.isOpen;
    },
  },

  actions: {
    register({ commit }, newUser) {
      API.register(newUser)
        .then((user) => {
          commit("auth", user);
          commit("login");
          alert("you are registred");
        })
        .catch(console.log);
    },
    login({ commit }, credentials) {
      API.login(credentials)
        .then((tokenData) => {
          commit("auth", tokenData);
        })
        .catch((error) => {
          console.log(error);
          commit("failLogin");
        });
    },
    logout({ commit }) {
      commit("logout");
    },
  },
  modules: {
  }
})
