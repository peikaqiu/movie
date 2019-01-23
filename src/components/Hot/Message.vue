<template>
  <div class="box">
    <div class="back"><i @click="hide"></i></div>
    <div class="message">
      <div class="message_box">
        <div class="left"><img :src="getImages(showpig.images.large)" width="110px" height="150px"></div>
        <div class="right">
          <p class="title">{{showpig.title}}</p>
          <p class="fu_title">{{showpig.original_title}}</p>
          <p class="average">{{showpig.rating.average}}</p><span>分</span>
          <p class="genres">{{showpig.genres[0]}},{{showpig.genres[1]}},{{showpig.genres[2]}}</p>
          <p class="durations">{{showpig.durations[1]}}</p>
          <p class="mainland_pubdate">{{showpig.mainland_pubdate}} 大陆上映</p>
        </div>
      </div>
    </div>
    <div class="buy">
      <div class="btn">特惠购票</div>
    </div>
    <div class="box2" ref="personLoop">
      <div class="content">
        <div class="content1" v-for="(item,index) in showpig.directors">
          <div class="person">
            <img :src="getImages(item.avatars.small)" width="100px" height="100px">
            <p>{{item.name}}</p>
          </div>
        </div>
        <div class="content2" v-for="(item,index) in showpig.casts">
          <div class="another_person">
            <img :src="item.avatars.small" width="100px" height="100px">
            <p>{{item.name}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="box3">
      <div class="title">
        <span class="left">全体演职人员</span>
        <span class="right" @click="showList"><i :class="{active:!active,on:!on}"></i></span>
      </div>
    </div>
    <transition name="slide">
      <div class="place" ref="loop">
        <ul v-show="show" >
          <li>导演(3)</li>
          <li>演员(40)</li>
          <li>编剧(8)</li>
          <li>制片人(1)</li>
          <li>摄影师(20)</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default{
    data(){
      return {
        show: true,
        active:false,
        on:true
      }
    },
    props: ['showpig','showval'],
    methods: {
      hide(){
        this.$emit('hidePage')
      },
      getImages(_url){
        if (_url !== undefined) {
          let _u = _url.substring(7);
          return 'https://images.weserv.nl/?url=' + _u;
        }
      },
      showList(){
        this.show = !this.show
        this.active = !this.active
        this.on = !this.on
      }
    },
    watch: {
      showval(val, oldvalue){
        if (val === true && val !== oldvalue) {
          console.log(123456);
          //console.log(this.showpig);
          // 网络请求完毕,数据更新页面重新渲染完毕
          // 通过vue ref属性绑定元素,可以在当前组件实例中通过this.$refs.属性名获取,该元素的DOM节点
          this.$nextTick(() => {
            if (!this.loopScroll) {
              console.log(this.$refs.personLoop)
              // 忽略下一行eslint检测
              // eslint-disable-next-line
              this.loopScroll = new BScroll(this.$refs.personLoop, {
                click: true,
                scrollX: true
              })
            }

            if (!this.listScroll) {
              console.log(this.$refs.loop)
              // 忽略下一行eslint检测
              // eslint-disable-next-line
              this.listScroll = new BScroll(this.$refs.loop, {
                click: true,
                scrollX: true
              })
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .box {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #f5f5f5;
    .back {
      width: 100%;
      height: 40px;
      background: #fff;
      position: relative;
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

    .message {
      box-sizing: border-box;
      background: rgba(0, 0, 0, .5);
      padding: 20px;
      width: 100%;
      .message_box {
        background: rgba(0, 0, 0, .1);
        display: flex;
        align-items: center;
        .left {
          flex: 0 0 110px;
          width: 20px;
        }
        .right {
          flex: 1;
          margin-left: 10px;
          .title {
            font-size: 18px;
            margin-bottom: 15px;
            color: #fff;
          }
          .fu_title {
            font-size: 12px;
            color: #ececec;
            margin-bottom: 15px;
          }
          .average {
            color: orange;
            display: inline-block;
            margin-bottom: 10px;
          }
          span {
            display: inline-block;
            color: #ececec;
          }
          .genres {
            font-size: 12px;
            color: #ececec;
            margin-bottom: 10px;
          }
          .durations {
            font-size: 12px;
            color: #ececec;
            margin-bottom: 10px;
          }
          .mainland_pubdate {
            font-size: 12px;
            color: #ececec;
          }
        }
      }
    }
    .buy {
      width: 100%;
      height: 80px;
      box-sizing: border-box;
      padding: 20px 15px;
      background: #fff;
      margin-bottom: 15px;
      border-bottom: 1px solid #ccc;
      .btn {
        border: 1px solid red;
        border-radius: 5px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 18px;
        color: #fff;
        background: #e64b47;
      }
    }
    .box2 {
      background: #fff;
      height: 150px;
      .content {
        width: 200%;
        .content1 {
          display: inline-block;
          width: 120px;
          .person {
            margin-top: 10px;
            img {
              margin: 0 0 10px 13px;
            }
            p {
              text-align: center;
            }
          }
        }
        .content2 {
          display: inline-block;
          width: 120px;
          .another_person {
            margin-top: 10px;
            img {
              margin: 0 0 10px 13px;
            }
            p {
              text-align: center;
            }
          }
        }
      }
    }
    .box3 {
      width: 100%;
      .title {
        box-sizing: border-box;
        padding-left: 5px;
        margin-top: 10px;
        align-items: center;
        display: flex;
        height: 50px;
        background: #fff;
        line-height: 50px;
        border-bottom: 1px solid #6e6e6e;
        .left {
          flex: 1;
        }
        .right {
          display: inline-block;
          width: 30px;
          height: 30px;
          padding: 0 20px;
          i {
            display: inline-block;
            width: 25px;
            height: 25px;
            background: url("../../assets/img/ic_group_folder_down.png");
            background-size: 25px 25px;
          }
          & >.active{
            transform: rotate(-90deg);
            transition: all 1s ease;
          }
          & >.on{
            transform: rotate(0deg);
            transition: all 1s ease;
          }
        }
      }
    }
    .slide-enter-active,
    .slide-leave-active{
      transition: all .5s linear;
    }
    .slide-enter{
      transform: translateX(-100%);
      opacity: 0.3;
    }
    .slide-leave-to{
      transform: translateX(100%);
      opacity: 0;
    }
    .place{
      position: fixed;
      bottom: 0;
      width: 100%;
      top: 535px;
      left: 0;
      overflow: hidden;
      ul {
        li {
          box-sizing: border-box;
          padding: 0 10px;
          width: 100%;
          background: #fff;
          height: 50px;
          line-height: 50px;
          border-bottom: 1px solid #ccc;
          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }
</style>
