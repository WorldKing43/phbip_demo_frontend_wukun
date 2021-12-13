<template>
  <div class="allplan">
    <div class="planmanage-section">
      <HomeForm @fatherFun='toTable'></HomeForm>
    </div>
    <div class="planmanage-conten">
      <el-button type="primary" @click="newReport" size="mini">新增上报批次</el-button>
      <HomeTable class="plan-table" ref="table" ></HomeTable>
    </div>
  </div>
</template>

<script>
import HomeForm from './components/HomeForm'
import HomeTable from './components/HomeTable'
export default {
  name: 'allplan',
  components: {
    HomeForm,
    HomeTable
  },
  data() {
    return {
      //
    }
  },
  methods: {
    toTable(val) {
      this.$refs.table.$emit('form',val)
    },
    //点击新增按钮
    newReport() {
      this.$router.push({
        path: '/newreport'
      });
      this.$store.commit('add_tabs',{route:'/newreport',name:'未命名批次'});
      this.$store.commit('set_active_index','/newreport');
      // this.$store.commit('add_planGuid','');//将guid设为空
    },
  },
}
</script>
<style lang="scss" scoped>
.allplan{
  .planmanage-section{
    padding: 20px;
    background: #fff;
    margin-top: 20px;
    & /deep/ .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
      margin-bottom: 0;
    }
  }
  .planmanage-conten{
    margin-top: 20px;
    background: #fff;
    padding: 20px;
    .plan-table{
      margin-top: 10px;
    }
  }
}
</style>

