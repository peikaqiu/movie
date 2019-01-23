<template>
  <div>
    <div class="header">
      <div class="head_img">
        <i></i>
      </div>
      <div class="content">
        <p class="name">豆友188888888</p>
        <span class="icon"></span><span class="text">我的电影票</span>
      </div>
      <div class="icon2"></div>
    </div>
    <div class="second">
      <div class="item">
        <router-link to="/person/wantView">想看</router-link>
      </div>
      <div class="item">
        <router-link to="/person/SeeingView">在看</router-link>
      </div>
      <div class="item">
        <router-link to="/person/OutView">看过</router-link>
      </div>
      <div class="item">
        <router-link to="/person/RatingView">影评</router-link>
      </div>
      <div class="item">
        <router-link to="/person/HumanView">影人</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
    export default{
      created(){
        this.$router.replace('/person/wantView') //重定向
      }
    }
</script>

<style lang="scss" scoped>
  .header{
    display: flex;
    box-sizing: border-box;
    padding: 20px;
    height: 180px;
    background: #346e3c;
    align-items: flex-end;
    position: relative;
    .head_img{
      flex:0 0 70px;
      i{
        display: inline-block;
        width: 60px;
        height: 60px;
        background: url("../../assets/img/avatar_male_100.png");
        background-size: 60px 60px;
      }
    }
    .content{
      flex:1;
      p{
        color: #fff;
        display: block;
        padding: 15px 0;
        width: 160px;
        border-bottom: 1px solid #fff;
        margin-bottom: 10px;
      }
      .icon{
        display: inline-block;
        vertical-align: middle;
        width: 25px;
        height: 25px;
        background: url("../../assets/img/ic_ticket_black.png");
        background-size: 25px 25px;
      }
      .text{
        display: inline-block;
        color: #fff;
        font-size: 12px;
        margin-left: 10px;
      }

    }
    .icon2{
      position: absolute;
      top: 20px;
      right: 15px;
      width: 25px;
      height: 25px;
      background: url("../../assets/img/ic_setting_black.png");
      background-size: 25px 25px;
    }
  }
  .second{
    display: flex;
    height: 50px;
    text-align: center;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    .item{
      flex: 1;
      & >a{
        display: inline-block;
        width: 100%;
        height: 100%;
        color: #aaaaaa;
      }
      & >.active{
        border-bottom: 2px solid #4f0000;
        color: #535353;
      }
    }
  }
</style>
