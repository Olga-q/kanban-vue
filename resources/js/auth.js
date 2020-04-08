class Auth {
    constructor() {
        this.token = window.localStorage.getItem('token');

        let userData = window.localStorage.getItem('user');
        this.user = userData ? JSON.parse(userData) : null;
    
        if (this.token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
        
            // this.getUser();
        }
    }

    login (token, user) {        
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('user', JSON.stringify(user));

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

        this.token = token;
        this.user = user;
    
        Event.$emit('userLoggedIn');
    }

    logout () {        
        window.localStorage.setItem('token', '');
        window.localStorage.setItem('user', '');

        axios.defaults.headers.common['Authorization'] = '' ;

        this.token = '';
        this.user = '';
        Bearer 
        Event.$emit('userLoggedOut');
        
    }

    check () {
        return !! this.token;
    }

    getUser() {
        api.call('get', '/api/get-user')
            .then(({data}) => {
                this.user = data;
            });
    }
}

export default Auth;