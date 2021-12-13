<!-- 房源专题地图* -->

<template>
  <div class="MapInfo">
    <!--v-bind:src="projectMapUrl"-->
    <iframe id="iframeMap" v-bind:src="houseMapUrl"
            style="width:100%;" :style="{height: height}"
            class="mapIframe" ref="mapIframe"></iframe>
  </div>
</template>

<script>
  import api from "@/api/common"

  export default{
    name:"mapInfo",
    data(){
      return {
        houseMapUrl:"",//默认嵌套测试环境的房源专题图
        height:''
      }
    },
    created(){
    },
    methods:{
      //获取浏览器当前高度
      getHeight(){
        this.height = (document.body.clientHeight || document.documentElement.clientHeight)- 164 +'px';
      },
      getHouseMapUrl(){
        let params = {};
        let url = "http://172.19.34.135:8081/#/constructionMap";//郭老师开发调试地址
				// this.houseMapUrl="http://192.168.2.198:8080/#/constructionMap";
        api.getHouseMapUrl(params).then(res=>{
          this.houseMapUrl = res; //考虑做隐藏，接口调用会显示在控制台，暴露了地址
        })
      },

    },
    mounted(){
        console.log(this.$router.currentRoute.query.houseGuid)
        // console.log(this.$parent)
      //初始获取iframe嵌套地址
      this.getHouseMapUrl();
      //跨域通信，参数设定（iframe+postMessage）。todo：参数从其他界面传过来，目前暂时是固定数据
      let params = {
        type:"house",//房源管理的类型，必须跟地图应用同步
        XQBZ: this.$router.currentRoute.query.houseGuid //目前写死的   //this.$router.currentRoute.query.houseGuid,
      };
      let mapFrame = this.$refs['mapIframe'];
      mapFrame.onload = function(){
        let iframeWin = mapFrame.contentWindow;
        iframeWin.postMessage(params,'*')
      };
      //获取浏览器高度进行界面调整
      this.getHeight();
      window.onresize=()=>{
        this.getHeight();
      };
    }

  }
</script>
<style scoped lang="scss">
  .MapInfo{
  }
</style>
