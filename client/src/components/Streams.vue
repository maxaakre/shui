<template>
  <div class="background">
  <div class="wrapper" :class="{ toggle: isOpen }">
  <img alt="red logo" class="streams" src="../assets/s-logo-red.png" @click="$store.commit('TOGGLE_SIDE_MENU')" >
  <h2>Streams</h2>
  <ul>
    <li></li>
  </ul>
  <input class="text" type="text" v-model="input">
  <img class="check" @click="tags" src="../assets/check.png" alt="check.png">
  <button @click="remove">Shit, Theyre on to me!</button>
  </div>  

  </div>
  
</template>

<script>
import { mapState } from "vuex";  
export default {
  name: 'Streams',
  data() {
    return {
      credentials:{
        email: []
      },
      input:[]
    }
  },  
  computed:{
  ...mapState(["isOpen", "dataEmail"]),

  },
  
 methods:{
   tags(){
     this.$store.dispatch('newTags', this.input)
   },
   remove(){
      console.log("error",this.credentials.email)
      this.$store.dispatch('userRemove', this.credentials.email)
    },
 },
 mounted(){
   console.log("Detta finns i credentails.email", this.credentials.email)
   this.credentials.email = this.$store.state.dataEmail
 }
}
</script>
<style lang="scss" scoped>
.backgorund{
background:rgba(0, 0, 0, 0.7); ;
position:absolute;
top:0;
bottom: 0;
right: 0;
left: 0;
}
.wrapper{
  position: relative;
  display: none;
  width: 100px;
  background: red;

  h2{
    color: #fff;
    padding: 2rem;
  }
  .text{
    position: absolute;
    padding: 1rem;
    top: 5rem;
    width: 80%;
    font-size: 20px;
    margin-left: 1.5rem;
    margin-top:23rem;
    border: 2px solid #fff;
    border-radius: 5px;
  }
  .check{
   position: absolute;
   width: 52px;
   height: 50px;
   left: 299px;
   top: 449px;
   border-radius: 5px;
    
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
  height: 100vh;
  position: absolute;
  width: 411px;
  height: 609px;
  left: 0px;
  top: 0px;
  background:60% #EF4343;

  border-radius: 0px;

  }

</style>
