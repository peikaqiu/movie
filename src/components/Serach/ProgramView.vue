<template>
  <div>
    <div class="watch">
      <div class="search_TV">
        <div class="icon"></div>
        <div class="notice">
          <span class="title">找电视</span>
          <span class="fu_title">韩剧/港剧/美剧</span>
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
        <div class="new_program">
          <div class="new_program_title">
            <span>电视剧1</span>
            <span>全部 99+ <div class="arrow"></div></span>
          </div>

          <div class="place_three" ref="three">
            <div class="content_three">
              <div class="box" v-for="(item,i) in program" :key="i">
                <div class="movie_content" v-for="(items,index) in item.notic" :key="index">
                  <img :src="items.img">
                  <span>{{items.name}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="new_program">
          <div class="new_program_title">
            <span>电视剧2</span>
            <span>全部 99+ <div class="arrow"></div></span>
          </div>

          <div class="place_three" ref="three2">
            <div class="content_three">
              <div class="box" v-for="(item,i) in program" :key="i">
                <div class="movie_content" v-for="(items,index) in item.notic" :key="index">
                  <img :src="items.img">
                  <span>{{items.name}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="new_program">
          <div class="new_program_title">
            <span>电视剧3</span>
            <span>全部 99+ <div class="arrow"></div></span>
          </div>

          <div class="place_three" ref="three3">
            <div class="content_three">
              <div class="box" v-for="(item,i) in program" :key="i">
                <div class="movie_content" v-for="(items,index) in item.notic" :key="index">
                  <img :src="items.img">
                  <span>{{items.name}}</span>
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
        program: {},
        menuScroll: null,
        movieScroll: null
      }
    },
    created(){
      this.$axios.get('/api/mydata')
        .then(res => {
          res = res.data
          if (res.errno === 0) {
            //console.log(res.data);
            this.program = res.data
          }

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

            if (!this.movieScroll) {
             this.movieScroll = new BScroll(this.$refs.three, {
             click: true, // 允许点击
             scrollX: true
             })
             } else {
             this.movieScroll.refresh() // 更新滚动组件
             }
            if (!this.movie2Scroll) {
              this.movie2Scroll = new BScroll(this.$refs.three2, {
                click: true, // 允许点击
                scrollX: true
              })
            } else {
              this.movie2Scroll.refresh() // 更新滚动组件
            }
            if (!this.movie3Scroll) {
              this.movie3Scroll = new BScroll(this.$refs.three3, {
                click: true, // 允许点击
                scrollX: true
              })
            } else {
              this.movie3Scroll.refresh() // 更新滚动组件
            }
          })
        })
    }
  }
</script>

<style lang="scss" scoped>
  .watch {
    display: flex;
    height: 80px;
    border-bottom: 1px solid #ccc;
    .search_TV {
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
      .new_program {
        height: 300px;
        border: 1px solid red;
        .new_program_title {
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
      }
      .place_three {
        width: 100%;
        overflow: hidden;
        .content_three {
          clear: both;
          width: 550%;
          height: 218px;
          .movie_content {
            float: left;
            margin: 0 0 0 20px;
            position: relative;
            text-align: center;
            img {
              width: 140px;
              height: 180px;
            }
            span {
              margin-top: 20px;
              display: block;
            }
          }
        }
      }
    }
  }
</style>
