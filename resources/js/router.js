import VueRouter from 'vue-router';
import Main from './components/Main';
import Home from './components/Home';
import Login from './components/Login';
import Registrate from './components/Registrate';
 
const router = new VueRouter ({
    routes : [
        {path: '/', component : Main},
        {path: '/home', component : Home, meta: { middlewareAuth: true }},
        {path: '/login', component : Login},
        {path: '/registrate', component : Registrate},
    ],
    mode:'history'
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.middlewareAuth)) {                
        if (!auth.check()) {
            console.log(auth.check);
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });   
        }
        else{
            next();
        }
    }
    else {
        next();
    }
})

export default router;
