<template>
    <div class="container">
        <router-link to="/">Главная</router-link>
        <router-link to="/login">Вход</router-link>
        <div class="row justify-content-center">
            <div class="col-md-4">
                <form   id="registrate" @submit="registrate">
                    <div class="alert alert-danger" role="alert" v-if="register.error">
                        {{register.message}}
                    </div>
                    <Feeld v-model="email" feeld="email" @emitError="emitError"></Feeld>
                    <Feeld v-model="name" feeld="name" @emitError="emitError"></Feeld>
                    <Feeld v-model="password" feeld="password" @emitError="emitErrorPassword"></Feeld>
                    <Feeld v-model="passwordConf" feeld="passwordConf" @emitError="emitErrorPassword"></Feeld>
                    <div class="alert alert-danger" role="alert" v-if="errors.passwordConf">
                        Пароли не совпадают
                    </div>
                    <input type="submit" value="Зарегистрироваться">
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
                name: '',
                password: '',
                passwordConf: '',
                errors: {
                    email: false,
                    name: false,
                    password: false,
                    passwordConf: false
                },
                invalid : false,
                register: {
                    error: false,
                    message: '',
                },
            };
        },
        

        methods: {
            emitError (data) {
                this.errors [data.feeld] = data.status;
            },

            emitErrorPassword (data) {
                this.emitError (data);
                console.log(this.passwordConf);
                console.log(data.feeld);
                if (! (data.feeld === 'password' && this.errors.passwordConf === false && this.passwordConf === '')){
                    this.errors ['passwordConf'] = (this.password !== this.passwordConf);
                }
            },

            registrate: function (e) {
                for (let error in this.errors) {
                    this.invalid = (this.invalid || this.errors[error]);
                }
                if (!this.invalid) {
                    let data = {
                        email: this.email,
                        name: this.name,
                        password: this.password
                    };

                    axios.post('/api/register', data)
                        .then(({data}) => {
                            auth.login(data.token, data.user);

                            this.$router.push('/home');
                        })  
                        .catch(({response}) => {                    
                            this.register.error = true;
                            this.register.message = response.data.message;
                        });
                }
                e.preventDefault();
            }
        }
    }
</script>