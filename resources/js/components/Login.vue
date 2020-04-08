<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <h1>Login</h1>
                <form>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" id="email" name="email" v-model="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Пароль</label>
                        <input type="password" class="form-control" id="password" name="password" v-model="password" required>
                    </div>
                    <button @click="login" type="submit" class="btn btn-primary">Войти</button>
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
                password: '',
            };
        },

        methods: {
            login() {
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
                        alert(response.data.message);
                    })
            }
        }
    }
</script>