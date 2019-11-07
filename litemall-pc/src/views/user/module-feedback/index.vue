<template>
    <div style="background-color: #fff">
        <div class="feedback-title">
            <div class="title-content container"><i class="iconfont icon-list"></i>&nbsp;&nbsp;意见反馈</div>
        </div>
        <div class="feedback container">
            <form>
                <div class="feedback-type">
                    <div class="type-title">反馈类型</div>
                    <div class="type-list">
                        <div class="list-style" v-for="item in types">
                            <input type="radio" name="type" v-model="type" :value="item"/>{{item}}
                        </div>
                    </div>
                </div>
                <div class="feedback-content">
                    <div class="content-title">反馈内容</div>
                    <div class="content-text">
                        <textarea v-model="content" placeholder="对我们网站、商品、服务，你还有什么建议吗？你还希望在商城上买到什么？请告诉我们..."></textarea>
                    </div>
                </div>
                <div class="feedback-phone">
                    <div class="phone-title">联系电话</div>
                    <div class="phone-text">
                        <input type="text" name="phone" v-model="mobile" placeholder="请输入联系电话，方便我们与您联系"/>
                    </div>
                </div>
                <div class="feedback-submit">
                    <div class="submit" @click="submit">提交</div>
                </div>
            </form>

        </div>

        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--<van-cell-group title="反馈类型">-->
        <!--<van-cell class="order-coupon" :title="type" is-link arrow-direction="down" @click="showList = true"/>-->
        <!--</van-cell-group>-->
        <!--<van-cell-group title="反馈内容">-->

        <!--<van-field v-model="content"-->
        <!--clearable autosize center-->
        <!--placeholder="对我们网站、商品、服务，你还有什么建议吗？你还希望在商城上买到什么？请告诉我们..."-->
        <!--type="textarea"-->
        <!--rows="10"-->
        <!--size="large"-->
        <!--/>-->
        <!--</van-cell-group>-->

        <!--<van-cell-group title="联系方式">-->

        <!--<van-field size="large" v-model="mobile" placeholder="请输入联系电话，方便我们与您联系"/>-->
        <!--</van-cell-group>-->

        <!--<van-button size="large" type="primary" @click="submit">提交</van-button>-->


        <!--<van-popup v-model="showList" position="bottom">-->
        <!--<van-picker :columns="types" @change="onType"/>-->
        <!--</van-popup>-->
    </div>

</template>

<script>
    import {Field, Picker, Popup, Button} from 'vant';
    import {feedbackAdd} from '@/api/api';

    export default {
        data() {
            return {
                mobile: '',
                content: '',
                showList: false,
                types: ['商品相关', '功能异常', '优化建议', '其他'],
                type: ''
            };
        },
        created() {
        },
        methods: {
            submit() {
                if (this.mobile === '') {
                    this.$toast("请输入联系电话");
                    return;
                }
                if (this.type === '') {
                    this.$toast("请选择反馈类型");
                    return;
                }
                if (this.content === '') {
                    this.$toast("请输入反馈内容");
                    return;
                }
                feedbackAdd({mobile: this.mobile, feedType: this.type, content: this.content}).then(res => {
                    this.$toast("感谢您的宝贵意见！");
                    this.$router.go(-1);
                })
                console.log(this.type)
            }
        },

        components: {
            [Field.name]: Field,
            [Popup.name]: Popup,
            [Button.name]: Button,
            [Picker.name]: Picker
        }
    };
</script>


<style lang="scss" scoped>

    .feedback-title {
        width: 100%;
        height: 50px;
        background-color: #fff;
    }

    .title-content {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #eee;
        line-height: 50px;
        font-size: 18px;
        color: #999999;
    }

    .icon-list {
        font-size: 18px;
        margin-left: 20px;
    }

    .feedback {
        width: 100%;
        height: 600px;
        background-color: #fff;
        border: 1px solid #eee;
        margin-top: 10px;
    }

    .feedback-type {
        width: 100%;
        height: 100px;
    }

    .type-title {
        width: 100%;
        height: 50px;
        line-height: 30px;
        padding: 10px 20px;
        color: #999;
        background-color: #F1F3F4;
    }

    .type-list {
        width: 100%;
        height: 50px;
        padding: 10px 20px;
        display: flex;
    }

    .list-style {
        margin-left: 20px;
    }

    .feedback-content {
        width: 100%;
        height: 300px;
    }

    .content-title {
        width: 100%;
        height: 50px;
        line-height: 30px;
        padding: 10px 20px;
        color: #999;
        background-color: #F1F3F4;
    }

    .content-text {
        width: 100%;
        height: 250px;
    }

    .content-text textarea {
        width: 100%;
        height: 100%;
        border: none;
        resize: none;
        padding: 5px 20px;
    }

    .feedback-phone {
        width: 100%;
        height: 100px;
    }

    .phone-title {
        width: 100%;
        height: 50px;
        line-height: 30px;
        padding: 10px 20px;
        color: #999;
        background-color: #F1F3F4;
    }

    .phone-text {
        width: 100%;
        height: 45px;
    }

    .phone-text input {
        width: 100%;
        height: 100%;
        border: none;
        padding: 5px 20px;
    }

    .feedback-submit {
        width: 100%;
        height: 40px;
        margin-top: 40px;
        display: flex;
        justify-content: center;
    }

    .submit {
        width: 200px;
        height: 100%;
        text-align: center;
        line-height: 40px;
        letter-spacing: 5px;
        background-color: #07C160;
        color: #fff;
        border-radius: 10px;
    }
</style>
