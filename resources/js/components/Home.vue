<template>
    <div class="container">
        <button type="button" @click="logout" class="btn btn-primary">Выйти</button>
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <form method="POST" class="js-form">
                    <fieldset>
                        <input name="task" id="new-task" size="50" placeholder="Новая задача"  maxlength="120" required/>
                        <input name="note" id="new-note" size="25" placeholder="Описание"/>
                        <select id="select-user" name="user"> 
                        </select>
                        <!-- <input type="submit" name="button" value="+" /> -->
                        <button type="button" class="btn btn-primary">+</button>
                    </fieldset>
                </form>

                <div class="row">
                    <div class="col-md-4">
                        <ul class='list' id='colomn1'>
                        </ul> 
                        a  
                    </div>

                    <div class="col-md-4">
                        <ul class='list' id='colomn2'>
                        </ul>   
                        b
                    </div>

                    <div class="col-md-4">
                        <ul class='list' id='colomn3'>
                        </ul>   
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
    export default {
        methods: {
            logout() {
                axios.post('/api/logout').then(() => {
                    auth.logout();
                    this.$router.push('login');
                }) ;
            }
        }
    }
</script>