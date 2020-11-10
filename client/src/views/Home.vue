<template>
  <div class="wrapper">
    <div class="content" @click="$router.push('/signup')">
    <img id="logo" alt="Vue logo" src="../assets/s-logo.png" >
    <h1>SHUI</h1>
    <p>FLOW FREELY</p>
    <img id="blue" src="../assets/blue.png" alt="blue.png">
    </div>
  </div>
</template>

<script>
// @ is an alias to /src



export default {
  name: 'Home',

}
</script>
<style lang="scss" scoped >
.content{
  display: flex;
  flex-direction: column;
  
  
  #logo{
  width: 50px;  
  padding-top: 15rem ;
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
  #blue{
    position: relative;
    top: 15rem ;
  }
}
</style>
