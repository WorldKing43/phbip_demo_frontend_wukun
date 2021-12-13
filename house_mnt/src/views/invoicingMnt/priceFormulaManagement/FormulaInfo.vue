<!--
 * @Description:计价公式管理-公式信息
 * @Version: 1.0
 * @Autor: maxq
 * @Date: 2019-11-22 10: 40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 
-->
<template>
  <div id="formula-info">
    <title-stylex :title="firstTitle"></title-stylex>
    <div class="btnStyle">
      <el-button type="primary" size="mini" @click="save()">保存</el-button>
    </div>
    <el-form ref="form" :model="form" size="mini" label-width="7rem">
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="公式代码" label-width="6rem">
            <el-input v-model="form.formulaCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-form-item label="公式名称" label-width="6rem">
            <el-input v-model="form.formulaName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="公式类别" prop="name" label-width="6rem">
            <el-select v-model="form.type" class="w100" clearable>
              <el-option
                v-for="(item,index) in FormulaType"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-form-item label="创建人" prop="distributeType" label-width="6rem">
            <el-input v-model="form.createrName" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="创建单位" label-width="6rem">
            <el-input v-model="form.createUnitName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-form-item label="创建时间" label-width="6rem">
            <el-date-picker
              style="width: 100%"
              v-model="form.createTime"
              type="date"
              label-width="6rem"
              disabled
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="box_new">
      <title-stylex :title="secondTitle"></title-stylex>
      <div class="btn_new">
        <el-button type="primary" size="mini" @click="add()">新增</el-button>
      </div>
      <el-table
        :data="tableData"
        :cell-style="globalCellStyle"
        :header-cell-style="globalHeaderStyle"
        border
      >
        <el-table-column prop="serialNo" label="序号"></el-table-column>
        <el-table-column prop="formulaCode" label="公式"></el-table-column>
        <el-table-column prop="steps" label="步骤"></el-table-column>
        <el-table-column prop="projectName" label="项目名称"></el-table-column>
        <el-table-column prop="computeFormula" label="计算公式"></el-table-column>
        <el-table-column prop="actualFormula" label="实际公式"></el-table-column>
        <el-table-column prop="param" label="参数"></el-table-column>
        <el-table-column prop="paramValue" label="参数值"></el-table-column>
        <el-table-column prop="outputValue" label="输出值"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editStep(scope.row)">编辑</el-button>
            <el-button type="primary" size="mini" @click="deleteStep(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增弹框 -->
    <el-dialog
      :title="addOrEditTitle"
      :visible.sync="openDialog"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <el-form
        v-model="addForm"
        :rules="rules"
        size="mini"
        label-position="right"
        label-width="6rem"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="计价公式" required>
              <el-input v-model="addForm.formulaCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="序号" required>
              <el-input v-model="addForm.serialNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="步骤" required>
              <el-input v-model="addForm.steps"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称" required>
              <el-input v-model="addForm.projectName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="计算公式">
              <el-input v-model="addForm.computeFormula"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实际公式">
              <el-input v-model="addForm.actualFormula"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="参数">
              <el-input v-model="addForm.param"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="参数值">
              <el-input v-model="addForm.paramValue"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="输出值">
              <el-input v-model="addForm.outputValue"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog_btn">
        <el-button size="mini" @click="openDialog = false">取消</el-button>
        <el-button type="primary" size="mini" @click="saveFormulaSteps()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import TitleStylex from "@/components/TitleStylex";
import http from "@/api/interface.js";
export default {
  name: "formulaInfo",
  components: {
    TitleStylex
  },
  data() {
    return {
      firstTitle: "基本信息",
      secondTitle: "计价步骤",
      addOrEditTitle: "新增计价步骤",
      formulaGuid: "", //计价标识
      form: {
        //公式基本信息
        formulaCode: "",
        formulaName: "",
        type: "",
        createrName: "",
        createUnitName: "",
        createTime: ""
      },
      FormulaType: [], //公式类别下拉框
      tableData: [], //表格数据
      //分页数据
      // total: 0,
      // pageSize: 20,
      // currentPage: 1,
      // pageSizesList: [20, 50, 100, 200],
      addForm: {
        //新增弹框form表单数据
        formulaCode: "",
        serialNo: "",
        steps: "",
        projectName: "",
        computeFormula: "",
        actualFormula: "",
        param: "",
        paramValue: "",
        outputValue: ""
        // formulaGuid: this.$parent.params.formulaGuid,
      }, //弹框-新增信息
      openDialog: false, //控制弹框显隐
      rules: {
        //规则
        formulaCode: [
          { required: true, message: "请输入计价公式", trigger: "blur" }
        ],
        serialNo: [{ required: true, message: "请输入序号", trigger: "blur" }],
        steps: [{ required: true, message: "请选择步骤", trigger: "blur" }],
        projectName: [
          { required: true, message: "请选择项目名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //根据名称查询字典
    getDictionary() {
      let nameArr = ["公式类别"];
      let params = {
        names: nameArr.toString()
      };
      http.getDictionary(params).then(res => {
        res = JSON.parse(res);
        this.FormulaType = res.公式类别;
      });
    },
    //获取当前登陆用户姓名
    getUserInfo() {
      let params = {};
      http
        .getUserInfo(params)
        .then(res => {
          this.form.createrName = res.userName;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取登录人所在单位
    getUnitInfo() {
      let params = {};
      http
        .getUnitInfo(params)
        .then(res => {
          this.form.createUnitName = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取公式信息
    getFormulaInfo() {
      let params = {
        formulaGuid: this.formulaGuid
      };
      http
        .getFormulaInfo(params)
        .then(res => {
          this.form = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //保存
    save() {
      this.$confirm("此操作将进行保存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.form.createTime = new Date();
          let params = {};
          let data = this.form;
          http
            .saveFormula(params, data)
            .then(res => {
              this.$parent.params.formulaGuid = this.formulaGuid = res.guid;
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              this.closeTopTab(); //关闭页签
              let tab = {
                label: res.formulaName,
                path: "/pricingFormulaTab/" + (res.guid || "new")
              };
              this.openTopTab(tab); //再打开页签
              this.Event.$emit("PricingFormula", "search"); //广播时间 刷新首页查询
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消保存"
          });
        });
    },
    //计价步骤列表
    getFormulaList() {
      let params = {
        formulaGuid: this.formulaGuid
      };
      http
        .getFormulaList(params)
        .then(res => {
          this.tableData = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //新增-按钮
    add() {
      this.openDialog = true;
    },
    //新增-确定按钮
    saveFormulaSteps() {
      let params = {};
      let objList = this.addForm;
      objList.formulaGuid = this.$parent.params.formulaGuid;
      let data = objList;
      console.log(data);
      http
        .saveFormulaSteps(params, data)
        .then(res => {
          this.$message(
            {
              type: "success",
              message: "操作成功！"
            },
            "提示"
          );
          this.openDialog = false; //关闭弹框
          this.getFormulaList(); //刷新列表
          this.addForm = {}; //清空表单
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //表格关闭事件
    handleClose(done) {
      done();
      this.addForm = {};
    },
    //表格操作-编辑按钮
    editStep(val) {
      this.openDialog = true;
      this.addOrEditTitle = "编辑计价步骤";
      let params = {
        stepsGuid: val.guid
      };
      http
        .editStep(params)
        .then(res => {
          this.addForm = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //表格操作-删除按钮
    deleteStep(val) {
      this.$confirm("确定删除此条计价步骤?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            stepsGuid: val.guid
          };
          http
            .deleteFormulaStep(params)
            .then(res => {
              this.$message(
                {
                  type: "success",
                  message: "删除成功！"
                },
                "提示"
              );
              this.getFormulaList(); //刷新列表
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }

    // //当前页条数改变时
    // handleSizeChange(val) {
    //   this.pageSize = val;
    //   this.searchDistrict();
    // },
    // //当前页跳转时
    // handleCurrentChange(val) {
    //   this.currentPage = val;
    //   this.searchDistrict();
    // },
  },
  created() {
    this.formulaGuid = this.$parent.params.formulaGuid; //给计价标识赋值
  },
  mounted() {
    this.getDictionary(); //调取字典
    this.getUserInfo(); //获取登录用户名
    this.getUnitInfo(); //获取登录人所在单位
    if (this.formulaGuid) {
      this.getFormulaInfo(); //查询公式信息
      this.getFormulaList(); //查询计价步骤列表
    }
  }
};
</script>
<style lang="scss" scoped>
#formula-info {
  .btnStyle {
    position: absolute;
    right: 15px;
    top: 15px;
  }
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
  .box_new {
    position: relative;
    .btn_new {
      position: absolute;
      right: 15px;
      top: 0px;
    }
  }
  .dialog_btn {
    text-align: center;
  }
  /deep/
    .el-form-item.is-required:not(.is-no-asterisk)
    > .el-form-item__label:before {
    display: unset;
    content: "*";
    color: #f56c6c;
    margin-left: 4px;
  }
}
</style>

