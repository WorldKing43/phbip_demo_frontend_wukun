<!--批次管理-->
<template>
  <div class="newReport">
    <!--头部-->
    <div class="top">
      <div class="left">
        <el-button type="primary" size="medium" @click="uploadFile=true">上传文件</el-button>
        <el-dialog  title="上传文件"  :visible.sync="uploadFile"  :close-on-click-modal="false"  width="30%">
          <div class="fileCon">
            <div class="file-border">
              <div v-if="file.name">
                <el-tag
                  :key="file.name"
                  closable
                  @close="handleClose(file)">
                  {{file.name}}
                </el-tag>
              </div>
            </div>
            <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :show-file-list="false"
            :auto-upload="false">
              <el-button size="small" type="primary" style="margin-left:20px">选择文件</el-button>
            </el-upload>
          </div>
          <div slot="footer" class="dialog-footer center">
            <el-button type="primary" @click="upload()">确 定</el-button>
            <el-button @click="uploadFile = false">取 消</el-button>
          </div>
        </el-dialog>
        <el-button type="primary" size="medium" @click="report=true">上报</el-button>
        <el-dialog title="上报"  :visible.sync="report"  :close-on-click-modal="false"  width="30%">
          <span>确定提交本次房源上报批次?</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit()">确 定</el-button>
            <el-button @click="report = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <!--基本信息-->
    <div class="basicTable">
      <div class="content"><!--加载内容-->
        <div class="border-bottom"  v-if="isShow"><!--判断是否显示-->
          <div class="trapezoid"><!--绑定标签名-->
            <div>{{titleName}}<i class="el-icon-error" @click="removeTab"></i></div>
          </div>
        </div>
        <div class="con" v-if="isShow"><!--判断是否显示-->
          <div class="padding-10">
            <!--子内容页面-->
            <!-- <router-view></router-view> -->
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive">
                    <!-- 这里是会被缓存的视图组件，比如 Home！ -->
                </router-view>
            </keep-alive>

            <router-view v-if="!$route.meta.keepAlive">
                <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
            </router-view>
          </div>
        </div>
      </div>
      <div class="siderbar"  @click="openTab"><!--侧边栏-->
        <SliderRight></SliderRight>
      </div>
    </div>
  </div>
</template>

<script>
  import SliderRight from '@/components/SliderRight'
  // import checkLog from './CheckLog'
  // import ReturnToHousePlan from './ReturnToHousePlan'

  export default {
    name: "newplan",
    components:{
      SliderRight,
    },
    data(){
      return {
        isShow:true,
        titleName:'',
        toview:false,
        uploadFile:false,
        report:false,
        file:[],
      }
    },
    methods:{
      //获取文件
      handleChange(file){
        this.file = file
      },
      //清空文件
      handleClose() {
        this.file=''
      },
      //上传文件
      upload(){
        this.uploadFile=false
      },
      //上报
      submit(){
        this.report=false
      },
      removeTab() {
        this.isShow=false
      },
      openTab(){
        this.isShow=true
      },
    },
    created(){
      this.$store.commit('showMenu',this.$route.path)
    },
    mounted(){
      this.titleName = this.$store.state.sliderCon.routerActive
    },
    //  watch:{
    //   '$route'(newVal, oldVal){
    //     this.titleName = this.$store.state.sliderCon.routerActive
    //   }
    // }
  }
</script>

<style  lang="scss"  scoped>
  .newReport{
    .top{
      padding: 5px 0 20px 0;/* 更改头部按钮高度 */
      display: flex;
      justify-content: space-between;
      & /deep/ .el-dialog__header {
        background: #057FF8;
      }
      & /deep/ .el-dialog__title {
        color: #fff;
      }
      & /deep/ .el-dialog__headerbtn .el-dialog__close {
        color: #fff;
      }
      .left{
        .fileCon{
          display: flex;
          justify-content: center;
          .file-border{
            width: 200px;
            height: 35px;
            border: 1px solid #E0E2E8;
            border-radius: 5px;
          }
        }
        .center{
          text-align: center
        }
      }
    }

    .basicTable{
      display: flex;
      justify-content: space-between;
      width: 100%;
      .content{
        width: 85%;
        margin-right: 20px;
        .border-bottom{
          border-bottom: 1px solid #ccc;
          height: 30px;
          .trapezoid{/*设置梯形*/
            position: relative;
            display: inline-block;
            color: #59A3F6;
            padding: 5px 40px 5px 20px;
            z-index: 1;
            border-bottom: 1px solid #fff;
            border-left: 1px solid #ccc;;
            .el-icon-error{
              color: red;
              margin-left: 10px;
            }
          }
          .trapezoid::before{/*设置梯形*/
            content: ''; /*用伪元素来生成一个矩形*/
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: -1;
            border-right: 1px solid #ccc;
            transform: scaleY(1.3) perspective(.5em) rotateX(3deg);
            transform-origin: bottom left;
            border-top: 3px solid #2386F2;
            background: #fff;
          }
        }
        .con{
          background: #fff;
          border: 1px solid #ccc;
          border-top:none;
          height: 100%;
          .padding-10{
            padding:5px;
          }
        }
      }
      .siderbar{
        // margin-top: 30px;
        .sider-top{
          height: 40px;
          background: #2386F2;
          color: #fff;
          font-size: 1.2em;
          line-height: 40px;
          padding-left: 20px;
        }
      }
    }
    & /deep/ .el-dialog__header{
      padding: 10px 20px 10px 20px;
      background: #0B7EF7;
    }
    & /deep/ .el-dialog__headerbtn{
      top: 15px;
    }
    & /deep/ .el-dialog__title{
      color: #fff;
    }
    & /deep/ .el-dialog__headerbtn .el-dialog__close{
      color: #fff;
    }
    & /deep/ .el-dialog__body{
      padding: 20px;
    }
  }
</style>
