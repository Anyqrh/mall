<template>
<div class="order">
    <van-nav-bar title="订单" left-text="返回" left-arrow @click-left="goback"/>

    <van-card
      v-for="item in checkedGoodsList"
      :key="item.id"
      :title="item.goodsName"
      :num="item.number"
      :price="item.price"
      :thumb="item.picUrl"
    >
<!--      <div slot="desc">-->
<!--        <div class="van-card__desc">-->
<!--          <van-tag plain style="margin-right:6px;" v-for="(spec, index) in item.specifications" :key="index">-->
<!--            {{spec}}-->
<!--          </van-tag>-->
<!--        </div>-->
<!--      </div>-->
    </van-card>

    <van-cell-group>
      <van-cell title="商品金额">
        <span class="red">{{goodsTotalPrice * 100 | yuan}}</span>
      </van-cell>
      <van-field rows="5" size="large" type="textarea" clearable autosize center v-model="message" placeholder="请输入联系号码和收货信息" label="收货信息">
<!--      <template slot="icon">{{message.length}}/200</template>-->
      </van-field>      
    </van-cell-group>

    <van-submit-bar
      :price="actualPrice*100"
      label="总计："
      buttonText="提交订单"
      :disabled="isDisabled"
      @submit="onSubmit"
    />
</div>
</template>

<script>
import { Card, Tag, ard, Field, SubmitBar, Toast,NavBar  } from 'vant';
import { CouponCell, CouponList, Popup } from 'vant';
import { cartCheckout, orderSubmit, couponSelectList} from '@/api/api';
import { getLocalStorage, setLocalStorage } from '@/utils/local-storage';
import dayjs from 'dayjs';

export default {
  data() {
    return {
      checkedGoodsList: [],
      checkedAddress: {},
      goodsTotalPrice: 0, //商品总价
      orderTotalPrice: 0, //订单总价
      actualPrice: 0, //实际需要支付的总价
      message: '',

      isDisabled: false,
      showList: false,
      chosenCoupon: -1,
      coupons: [],
      disabledCoupons: []
    };
  },
  created() {
    this.init();
  },

  methods: {
      goback() {
          this.$router.go(-1);
      },
    onSubmit() {     
      const {CartId, CouponId} = getLocalStorage('CartId', 'CouponId');

      this.isDisabled = true;

      orderSubmit({
        cartId: CartId,
        couponId: CouponId,
        grouponLinkId: 0,
        grouponRulesId: 0,
        message: this.message
      }).then(res => {
        
        // 下单成功，重置下单参数。
        setLocalStorage({AddressId: 0, CartId: 0, CouponId: 0});

        let orderId = res.data.data.orderId;
        this.$router.push({
          name: 'payment',
          params: { orderId: orderId }
        });
      }).catch(error => {
        this.isDisabled = false;
        this.$toast("下单失败");
      })

    },
    goAddressList() {
      this.$router.push({
        path: '/user/address'
      });
    },
    init() {
      const {CartId} = getLocalStorage('CartId');

      cartCheckout({cartId: CartId}).then(res => {
          var data = res.data.data
          console.log(data);
          this.checkedGoodsList = data.checkedGoodsList;
          this.checkedAddress= data.checkedAddress;
          this.actualPrice= data.actualPrice;
          this.goodsTotalPrice= data.goodsTotalPrice;
          this.orderTotalPrice= data.orderTotalPrice;

          setLocalStorage({CartId: data.cartId});
      });

    },
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;

      if(index === -1 ){
        setLocalStorage({CouponId: -1});
      }
      else{
        const couponId = this.coupons[index].id;
        setLocalStorage({CouponId: couponId});
      }

      this.init()
    },
    onExchange() {
      this.$toast("兑换暂不支持");
    }
  },

  components: {
    [Toast.name]: Toast ,
    [SubmitBar.name]: SubmitBar,
    [Card.name]: Card,
    [Field.name]: Field,
    [Tag.name]: Field,
      [NavBar.name]: NavBar,
    [CouponCell.name]: CouponCell,
    [CouponList.name]: CouponList,
    [Popup.name]: Popup
  }
};
</script>


<style lang="scss" scoped>
.order-coupon {
  margin-top: 10px;
}
</style>