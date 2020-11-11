<template>
  <div class="background">
  <div class="wrapper" :class="{ toggle: isOpen }">
  <img alt="red logo" class="streams" src="../assets/s-logo-red.png" @click="$store.commit('TOGGLE_SIDE_MENU')" >
  <h2>Streams</h2>
  <ul class="box">
    <li v-for="(tag,index) in filteredStreams" :key="index">
      <p>#{{tag.tag}}</p>
      <button id="i" @click="removeTag(tag)"><i class="fas fa-times"></i></button>
    </li>
  </ul>
  <form @submit.prevent="tags">
  <select class="text" v-model="input">
    <option value="ica">ica</option>
    <option value="coop">coop</option>
    <option value="mathem">mathem</option>
  </select>
  <button type="submit" id="check">
    <img id="line" src="../assets/check.png" alt="check.png">
  </button>
  </form>
  <button class="removeuser" @click="remove">Shit, Theyre on to me!</button>
  </div>  

  </div>
  
</template>

<script>
import { mapState } from "vuex";  
import axios from 'axios'
export default {
  name: 'Streams',
  data() {
    return {
      credentials:{
        email: []
      },
      deletedTag:[],
      input:"",
      hasTags:[],
      savedTags:[],
      storedTags:[]
    }
  },  
  computed:{
  ...mapState(["isOpen", "dataEmail","tag"]),

  filteredStreams() {
    return this.storedTags.filter((el) => {
    return this.hasTags.includes(el.tag)
    })  
  },
}, 

 methods:{
   async removeTag(tag){
      let token = sessionStorage.getItem("users")
      let parse = JSON.parse(token)
     const res = await axios.post("/api/deletedtag",tag,{
        headers: {
        'Authorization': `Bearer ${parse.token}`
        }
        },tag)
        this.deletedTag = res.data
        location.reload();
   },
   tags(){
     this.$store.dispatch('newTag', this.input)
     location.reload();
   },
   remove(){
      this.$store.dispatch('userRemove', this.credentials.email)
    },
 },
 async mounted(){
   //to remove user
   this.credentials.email = this.$store.state.dataEmail
   this.savedTags = this.$store.state.tag
   //to load tags
   let token = sessionStorage.getItem("users")
   let parse = JSON.parse(token)
     const RESPONSE = await axios.get("/api/tags",{
       headers: {
      'Authorization': `Bearer ${parse.token}`
    }
     });
    this.storedTags =  RESPONSE.data;
    //to load and then filter width
    const USERTAGS = await axios.get("/api/usertags",{
      headers: {
      'Authorization': `Bearer ${parse.token}`
      }
      });
      this.hasTags = USERTAGS.data;
  
   
 },

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
  .box{
    display: grid;
    margin-left: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(130px, 3fr));
  }
  ul{
    flex-direction: column;
    padding: .5rem;
  }
  li{
    display:flex;
    padding: .2rem;
    width: 120px;
    border: 1px solid rgba(255, 255, 255, 0.1);;
    margin: .5rem 0;
  }
  p{
    margin: auto;
    margin-left: .5rem;
    color: #fff;
  }
  #i{
   margin: auto .2rem;
   color:#fff;
   background: #EF4343;
   border:none
  }
  i{
    //  color: #fff;
    margin: auto .2rem;
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
  #line{
   position: relative;
   width: 55px;
   right: 3px;
   bottom: 0px; 
  }
  #check{
   position: absolute;
   left: 299px;
   top: 447px;
   border-radius: 5px;
   }
   .removeuser{
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
