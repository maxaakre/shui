<template>
    <div class="wrapper">
        <form @submit.prevent="file" >
            <label for="tag">tag</label>
            <input type="text" v-model="logs.tag">
            <label for="content">content</label>
            <input type="text" v-model="logs.content">
            <label for="date">date</label>
            <input type="text" v-model="logs.date">
            <button type="submit">Skicka till databasen</button>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                logs:{
                    tag:"",
                    content: "",
                    date: ""
                }
            }
        },
        methods:{
            file(){
            this.$store.dispatch("json", this.logs);   
            }
        }
    }
</script>

<style lang="scss" scoped>
.wrapper{
    display: flex;
    flex-direction: column;
    margin: auto;
    width:50%;
    padding: 1rem;
    input{
        padding: 1rem 0;
        margin: 1rem ;
    }
    button{
        padding: 1rem 0;
        margin: 1rem ;
        margin: auto;
    }
}

</style>