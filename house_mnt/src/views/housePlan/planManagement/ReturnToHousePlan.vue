<!---退回至房源计划按钮弹出框界面 -->
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
    </div>
    <div style="text-align:center;margin-top:20px">
      <el-button @click="cancel" size="mini">取消</el-button>
      <el-button type="primary" @click="save" size="mini">确定</el-button>
    </div>
  </div>
</template>

<script>
import http from "./newplan/serve.js";

export default {
  name: "returnedHousingSourcePlan",
  data() {
    return {
      buildName: "", //栋名称
      districtName: "", //小区名称
      houseNo: "", //房号
      type: "", //户型
      tableData: [],
      guidarr: "", //选择房屋
      apartment: [] //户型
    };
  },
  methods: {
    query() {
      //查询
      this.tableData = [];
      let params = {
        planGuid: this.$route.params.guid,
        buildName: this.buildName,
        districtName: this.districtName,
        houseNo: this.houseNo,
        type: this.type
      };
      http
        .getReturnedHousingQuery(params)
        .then(res => {
          this.tableData = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    save() {
      //确定提交
      let params = {
        planGuid: this.$route.params.guid,
      };
      let data = this.guidarr;
      if (data == "") {
        this.$message({ message: "请选择房源", type: "warning" });
      } else {
        this.$confirm("是否确定退回至房源计划?", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(res => {
          http
            .getReturnHousing(params, data)
            .then(res => {
              console.log(res);
              this.$emit("returnEmit"); //触发父级，从而刷新数据
              this.$message({ message: "提交成功", type: "success" });
              this.$emit("closed");
            })
            .catch(err => {
              this.$message({ message: "提交失败", type: "info" });
              console.log(err);
            });
        }).catch(err =>{
          this.$message({ type: 'info', message: '已取消操作'});    
        })
      }
    },
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
    dictionaryQuery() {
      //字典查询
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
      console.log(params);
      http
        .getReturnedHousingQuery(params)
        .then(res => {
          console.log(res);
          this.tableData = res;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.$root.eventHub.$on("backToPlan", () => {
      this.returnedHousingQuery();
    });
  },
  beforeDestroy() {
    this.$root.eventHub.$off("backToPlan");
  },
  mounted() {
    this.dictionaryQuery();
    this.returnedHousingQuery();
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