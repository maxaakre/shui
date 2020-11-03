import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import * as API from "@/api";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isOpen: false,
    items:[],
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
    displayMeets(state, items) {
      state.items = items;
    },
    TOGGLE_SIDE_MENU(state) {
      state.isOpen = !state.isOpen;
    },
    saveEmail(state, credentials){
      console.log(credentials)
      state.dataEmail = credentials
    },

    removeUser(state, userId){
      state.auth.user = state.auth.user.filter(
        user => user._id != userId
      )
    },
    auth(state, body) {
      state.auth.user = body.user;
      state.auth.loggedIn = true;

      API.setAuthHeader(body.token);

      const user = body.user;
      const token = body.token;

      // Set session
      sessionStorage.setItem("users", JSON.stringify({ user, token }));
    },
    login(state) {
      state.auth.loggedIn = true;
      state.auth.error = false;
    },
    failLogin(state) {
      state.auth.login = false;
      state.auth.error = true;
      API.clearAuthHeader();
    },
    logout(state) {
      state.auth.loggedIn = false;
      state.auth.error = false;
      API.clearAuthHeader();
      sessionStorage.removeItem("users");
    },
  },

  actions: {
    async getMeetList(context) {
      let resp = await axios.get(API);
      context.commit("displayMeets", resp.data.meet);
      console.log(resp);
    },
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
