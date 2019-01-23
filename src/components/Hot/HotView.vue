<template>
  <div>
    <div class="header">
      <div class="where">
        <span>广州</span><i class="icon"></i>
      </div>
      <div class="serach">
        <i class="serach_icon"></i>
        <input type="text" placeholder="电影/电视剧/影人" @input="showVal">
      </div>
      <div class="search_btn" @click="search">搜索</div>
    </div>
    <div class="second">
      <div class="item">
        <router-link to="/hot/Showing">正在热映</router-link>
      </div>
      <div class="item">
        <router-link to="/hot/Soon">即将上映</router-link>
      </div>
    </div>
    <router-view/>
    <div class="box2" v-show="show">
      <EveryMovie :movie="movie" @hide-event="hidePage"></EveryMovie>
    </div>
  </div>
</template>

<script>
  import EveryMovie from '../../components/Hot/EveryMovie'
  export default{
    data(){
      return {
        val: '',
        movie: {},
        show:false
      }
    },
    created(){
      this.$router.replace('/hot/Showing') //重定向
    },
    methods: {
      search(){
        console.log(this.val);
        //q=美人鱼&apikey=0b2bdeda43b5688921839c8ecb20399b&start=0&count=10
        this.$axios.get('/api/search', {
          params: {
            q: this.val,
            apikey: '0b2bdeda43b5688921839c8ecb20399b',
            start: 0,
            count: 30
          }
        })
          .then(res => {
            res = res.data
            let result = JSON.parse(res)
            console.log(result);
            let resultEnd = result.subjects
            this.movie = resultEnd

            if(this.movie.length>0){
              this.show=true
            }
          })
      },
      showVal(el){
        this.val = el.target.value
      },
      hidePage(){
          this.show=false
      }
    },
    components: {
      EveryMovie
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    display: flex;
    padding: 0 10px;
    .where {
      flex: 0 0 50px;
      width: 50px;
      height: 50px;
      line-height: 50px;
      span {
        font-size: 16px;
        display: inline-block;
      }
      .icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: url("../../assets/img/ic_group_folder_down.png");
        background-size: 12px 12px;
        margin-left: 3px;
      }
    }
    .serach {
      flex: 1;
      border-radius: 5px;
      border: 1px solid rgba(0, 0, 0, 0.09);
      background: #ccc;
      height: 30px;
      margin-top: 8px;
      display: flex;
      .serach_icon {
        flex: 0 0 22px;
        display: inline-block;
        width: 22px;
        height: 22px;
        margin: 3px 0 0 5px;
        background: url("../../assets/img/ic_group_search.png");
        background-size: 22px 22px;
      }
      input {
        flex: 1;
        display: inline-block;
        outline: none;
        border: none;
        height: 29px;
        background: #ccc;
        padding: 0 10px;
      }
    }
    .search_btn {
      width: 50px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #ccc;
      margin:9px 0 0 10px;
    }
  }

  .second {
    width: 100%;
    height: 50px;
    display: flex;
    line-height: 50px;
    text-align: center;
    .item {
      flex: 1;
      border-bottom: 1px solid #ccc;
      & > a {
        display: inline-block;
        color: #333;
        width: 100%;
        height: 100%;
      }

      & > .active {
        border-bottom: 2px solid red;
        color: red;
      }
    }
  }
  .box2{
    position: fixed;
    width: 100%;
    height: 100%;
    top:0;
    left: 0;
    background: #fff;
  }
</style>
