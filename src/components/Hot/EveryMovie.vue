<template>
  <div class="box">
    <div class="back"><i @click="hidePage"></i></div>
    <div class="place">
      <div class="loop" ref="huadong">
        <div class="content">
          <div class="item" v-for="(items,i) in movie" :key="i">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default{
    props: ['movie'],
    created(){
      this.$nextTick(() => {
        // 网络请求完毕,数据更新页面重新渲染完毕
        // 通过vue ref属性绑定元素,可以在当前组件实例中通过this.$refs.属性名获取,该元素的DOM节点
        console.log(this.$refs.huedong)
        // 注意 这里最好写个判断,保证不引起内存泄漏
        if (!this.menuScroll) {
          this.menuScroll = new BScroll(this.$refs.huadong, {
            click: true // 允许点击
          })
        } else {
          this.menuScroll.refresh() // 更新滚动组件
        }
      })
    },
    methods:{
      hidePage(){
          this.$emit('hide-event')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .back {
    width: 100%;
    height: 40px;
    background: #fff;
    margin-bottom: 20px;
    i {
      display: inline-block;
      width: 25px;
      height: 25px;
      background: url("../../assets/img/ic_bar_back_green.png");
      background-size: 25px 25px;
      position: absolute;
      top: 8px;
      left: 10px;
    }
  }
  .place {
    position: fixed;
    top: 40px;
    bottom: 0;
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

      }
    }
  }
</style>
