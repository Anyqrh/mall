<template>
    <div class="payment">
        <van-nav-bar title="支付" left-text="返回" left-arrow @click-left="goback"/>
        <!--<div class="time_down payment_group">-->
        <!--请在-->
        <!--<span class="red">半小时内</span>-->
        <!--完成付款，否则系统自动取消订单-->
        <!--</div>-->

        <van-cell-group class="payment_group">
            <van-cell title="订单编号" :value="order.orderInfo.orderSn"/>
            <van-cell title="实付金额">
                <span class="red">{{order.orderInfo.actualPrice *100 | yuan}}</span>
            </van-cell>
        </van-cell-group>

        <div class="pay_way_group">
            <div class="pay_way_title">选择支付方式</div>
            <van-radio-group v-model="payWay">
                <van-cell-group>
                    <van-cell>
                        <template slot="title">
                            <img src="../../../assets/images/ali_pay.png" alt="支付宝" width="82" height="29">
                        </template>
                        <van-radio name="ali"/>
                    </van-cell>
                    <van-cell>
                        <template slot="title">
                            <img src="../../../assets/images/wx_pay.png" alt="微信支付" width="113" height="23">
                        </template>
                        <van-radio name="wx"/>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </div>

        <van-button class="pay_submit" @click="pay" type="primary" bottomAction>去支付</van-button>
    </div>
</template>

<script>
    import {Radio, RadioGroup, Dialog,NavBar} from 'vant';
    import {orderDetail, orderPrepay} from '@/api/api';
    import _ from 'lodash';

    export default {
        name: 'payment',

        data() {
            return {
                payWay: 'ali',
                order: {
                    orderInfo: {},
                    orderGoods: []
                },
                orderId: 0
            };
        },
        created() {
            if (_.has(this.$route.params, 'orderId')) {
                this.orderId = this.$route.params.orderId;
                this.getOrder(this.orderId);
            }
        },
        methods: {
            goback() {
                this.$router.push('/user/order/list/0');
            },
            getOrder(orderId) {
                orderDetail({orderId: orderId}).then(res => {
                    this.order = res.data.data;
                });
            },
            pay() {

                // Dialog.alert({
                //   message: '你选择了' + (this.payWay === 'wx' ? '微信支付' : '支付宝支付')
                // }).then(() => {
                //
                //   this.$router.push({
                //     name: 'paymentStatus',
                //     params: {
                //       status: 'success'
                //     }
                //   });
                // });

                this.$router.push({
                    name: 'payQR',
                    params: {
                        payWay: this.payWay,
                        orderId: this.orderId
                    }
                });

                // // 利用weixin-js-sdk调用微信支付
                // orderPrepay({orderId: this.orderId}).then(res => {
                //   var payParams = res.data.data;

                // });
            }
        },

        components: {
            [Radio.name]: Radio,
            [RadioGroup.name]: RadioGroup,
            [NavBar.name]: NavBar,
            [Dialog.name]: Dialog
        }
    };
</script>

<style lang="scss" scoped>
    .payment_group {
        margin-bottom: 10px;
    }

    .time_down {
        background-color: #fffeec;
        padding: 10px 15px;
    }

    .pay_submit {
        position: fixed;
        bottom: 0;
        width: 100%;
    }

    .pay_way_group img {
        vertical-align: middle;
    }

    .pay_way_title {
        padding: 15px;
        background-color: #fff;
    }
</style>
