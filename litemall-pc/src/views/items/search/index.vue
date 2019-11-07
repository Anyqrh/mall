<template>
    <div class="item_search">

        <!--搜索框-->
        <div class="second">
            <div class="container second-content">
                <div class="logo"><img src="https://img.alicdn.com/tfs/TB1_uT8a5ERMeJjSspiXXbZLFXa-143-59.png"/></div>
                <div class="search">
                    <div class="search-icon"><i class="iconfont icon-search"></i></div>
                    <div class="search-input">
                        <input type="text" v-model="keyword" placeholder="搜索喜欢的物品"/>
                    </div>
                    <div class="search-text" @click="enterSearch">搜索</div>
                </div>
            </div>
        </div>
        <hr/>

        <!--商品列表-->
        <div class="goods-content container">
            <div class="goods-list">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        :immediate-check="false"
                        @load="loadMore"
                >
                    <item-group>
                        <item-card-hori
                                v-for="(item) in list"
                                :key="item.id"
                                :goods="item"
                                @click="itemClick(item.id)"
                        />
                    </item-group>
                </van-list>

                <is-empty v-if="isEmpty">抱歉,没有找到符合条件商品</is-empty>
            </div>
        </div>


        <!--<form action="/search" @submit="disabledSubmit">-->
        <!--<van-search placeholder="请输入商品名称" v-model="keyword" @search="enterSearch" autofocus/>-->
        <!--</form>-->
        <!--<div class="item_search_content">-->
        <!--<div class="item_search_text clearfix">-->
        <!--<div class="float-l">历史搜索</div>-->
        <!--<div class="float-r" @click="clearHistory">-->
        <!--<van-icon name="lajitong" style="font-size: 12px;margin-right: 3px" />-->
        <!--清空历史记录-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="item_search_history">-->
        <!--<van-tag-->
        <!--plain-->
        <!--v-for="(his, i) in wordHistory"-->
        <!--:key="i"-->
        <!--@click="clickSearch(his)"-->
        <!--&gt;{{his}}</van-tag>-->
        <!--</div>-->
        <!--</div>-->


    </div>
</template>

<script>
    import {Search, Tag, List} from 'vant';
    import {goodsList} from '@/api/api';
    import ItemGroup from '@/components/item-group/';
    import IsEmpty from '@/components/is-empty/';
    import ItemCardHori from '@/components/item-card-hori/';

    export default {
        data() {
            return {
                keyword: '',
                focusStatus: true,
                wordHistory: [],
                list: [],
                page: 1,
                limit: 10,
                pages: 0,
                loading: false,
                finished: false,
                isEmpty: false
            };
        },
        created() {
            this.keyword = this.$route.params.searchValue;
            this.enterSearch();
        },
        methods: {
            enterSearch() {
                this.reset();
                this.searchGoods();
            },
            clickSearch(word) {
                this.keyword = word.trim();
                this.reset();
                this.searchGoods();
            },
            reset() {
                this.list = [];
                this.page = 1;
                this.limit = 10;
                this.total = 0;
                this.loading = false;
                this.finished = false;
                this.isEmpty = false;
            },
            pushHistoryTolocal(keyword) {
                const wordHistory = this.wordHistory;
                const historyKeyWord = this.getKeyWordHistory();
                if (!!keyword.trim() && historyKeyWord.indexOf(keyword) < 0) {
                    wordHistory.push(keyword);
                    window.localStorage.setItem('keyword', wordHistory.join('|'));
                }
            },
            getKeyWordHistory() {
                const listWord = window.localStorage.getItem('keyword');
                return listWord ? listWord.split('|') : [];
            },
            clearHistory() {
                this.$dialog
                    .confirm({
                        message: '是否清空历史记录'
                    })
                    .then(() => {
                        window.localStorage.setItem('keyword', '');
                        this.wordHistory = [];
                    });
            },
            disabledSubmit() {
                return false;
            },
            searchGoods() {
                goodsList({
                    keyword: this.keyword,
                    page: this.page,
                    limit: this.limit,
                    categoryId: 0
                }).then(res => {
                    var data = res.data.data;
                    this.list.push(...data.list);
                    this.page = data.page;
                    this.limit = data.limit;
                    this.pages = data.pages;
                    res.data.data.list.length === 0 ? this.isEmpty = true : this.isEmpty = false;
                });
            },
            itemClick(itemId) {

                this.$router.push(`/items/detail/${itemId}`);
            },
            async loadMore() {
                this.loading = false;
                this.page += 1;
                await this.searchGoods();
                this.loading = false;
                if (this.pages <= this.page) {
                    this.finished = true;
                }
            },
        },
        activated() {
            this.wordHistory = this.getKeyWordHistory();
        },
        components: {
            [Search.name]: Search,
            [Tag.name]: Tag,
            [ItemGroup.name]: ItemGroup,
            [ItemCardHori.name]: ItemCardHori,
            [List.name]: List,
            [IsEmpty.name]: IsEmpty
        }
    };
</script>


<style lang="scss" scoped>

    /*搜索框*/
    .item_search {
        background-color: #fff;
    }

    .second {
        background-color: #fff;
        width: 100%;
    }

    .second-content {
        height: 120px;
        display: flex;
        background-color: #fff;
    }

    .logo {
        width: 150px;
        height: 100px;
        margin-left: 20px;
        margin-top: 20px;
    }

    .logo image {
        width: 100%;
        height: 100%;
    }

    .search {
        width: 500px;
        height: 48px;
        margin-left: 200px;
        margin-top: 40px;
        border: 3px solid #DB3D3C;
        border-radius: 20px;
        display: flex;
    }

    .search input {
        width: 100%;
        height: 40px;
        line-height: 30px;
        padding: 5px;
        border: none;
    }

    .search-icon {
        width: 40px;
        height: 40px;
        margin-left: 5px;
        margin-top: 2px;
    }

    .search-input {
        width: 380px;
        height: 40px;
    }

    .icon-search {
        font-size: 25px;
        margin-left: 10px;
        line-height: 40px;
    }

    .search-text {
        width: 70px;
        height: 100%;
        text-align: center;
        line-height: 40px;
        font-size: 18px;
        color: #fff;
        font-weight: bold;
        background-color: #DB3D3C;
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
        cursor: pointer;
    }

    .goods-content {
        background-color: #fff;
    }

    .goods-list {
        margin-top: 10px;
    }

    .item_search_content {
        padding: 15px 10px 0;
    }

    .item_search_text {
        font-size: $font-size-normal;
        color: $font-color-gray;
        margin-bottom: 20px;
    }

    .item_search_history > span {
        margin-right: 10px;
        margin-bottom: 10px;
    }
</style>
