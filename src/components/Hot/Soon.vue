<template>
  <div>
    <div class="data">12月21日，星期五</div>
    <div class="place">
      <div class="loop" ref="menu">
        <div class="content">

          <div class="item" v-for="(items,i) in soon" :key="i">
            <div class="avatar">
              <img :src="items.images.small" width="100px" height="130px">
            </div>

            <div class="content">
              <div class="title">{{items.title}}</div>
              <div class="directors">导演：{{items.directors[0].name}}</div>
              <div class="casts">
                主演：
                <span v-for="(name,i) in items.casts" :key="i">{{name.name}}</span>
              </div>
            </div>


            <div class="buy">已想看</div>
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
        soon: {},
        menuScroll:null
      }
    },
    created(){
      this.$axios.get('/api/soon')
        .then(res => {
          res = res.data
          //console.log(res);
          let result = JSON.parse(res)
          let resultEnd = result.subjects
          this.soon = resultEnd
          console.log(result.subjects);

          this.$nextTick(() => {
            if(!this.menuScroll){
                this.menuScroll = new BScroll(this.$refs.menu, {
                    click:true
                })
            }else{
                this.menuScroll.refresh()
            }
          })
        })
    }
  }
</script>

<style lang="scss" scoped>
  .data {
    height: 35px;
    line-height: 35px;
    padding-left: 15px;
    color: #aaa;
    font-size: 12px;
    background: #e4e4e4;
  }
  .place {
    position: fixed;
    top: 135px;
    bottom: 50px;
    width: 100%;
    display: flex;
    overflow: hidden;
    .loop {
      width: 100%;
      overflow: hidden;
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
            font-size: 16px;
            font-weight: bold;
            letter-spacing: 2px;
            margin-bottom: 20px;
          }
          .directors {
            color: #ccc;
            font-size: 12px;
            margin-bottom: 5px;
            letter-spacing: 2px;
          }
          .casts {
            color: #ccc;
            width: 160px;
            font-size: 12px;
            letter-spacing: 2px;
            line-height: 20px;
          }
        }
        .buy {
          box-sizing: border-box;
          border: 1px solid #530000;
          border-radius: 5px;
          padding: 8px 10px;
          margin-right: 15px;
          color: #3e3e3e;
        }
      }
    }
  }
</style>
