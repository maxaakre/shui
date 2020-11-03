<template>
  <div class="wrapper" :class="{ toggle: isOpen }">
  <img alt="red logo" src="../assets/s-logo-red.png" @click="$store.commit('TOGGLE_SIDE_MENU')" >
  <h2>Streams</h2>
  <button>Shit, Theyre on to me!</button>
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
  h2{
    color: #fff;
    padding: 2rem;
  }
   button{
        width: 80%;
        position: absolute;
        padding: 1rem;
        bottom: 1rem;
        left: 1.5rem;
        background: #082756;
        color: #fff;
        font-size: 20px;
        font-family: 'PT Sans', sans-serif;
        border: 1px solid #000000;
        box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
        
    }    
  
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
