<template>
    <div class="container">
    
    </div>
</template>
 
<script>
    export default {

        mounted() {
            axios.post('/api/logout')
                .then(() => {
                    auth.logout();

                    // this.$router.push('login');
                }) ;
                this.$router.push('login'); 
            
        }
    }
</script>