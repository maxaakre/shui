<template>
  <div class="wrapper" :class="{ toggle: isOpen }">
  <img alt="red logo" src="../assets/s-logo-red.png" @click="$store.commit('TOGGLE_SIDE_MENU')" >
  </div>  
  
</template>

<script>
import { mapState } from "vuex";  
export default {
  name: 'Streams',
    
  computed:{
  ...mapState(["isOpen"]),
  }
 
}
</script>
<style lang="scss" scoped>
.wrapper{
  position: relative;
  display: none;
  width: 100px;
  background: red;
  
  
 }
 .toggle{
  display: block;
  
  position: absolute;
  width: 411px;
  height: 609px;
  left: 0px;
  top: 0px;

background: #EF4343;
border-radius: 0px;

  }
</style>
