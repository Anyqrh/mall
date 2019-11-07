<template>
	<div class="item_search">
        <van-nav-bar title="搜索" left-text="返回" left-arrow @click-left="goback"/>
		<form action="/search" @submit="disabledSubmit">
			<van-search placeholder="请输入商品名称" v-model="keyword" @search="enterSearch" autofocus/>
		</form>


    
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
</template>

<script>
import { Search, Tag, List,NavBar } from 'vant';
import { goodsList } from '@/api/api';
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
  methods: {
      goback() {
          this.$router.go(-1);
      },
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
      console.log(this.list)
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
      [NavBar.name]: NavBar,
    [IsEmpty.name]: IsEmpty    
  }
};
</script>


<style lang="scss" scoped>
.item_search {
  background-color: #fff;
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
