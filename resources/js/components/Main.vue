<template>
 <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">

                <div>WELCOME</div>
                <ul>
                    <li v-for="user in users" v-bind:key="user.name">{{user.name}}</li>
                </ul>

            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import route from '../route';

    export default {
        data () {
            return {
                users : []
            }
        },
        computed : {
            cUsers : function () {
                return this.users;
            }
        },
        methods: {
            getUsers() {
                axios.get(route("users.index"))
                .then((response) => {
                    this.users = response.data.users
                });
                ;
            }
        }, 
        mounted() {
            this.getUsers();
            
        }
    }
</script>