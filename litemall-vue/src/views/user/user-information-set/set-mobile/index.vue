<template>
    <div>
        <van-nav-bar title="修改手机号" left-text="返回" left-arrow @click-left="goback"/>
        <van-cell-group>
            <van-field
                    label="登录密码"
                    v-model="password"
                    type="password"
                    placeholder="请输入登录密码"
            />

            <van-field
                    label="新手机号"
                    v-model="mobile"
                    placeholder="请输入新手机号"
            />

        </van-cell-group>

        <div class="bottom_btn">
            <van-button size="large" type="danger" @click="saveMobile">保存</van-button>
        </div>
    </div>
</template>


<script>
    import {resetPhone} from '@/api/api';

    import {Field,Toast,NavBar} from 'vant';

    export default {
        data: () => ({
            password: '',
            mobile: ''
        }),

        methods: {
            goback() {
                this.$router.go(-1);
            },
            countdownend() {
                this.counting = false;
            },
            vuelidate() {
                if (this.mobile === '') {
                    this.$toast.fail('请输入号码');
                    return false;
                }
                return true;
            },
            saveMobile() {
                resetPhone({
                    password: this.password,
                    mobile: this.mobile
                }).then(res => {
                    console.log(res.data.data);
                    if (res.data.data.status === 200) {
                        Toast.success(res.data.data.msg);
                        setTimeout(() => {
                            window.location = '#/user/information/'
                        }, 1500)
                    }else {
                        Toast.fail(res.data.data.msg);
                        setTimeout(() => {
                            window.location = '#/user/information/setMobile'
                        }, 1500)
                    }
                })
            }
        },

        components: {
            [Field.name]: Field,
            [NavBar.name]: NavBar
        }
    };
</script>

<style lang="scss" scoped>
    @import '../../../../assets/scss/var';
    @import '../../../../assets/scss/mixin';

    .bottom_btn {
        padding: 30px 15px 0 15px;
    }

    .verifi_code {
        @include one-border;
        padding-left: 10px;

        &::after {
            border-bottom: 0;
            border-left: 1px solid $border-color;
        }

        &_counting {
            color: $font-color-gray;
        }
    }
</style>
