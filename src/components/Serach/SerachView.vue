<template>
    <div>
      <div class="header">
        <div class="serach">
          <i class="serach_icon"></i>
          <input type="text" placeholder="电影/电视剧/影人">
        </div>
      </div>
      <div class="second">
        <div class="item">
          <router-link to="/serach/movie">电影</router-link>
        </div>
        <div class="item">
          <router-link to="/serach/program">电视剧</router-link>
        </div>
      </div>
      <router-view></router-view>
    </div>
</template>

<script>
    export default{
      created(){
        this.$router.replace('/serach/movie') //重定向
      }
    }
</script>

<style lang="scss" scoped>
  .header{
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    display: flex;
    padding: 0 30px;
    .serach{
      flex: 1;
      border-radius: 5px;
      border: 1px solid rgba(0, 0, 0, 0.09);
      background: #eee;
      height: 30px;
      margin-top: 8px;
      display: flex;
      .serach_icon{
        flex: 0 0 22px;
        display: inline-block;
        width: 22px;
        height: 22px;
        margin:3px 0 0 5px;
        background: url("../../assets/img/ic_group_search.png");
        background-size: 22px 22px;
      }
      input{
        flex: 1;
        display: inline-block;
        outline: none;
        border: none;
        height: 29px;
        background: #eee;
        padding: 0 10px;
      }
    }
  }
  .second{
    width: 100%;
    height: 50px;
    display: flex;
    line-height: 50px;
    text-align: center;
    .item{
      flex: 1;
      border-bottom: 1px solid #ccc;
      & >a{
        display: inline-block;
        color: #333;
        width: 100%;
        height: 100%;
      }

      & >.active{
        border-bottom: 2px solid red;
        color: red;
      }
    }
  }
</style>
