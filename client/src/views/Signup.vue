<template>
    <div>
    <div class="content" >
    <img id="logo" alt="Vue logo" src="../assets/s-logo.png" >
    <h1>SHUI</h1>
    <p>FLOW FREELY</p>
    <form @submit.prevent="register" >
        <p v-if="error" class="error-message">{{ error }}</p>
        <label for="text">Usermname</label>
        <input type="text" v-model="credentials.name" />
        <label for="email">Email</label>
        <input type="email" v-model="credentials.email" />
        <label for="password">Password</label>
        <input type="password" v-model="credentials.password" />
        <label for="password"> Repeat password</label>
        <input type="password" v-model="credentials.repeatPassword" />
        <button type="submit" class="btn"> Sign me up! </button>
        <!-- <a class="btn" href="/login" v-if="auth.loggedIn"> Logga in!</a> -->
        <router-link  to="/login" class="login"
        >Already a member click here!
      </router-link>
      <router-link v-if="auth.loggedIn" to="/flow">To Streams</router-link>
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
                repeatPassword: "",
                name: "",
                tag:""
                
            },
            error: "",
        }
    },
    computed: {
        auth() {
        return this.$store.state.auth;
        },
  },
    methods:{
        async register() {
            console.log("jalla")
            this.error = "";
            if (this.credentials.email == "" || this.credentials.password == "") {
                this.error = "Fill in input fielde's";
                return;
            } else if (!this.validEmail(this.credentials.email)) {
                this.error = "invalid mail";
                return;
            }
            this.$store.commit('saveEmail', this.credentials.email)
            await this.$store.dispatch("register", this.credentials);
            await sessionStorage.setItem("users", JSON.stringify(this.credentials));
            },
            validEmail: function (email) {
            var regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regEx.test(email);
    },
    }    
}
</script>

<style lang="scss" >
.content{
  display: flex;
  flex-direction: column;
  
  
  #logo{
  width: 50px;  
  padding-top: 1rem ;
  margin: auto;
  
  }
  h1{
    color: white;
    margin: auto;
  }
  p{
    color: #00B2FF;
    margin: auto;
  }
  form{
      display: flex;
      flex-direction: column;
      width: 80%;
      margin: auto;
      label{
          color: #fff;
          padding: .3rem 0;
          text-align: center;
      }
      input{
          padding: 1rem;
          font-size: 20px;
      }
      a{
          color: #fff;
          text-align: center;
          padding: 1rem;
      }
      .btn{
          width: 100%;
          padding: 1rem;
          margin-top:2rem;
          color: black; 
          background: #fff;
          text-decoration: none;
          text-align: center;
      }
  }
  #blue{
    position: relative;
  
    }
}

</style>