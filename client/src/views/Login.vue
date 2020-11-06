<template>
    <div>
    <div class="content" >
    <img id="logo" alt="Vue logo" src="../assets/s-logo.png" >
    <h1>SHUI</h1>
    <p>FLOW FREELY</p>
    <form @submit.prevent="login">
        <input type="email" v-model="credentials.email" 
        placeholder="Användarnamn" />
        <input type="password" v-model="credentials.password" 
        placeholder="Lösenord" />
        <button type="submit" class="btn">Logga in</button>
        
    </form>
    <img id="blue" src="../assets/blue.png" alt="blue.png">
    </div>
    </div>
</template>

<script>
    export default {
   data() {
    return {
        credentials: {
            email: "",
            password: "",
      },
    };
  },
    computed:{
        auth() {
        return this.$store.state.auth;
        },
    },
    methods:{
     
        login() {
        if (this.credentials.email == "" || this.credentials.password == "") {
        return;
        }
        this.$store.dispatch("login", this.credentials);
        this.$store.commit('saveEmail', this.credentials.email)
        localStorage.setItem("user", JSON.stringify(this.credentials.email))
        this.$router.push("/flow")
        },
    }    
        
    }
</script>

<style lang="scss" >

.content{
    margin-top:5rem ;
   
    input{
        margin-top:2rem ;
        padding: 3rem;
        background-color: #19274A ;
        text-align: center;
        color: #fff;
        font-family:'PT Sans', sans-serif;
        font-size: 20px;
        border: 2px solid #fff;
        &::placeholder{
            color: #fff;
            font-style: normal;
            font-weight: bold;
            font-size: 20px;
            line-height: 31px;
            letter-spacing: 0.3em; 
        }
    }
    #blue{
        margin-top: 5.8rem;
    }
    .btn{
        font-size: 24px;
        font-family:'PT Sans', sans-serif;
    }
}

</style>