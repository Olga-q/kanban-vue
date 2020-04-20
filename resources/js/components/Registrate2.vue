<template>
    <div class="container">
        <router-link to="/">Главная</router-link>
        <router-link to="/login">Вход</router-link>
        <div class="row justify-content-center">
            <div class="col-md-4">
                <!-- <form   id="registrate" @submit="checkForm" action="/api/register" method="post"> -->
                <form>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" id="email" name="email" v-model="email" required>
                    </div>
                    <div class="form-group">
                        <label for="name">Имя</label>
                        <input type="text" class="form-control" id="name" name="name" v-model="name" required>
                    </div>
                    <p v-if="errorName">
                        <b>Это поле является обязательным для ввода</b>
                    </p>
                    <div class="form-group">
                        <label for="password">Пароль</label>
                        <input type="password" class="form-control" id="password" name="password" v-model="password" required>
                    </div>
                    <div class="form-group">
                        <label for="password-confirm">Подтвердите пароль</label>
                        <input type="password" class="form-control" id="password-confirm" name="passwordConf" v-model="passwordConf" required>
                    </div>
                    <p v-if="errorPassword">
                        <b>Пароли не совпадают</b>
                    </p>
                    <button type="button" @click="registrate"  class="btn btn-primary">Зарегистрироваться</button>
                      <!-- <input type="submit" value="Отправить"> -->
                </form>
            </div>
        </div>        
    </div>
</template>
 
<script>
    export default {
        data() {
            return {
                email: '',
                name: '',
                password: '',
                passwordConf: '',
                errorPassword: false,
                errorEmail: false,
                errorPasswordSize: false,
                errorName: false,
            };
        },

        methods: {
            registrate() {
                if (this.password !== this.passwordConf) {
                    this.errorPassword = true;
                } else if (this.name == '') {
                    this.errorName = true;
                }
                else {
                    this.errorPassword = false;
                    this.errorName = false;
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
                            alert(response.data.message);
                        });
                }

            }
        }
    }
</script>