<template>
    <div class="container">
        <router-link to="/">Главная</router-link>
        <router-link to="/registrate">Регистрация</router-link>
        <div class="row justify-content-center">
            <div class="col-md-4">
                <h1>Login</h1>
                <form id="login" @submit="login">
                    <div class="alert alert-danger" role="alert" v-if="loginError.status">
                        {{loginError.message}}
                    </div>
                    <Feeld v-model="email" feeld="email" @emitError="emitError"></Feeld>
                    <Feeld v-model="password" feeld="password" @emitError="emitError"></Feeld>
                    <input type="submit" value="Войти">
                    
                </form>
            </div>
        </div>        
    </div>
</template>
 
<script>
    import Feeld from './formFeelds/Feeld';

    export default {
        components: {
            Feeld,
        },

        data: function() {
            return {
                email: '',
                password: '',
                errors: {email: false},
                loginError: {
                    status: false,
                    message: '',
                }
            };
        },

        methods: {
            emitError (data) {
                this.errors [data.feeld] = data.status;
            },
            
            login: function (e) {
                if (!this.errors.email) {
                    let data = {
                        email: this.email,
                        password: this.password
                    };

                    axios.post('/api/login', data)
                        .then(({data}) => {
                            auth.login(data.token, data.user);
                            this.$router.push('home');
                        })  
                        .catch(({response}) => {    
                            this.loginError.status = true;
                            this.loginError.message = response.data.message;
                        })
                }
                e.preventDefault();
            }
        }
    }
</script>