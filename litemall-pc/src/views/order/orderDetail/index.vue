<template>
  <div class="place_order_entity container" style="background-color: #fff">
    <div class="title">订单信息</div>
    <div class="order-goods">
      <van-card
        v-for="item in orderGoods"
        :key="item.id"
        :title="item.goodsName"
        desc=""
        :num="item.number"
        :price="item.price"
        :thumb="item.picUrl"
      ></van-card>
      <div style="width: 100%;height: 5px;background-color: #EBECF0"></div>

      <van-cell-group>
        <van-cell title="商品金额">
          <span class="red">{{orderInfo.goodsPrice * 100 | yuan}}</span>
        </van-cell>
        <!--<van-cell title="邮费" :value="orderInfo.freightPrice "></van-cell>-->
      </van-cell-group>
    </div>

    <van-cell-group style="margin-top: 20px;">
      <van-cell
        icon="dingwei"
        :title="`${orderInfo.consignee}  ${orderInfo.mobile}`"
        :label="orderInfo.address"
      />
    </van-cell-group>

    <van-cell-group style="margin-top: 20px;">
      <van-cell title="下单时间">
        <span>{{orderInfo.addTime }}</span>
      </van-cell>
      <van-cell title="订单编号">
        <span>{{orderInfo.orderSn }}</span>
      </van-cell>
      <van-cell title="订单备注">
        <span>{{orderInfo.remark }}</span>
      </van-cell>

      <van-cell>
        <template slot="title">
          <span class="custom-text">实付款：</span>
          <span class="red">{{orderInfo.actualPrice * 100 | yuan}}</span>
        </template>
        <!-- 订单动作 -->
       <van-button
          size="small"
          v-if="handleOption.cancel"
          @click="cancelOrder"
          style=" float:right"
          round type="danger"
        >取消订单</van-button>
        <van-button
          size="small"
          v-if="handleOption.pay"
          @click="payOrder"
          style=" float:right"
          round type="danger"
        >去支付</van-button>
        <van-button
          size="small"
          v-if="handleOption.delete"
          @click="deleteOrder"
          style=" float:right"
          type="danger"
        >已完成</van-button>
        <van-button
          size="small"
          v-if="handleOption.confirm"
          @click="confirmOrder"
          style=" float:right"
          type="danger"
        >确认收货</van-button>
        <!--<van-button-->
          <!--size="small"-->
          <!--v-if="handleOption.refund"-->
          <!--@click="refundOrder"-->
          <!--style=" float:right"-->
          <!--type="danger"-->
        <!--&gt;退款</van-button>                    -->
      </van-cell>
    </van-cell-group>

    <van-cell-group v-if="showExp()" style="margin-top: 20px;">
      <van-cell title="快递公司">
        <span>{{orderInfo.expCode }}</span>
      </van-cell>
      <van-cell title="快递编号">
        <span>{{orderInfo.expNo }}</span>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { Card, Field, SubmitBar, Button, Cell, CellGroup, Dialog,Toast } from 'vant';
import _ from 'lodash';
import { orderDetail,orderConfirm,orderCancel } from '@/api/api';

export default {
  data() {
    return {
      isSubmit: false,
      isDisabled: false,
      orderInfo: {},
      orderGoods: [],
      handleOption: {},
      expressInfo: {}
    };
  },
  created() {
    this.init();
  },

  methods: {
    showExp() {
      return _.has(this.orderInfo, 'expNo');
    },
    confirmOrder(){
      let orderId = this.$route.query.orderId;
      console.log(orderId)
      orderConfirm({orderId: orderId}).then(res =>{
        this.$toast('已确认收货');
      })
    },
    refundOrder(){
     Dialog.confirm({
          message: '确定要取消此订单？'
        }).then(() => {
        });
    },
    deleteOrder(){

    },    
    payOrder(){
      let orderId = this.$route.query.orderId;
      console.log(orderId);
      this.$router.push({ name: 'payment', params: { orderId: orderId } });
    },     
    cancelOrder(){
      let orderId = this.$route.query.orderId;
      console.log(orderId)
      Dialog.confirm({
        message: '确定要取消此订单？'
      }).then(() => {
        orderCancel({orderId: orderId}).then(res => {
          this.$toast('已取消');
          this.$router.go(-1);
        })
      }).catch(() => {
        console.log("cancle")
      });
    },      
    init() {
      let orderId = this.$route.query.orderId;
      orderDetail({ orderId: orderId }).then(res => {
        var data = res.data.data;
        this.orderInfo = data.orderInfo;
        this.orderGoods = data.orderGoods;
        this.handleOption = data.orderInfo.handleOption;
        this.expressInfo = data.expressInfo;
      });
    }
  },

  components: {
    [Dialog.name]: Dialog,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Button.name]: Button,
    [SubmitBar.name]: SubmitBar,
    [Card.name]: Card,
    [Field.name]: Field
  }
};
</script>


<style lang="scss" scoped>

  .title{
    width: 80%;
    height: 40px;
    border-bottom: 1px solid #eee;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
    margin: 10px auto;
  }

  .order-goods{
    margin-top: 20px;
  }
.place_order_entity {
  padding-bottom: 70px;
}
</style>
