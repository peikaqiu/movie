<template>
  <div id="app">
    <div class="footer">
      <div class="item">
        <router-link to="/hot/Showing">
          <i class="icon1"></i>
          <span>热 映</span>
        </router-link>
      </div>
      <div class="item">
        <router-link to="/serach/movie">
          <i class="icon2"></i>
          <span>找 片</span>
        </router-link>
      </div>
      <div class="item">
        <router-link to="/person/wantView">
          <i class="icon3"></i>
          <span>个 人</span>
        </router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
        return{

        }
    }
  }
</script>

<style lang="scss">
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    display: flex;

    .item {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      border: 1px solid red;
      & > a {
        color: #666;
      }
      & > .active{
        color: red;
      }
      & > .active .icon1{
        background: url("./assets/img/ic_hot_activated.png");
        display: block;
        width: 22px;
        height: 22px;
        background-size: 22px 22px;
        margin: 0 0 2px 5px;
      }
      & > .active .icon2{
        background: url("./assets/img/ic_explore_activated.png");
        display: block;
        width: 22px;
        height: 22px;
        background-size: 22px 22px;
        margin: 0 0 2px 5px;
      }
      & > .active .icon3{
        background: url("./assets/img/ic_mine_activated.png");
        display: block;
        width: 22px;
        height: 22px;
        background-size: 22px 22px;
        margin: 0 0 2px 5px;
      }
      .icon1 {
        display: block;
        width: 22px;
        height: 22px;
        background: url("./assets/img/ic_hot_normal.png");
        background-size: 22px 22px;
        margin: 0 0 2px 5px;
      }
      .icon2 {
        display: block;
        width: 22px;
        height: 22px;
        background: url("./assets/img/ic_explore_normal.png");
        background-size: 22px 22px;
        margin: 0 0 2px 5px;
      }
      .icon3 {
        display: block;
        width: 22px;
        height: 22px;
        background: url("./assets/img/ic_mine_normal.png");
        background-size: 22px 22px;
        margin: 0 0 2px 5px;
      }
    }
  }
</style>
