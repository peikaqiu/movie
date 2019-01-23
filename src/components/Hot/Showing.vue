<template>
  <div class="place">
    <div class="loop" ref="menu">
      <div class="content">
        <div class="item" v-for="(items,i) in showing" :key="i">
          <div class="avatar">
            <img :src="items.images.small" width="100px" height="130px">
          </div>

          <div class="content">
            <div class="title">{{items.title}}</div>
            <div class="scord">{{items.rating.average}}分</div>
            <div class="directors">导演：{{items.directors[0].name}}</div>
            <div class="casts">
              主演：
              <span v-for="(name,i) in items.casts" :key="i">{{name.name}}</span>
            </div>
          </div>


          <div class="buy" @click="showBox(items)" >购票</div>
          <!--<BuyMovie :movie="items" @addCount="addCount" :show="show" @showBox-event="showBox"></BuyMovie>-->
          <!--<router-link to="/Hot/Showing/MovieMessage">
            <BuyMovie :movie="items" @addCount="addCount"></BuyMovie>
          </router-link>
          <router-view></router-view>-->
          <!--<MovieMessage :showing="items" v-show="show"></MovieMessage>-->
        </div>
      </div>
    </div>
    <div class="box" v-show="show">
      <MovieMessage :showing="items" :showval="show" :myaddress="myaddress" @hide-event="hideBox"></MovieMessage>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import MovieMessage from './MovieMessage'
  export default{
    data(){
      return {
        showing: {},
        menuScroll: null,
        show: false,
        items:null,
        myaddress:{},
      }
    },
    created(){
      this.$axios.get('/api/showing')
        .then(res => {
          res = res.data
          let result = JSON.parse(res)
          console.log(result.subjects);
          let resultEnd = result.subjects
          this.showing = resultEnd


          this.$nextTick(() => {
            // 网络请求完毕,数据更新页面重新渲染完毕
            // 通过vue ref属性绑定元素,可以在当前组件实例中通过this.$refs.属性名获取,该元素的DOM节点
            console.log(this.$refs.menu)
            // 注意 这里最好写个判断,保证不引起内存泄漏
            if (!this.menuScroll) {
              this.menuScroll = new BScroll(this.$refs.menu, {
                click: true // 允许点击
              })
            } else {
              this.menuScroll.refresh() // 更新滚动组件
            }
          })
        })
      this.$axios.get("/api/myaddress")
        .then(res => {
          res = res.data
          if (res.errno === 0) { // 模仿真实开发,判断当前数据是否有权限获取
            console.log(res.data);
            this.myaddress = res.data
          }
        })
    },
    components: {
      MovieMessage
    },
    methods: {
      showBox(items){
        this.show = true
        console.log(items);
        this.items=items;
      },
      hideBox(){
        this.show=false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .place {
    position: fixed;
    top: 100px;
    bottom: 50px;
    width: 100%;
    overflow: hidden;
    display: flex;
    .loop {
      flex: 1;
      width: 100%;
      overflow: hidden;
      background: #f3f5f7;
      .item {
        box-sizing: border-box;
        width: 100%;
        height: 170px;
        border-bottom: 1px solid #ccc;
        padding: 20px 15px;
        display: flex;
        align-items: center;

        .avatar {
          flex: 0 0 115px;
          width: 100px;
        }
        .content {
          flex: 1;
          .title {
            font-size: 20px;
            font-weight: bold;
            letter-spacing: 2px;
            margin-bottom: 10px;
          }
          .scord {
            font-size: 14px;
            margin-bottom: 10px;
          }
          .directors {
            font-size: 14px;
            margin-bottom: 10px;
            letter-spacing: 2px;
          }
          .casts {
            width: 160px;
            font-size: 14px;
            letter-spacing: 2px;
            line-height: 20px;
          }
        }
        .buy {
          box-sizing: border-box;
          border: 1px solid red;
          border-radius: 5px;
          padding: 8px 18px;
        }
      }
    }
    .box{
      position: fixed;
      width: 100%;
      height: 100%;
      top:0;
      left: 0;
      background: #fff;
    }
  }
</style>
