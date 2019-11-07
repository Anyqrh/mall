<template>
  <div>
	  <van-nav-bar title="修改密码" left-text="返回" left-arrow @click-left="goback"/>
    <van-cell-group>

      <van-field
        label="原密码"
        v-model="oldPassword"
        type="password"
        placeholder="请输入新密码"
      />
		<van-field
				label="新密码"
				v-model="newPassword"
				type="password"
				placeholder="请输入新密码"
		/>
		<van-field
				label="确认密码"
				v-model="rePassword"
				type="password"
				placeholder="请输入新密码"
		/>
    </van-cell-group>

    <div class="bottom_btn">
      <van-button size="large" type="danger" @click="modifypassword">保存</van-button>
    </div>
  </div>
</template>


<script>
import { authReset, authLogout } from '@/api/api';
import { removeLocalStorage } from '@/utils/local-storage';
import { Field,Toast,NavBar } from 'vant';

export default {
  data: () => ({
	  oldPassword:'',
	  newPassword:'',
	  rePassword:''
  }),

  methods: {
	  goback() {
		  this.$router.go(-1);
	  },
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
