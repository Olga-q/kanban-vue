<template>
    <input :type="types[feeld]" class="form-control" name="value" :placeholder="placeholders[feeld]" v-bind:value="value" @input="update" @blur.once='firstValidate'>     
</template>

<script>
    export default {
        props: [
            'value',
            'feeld',
        ],

        data: function() {
            return {
                error: false,
                firstVal: false,
                types: {},
                messages: {},
                re: {},
                lables: {},
                placeholders: {},
            }
        },

        mounted: function () {
            this.types = {
                email: 'email',
                password: 'password',
                passwordConf: 'password',
                name: 'text',
                task: 'text',
                note: 'text',
            }
            this.messages = {
                name: 'Имя должно состоять более, чем из 3 символов',
                email: 'Неверно введен email',
                password: 'Пароль должен состоять более, чем из 6 символов, проверьте его правильность',
                task: 'Введите задачу',
            }
            this.re = {
                name: /^.{3,}$/,
                email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                password: /^.{6,}$/,
                passwordConf: /^.*$/,
                task: /^.{1,120}$/,
                note: /^.*$/,
            }
            this.placeholders = {
                email: '',
                password: '',
                passwordConf: '',
                name: '',
                task: 'Новая задача',
                note: 'Описание',
            }
        },

        methods: {            
            isInvalid (value) {
                return (!this.re[this.feeld].test(value));
            },

            validate (value) {
                this.error = this.isInvalid(value);
                this.$emit('emitError', {
                    'status': this.error, 
                    'feeld': this.feeld
                });
            },

            update (event) {
                this.$emit('input', event.target.value);

                if (this.firstVal) {
                    this.validate (event.target.value);
                }
            },

            firstValidate () {
                this.firstVal = true;
                this.validate(this.value);
            },
        }
    }
</script>


