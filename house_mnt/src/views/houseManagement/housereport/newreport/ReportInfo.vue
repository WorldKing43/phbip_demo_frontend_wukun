<template>
  <div class="reportInfo">
    <div class="report">
      <div class="title-top">
        <div class="title-left">报批信息</div>
        <div class="title-bottom"></div>
      </div>
      <div class="reportCon">
        <el-form ref="form" :model="sizeForm" label-width="7rem" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="批次号">
                <el-input v-model="sizeForm.name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="批次主题">
                <el-input v-model="sizeForm.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="报批依据">
            <el-input v-model="sizeForm.name"></el-input>
          </el-form-item>
          <el-form-item label="上传责任单位">
            <el-input v-model="sizeForm.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="报批意见">
            <el-input v-model="sizeForm.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="community">
      <div class="title-top">
        <div class="title-left">小区信息</div>
        <div class="title-bottom"></div>
      </div>
      <div class="reportCon">
        <el-form ref="form" :model="sizeForm" label-width="7rem" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="小区总数">
                <el-input v-model="sizeForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="小区名称">
                <el-input v-model="sizeForm.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="出售房源总数">
                <el-input v-model="sizeForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出租房源总数">
                <el-input v-model="sizeForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="其他房源总数">
                <el-input v-model="sizeForm.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="上传文件名">
            <el-input v-model="sizeForm.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="上传时间">
            <el-input v-model="sizeForm.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="上传人">
            <el-input v-model="sizeForm.name" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sizeForm: {
        name: '',
      }
    };
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.reportInfo{
  padding: 20px;
  .title-top{
    width: 100%;
    display: flex;
    .title-left{
      border-left: 2px solid #F5A623;
      padding-left: 10px;
    }
    .title-bottom{
      width: 90%;
      height: 1.1rem;
      border-bottom: 1px solid #ccc;
    }
  }
  .report{
    margin-bottom: 20px;
  }
  .reportCon{
    margin:10px auto;
    padding: 15px 10px 5px 10px;
    background: #f5f5f5;
  }
}
</style>
