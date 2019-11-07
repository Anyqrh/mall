<template>
	<div style="background-color: #fff">
		<div class="info-form">
			<div class="info-title">手机修改</div>
			<div class="info-content">
				<div class="password">
					<label>登录密码：</label>
					<input v-model="password" type="password" placeholder="请输入登录密码"/>
				</div>
				<div class="phone">
					<label>新手机号：</label>
					<input v-model="mobile" type="text" placeholder="请输入新手机号"/>
				</div>
				<div class="button" @click="saveMobile">保存</div>
			</div>
		</div>



		<!--<van-cell-group>-->
			<!--<van-field-->
					<!--label="登录密码"-->
					<!--v-model="password"-->
					<!--type="password"-->
					<!--placeholder="请输入登录密码"-->
			<!--/>-->

			<!--<van-field-->
					<!--label="新手机号"-->
					<!--v-model="mobile"-->
					<!--placeholder="请输入新手机号"-->
			<!--/>-->

		<!--</van-cell-group>-->

		<!--<div class="bottom_btn">-->
			<!--<van-button size="large" type="danger" @click="saveMobile">保存</van-button>-->
		<!--</div>-->
	</div>
</template>


<script>
    import {resetPhone} from '@/api/api';
    import {Field,Toast} from 'vant';
    export default {
        data: () => ({
            password: '',
            mobile: ''
        }),
        methods: {
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
            [Field.name]: Field
        }
    };
</script>

<style lang="scss" scoped>
	@import '../../../../assets/scss/var';
	@import '../../../../assets/scss/mixin';

	.info-form{
		width: 600px;
		height: 500px;
		border: 1px solid #eee;
		margin: 50px auto;
	}

	.info-title{
		width: 120px;
		height: 40px;
		position: relative;
		z-index: 99;
		left: 240px;
		top: -20px;
		text-align: center;
		line-height: 40px;
		background-color: #fff;
		font-size: 18px;
	}

	.info-content{
		width: 100%;
		padding: 0 20px;
	}

	label{
		width: 80px;
	}

	.password{
		width: 100%;
		height: 40px;
		margin-top: 20px;
	}

	.phone{
		width: 100%;
		height: 40px;
		margin-top: 20px;
	}

	input{
		width: 450px;
		height: 40px;
		padding-left: 10px;
		border: 1px solid #eee;
	}

	.button{
		width: 300px;
		height: 50px;
		text-align: center;
		font-size: 14px;
		font-weight: 400;
		line-height: 50px;
		color: #fff;
		background-color: #DB3D3C;
		margin-left: 130px;
		margin-top: 150px;
	}



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