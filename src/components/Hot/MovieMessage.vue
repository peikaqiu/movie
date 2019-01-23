<template>
  <div class="box">
    <div class="back"><i @click="hide"></i></div>
      <div class="message">
        <div class="message_box" @click="showPage">
          <div class="left"><img :src="showing.images.large" width="110px" height="150px"></div>
          <div class="right">
            <p class="title">{{showing.title}}</p>
            <p class="fu_title">{{showing.original_title}}</p>
            <p class="average">{{showing.rating.average}}</p><span>分</span>
            <p class="genres">{{showing.genres[0]}},{{showing.genres[1]}},{{showing.genres[2]}}</p>
            <p class="durations">{{showing.durations[1]}}</p>
            <p class="mainland_pubdate">{{showing.mainland_pubdate}} 大陆上映</p>
          </div>
          <div class="arrow"></div>
        </div>
      </div>

    <div class="placeHeight" ref="gun">
      <div class="content">
        <div class="box" v-for="(item,i) in myaddress" :key="i">
          <div class="left_box">
            <div class="title">
              <span class="titles">{{item.title}}</span>
              <span class="money">{{item.money}}</span>
              <span class="small">元起</span>
            </div>
            <p class="address">{{item.address}}</p>
            <p class="disc">{{item.disc}}</p>
            <div class="icon">
              <i class="icon1"></i>
              <span>{{item.hui}}</span>
            </div>
            <div class="icon">
              <i class="icon3"></i>
              <span>{{item.ka}}</span>
            </div>
            <p class="now">{{item.now}}</p>
          </div>
          <div class="right_box" @click="showset">购票</div>
        </div>
      </div>
    </div>

    <div class="box2" v-show="show">
      <Message :showpig="showing" :showval="show" @hidePage="hidePag"></Message>
    </div>
    <div class="box3"  v-show="showSet">
      <SelectSet  :showSet="showing" @hideSet="hideset" :showval="showSet"></SelectSet>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Message from '../../components/Hot/Message'
  import SelectSet from '../../components/Hot/SelectSet'
  export default{
    data(){
      return {
        loopScroll: null,
        show:false,
        lainjie:null,
        showSet:false,
        chufa:null
      }
    },
    props: ['showing', 'myaddress','showval'],
    methods: {
      hide(){
        this.$emit('hide-event')
      },
      showPage(){
          this.show=true
      },
      hidePag(){
          this.show=false
      },
      showset(count){
        this.showSet=true
      },
      hideset(){
        this.showSet=false
      }
    },
    watch: {
      showval(val, oldvalue){
        if (val === true && val !== oldvalue) {
          console.log(111);
          // 网络请求完毕,数据更新页面重新渲染完毕
          // 通过vue ref属性绑定元素,可以在当前组件实例中通过this.$refs.属性名获取,该元素的DOM节点
          this.$nextTick(() => {
            if(!this.loopScroll){
              console.log(this.$refs.gun)
              // 忽略下一行eslint检测
              // eslint-disable-next-line
              this.loopScroll = new BScroll(this.$refs.gun,{
                click:true
              })
            }
          })
        }
      }
    },
    components:{
      Message,
      SelectSet
    }
  }
</script>

<style lang="scss" scoped>
  .box {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #fff;
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
        .arrow {
          width: 12px;
          height: 12px;
          background: url("../../assets/img/ic_more_versions.png");
          background-size: 12px 12px;
          margin-right: 5px;
        }
      }
    }

    .placeHeight {
      width: 100%;
      position: fixed;
      top: 232px;
      bottom: 0;
      overflow: hidden;
      .content {
        width: 100%;
        overflow: hidden;
        .box {
          flex: 1;
          height: 160px;
          box-sizing: border-box;
          padding: 20px 15px;
          display: flex;
          align-items: center;
          .left_box{
            flex:1;
            .title {
              margin-bottom: 15px;
              .titles {
                font-size: 18px;
                font-weight: 600;
              }
              .money {
                font-size: 18px;
                color: #737373;
              }
              .small {
                font-size: 12px;
                color: #8d8d8d;
              }
            }
            .address {
              font-size: 12px;
              color: #8d8d8d;
              display: inline-block;
              margin-bottom: 15px;
            }
            .disc {
              display: inline-block;
              color: #8d8d8d;
            }
            .icon {
              font-size: 12px;
              margin-bottom: 10px;
              color: #8d8d8d;
            }
            .now {
              box-sizing: border-box;
              padding: 0 0 20px 0;
              font-size: 12px;
              color: #8d8d8d;
              border-bottom: 1px solid #8d8d8d;
            }
          }
          .right_box{
            border: 1px solid #494949;
            padding: 5px 10px;
            border-radius: 5px;
            background: #ff443c;
            color: #fff;
          }
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
    .box3{
      position: fixed;
      width: 100%;
      height: 100%;
      top:0;
      left: 0;
      background: #fff;
    }
  }
</style>
