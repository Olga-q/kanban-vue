<template>
    <div>
        <div v-if="authenticated && user">
            

            <router-link to="/logout">Logout</router-link>
        </div>

        <router-link to="/login" v-else>Login</router-link>
        <router-link to="/registration">Registeration</router-link>

        <router-view></router-view>
    </div>
</template>
 
<script>
    export default {
        data() {
            return {
                authenticated: auth.check(),
                user: auth.user
            };
        },

        mounted() {
            Event.$on('userLoggedIn', () => {
                this.authenticated = true;
                this.user = auth.user;
            });
            console.log(this.authenticated);
        },
    }
</script>