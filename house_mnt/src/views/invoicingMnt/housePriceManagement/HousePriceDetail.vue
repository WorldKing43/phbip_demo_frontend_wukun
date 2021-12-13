<!--
 * @Author: maxq
 * @Date: 2020-07-13 10:46:10
 * @LastEditTime: 2020-07-13 17:53:55
 * @LastEditors: Please set LastEditors
 * @Description: 房屋价格管理-详情
 * @FilePath: \frontend\house-mnt\src\views\invoicingMnt\housePriceManagement\HousePriceDetail.vue
-->
<template>
  <div id="house-price-detail">
    <title-stylex title="基本信息"></title-stylex>
    <table>
      <tr>
        <td>小区号</td>
        <td>{{houseInfo.districtCode}}</td>
        <td>小区名称</td>
        <td>{{houseInfo.districtName}}</td>
        <td>栋名称</td>
        <td>{{houseInfo.buildName}}</td>
      </tr>
      <tr>
        <td>房号</td>
        <td>{{houseInfo.houseNo}}</td>
        <td>建筑面积</td>
        <td>{{houseInfo.coveredArea}}</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>基准租金</td>
        <td>{{houseInfo.jzzj}}</td>
        <td>起调日期</td>
        <td>{{formatDate(houseInfo.jizqdsj)}}</td>
        <td>截止日期</td>
        <td>{{formatDate(houseInfo.jizjzsj)}}</td>
      </tr>
      <tr>
        <td>公租房租金单价</td>
        <td>{{houseInfo.bzfzj}}</td>
        <td>起调日期</td>
        <td>{{formatDate(houseInfo.gongzfqdsj)}}</td>
        <td>截止日期</td>
        <td>{{formatDate(houseInfo.gongzfjzsj)}}</td>
      </tr>
      <tr>
        <td>人才房租金单价</td>
        <td>{{houseInfo.rczj}}</td>
        <td>起调日期</td>
        <td>{{formatDate(houseInfo.rencfqdsj)}}</td>
        <td>截止日期</td>
        <td>{{formatDate(houseInfo.rencfjzsj)}}</td>
      </tr>
      <tr>
        <td>低收入租金单价</td>
        <td>{{houseInfo.disrzj}}</td>
        <td>起调日期</td>
        <td>{{formatDate(houseInfo.disrqdsj)}}</td>
        <td>截止日期</td>
        <td>{{formatDate(houseInfo.disrjzsj)}}</td>
      </tr>
      <tr>
        <td>社会微利价</td>
        <td>{{houseInfo.shehwlj}}</td>
        <td>起调日期</td>
        <td>{{formatDate(houseInfo.shehwlqdsj)}}</td>
        <td>截止日期</td>
        <td>{{formatDate(houseInfo.shehwljzsj)}}</td>
      </tr>
      <tr>
        <td>全成本单价</td>
        <td>{{houseInfo.quancbjg}}</td>
        <td>起调日期</td>
        <td>{{formatDate(houseInfo.quancbqdsj)}}</td>
        <td>截止日期</td>
        <td>{{formatDate(houseInfo.quancbjzsj)}}</td>
      </tr>
      <tr>
        <td>租赁中心价</td>
        <td>{{houseInfo.zulzxj}}</td>
        <td>起调日期</td>
        <td>{{formatDate(houseInfo.zulzxqdsj)}}</td>
        <td>截止日期</td>
        <td>{{formatDate(houseInfo.zulzxjzsj)}}</td>
      </tr>
    </table>
    <title-stylex title="修改记录"></title-stylex>
    <el-table
      :data="tableData"
      :cell-style="globalCellStyle"
      :header-cell-style="globalHeaderStyle"
      :span-method="tableSpanMethod"
      border
    >
      <el-table-column prop="index" label="序号" class="aa"></el-table-column>
      <el-table-column prop="czr" label="修改人" class="aa"></el-table-column>
      <el-table-column prop="dwmc" label="修改人单位" class="aa"></el-table-column>
      <el-table-column prop="changeItem" label="修改因素"></el-table-column>
      <el-table-column prop="changeBefore" label="修改值(前)"></el-table-column>
      <el-table-column prop="changeAfter" label="修改值(后)"></el-table-column>
      <el-table-column label="操作" class="aa">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="view(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page_box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizesList"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        align="right"
        background
      ></el-pagination>
    </div>
    <!-- 详情弹框 -->
    <el-dialog title="详情信息" :visible.sync="openDialog" v-if="openDialog">
      <title-stylex title="房屋价格（前）"></title-stylex>
      <table class="open_table">
        <tr>
          <td>小区号</td>
          <td>{{changeBeforeInfo.districtCode}}</td>
          <td>小区名称</td>
          <td>{{changeBeforeInfo.districtName}}</td>
          <td>栋名称</td>
          <td>{{changeBeforeInfo.buildName}}</td>
        </tr>
        <tr>
          <td>房号</td>
          <td>{{changeBeforeInfo.houseNo}}</td>
          <td>建筑面积</td>
          <td>{{changeBeforeInfo.coveredArea}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>基准租金</td>
          <td>{{changeBeforeInfo.jzzj}}</td>
          <td>起调日期</td>
          <td>{{formatDate(changeBeforeInfo.jizqdsj)}}</td>
          <td>截止日期</td>
          <td>{{formatDate(changeBeforeInfo.jizjzsj)}}</td>
        </tr>
        <tr>
          <td>公租房租金单价</td>
          <td>{{changeBeforeInfo.bzfzj}}</td>
          <td>起调日期</td>
          <td>{{formatDate(changeBeforeInfo.gongzfqdsj)}}</td>
          <td>截止日期</td>
          <td>{{formatDate(changeBeforeInfo.gongzfjzsj)}}</td>
        </tr>
        <tr>
          <td>人才房租金单价</td>
          <td>{{changeBeforeInfo.rczj}}</td>
          <td>起调日期</td>
          <td>{{formatDate(changeBeforeInfo.rencfqdsj)}}</td>
          <td>截止日期</td>
          <td>{{formatDate(changeBeforeInfo.rencfjzsj)}}</td>
        </tr>
        <tr>
          <td>低收入租金单价</td>
          <td>{{changeBeforeInfo.disrzj}}</td>
          <td>起调日期</td>
          <td>{{formatDate(changeBeforeInfo.disrqdsj)}}</td>
          <td>截止日期</td>
          <td>{{formatDate(changeBeforeInfo.disrjzsj)}}</td>
        </tr>
        <tr>
          <td>社会微利价</td>
          <td>{{changeBeforeInfo.shehwlj}}</td>
          <td>起调日期</td>
          <td>{{formatDate(changeBeforeInfo.shehwlqdsj)}}</td>
          <td>截止日期</td>
          <td>{{formatDate(changeBeforeInfo.shehwljzsj)}}</td>
        </tr>
        <tr>
          <td>全成本单价</td>
          <td>{{changeBeforeInfo.quancbjg}}</td>
          <td>起调日期</td>
          <td>{{formatDate(changeBeforeInfo.quancbqdsj)}}</td>
          <td>截止日期</td>
          <td>{{formatDate(changeBeforeInfo.quancbjzsj)}}</td>
        </tr>
        <tr>
          <td>租赁中心价</td>
          <td>{{changeBeforeInfo.zulzxj}}</td>
          <td>起调日期</td>
          <td>{{formatDate(changeBeforeInfo.zulzxqdsj)}}</td>
          <td>截止日期</td>
          <td>{{formatDate(changeBeforeInfo.zulzxjzsj)}}</td>
        </tr>
      </table>
      <title-stylex title="房屋价格（后）"></title-stylex>
      <table class="open_table">
        <tr>
          <td>小区号</td>
          <td>{{changeAfterInfo.districtCode}}</td>
          <td>小区名称</td>
          <td>{{changeAfterInfo.districtName}}</td>
          <td>栋名称</td>
          <td>{{changeAfterInfo.buildName}}</td>
        </tr>
        <tr>
          <td>房号</td>
          <td>{{changeAfterInfo.houseNo}}</td>
          <td>建筑面积</td>
          <td>{{changeAfterInfo.coveredArea}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>基准租金</td>
          <td>{{changeAfterInfo.jzzj}}</td>
          <td>起调日期</td>
          <td>{{formatDate(changeAfterInfo.jizqdsj)}}</td>
          <td>截止日期</td>
          <td>{{formatDate(changeAfterInfo.jizjzsj)}}</td>
        </tr>
        <tr>
          <td>公租房租金单价</td>
          <td>{{changeAfterInfo.bzfzj}}</td>
          <td>起调日期</td>
          <td>{{formatDate(changeAfterInfo.gongzfqdsj)}}</td>
          <td>截止日期</td>
          <td>{{formatDate(changeAfterInfo.gongzfjzsj)}}</td>
        </tr>
        <tr>
          <td>人才房租金单价</td>
          <td>{{changeAfterInfo.rczj}}</td>
          <td>起调日期</td>
          <td>{{formatDate(changeAfterInfo.rencfqdsj)}}</td>
          <td>截止日期</td>
          <td>{{formatDate(changeAfterInfo.rencfjzsj)}}</td>
        </tr>
        <tr>
          <td>低收入租金单价</td>
          <td>{{changeAfterInfo.disrzj}}</td>
          <td>起调日期</td>
          <td>{{formatDate(changeAfterInfo.disrqdsj)}}</td>
          <td>截止日期</td>
          <td>{{formatDate(changeAfterInfo.disrjzsj)}}</td>
        </tr>
        <tr>
          <td>社会微利价</td>
          <td>{{changeAfterInfo.shehwlj}}</td>
          <td>起调日期</td>
          <td>{{formatDate(changeAfterInfo.shehwlqdsj)}}</td>
          <td>截止日期</td>
          <td>{{formatDate(changeAfterInfo.shehwljzsj)}}</td>
        </tr>
        <tr>
          <td>全成本单价</td>
          <td>{{changeAfterInfo.quancbjg}}</td>
          <td>起调日期</td>
          <td>{{formatDate(changeAfterInfo.quancbqdsj)}}</td>
          <td>截止日期</td>
          <td>{{formatDate(changeAfterInfo.quancbjzsj)}}</td>
        </tr>
        <tr>
          <td>租赁中心价</td>
          <td>{{changeAfterInfo.zulzxj}}</td>
          <td>起调日期</td>
          <td>{{formatDate(changeAfterInfo.zulzxqdsj)}}</td>
          <td>截止日期</td>
          <td>{{formatDate(changeAfterInfo.zulzxjzsj)}}</td>
        </tr>
      </table>
      <div class="dialog-foot">
        <el-button size="mini" type="primary" @click="openDialog = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import TitleStylex from "@/components/TitleStylex";
  import http from "@/api/interface.js";
  import {formatDate} from "../../../components/js/date";
  export default {
    name: 'housePriceDetail',
    components: {
      TitleStylex,
    },
    data() {
      return {
        tableData: [], //表格数据
        //分页数据
        total: 0,
        pageSize: 20,
        currentPage: 1,
        pageSizesList: [20, 50, 100, 200],
        openDialog: false, //控制详情弹框显隐
        houseGuid: '',//房屋标识
        houseInfo: {},
        changeBeforeInfo: {},
        changeAfterInfo: {},
      }
    },
    methods: {
      formatDate(time) {
        if (time){
          return time.split(" ")[0];
        }else {
          return ""
        }
      },
      //查询
      search() {
        let params = {
          // pageIndex: 1,
          // pageSize: 10
          houseGuid: this.houseGuid
        };
        //let data = {houseGuid: this.houseGuid};
        http.importLogInfo(params).then(res =>{
          this.houseInfo = res[0]
        }).catch(err => {
          console.log(err)
        })
      },
      //导入记录
      importLog() {
        let params = {
          pageIndex: this.currentPage,
          pageSize: this.pageSize,
          houseGuid: this.houseGuid
        };
        http.importLog(params).then(res =>{
          this.tableData = res.content;
          let index = 0;
          let last = undefined;
          this.tableData.forEach(item=>{
            item.count =0 ;
            if (last && item.changeDate === last.changeDate && item.czr === last.czr){
              last.count ++;
            }else {
              index++;
              item.index = index;
              if (last){
                last.count ++
              }
              last = item
            }
          });
          last.count++;
          last = undefined

          this.total = res.totalElements
        }).catch(err => {
          console.log(err)
        })
      },

      tableSpanMethod({row,column,rowIndex,columnIndex}){
        if ([0, 1, 2, 6].includes(columnIndex)){
          let data = this.tableData[rowIndex]
          if (data.count > 0) {
            return{
              rowspan:data.count,
              colspan:1,
            }
          }else {
            return {
              rowspan:0,
              colspan:0,
            }
          }
        }
      },
      //详情
      view(val) {
        this.openDialog = true; //打开页面详情
        let params = {
          houseGuid: val.houseGuid
        };
        http.importLogInfo(params).then(res => {
          this.changeAfterInfo = res[0];
          this.changeBeforeInfo = res[1];
        }).catch(err =>{
          console.log(err)
        })
      },
      //当前页条数改变时
      handleSizeChange(val) {
        this.pageSize = val;
        this.search();
      },
      //当前页跳转时
      handleCurrentChange(val) {
        this.currentPage = val;
        this.search();
      }
    },
    mounted() {
      this.houseGuid = this.$parent.params.houseGuid; //房屋标识
      this.search(); //查询房屋基本信息
      this.importLog();//导入记录
    },
  }
</script>
<style lang="scss" scoped>
  #house-price-detail{
    padding-left: 15px;
    table {
      width: 100%;
      margin: 20px auto;
      border: 1px solid #dde5f9;
      border-collapse: collapse;
      text-align: center;
      tr {
        border: 1px solid #dde5f9;
      }
      td {
        border: 1px solid #dde5f9;
        font-size: 16px;
        height: 2rem;
        width: 8rem;
        line-height: 2rem;
        color: #666;
      }
      td:nth-child(odd) {
        width: 10%;
        background: aliceblue;
        color: #4b4b4b;
      }
    }
    .open_table{
      td:nth-child(odd) {
        width: 14%;
      }
      td:nth-child(even) {
        padding-left:10px;
        text-align: left;
      }
    }

    /deep/
    .el-table__row {
      td{
        background-color:white !important;
      }
    }
  }

</style>
