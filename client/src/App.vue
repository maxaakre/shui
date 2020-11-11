<template>
  <div id="app">
    <div id="nav">
      <img class="streams" alt="red logo" src="./assets/s-logo-red.png" @click="$store.commit('TOGGLE_SIDE_MENU')" >
      <a href="#" v-if="auth.loggedIn" class="btn" @click="logout">Logout</a>
    <Streams v-if="auth.loggedIn"/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Streams from '@/components/Streams.vue' 
export default {
  components:{
    Streams
  },
  computed: {
    auth() {
      return this.$store.state.auth;
    },
  },
  methods:{
      logout() {
      this.$store.dispatch("logout");
      
    },
  }
 
}
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Cantarell:wght@700&family=PT+Sans:wght@700&display=swap');
*{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  

}

#app{
  background: #082756;;
  height: 100vh;
  width: 100%;
  font-family: 'Cantarell', sans-serif;
}

#nav{
width: 100%;
display: flex;
.streams{
  z-index: 1;
  width: 50px;
  margin-left: 20px;
}
.btn{
  margin-left: 14rem;
  padding: 1.5rem 0;
  color: #EF4343;
  text-decoration: none;
}
}



</style>
