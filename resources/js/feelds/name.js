import './feeld.js';

class Name extends Feeld {

    constructor () {
        this.type = 'text';
        this.re = /^.{3,}$/;
        this.message = 'Имя должно состоять более, чем из 3 символов';
        this.lable = 'Имя';
    }
}