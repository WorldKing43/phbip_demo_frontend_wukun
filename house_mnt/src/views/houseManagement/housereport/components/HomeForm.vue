<template>
  <div>
    <el-form :model="formInline" class="form-inline" size="mini" label-position="left">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="批次号" label-width="4rem">
            <el-input v-model="formInline.guid" clearable style="width:100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="报批主题" label-width="5rem" >
            <el-input v-model="formInline.guid" clearable style="width:100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="上报责任单位" label-width="6rem">
            <el-select v-model="formInline.state" clearable style="width:100%">
              <el-option
                v-for="(item,index) in stateData"
                :key="index"
                :label="item.codeInfo"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:10px;">
         <el-col :span="8">
          <el-form-item label="上报单位" label-width="5rem">
            <el-select v-model="formInline.state" clearable style="width:100%">
              <el-option
                v-for="(item,index) in stateData"
                :key="index"
                :label="item.codeInfo"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" label-width="3rem">
            <el-select v-model="formInline.state" clearable style="width:100%">
              <el-option
                v-for="(item,index) in stateData"
                :key="index"
                :label="item.codeInfo"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import http from '../../../housePlan/planManagement/newplan/serve.js'

export default {
  props: {
    pageIndex: String || Number,
    pageSize: String || Number
  },
  data() {
    return {
      formInline: {},
      propertyData: [],
      stateData:[]
    }
  },
  methods: {
    search() {
      this.$emit('fatherFun',this.formInline)
    },
    getMoreList() {
      let params = {
        names: 'property'
      }
      http.getFiledList(params).then(res => {
        this.propertyData = res;
      }).catch(err => {
        console.log(err)
      })
    },
    getStateDataList() {
      let params = {
        names: 'state'
      }
      http.getFiledList(params).then(res => {
        this.stateData = res;
      }).catch(err => {
        console.log(err)
      })
    },
    getPlanList() {
      console.log(this.formInline)
      // this.getPath()
      let params = {
        pageIndex: '1',
        pageSize: '5',
        state: this.planState
      };
      http.housePlanPage(params).then(res => {
        console.log(res)
        this.tableData = res.content;
        // this.totalElement = res.totalElements;
        this.totalDataNumber = res.totalElements;
        
      }).catch(err => {
        console.log(err)
      })
    },
  },
  mounted() {
    this.getMoreList()
    this.getStateDataList()
  }
}
</script>

<style lang="scss" scoped>
// .form-inline >>> .el-input{
//   width:100%;
// }
// .el-input /deep/ .el-input__inner{
//   background: #F4F4F4;
// }
// .el-select /deep/ .el-input__inner{
//   background-color: #F4F4F4;
// }

</style>

