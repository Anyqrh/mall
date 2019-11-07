<template>
	<div style="background-color: #fff">

		<div class="info-form">
			<div class="info-title">密码修改</div>
			<div class="info-content">
				<div class="old-password">
					<label>原密码：</label>
					<input v-model="oldPassword" type="password" placeholder="请输入原密码"/>
				</div>
				<div class="new-password">
					<label>新密码：</label>
					<input v-model="newPassword" type="password" placeholder="请输入新密码"/>
				</div>
				<div class="re-password">
					<label>确认密码：</label>
					<input v-model="rePassword" type="password" placeholder="请确认新密码"/>
				</div>
				<div class="button" @click="modifypassword">保存</div>
			</div>
		</div>
		<!--<van-cell-group>-->

			<!--<van-field-->
					<!--label="原密码"-->
					<!--v-model="oldPassword"-->
					<!--type="password"-->
					<!--placeholder="请输入新密码"-->
			<!--/>-->
			<!--<van-field-->
					<!--label="新密码"-->
					<!---->
					<!--type="password"-->
					<!--placeholder="请输入新密码"-->
			<!--/>-->
			<!--<van-field-->
					<!--label="确认密码"-->
					<!--v-model="rePassword"-->
					<!--type="password"-->
					<!--placeholder="请输入新密码"-->
			<!--/>-->
		<!--</van-cell-group>-->

		<!--<div class="bottom_btn">-->
			<!--<van-button size="large" type="danger" @click="modifypassword">保存</van-button>-->
		<!--</div>-->
	</div>
</template>


<script>
    import { authReset, authLogout } from '@/api/api';
    import { removeLocalStorage } from '@/utils/local-storage';
    import { Field,Toast } from 'vant';
    export default {
        data: () => ({
            oldPassword:'',
            newPassword:'',
            rePassword:''
        }),
        methods: {
            modifypassword() {
                if (this.passwordValid()) {
                    authReset({
                        oldPassword: this.oldPassword,
                        newPassword: this.newPassword
                    })
                        .then(res => {
                            console.log(res.data.data.status);
                            if (res.data.data.status === 200) {
                                Toast.success('修改成功,请重新登录');
                                setTimeout(() => {
                                    authLogout();
                                    removeLocalStorage();
                                    window.location = '#/login/'
                                }, 1500)
                            }
                            else {
                                Toast.fail('原密码有误,请重新输入');
                                setTimeout(() => {
                                    window.location = '#/user/information/setPassword/'
                                }, 1500)
                            }
                        });
                }
            },
            passwordValid() {
                return true;
            },
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

	.old-password{
		width: 100%;
		height: 40px;
		/*border: 1px solid #ccc;*/
		margin-top: 20px;
	}

	.new-password{
		width: 100%;
		height: 40px;
		/*border: 1px solid #ccc;*/
		margin-top: 20px;
	}

	.re-password{
		width: 100%;
		height: 40px;
		/*border: 1px solid #ccc;*/
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