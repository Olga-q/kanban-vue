<template>
    <div>

        <router-view></router-view>
    </div>
</template>
 
<script>
    export default {
        // data() {
        //     return {
        //         authenticated: false,
        //         user: null
        //     };
        // },

        // mounted() {
        //     Event.$on('userLoggedIn', () => {
        //         this.authenticated = true;
        //         this.user = auth.user;
        //     });
        //     Event.$on('userLoggedOut', () => {
        //         this.authenticated = false;
        //         this.user = null;
        //     });
        //     this.authenticated = auth.check();
        //     this.user = auth.user;

        //     console.log(this.authenticated);
        //     console.log(this.user);
        // },
    }
</script>