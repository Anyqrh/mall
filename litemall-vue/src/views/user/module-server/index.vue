<template>
  <div>
    <van-nav-bar title="服务中心" left-text="返回" left-arrow @click-left="goback"/>
    <van-cell-group>
      <van-cell title="意见反馈" to="/user/feedback" isLink></van-cell>
      <van-cell title="常见问题" to="/user/help" isLink/>
    </van-cell-group>
  </div>
</template>

<script>
import { Popup, Cell, CellGroup,NavBar } from 'vant';

export default {
  data() {
    return {
      showKefu: false
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
  },
  components: {
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup    
  }
};
</script>
<style scoped lang="scss">
  .van-popup {
    width: 80%;
    padding: 20px;
    box-sizing: border-box;

  }
</style>