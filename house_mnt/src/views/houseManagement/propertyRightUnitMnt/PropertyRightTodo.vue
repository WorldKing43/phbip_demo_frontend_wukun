<template>
  <div id="property-right-todo">
    <el-form :model="form" size="mini" label-position="right">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="单位名称" label-width="5rem">
            <el-input v-model="form.dwmc" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="统一社会信用代码" label-width="8rem">
            <el-input v-model="form.tyshxydm" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请时间" label-width="5rem">
            <el-date-picker type="date" v-model="form.sqsjq" style="width: 45%" clearable></el-date-picker>至
            <el-date-picker type="date" v-model="form.sqsjz" style="width: 45%" clearable></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="mini" @click="getPropertyRightList(1)">查询</el-button>
          <el-button size="mini" @click="reset()">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="top_box">
      <el-button size="mini" type="primary" @click="addNewUnit()">新增产权单位</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      :header-cell-style="globalHeaderStyle"
      :cell-style="globalCellStyle"
    >
      <el-table-column type="index" label="序号" :index="indexMethod" width="50" :close-on-click-modal="false"></el-table-column>
      <el-table-column label="案件类别" prop="xmmc"></el-table-column>
      <el-table-column label="单位名称" prop="dwmc"></el-table-column>
      <el-table-column label="统一社会信用代码" prop="tyshxydm"></el-table-column>
      <el-table-column label="经办人" prop="jbr"></el-table-column>
      <el-table-column label="申请时间" prop="sqsj"></el-table-column>
      <el-table-column label="申请状态" prop="STATE"></el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handle(scope.row)">办理</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    <!-- 弹框 -->
    <!-- 录入单位信息 -->
    <el-dialog title="录入单位信息" :visible.sync="openFirDialog" width="30%" :close-on-click-modal="false">
      <el-form :model="unitForm" size="mini">
        <el-form-item label="统一社会信用代码" label-width="8rem">
          <el-input v-model="unitForm.code"></el-input>
        </el-form-item>
      </el-form>
      <div align="center">
        <el-button size="mini" type="primary" @click="search()">提取</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="openSecDialog" width="35%">
      <el-form :form="newForm" size="mini" label-width="8rem" label-position="right">
        <el-row :gutter="20">
          <el-form-item label="统一社会信用代码">
            <el-input v-model="newForm.tyshxydm"></el-input>
          </el-form-item>
        </el-row>
        <el-row :gutter="20">
          <el-form-item label="单位名称">
            <el-input v-model="newForm.dwmc"></el-input>
          </el-form-item>
        </el-row>
        <p class="p_class">提示：当前产权单位已存在系统中，请选择是否需要维护该产权单位信息？</p>
        <div align="center">
          <el-button size="mini" @click="openSecDialog = false">取消</el-button>
          <el-button size="mini" type="primary" @click="sureAdd()">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import http from "@/api/propertyRightChange.js";
import api from "@/api/houseApproval";
export default {
  name: "property-right-todo",
  data() {
    return {
      form: {
        dwmc: "",
        tyshxydm: "",
        sqsjq: "",
        sqsjz: ""
      },
      tableData: [],
      //分页数据
      total: 0, //数据总条数
      pageSize: 20, //当前页条数
      currentPage: 1, //当前页
      pageSizesList: [20, 50, 100, 200], //分页下拉框
      openFirDialog: false, //提取单位信息弹框
      unitForm: {
        code: "" //统一社会信用代码
      },
      newForm: {
        code: "", //统一社会信息代码
        unitName: "" //单位名称
      },
      openSecDialog: false, //提示弹框
    };
  },
  methods: {
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    //查询
    search() {
      let params = {
        tyshxydm: this.unitForm.code,
        type: "notPre"
      };
      http
        .getProperRightInfo(params)
        .then(res => {
          this.newForm = res;
          if (this.newForm.tyshxydm != null) {  //维护产权单位
            this.openSecDialog = true;
            this.newForm = res;
          } else {
            this.openSecDialog = false;
            this.openFirDialog = false;
            let tab = {
              route: "/PropertyRightMntTab/" + (this.unitForm.code || "new"),
              name: "单位信息",
              type: "single",
              query: {
                tyshxydm: this.unitForm.code,
                ajlb: "新增产权单位",
                type: "pre",
                state: "new"
              }
            };
            this.openTopTab(tab);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //提取
    extract() {
      this.openSecDialog = true; //打开提示弹框
      this.openFirDialog = false;
    },
    //新增产权单位
    addNewUnit() {
      this.unitForm.code = "";
      this.openFirDialog = true; //打开弹框
    },
    //二次提示
    sureAdd() {
      this.openSecDialog = false;
      this.openFirDialog = false;
      let tab = {
        route: "/PropertyRightMntTab/" + (this.newForm.tyshxydm || "new"),
        name: "单位信息",
        type: "single",
        query: {
          tyshxydm: this.newForm.tyshxydm,
          type: "notPre",
          state: "new1",
          ajlb: "维护产权单位"
        }
      };
      this.openTopTab(tab);
    },
    //领取任务
    openCoach(val) {
      let params = {
        taskId: val.TID
      };
      api
        .openCoach(params)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //办理
    handle(val) {
      this.openCoach(val); //后台打开表单 认领任务
      let state = "todo"; //办理状态
      let tab = {
        route: "/propertyRightMntTab" + "/" + state, //产权单位guid
        name: "产权单位基本信息",
        type: "single",
        query: {
          //另外想传的参数放这里
          tyshxydm: val.tyshxydm,
          type: "pre",
          taskId: val.TID,
          guid: val.guid,
          activityName:val.STATE
        }
      };
      this.openTopTab(tab);
    },

    //当前页条数改变时
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPropertyRightList(1);
    },
    //当前页跳转时
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPropertyRightList();
    },
    //查询
    getPropertyRightList(index) {
      if(index){
        this.currentPage = index;
      }
      let date = this.form;
      this.form.pageIndex = this.currentPage;
      this.form.pageSize = this.pageSize;
      this.form.state = 0;
      let params = this.form;
      http
        .getPropertyRightList(params, date)
        .then(res => {
          this.tableData = res.content;
          this.total = res.totalElements;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //重置
    reset() {
      this.form = {
        dwmc: "",
        tyshxydm: "",
        sqsjq: "",
        sqsjz: "" 
      }
    }
  },
  mounted() {
    this.getPropertyRightList();
    //待办箱刷新广播接收事件
    this.Event.$on("PropertyRightTodo", data => {
      if (data == "getPropertyRightList") {
          this.getPropertyRightList()
        };
    });
  }
};
</script>
<style lang="scss" scoped>
.top_box {
  margin-bottom: 10px;
};
.p_class{
  margin-bottom: 10px;
   color: red;
}
</style>