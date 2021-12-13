
<template>
  <div class="content">
    <div class="top">
      <el-form ref="form" label-width="3rem" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="小区" prop="name">
              <el-input v-model="districtName" clearable @change="query"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="栋号" prop="people">
              <el-input v-model="buildName" clearable @change="query"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="房号" prop="people">
              <el-input v-model="houseNo" clearable @change="query"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="户型" prop="state">
              <el-select v-model="type" placeholder class="w100" clearable @change="query">
                <el-option
                  v-for="(item,index) in apartment"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label label-width="0" class="display">
              <el-button type="primary" @click="query" size="mini">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        border
        size="mini"
        class="w100"
        @selection-change="chooseHousing"
        :header-cell-style="{
        'background': '#E6F0FC',
        'color': '#606266',
        'text-align':'center',
        'border-color': '#DBDBDB',
        }"
        :cell-style="{
        'text-align':'center',
        'border-color': '#DBDBDB',
        }"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="districtName" label="小区" width></el-table-column>
        <el-table-column prop="buildName" label="栋号" width></el-table-column>
        <el-table-column prop="houseNo" label="房号" width></el-table-column>
        <el-table-column prop="typeName" label="户型" width></el-table-column>
        <el-table-column prop="coveredArea" label="面积(平方米)" width></el-table-column>
        <el-table-column prop="stateName" label="房源状态" width></el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <div class="page_box">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizesList"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalDataNumber"
          background
        ></el-pagination>
      </div>
    </div>
    <div style="text-align:center;margin-top:20px">
      <el-button @click="cancel" size="mini">取消</el-button>
      <el-button type="primary" @click="submit" size="mini">确定</el-button>
    </div>
  </div>
</template>

<script>
import http from "./newplan/serve.js";
export default {
  name: "recyclingroom",
  data() {
    return {
      buildName: "", //栋名称
      districtName: "", //小区名称
      houseNo: "", //房号
      type: "", //户型
      tableData: [],
      apartment: [], //户型
      guidarr: "",
      //分页需要的数据
      currentPage: 1,
      pageSize: 10,
      pageSizesList: [10, 20, 50, 100],
      totalDataNumber: 0 //数据的总数
    };
  },
  methods: {
    //分页大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.query();
    },
    // 页码改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.query();
    },
    // 确定提交
    submit() {
      let params = { planGuid: this.$route.params.guid };
      let data = this.guidarr;
      if (data == "") {
        this.$message({ message: "请选择房源", type: "warning" });
      } else {
        this.$confirm('确认回收至房源库?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(res => {
          http
            .getRecyclingHome(params, data)
            .then(res => {
              this.$emit("recyclEmit");
              this.$message({ message: "提交成功", type: "success" });
              this.$emit("closed");
            })
            .catch(err => {
              this.$message.error("提交失败");
              console.log(err);
            });
        }).catch(err => {
          this.$message({type: 'info', message: '已取消操作'})
        })
      }
    },
    // 取消
    cancel() {
      this.$message("已取消");
      this.$emit("closed");
    },
    chooseHousing(row) {
      let guidarr = [];
      for (let i = 0; i < row.length; i++) {
        guidarr.push(row[i].guid);
      }
      this.guidarr = guidarr;
    },
    // 查询
    query() {
      // this.tableData = []
      let params = {
        planGuid: this.$route.params.guid,
        buildName: this.buildName,
        districtName: this.districtName,
        houseNo: this.houseNo,
        type: this.type,
        pageSize: this.pageSize,
        pageIndex: this.currentPage
      };
      http
        .getRecyclingRoom(params)
        .then(res => {
          this.tableData = res.content;
          this.totalDataNumber = res.totalElements;
          console.log(this.tableData);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 字典查询
    dictionaryQuery() {
      let params = { names: "户型" };
      http
        .getFiledList(params)
        .then(res => {
          res = JSON.parse(res);
          this.apartment = res.户型;
        })
        .catch(err => {
          console.log(err);
        });
    },
    returnedHousingQuery() {
      //退回至房源计划所有房源查询
      let params = { planGuid: this.$route.params.guid };
      http
        .getRecyclingRoom(params)
        .then(res => {
          this.tableData = res;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    console.log("===", this.$route);
    this.dictionaryQuery();
    this.query();
  },
  created() {
    this.$root.eventHub.$on("backToStore", () => {
      this.query();
    });
  },
  beforeDestroy() {
    this.$root.eventHub.$off("backToStore");
  }
};
</script>

<style lang="scss" scoped>
.content {
  .display {
    display: flex;
    justify-content: flex-end;
  }
  .top {
    .el-form-item {
      margin-bottom: 10px;
    }
  }
  .margin-top-bottom {
    margin-top: 30px;
    margin-bottom: 10px;
  }
}
</style>