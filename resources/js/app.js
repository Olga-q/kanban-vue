require('./bootstrap');

window.Vue = require('vue');
// import BootstrapVue from 'bootstrap-vue';
// Vue.use(BootstrapVue); 
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import route from './route';
import router from './router';
import App from './components/App';
import Auth from './auth.js';
import Api from './api.js';

window.api = new Api();
window.auth = new Auth();
window.Event = new Vue;
const app = new Vue({
    el: '#app',
    render : h => h(App),
    router
});
