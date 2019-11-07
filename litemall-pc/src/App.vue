<template>
<div id="app">
  <Head/>
  <!--<keep-alive>-->
    <!--<router-view class="view-router"  v-if="$route.meta.keepAlive"></router-view>-->
  <!--</keep-alive>-->
  <!--<router-view class="view-router" v-if="!$route.meta.keepAlive"></router-view>-->
  <router-view class="view-router"></router-view>
  <!--<router-view name="tabbar"></router-view>-->
  <!--<Footer/>-->
  <Top/>
</div>
</template>

<style lang="scss" src="./assets/scss/global.scss" />

<script>
    import Head from "./views/header/Head";
    import Footer from "./views/footer/Footer";
    import Top from "./views/returnTop/Top";
    export default {
        components: {Head,Footer,Top}
    }
</script>
