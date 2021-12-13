<!--
 * @Author: maxq
 * @Date: 2020-07-13 09:56:10
 * @LastEditTime: 2020-07-13 17:09:25
 * @LastEditors: Please set LastEditors
 * @Description: 房屋计价管理
 * @FilePath: \frontend\house-mnt\src\views\invoicingMnt\housePriceManagement\housePrice.vue
-->
<template>
  <div id="house-price" class="page-detail">
    <div class="content">
      <div class="el-tabs__content">
        <el-form :model="form" size="mini" label-width="3rem">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="小区">
                <el-input v-model="form.districtName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="栋号">
                <el-input v-model="form.bulidNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="栋名称" label-width="4rem">
                <el-input v-model="form.buildName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="房号">
                <el-input v-model="form.houseNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button size="mini" type="primary" @click="search()">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
        <div style="margin-bottom:10px;">
          <el-button size="mini" type="primary" @click="downloadTemplate">下载模板</el-button>
          <el-upload
            :http-request="uploadFile"
            action
            :show-file-list="false"
            accept=".xls, .xlsx"
            style="display:inline-block;margin-left:10px;"
          >
            <el-button
              size="mini"
              type="primary"
            >导入价格</el-button
            >
          </el-upload>
        </div>
        <el-table
          :data="tableData"
          :cell-style="globalCellStyle"
          :header-cell-style="globalHeaderStyle"
          border>
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column prop="districtCode" label="小区号"></el-table-column>
          <el-table-column prop="districtName" label="小区名称"></el-table-column>
          <el-table-column prop="buildName" label="栋名称"></el-table-column>
          <el-table-column prop="houseNo" label="房号"></el-table-column>
          <el-table-column prop="jzzj" label="基准租金"></el-table-column>
          <el-table-column prop="rczj" label="人才房租金单价"></el-table-column>
          <el-table-column prop="bzfzj" label="公租房租金单价"></el-table-column>
          <el-table-column prop="dsrzj" label="低收入租金单价"></el-table-column>
          <el-table-column prop="shwlj" label="社会微利价"></el-table-column>
          <el-table-column prop="zlzxj" label="租赁中心价"></el-table-column>
          <el-table-column prop="sczdj" label="市场指导价"></el-table-column>
          <el-table-column prop="qcbjg" label="全成本价格"></el-table-column>
          <el-table-column width="200" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="view(scope.row)">查看</el-button>
              <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
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
        <!--编辑的弹框-->
        <div id="house-price-edit">
          <el-dialog title="编辑" :visible.sync="openDialog" v-if="openDialog">
            <title-stylex title="房屋价格"></title-stylex>
            <table class="open_table">
              <tr>
                <td>小区号</td>
                <td> <el-input v-model="houseInfo.districtCode"></el-input></td>
                <td>小区名称</td>
                <td> <el-input v-model="houseInfo.districtName"></el-input></td>
              </tr>
              <tr>
                <td>栋名称</td>
                <td> <el-input v-model="houseInfo.buildName"></el-input></td>
                <td>房号</td>
                <td> <el-input v-model="houseInfo.houseNo"></el-input></td>
              </tr>
              <tr>
                <td>建筑面积</td>
                <td> <el-input v-model="houseInfo.coveredArea"></el-input></td>
                <td>基准租金</td>
                <td> <el-input v-model="houseInfo.jzzj"></el-input></td>
              </tr>
              <tr>
                <td>人才房租金单价</td>
                <td> <el-input v-model="houseInfo.rczj"></el-input></td>
                <td>公租房租金单价</td>
                <td> <el-input v-model="houseInfo.bzfzj"></el-input></td>
              </tr>
              <tr>
                <td>低收入单套租金</td>
                <td> <el-input v-model="houseInfo.disrzj"></el-input></td>
                <td>社会微利价</td>
                <td> <el-input v-model="houseInfo.shehwlj"></el-input></td>
              </tr>
              <tr>
                <td>租赁中心价</td>
                <td> <el-input v-model="houseInfo.zulzxj"></el-input></td>
                <td>市场指导价</td>
                <td> <el-input v-model="houseInfo.shiczdj"></el-input></td>
              </tr>
            </table>
            <div class="dialog-foot">
              <el-button size="mini" type="primary" @click="openDialog = false">取消</el-button>
              <el-button size="mini" type="primary" @click="save()">确定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import http from "@/api/interface.js";
  import TitleStylex from "@/components/TitleStylex";
  import {formatDate} from "../../../components/js/date";
  export default{
    name: 'housePrice',
    components: {
      TitleStylex,
    },
    data() {
      return {
        form: {
          districtName: '',
          bulidNo: '',
          buildName: '',
          houseNo: ''
        },
        openDialog:false, //控制弹框
        houseInfo:{},
        tableData: [],
        //分页数据
        total: 0,
        pageSize: 20,
        currentPage: 1,
        pageSizesList: [20, 50, 100, 200],
        unitGuid:"",
      }
    },
    filter:{
      formatDate(time) {
        return formatDate(time, 'yyyy-MM-dd')
      }
    },
    methods:{
      //查询
      search() {
        let params = {
          pageIndex: this.currentPage,
          pageSize: this.pageSize
        };
        let data = this.form;
        http.getPriceList(params, data).then(res =>{
          this.tableData = res.content;
          this.total = res.totalElements
        }).catch(err => {
          console.log(err)
        })
      },
      //下载模板
      downloadTemplate() {
        let url = process.env.API + "/price/management/template/download?unitGuid="+this.tableData.fpq+"&districtName="+ this.form.districtName+"&bulidNo="+this.form.bulidNo+"&buildName="+ this.form.buildName+"&houseNo="+this.form.houseNo;
        var elemIF = document.createElement("iframe");
        elemIF.src = url;
        elemIF.style.display = "none";
        elemIF.onload = function() {
          setTimeout(function() {
            elemIF.remove();
          }, 2000);
        };
        document.body.appendChild(elemIF);
      },
      uploadFile(context) {
        //启动loading加载框
        const loading = this.$loading({
          lock: true,
          text: "正在导入",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        let params = {};
        let data = new FormData();
        data.append("file", context.file);
        http.importPrice(params, data).then(res => {
          this.$alert(res, "提示");
          this.search();
          loading.close(); //关闭加载
        }).catch(err => {
          console.log(err);
          loading.close(); //关闭加载
        });
      },
      //编辑
      edit(val){
        this.openDialog = true;
        this.houseInfo = val;
      },
      //确定
      save(){
        this.$confirm("此操作将进行保存, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let params = {};
            let data = this.houseInfo;
            http
              .updateHouseInfo(params,data)
              .then(res => {
                this.$message({
                  type: "success",
                  message: "操作成功!"
                });
                this.openDialog = false;
              })
              .catch(err => {
                console.log(err);
              });
          }).catch(err =>{
          console.log(err);
        })
      },
      //查看
      view(val) {
        let tab = {
          name: val.houseNo,
          path: "/housePriceTab/" + val.houseGuid || '',
        };
        this.openTopTab(tab);
      },
      //当前页条数改变时
      handleSizeChange(val) {
        this.pageSize = val;
        this.search(1);
      },
      //当前页跳转时
      handleCurrentChange(val) {
        this.currentPage = val;
        this.search();
      }
    },
    mounted() {
      this.search();
    }
  }
</script>

<style lang="scss" scoped>
  #house-price {
    overflow-x: hidden;
    overflow-y: auto;

    #house-price-edit{
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
    }
  }

  #house-price-edit>>>.el-input__inner {
    border: 0;
  }
</style>
