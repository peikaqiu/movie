<template>
  <div>
    <div class="watch">
      <div class="search_movie">
        <div class="icon"></div>
        <div class="notice">
          <span class="title">找电影</span>
          <span class="fu_title">治愈/青春/大陆</span>
        </div>
        <div class="arrow"></div>
      </div>
      <div class="my_tv">
        <div class="icon"></div>
        <div class="notice">
          <span class="title">我的影视</span>
          <span class="fu_title">3部</span>
        </div>
        <div class="arrow"></div>
      </div>
    </div>
    <div class="place" ref="menu">
      <div class="content">

        <div class="hot">
          <div class="hot_title">
            <span>本周口碑榜</span>
            <span>全部 99+ <div class="arrow"></div></span>
          </div>
          <div class="loop">
            <transition-group name="fade">
              <div class="movie_loop" v-for="(item,i) in movie" :key="item.rank" v-show="i == index">
                <img :src="item.subject.images.small">
              </div>
            </transition-group>
          </div>
        </div>

        <div class="new_movie">
          <div class="new_movie_title">
            <span>新片榜</span>
            <span>全部 99+ <div class="arrow"></div></span>
          </div>
          <div class="place_two" ref="pic">
            <div class="content_two">
              <div class="pic" v-for="(item,i) in pic" :key="i">
                <img :src="item.images.small">
              </div>
            </div>
          </div>
        </div>

        <div class="every_movie">
          <div class="every_movie_title">
            <span v-show="currentIndex ==0">豆瓣电影 Top250</span>
            <span v-show="currentIndex ==1">一周口碑电影榜</span>
            <span v-show="currentIndex ==2">北美票房榜</span>
          </div>
          <div class="place_three" ref="three">
            <div class="content_three">
              <div class="box_movie" v-for="(item,i) in mydata" :key="i" ref="change">
                <div class="movie_content" v-for="(items,index) in item.notic" :key="index">
                  <span class="num">{{items.rating}}</span>
                  <img :src="items.img">
                  <div class="right">
                    <span>{{items.name}}</span>
                    <span>{{items.scord}}</span>
                  </div>
                </div>
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
    data(){
      return {
        movie: {},
        index: 0,
        pic: {},
        menuScroll: null,
        picScroll: null,
        mydata: {},
        movieScroll:null,
        moveArr:[], //新建一个滚动数组,
        currentIndex:0
      }
    },
    created(){
      this.$axios.get('/api/movie')
        .then(res => {
          res = res.data
          let result = JSON.parse(res)
          //console.log(result.subjects);
          let resultEnd = result.subjects
          this.movie = resultEnd

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
      this.$axios.get('/api/pic')
        .then(res => {
          res = res.data
          let result = JSON.parse(res)
          console.log(result.subjects);
          let resultEnd = result.subjects
          this.pic = resultEnd

          this.$nextTick(() => {
            // 网络请求完毕,数据更新页面重新渲染完毕
            // 通过vue ref属性绑定元素,可以在当前组件实例中通过this.$refs.属性名获取,该元素的DOM节点
            console.log(this.$refs.pic)
            // 注意 这里最好写个判断,保证不引起内存泄漏
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.pic, {
                click: true, // 允许点击
                scrollX: true
              })
            } else {
              this.picScroll.refresh() // 更新滚动组件
            }
          })
        })
      this.$axios.get('/api/mydata')
        .then(res => {
          res = res.data
          if (res.errno === 0) { // 模仿真实开发,判断当前数据是否有权限获取
            console.log(res.data)
            this.mydata = res.data
            this.$nextTick(() => {
              // 网络请求完毕,数据更新页面重新渲染完毕
              // 通过vue ref属性绑定元素,可以在当前组件实例中通过this.$refs.属性名获取,该元素的DOM节点
              console.log(this.$refs.change)
              this._initMovieWrapperWide()
              // 注意 这里最好写个判断,保证不引起内存泄漏
              if (!this.movieScroll) {
                this.movieScroll = new BScroll(this.$refs.three, {
                  click: true, // 允许点击
                  scrollX: true,
                  probeType:3  //滑动监听
                })
                //添加滚动监听
                this.movieScroll.on('scroll', ({x}) => {
                  //console.log(x)
                  this.refreshCurrentIndex(x)
                })
              } else {
                this.movieScroll.refresh() // 更新滚动组件
              }
            })
          }
        })
    },
    mounted(){
      this.$nextTick(() => {
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          this.index++
          if (this.index >= this.movie.length - 1) {
            this.index = 0
          }
        }, 3000)
      })
    },
    methods:{
      _initMovieWrapperWide(){
        let x = 0
        this.moveArr.push(x)
        // 生成不同食品偏移量范围数组
        for (let i = 0; i < this.$refs.change.length; i++) {
          let li = this.$refs.change[i]
          x += li.clientWidth
          this.moveArr.push(x)
        }
      },
      refreshCurrentIndex(x){
        x = parseInt(-x)
        for (let i = 0; i < this.moveArr.length - 1; i++) {
          let nowWidth = this.moveArr[i]
          let nextWidth = this.moveArr[i + 1]
          if (x >= nowWidth && x < nextWidth) {
            this.currentIndex = i
            //console.log(i)
            break
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .watch {
    display: flex;
    height: 80px;
    border-bottom: 1px solid #ccc;
    .search_movie {
      flex: 1;
      display: flex;
      align-items: center;
      .icon {
        flex: 0 0 30px;
        width: 30px;
        height: 30px;
        background: url("../../assets/img/ic_audio_player_column.png");
        background-size: 30px 30px;
        margin: 0 10px 0 20px;
      }
      .notice {
        flex: 1;
        span {
          display: block;
        }
        .title {
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 5px;
        }
        .fu_title {
          font-size: 14px;
          color: #ccc;
        }
      }
      .arrow {
        width: 10px;
        height: 10px;
        background: url("../../assets/img/ic_more_versions.png");
        background-size: 10px 10px;
        margin-right: 15px;
      }
    }
    .my_tv {
      flex: 0 0 160px;
      width: 160px;
      display: flex;
      align-items: center;
      .icon {
        border-left: 1px solid #ccc;
        flex: 0 0 40px;
        width: 40px;
        height: 40px;
        background: url("../../assets/img/ic_menu_liked.png");
        background-size: 40px 40px;
        margin: 0 10px 0 0;
      }
      .notice {
        flex: 1;
        span {
          display: block;
        }
        .title {
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 5px;
        }
        .fu_title {
          font-size: 14px;
          color: #ccc;
        }
      }
      .arrow {
        width: 10px;
        height: 10px;
        background: url("../../assets/img/ic_more_versions.png");
        background-size: 10px 10px;
        margin-right: 15px;
      }
    }
  }

  .place {
    position: fixed;
    top: 180px;
    bottom: 50px;
    width: 100%;
    overflow: hidden;
    .content {
      width: 100%;
      overflow: hidden;
      .hot {
        height: 300px;
        .hot_title {
          box-sizing: border-box;
          width: 100%;
          height: 60px;
          line-height: 60px;
          padding: 0 15px;
          position: relative;
          span:first-child {
            display: inline-block;
            font-size: 22px;
            font-weight: 700;
          }
          span:last-child {
            font-size: 14px;
            position: absolute;
            right: 10px;
            .arrow {
              display: inline-block;
              width: 10px;
              height: 10px;
              background: url("../../assets/img/ic_more_versions.png");
              background-size: 10px 10px;
            }
          }
        }
        .loop {
          position: relative;
          .movie_loop {
            position: absolute;
            top: 0;
            left: 50%;
            margin-left: -75px;
            img {
              width: 150px;
              height: 200px;
            }
          }
          .fade-enter {
            transform: translateX(130px);
            opacity: 0.3;
          }
          .fade-enter-active,
          .fade-leave-active {
            transition: all 1s linear;
          }
          .fade-enter-to,
          .fade-leave {
            opacity: 1;
          }
          .fade-leave-to {
            transform: translateX(-130px);
            opacity: 0.1;
          }
        }
      }
      .new_movie {
        height: 500px;
        .new_movie_title {
          box-sizing: border-box;
          width: 100%;
          height: 60px;
          line-height: 60px;
          padding: 0 15px;
          position: relative;
          span:first-child {
            display: inline-block;
            font-size: 22px;
            font-weight: 700;
          }
          span:last-child {
            font-size: 14px;
            position: absolute;
            right: 10px;
            .arrow {
              display: inline-block;
              width: 10px;
              height: 10px;
              background: url("../../assets/img/ic_more_versions.png");
              background-size: 10px 10px;
            }
          }
        }
        .place_two {
          position: fixed;
          top: 350px;
          .content_two {
            width: 300%;
            .pic {
              margin: 10px;
              float: left;
              img {
                width: 150px;
                height: 200px;
              }
            }
          }
        }
      }
      .every_movie{
        height: 320px;
        .every_movie_title{
          box-sizing: border-box;
          width: 100%;
          height: 60px;
          line-height: 60px;
          padding: 0 15px;
          position: relative;
          span{
            font-size: 18px;
            font-weight: 700;
          }
        }
        .place_three{
          position: fixed;
          top: 860px;
          width: 100%;
          overflow: hidden;
          .content_three{
            width: 280%;
            .box_movie{
              width: 300px;
              display: inline-block;
              .movie_content{
                position: relative;
                height: 50px;
                .num{
                  position: absolute;
                  top:5px;
                  left: 10px;
                }
                img{
                  width: 40px;
                  height: 50px;
                  margin-left: 30px;
                }
                .right{
                  box-sizing: border-box;
                  display: inline-block;
                  position: absolute;
                  width: 200px;
                  top: 5px;
                  left: 80px;
                  padding: 7px 0;
                  border-bottom: 1px solid #eee;
                  span{
                    display: block;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

</style>
