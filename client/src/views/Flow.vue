<template>
    <div class="flow">
    <h1 v-if="!auth.loggedIn"> Något gick fel testa logga in igen</h1>    
    <div class="list" v-if="auth.loggedIn">
        <li></li>
    </div>
    </div>
</template>

<script>
    export default {
        computed: {
            auth() {
            return this.$store.state.auth;
            
            },
        
        }
    }    
</script>

<style lang="scss" scoped>

</style>