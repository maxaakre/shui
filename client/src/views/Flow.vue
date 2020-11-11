<template>
    <div class="flow" >
    <div class="false" v-if="!auth.loggedIn">
    <h1> Något gick fel testa logga in igen</h1> 
    <router-link class="btn" to="/login">Try again!</router-link>   
    </div>    
    <div class="list" v-if="hasItems" >
        <ul v-if="auth.loggedIn">
        <li v-for="tag in filteredStreams" :key="tag._id">
            <p>{{tag.date}}</p>
            <p>{{tag.content}}</p>
            <p>{{tag.date}}</p>
        </li>
        <button class="btn" @click="$store.commit('TOGGLE_SIDE_MENU')">Add Streams</button>
        </ul>
    </div>
    </div>
</template>

<script>
import axios from "axios";
    export default {
        data() {
            return {
                hasItems:false,
                streams:[],
                hasTags:[]
            }
        },
        computed: {
           filteredStreams() {
            return this.streams.filter((el) => {
            return this.hasTags.includes(el.tag)
            
            })
     
    },    
            auth() {
            return this.$store.state.auth;
            }
        
        },
            async mounted() {
                const RESPONSE = await axios.get("/api/butiker/stores");
                this.streams =  RESPONSE.data;
                this.hasItems = true

                let token = sessionStorage.getItem("users")
                let parse = JSON.parse(token)
                   setTimeout(async() =>{ 
                    const USERTAGS = await axios.get("/api/usertags",{
                    headers: {
                    'Authorization': `Bearer ${parse.token}`
                    }
                    });
                    console.log(USERTAGS.data)
                    this.hasTags = USERTAGS.data;
                    
                
                   
                
                   },2000)  
            }
    }    
</script>

<style lang="scss" scoped>
.flow{
    padding: 1rem;
    height: 100vh;
    background: #082756;
    .list{
        
        padding: 1rem;
        margin: 1rem;
        color: black;
    }
    ul{
        list-style: none;
        padding:1rem 0;
    }
    li{
        display: flex;
        flex-direction: column;
        
        height:122px;
        margin:1rem 0;
        background: #fff;
        box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
        
    }
    p{
        margin: auto 10px;
        text-align: left;
        
        font-size: 16px;
        font-weight: 400;
        font-family: 'PT Sans', sans-serif;
    }
    span{
    display: flex;
    font-family: 'PT Sans', sans-serif;
    font-size: 12px;
    margin: 10px 10px 10px;
    
       
    }
    .btn{
        width: 90%;
        padding: 1rem;
        margin: auto 1rem;
        background: #082756;
        color: #fff;
        font-size: 20px;
        font-family: 'PT Sans', sans-serif;
        border: 1px solid #000000;
        box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
        
    }  
 
}
</style>

