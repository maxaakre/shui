<template>
    <div class="flow">
    <!-- <h1> Något gick fel testa logga in igen</h1>     -->
    <div class="list" >
        <ul>
        <li v-for="item in items.stream"
          :key="item.id">
          <span>{{item.date}}</span>
          <p>{{item.content}}</p>
          <span>{{'---' + item.tag}}</span>
        </li>

        <button>Add Streams</button>
        </ul>
    </div>
    </div>
</template>

<script>
import axios from "axios";
    export default {
        computed: {
            data() {
                return {
                    items:{}
                }
            },
            auth() {
            return this.$store.state.auth;
            }
        
        },
            async created()  {
                const RESPONSE = await axios.get("/api/butiker");
                this.items = RESPONSE.data;
            },
            // beforeMount() {
            //     return this.$store.dispatch("getMeetList");
            // },
    }    
</script>

<style lang="scss" scoped>
.flow{
    padding: 1rem;
    height: 100vh;
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
    button{
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


/* Vector 4 */

position: absolute;
width: 32px;
height: 32px;
left: 363px;
top: 210px;

background: #FFFFFF;
box-shadow: inset 0px 4px 3px rgba(0, 0, 0, 0.1);
