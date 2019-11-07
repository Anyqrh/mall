<template>
    <div style="background-color: #fff">
        <div class="item_detail container">
            <div class="good-detail">
                <div class="good-img">
                    <div class="img">
<!--                        <img-zoom :src="defaultImage" width="400" height="400" :bigsrc="defaultImage" :configs="configs"></img-zoom>-->
                        <photo-zoom
                                :width="width"
                                :url="defaultImage"
                                :type="type"
                                :scale="scale"
                                :out-show="showType"
                        >
                        </photo-zoom>
                        <div class="images">
                            <div v-for="(image,index) in goods.info.gallery" :key="index">
                                <div v-if="index==0">
                                    <img style="height: 86px;width: 86px;float: left;margin-left: 0px;margin-top: 5px" :src="image" alt="" @click="changeImg(goods.info.gallery[index])">
                                </div>
                                <div v-else>
                                    <img style="height: 86px;width: 86px;float: left;margin-left: 5px;margin-top: 5px" :src="image" alt="" @click="changeImg(goods.info.gallery[index])">
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="good-info">
                    <div class="info-content">
                        <div class="goods-title">{{ goods.info.name }}</div>
                        <div v-for="(items,index) in goods.specificationList" :key="index">
                            <div class="guige">{{items.name}}</div>
                            <div class="guige-content">
                                <div class="guige-items" v-for="(item,inde) in items.valueList" v-model="showSku"
                                     :key="inde">
                                    <div :id="index+'_'+inde" class="guige-item" :data="item.name"
                                         @click="select(index,inde)">{{item.name}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="kucun">库存</div>
                        <div class="kucun-content">{{number}}</div>
                        <div class="shuliang">数量</div>
                        <div class="shuliang-content">
                            <div class="shuliang-button">
                                <div class="subtract" @click="subtract()"><i class="iconfont icon-jianhao"></i></div>
                                <div class="num">{{num}}</div>
                                <div class="add" @click="add()"><i class="iconfont icon-jiahao"></i></div>
                            </div>
                        </div>
                        <div class="buy">
                            <div class="price">{{ goods.info.retailPrice*num*100 | yuan }}</div>
                            <div class="save" title="收藏商品" @click="addCollect"><i class="iconfont icon-xingxing"></i>
                            </div>
                            <div class="shopping-cart" @click="addCart()"><i class="iconfont icon-shopping-cart"></i>&nbsp;加入购物车
                            </div>
                            <div class="pay" @click="buyGoods">立即购买</div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
        <div class="attribute container">
            <div class="attribute-title">商品属性</div>
            <div class="attribute-content">
                <div class="content-title">规格：</div>
                <div class="content-text">组合一：AB面独立弹簧床垫 进口乳胶150*200cm*1+可水洗抗菌防螨丝羽绒枕*2。 组合二：AB面独立弹簧床垫
                    进口乳胶180*200cm*1+可水洗抗菌防螨丝羽绒枕*2
                </div>
            </div>
        </div>
        <div class="detail container">
            <div class="detail-title">商品详情</div>
            <div class="detail-content" v-if="goods.info.detail" v-html="goods.info.detail"></div>
            <div class="detail-content" v-else style="text-align: center;">
                <p>无详情</p>
            </div>
        </div>
    </div>
</template>

<script>

    import {goodsDetail, cartGoodsCount, collectAddOrDelete, cartAdd, cartFastAdd} from '@/api/api';
    import imgZoom from 'vue2.0-zoom'
    import {Sku, Swipe, SwipeItem, GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn, Popup} from 'vant';
    import {setLocalStorage} from '@/utils/local-storage';
    import popupProps from './popup-props';
    import photoZoom from '@/components/photo-zoom/'
    import _ from 'lodash';

    export default {
        props: {
            itemId: [String, Number]
        },

        data() {
            const isLogin = !!localStorage.getItem('Authorization');
            return {
                isLogin,
                productId: "",
                number: "",
                num: 1,
                price: 0,
                goods: {
                    userHasCollect: 0,
                    info: {
                        gallery: []
                    }
                },
                sku: {
                    tree: [],
                    list: [],
                    price: '1.00', // 默认价格（单位元）
                },
                skuGoods: {
                    // 商品标题
                    title: '',
                    // 默认商品 sku 缩略图
                    picture: ''
                },
                cartInfo: 0,
                selectSku: {
                    selectedNum: 1,
                    selectedSkuComb: {
                        sku_str: 'aa'
                    }
                },
                propsPopup: false,
                showSku: false,
                selectOption: {},
                // configs: {
                //     width:400,
                //     height:400,
                //     maskWidth:100,
                //     maskHeight:100,
                //     maskColor:'red',
                //     maskOpacity:0.2
                // },
                defaultImage:"",
                index: 0,
                scale: 3,
                type: "square",
                showType: true,
                width: 200,
            };
        },


        computed: {
            props_str() {
                let props_arr = [];
                _.each(this.goods.attribute, json => {
                    props_arr.push([json['attribute'], json['value']]);
                });
                return props_arr || [];
            }
        },

        updated() {
            $('.detail-content').find('p').find("img").css("width", "100%");
            console.log(this.goods);
        },


        created() {
            this.initData();
        },

        methods: {
            changeImg(text){
                this.defaultImage = text;
            },
            subtract() {
                if (this.num == 1) {
                    return;
                }
                this.num -= 1;

            },
            add() {
                if (this.num == this.number) {
                    return;
                }
                this.num += 1;
            },
            select(index, inde) {
                // $(".flag1").each(function () {
                //     $(this).removeClass("flag1")
                // })
                var _this = this;
                let len = this.goods.specificationList.length;
                let obj = $("#" + index + "_" + inde)
                if (obj.hasClass("flag")) {
                    obj.removeClass("flag")
                } else {
                    obj.addClass("flag")
                    // let text = obj.text();
                    // console.log(text)
                    // console.log(index)
                    // if($(".flag").length==len-1){
                    //     let list = _this.goods.productList;
                    //     for(let i=0;i<list.length;i++){
                    //         let lis = list[i].specifications
                    //         if(text==lis[index]){
                    //             let number = list[i].number
                    //             if(number==0){
                    //                 console.log(lis)
                    //                 for(let i=0;i<lis.length;i++){
                    //                     if(i!=index){
                    //                         // console.log($("div[data='"+(lis[i])+"']"))
                    //                         let div =$("div[data='"+(lis[i])+"']")
                    //                         div.addClass("flag1")
                    //
                    //                     }
                    //                 }
                    //             }
                    //         }
                    //
                    //     }
                    // }
                    obj.parent().siblings(".guige-items").each(function () {
                        $(this).children().removeClass("flag")
                    })
                }

                if ($(".flag").length == len) {
                    console.log(len)
                    let op = new Map()
                    $(".flag").each(function () {
                        let id = $(this).attr("id").split("_")[0]
                        let value = $(this).attr("data")
                        op.set(id, value)
                    })
                    console.log(op)
                    let list = _this.goods.productList;
                    for (let i = 0; i < list.length; i++) {
                        let lis = list[i].specifications
                        let num = 0;
                        for (let j = 0; j < lis.length; j++) {
                            if (op.get(j + '') == lis[j]) {
                                num += 1;
                            }
                        }
                        if (num == lis.length) {
                            console.log(list[i])
                            _this.number = list[i].number
                            if (_this.number == 0) {
                                _this.num = 0
                            } else {
                                _this.num = 1
                            }
                            _this.productId = list[i].id
                            _this.goods.info.retailPrice = list[i].price
                        }
                    }
                }
            },
            skuClick() {
                this.showSku = true;
            },
            initData() {
                goodsDetail({id: this.itemId}).then(
                    res => {
                        this.goods = res.data.data;
                        this.defaultImage = res.data.data.info.gallery[0];
                        this.skuAdapter();
                    }
                );

                cartGoodsCount().then(res => {
                    this.cartInfo = res.data.data;
                });

            },
            toCart() {
                this.$router.push({
                    name: 'cart'
                });
            },
            addCollect() {
                collectAddOrDelete({valueId: this.itemId, type: 0}).then(res => {
                    if (this.goods.userHasCollect === 1) {
                        this.goods.userHasCollect = 0
                    }
                    else {
                        this.goods.userHasCollect = 1
                        this.$toast({
                            message: '收藏成功',
                            duration: 1500
                        });
                    }

                });
            },
            getProductIds(s1, s2, s3) {
                var productId;
                var s1_name;
                var s2_name;
                var s3_name;
                _.each(this.goods.specificationList, specification => {
                    _.each(specification.valueList, specValue => {
                        if (specValue.id === s1) {
                            s1_name = specValue.value;
                        } else if (specValue.id === s2) {
                            s2_name = specValue.value;
                        } else if (specValue.id === s3) {
                            s3_name = specValue.value;
                        }
                    });
                });

                _.each(this.goods.productList, v => {
                    let result = _.without(v.specifications, s1_name, s2_name, s3_name);
                    if (result.length === 0) {
                        productId = v.id;
                    }
                });
                return productId;
            },
            getProductId(s1, s2) {
                var productId;
                var s1_name;
                var s2_name;
                _.each(this.goods.specificationList, specification => {
                    _.each(specification.valueList, specValue => {
                        if (specValue.id === s1) {
                            s1_name = specValue.value;
                        }
                        else if (specValue.id === s2) {
                            s2_name = specValue.value;
                        }
                    });
                });

                _.each(this.goods.productList, v => {
                    let result = _.without(v.specifications, s1_name, s2_name);
                    if (result.length === 0) {
                        productId = v.id;
                    }
                });
                return productId;
            },
            getProductIdByOne(s1) {
                var productId;
                var s1_name;
                _.each(this.goods.specificationList, specification => {
                    _.each(specification.valueList, specValue => {
                        if (specValue.id === s1) {
                            s1_name = specValue.value;
                            return;
                        }
                    });
                });

                _.each(this.goods.productList, v => {
                    let result = _.without(v.specifications, s1_name);
                    if (result.length === 0) {
                        productId = v.id;
                    }
                });
                return productId;
            },
            addCart() {
                if ($(".flag").length != this.goods.specificationList.length) {
                    this.$toast({
                        message: '请选择完所有规格~',
                        duration: 1500
                    });
                } else if (this.number == 0) {
                    this.$toast({
                        message: '抱歉~,该组合已经没有库存了,无法购买',
                        duration: 1500
                    });
                } else {
                    console.log(this.goods.info.id)
                    console.log(this.num)
                    console.log(this.productId)
                    let params = {
                        goodsId: this.goods.info.id,
                        number: this.num,
                        productId: this.productId
                    };
                    cartAdd(params).then(() => {
                        this.cartInfo = this.cartInfo + this.num;
                        this.$toast({
                            message: '已添加至购物车',
                            duration: 1500
                        });
                        // that.showSku = false;
                    });
                }
            },
            // addCart(data) {
            //     console.log(data)
            //     let that = this;
            //     let params = {
            //         goodsId: data.goodsId,
            //         number: data.selectedNum,
            //         productId: 0
            //     };
            //     if (_.has(data.selectedSkuComb, 's3')) {
            //         params.productId = this.getProductIds(
            //             data.selectedSkuComb.s1,
            //             data.selectedSkuComb.s2,
            //             data.selectedSkuComb.s3
            //         );
            //     }
            //     else if (_.has(data.selectedSkuComb, 's2')) {
            //         params.productId = this.getProductId(
            //             data.selectedSkuComb.s1,
            //             data.selectedSkuComb.s2
            //         );
            //     }
            //     else {
            //         params.productId = this.getProductIdByOne(data.selectedSkuComb.s1)
            //     }
            //     console.log(params)
            //     cartAdd(params).then(() => {
            //         this.cartInfo = this.cartInfo + data.selectedNum;
            //         this.$toast({
            //             message: '已添加至购物车',
            //             duration: 1500
            //         });
            //         that.showSku = false;
            //     });
            // },
            buyGoods() {
                if ($(".flag").length != this.goods.specificationList.length) {
                    this.$toast({
                        message: '请选择规格',
                        duration: 1500
                    });
                } else if (this.number == 0) {
                    this.$toast({
                        message: '抱歉~,该商品已经没有库存了,无法购买',
                        duration: 1500
                    });
                } else {
                    console.log(this.goods.info.id)
                    console.log(this.num)
                    console.log(this.productId)
                    let params = {
                        goodsId: this.goods.info.id,
                        number: this.num,
                        productId: this.productId
                    };
                    cartFastAdd(params).then(res => {
                        let cartId = res.data.data;
                        setLocalStorage({CartId: cartId})
                        this.$router.push({name: 'placeOrderEntity'});
                    });
                }
            },
            // buyGoods(data) {
            //     let that = this;
            //     let params = {
            //         goodsId: data.goodsId,
            //         number: data.selectedNum,
            //         productId: 0
            //     };
            //     if (_.has(data.selectedSkuComb, 's3')) {
            //         this.$toast({
            //             message: '目前仅支持两规格',
            //             duration: 1500
            //         });
            //         return
            //     }
            //     else if (_.has(data.selectedSkuComb, 's2')) {
            //         params.productId = this.getProductId(
            //             data.selectedSkuComb.s1,
            //             data.selectedSkuComb.s2
            //         );
            //     }
            //     else {
            //         params.productId = this.getProductIdByOne(data.selectedSkuComb.s1)
            //     }
            //     cartFastAdd(params).then(res => {
            //         let cartId = res.data.data;
            //         setLocalStorage({CartId: cartId})
            //         that.showSku = false;
            //         this.$router.push({name: 'placeOrderEntity'});
            //     });
            // },
            skuAdapter() {
                const tree = this.setSkuTree();
                const list = this.setSkuList();
                const skuInfo = {
                    price: this.goods.info.retailPrice, // 未选择规格时的价格
                    stock_num: 0, // TODO 总库存
                    collection_id: '', // 无规格商品skuId取collection_id，否则取所选sku组合对应的id
                    none_sku: false, // 是否无规格商品
                    hide_stock: true
                };
                this.sku = {
                    tree,
                    list,
                    ...skuInfo
                };
                this.skuGoods = {
                    title: this.goods.info.name,
                    picture: this.goods.info.picUrl
                }
            },
            setSkuList() {
                var sku_list = [];
                _.each(this.goods.productList, v => {
                    var sku_list_obj = {};
                    _.each(v.specifications, (specificationName, index) => {
                        sku_list_obj[
                        's' + (~~index + 1)
                            ] = this.findSpecValueIdByName(specificationName);
                    });

                    sku_list_obj.price = v.price * 100;
                    sku_list_obj.stock_num = v.number;
                    sku_list.push(sku_list_obj);
                });

                return sku_list;
            },
            findSpecValueIdByName(name) {
                let id = 0;
                _.each(this.goods.specificationList, specification => {
                    _.each(specification.valueList, specValue => {
                        if (specValue.value === name) {
                            id = specValue.id;
                            return;
                        }
                    });
                    if (id !== 0) {
                        return;
                    }
                });
                return id;
            },
            setSkuTree() {
                let that = this;
                let specifications = [];
                _.each(this.goods.specificationList, (v, k) => {
                    let values = [];
                    _.each(v.valueList, vv => {
                        vv.name = vv.value;
                        values.push({
                            id: vv.id,
                            name: vv.value,
                            imUrl: vv.picUrl
                        })
                    });

                    specifications.push({
                        k: v.name,
                        v: values,
                        k_s: 's' + (~~k + 1)
                    });
                });

                return specifications;
            }
        },

        components: {
            [Popup.name]: Popup,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [Sku.name]: Sku,
            [GoodsAction.name]: GoodsAction,
            [GoodsActionBigBtn.name]: GoodsActionBigBtn,
            [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
            [popupProps.name]: popupProps,
            // imgZoom,
            photoZoom
        }
    }
</script>

<style lang="scss" scoped>

    .good-detail {
        width: 100%;
        /*height: 500px;*/
        margin-top: 10px;
        background-color: #fff;
        display: flex;
    }

    .good-img {
        width: 40%;
        height: 100%;
    }

    .good-info {
        width: 60%;
        height: 100%;
        border-right: 1px solid #eee;
        /*border-bottom: 1px solid #eee;*/
    }

    .img {
        width: 80%;
        height: 400px;
        margin: 10% 10%;
        /*border: 1px solid #ccc;*/
    }

    .img img {
        width: 100%;
        height: 100%;
    }

    .info-content {
        width: 100%;
        height: 80%;
        margin: 20px auto;
    }

    .goods-title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        color: #333;
        font-size: 18px;
        text-align: center;
    }

    .guige {
        width: 90%;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color: #999;
        margin-left: 20px;
        border-bottom: 1px solid #eee;
    }

    .guige-items {
        /*width: 90%;*/
        margin-top: 10px;
        margin-left: 20px;
        display: flex;
        flex-wrap: wrap;
    }

    .guige-item {
        height: 30px;
        line-height: 18px;
        font-size: 14px;
        margin-top: 10px;
        padding: 5px 5px;
        border: 1px solid #ddd;
        border-radius: 10px;
        margin-right: 10px;
        color: #999;
    }

    .guige-content {
        display: flex;
        flex-wrap: wrap;
    }

    .kucun {
        width: 90%;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color: #999;
        margin-top: 10px;
        margin-left: 20px;
        border-bottom: 1px solid #eee;
    }

    .kucun-content {
        width: 100%;
        height: 40px;
        margin-top: 10px;
        margin-left: 20px;
        line-height: 40px;
        font-size: 16px;
    }

    .shuliang {
        width: 90%;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color: #999;
        margin-top: 10px;
        margin-left: 20px;
        border-bottom: 1px solid #eee;
    }

    .shuliang-content {
        width: 100%;
        height: 60px;
        margin-top: 10px;
    }

    .shuliang-button {
        width: 150px;
        height: 40px;
        margin-top: 20px;
        margin-left: 20px;
        display: flex;
    }

    .subtract {
        width: 40px;
        height: 40px;
        border: 1px solid #ccc;
        background-color: #eee;
        cursor: pointer;
    }

    .num {
        width: 40px;
        height: 40px;
        border: 1px solid #ccc;
        margin-left: 5px;
        margin-right: 5px;
        line-height: 38px;
        font-size: 16px;
        text-align: center;
    }

    .add {
        width: 40px;
        height: 40px;
        border: 1px solid #ccc;
        background-color: #eee;
        cursor: pointer;
    }

    .icon-jianhao {
        line-height: 38px;
        font-size: 16px;
        margin-left: 10px;
    }

    .icon-jiahao {
        line-height: 38px;
        font-size: 16px;
        margin-left: 10px;
    }

    .buy {
        width: 100%;
        height: 80px;
        display: flex;
    }

    .price {
        width: 120px;
        height: 40px;
        margin-top: 20px;
        margin-left: 20px;
        font-size: 26px;
        line-height: 40px;
        color: #db3d3c;
    }

    .save {
        width: 40px;
        height: 40px;
        margin-left: 20px;
        margin-top: 20px;

    }

    .icon-xingxing {
        line-height: 40px;
        font-size: 26px;
        margin-left: 8px;
        color: #999999;
        cursor: pointer;
    }

    .shopping-cart {
        width: 180px;
        height: 40px;
        margin-top: 20px;
        margin-left: 50px;
        border: 1px solid #FF0036;
        line-height: 38px;
        font-size: 16px;
        text-align: center;
        color: #FF0036;
        background-color: #FFEDED;
    }

    .pay {
        width: 180px;
        height: 40px;
        margin-top: 20px;
        margin-left: 5px;
        line-height: 40px;
        font-size: 16px;
        text-align: center;
        color: #FFF;
        background-color: #FF0036;
    }

    /*属性*/
    .attribute {
        width: 100%;
        margin-top: 20px;
        /*border-bottom: 1px solid #eee;*/
        border-right: 1px solid #eee;
    }

    .attribute-title {
        width: 90%;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color: #999;
        margin-left: 20px;
        border-bottom: 1px solid #eee;
        margin-top: 10px;
    }

    .attribute-content {
        width: 90%;
        margin-left: 20px;
        margin-bottom: 10px;
    }

    .content-title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
    }

    .content-text {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
    }

    .detail-title {
        width: 90%;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color: #999;
        margin-left: 20px;
        border-bottom: 1px solid #eee;
        margin-top: 10px;
    }

    .detail-content {
        width: 100%;
        margin-top: 10px;
    }

    .item_detail {
        img {
            max-width: 100%;
        }
    }

    .item_cell_group {
        margin-bottom: 15px;
    }

    .item_price {
        font-size: 20px;
        color: $red;
        margin-right: 10px;
    }

    .item_market_price {
        color: $font-color-gray;
        text-decoration: line-through;
        font-size: $font-size-small;
    }

    .item-title {
        line-height: 1.4;
    }

    .item_dispatch {
        font-size: $font-size-small;
        color: $font-color-gray;
    }

    .item_intro {
        line-height: 18px;
        margin: 5px 0;
        font-size: $font-size-small;
        color: $font-color-gray;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
    }

    .item_desc {
        background-color: #fff;
        p {
            padding: 0 10px;
        }
        /deep/ img {
            max-width: 100%;
            display: block;
        }
    }

    .item_desc_title {
        @include one-border;
        padding: 10px 0;
        text-align: center;
    }

    .flag {
        background-color: #f45353;
        color: #fff;
    }

    .flag1 {
        background-color: black;
    }


</style>
