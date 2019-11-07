<template>
    <md-field-group class="register_view">
        <md-field
                v-model="username"
                icon="username"
                placeholder="请输入手机号码"/>

<!--        <md-field v-model="mobile" icon="mobile" placeholder="请输入手机号码"/>-->
        <md-field v-model="password" type="password" icon="lock" placeholder="请输入密码" />
        <md-field v-model="repeatPassword" type="password" icon="lock" placeholder="请再次确认密码"/>

        <div class="register_submit">
            <van-button size="large" type="danger" @click="registerSubmit">确定</van-button>
        </div>

        <div class="register_footer">
            已有账号?
            <router-link to="/login" class="red">登录</router-link>
        </div>
    </md-field-group>
</template>

<script>
    import field from '@/components/field/';
    import fieldGroup from '@/components/field-group/';
    import { authRegister } from '@/api/api';
    import { Dialog, Toast } from 'vant';
    export default {
        data() {
            return {
                username: '',
                password: '',
                repeatPassword: '',
                mobile:''
            };
        },

        methods: {
            registerSubmit() {
                this.register();
            },
            register() {
                let formData = this.getFormData();
                authRegister(formData).then(res=>{
                    console.log(res.data.data)
                    if (res.data.data.status === 200) {
                        Toast.success('注册成功');
                        setTimeout(() => {
                            window.location = '#/login/'
                        }, 1500)
                    }else {
                        Toast.fail(res.data.data.message);
                    }
                });
            },
            getFormData(){
                const username = this.username;
                // const mobile = this.mobile;
                const password = this.password;
                return{
                    username:username,
                    // mobile:mobile,
                    password:password
                };
            }
        },

        components: {
            [field.name]: field,
            [fieldGroup.name]: fieldGroup
        }
    };
</script>

<style lang="scss" scoped>
    div.register_view {
        background-color: #fff;
        padding-top: 30px;
    }

    div.register_submit {
        padding-top: 30px;
        padding-bottom: 20px;
    }

    .register_footer {
        text-align: right;
        color: $font-color-gray;
    }
</style>
