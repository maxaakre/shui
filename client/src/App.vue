<template>
  <div id="app">
    <div id="nav">
      <img alt="red logo" src="./assets/s-logo-red.png" @click="$store.commit('TOGGLE_SIDE_MENU')" >
    <Streams/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Streams from '@/components/Streams.vue' 
export default {
  components:{
    Streams
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
  background: #19274A;;
  height: 100vh;
  width: 100%;
  font-family: 'Cantarell', sans-serif;
}

#nav{
width: 100%;
img{
  z-index: 1;
  width: 50px;
  margin-left: 20px;
}
}



</style>
