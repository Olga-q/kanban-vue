class Feeld {
    
    feelds = {
        name: setName,
        email: setEmail,
        password: setPassword,
        passwordConf: setPasswordConf,
    }

    constructor(feeld) {
        this.type = 'text';
        this.re = /^.*$/;
        this.message = '';
        this.lable = '';
        this.feeld = feeld;
        this.feelds[this.feeld]();
    }

    setName () {
        this.re = /^.{3,}$/;
        this.message = '';
        this.lable = '';
    }

    setEmail () {
        this.type = 'email';
        this.re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.message = '';
        this.lable = '';
    }

    setPassword () {
        this.type = 'password';
        this.re = /^.{6,}$/;
        this.message = '';
        this.lable = '';
    }

    setPasswordConf () {
        this.type = 'text';
        this.message = '';
        this.lable = '';
    }

    isInvalid (value) {
        return (!this.re.test(value));
    }
}