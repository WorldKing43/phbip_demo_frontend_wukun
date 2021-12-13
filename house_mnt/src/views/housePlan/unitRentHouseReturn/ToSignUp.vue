<template>
  <div>
    <title-style :title='firstTitle'></title-style>
    <el-button class="topBtn" size='mini' type='primary' @click='returnHouses()'>退回</el-button>
    <div class="planmanage-conten">
      <el-table :data="tableData" border size="mini"   style="width: 100%"  ref="multipleTable">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="houseAddress" label="房屋位置"></el-table-column>
        <el-table-column prop="coveredArea" label="面积"></el-table-column>
        <el-table-column prop="rentUnitPrice" label="租金单价"></el-table-column>
        <el-table-column prop="createTime" label="批次制定时间"></el-table-column>
        <el-table-column prop="signType" label="签约类型"></el-table-column>
        <el-table-column prop="contractBeginTime" label="合同起始日期"></el-table-column>
        <el-table-column prop="contractEndTime" label="合同结束日期"></el-table-column>
        <el-table-column prop="signState" label="合同签订状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope='scope'>
              <el-button size='mini' type='primary' @click="returnHouse(scope.row)">退回</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <div class="block" align="right">
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
    <title-style :title='secondTitle'></title-style>
    <div class="planmanage-conten">
      <el-table :data="returnTableData" border size="mini"  style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="houseAddress" label="房屋位置"></el-table-column>
        <el-table-column prop="coveredArea" label="面积"></el-table-column>
        <el-table-column prop="rentUnitPrice" label="租金单价"></el-table-column>
        <el-table-column prop="createTime" label="批次制定时间"></el-table-column>
        <el-table-column prop="signType" label="签约类型"></el-table-column>
        <el-table-column prop="signState" label="合同签订状态"></el-table-column>
        <el-table-column prop="dealTime" label="退回时间"></el-table-column>
        <el-table-column prop="returned" label="操作人"></el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <div class="block" align="right">
        <el-pagination
          @size-change="returnSizeChange"
          @current-change="returnCurrentChange"
          :current-page="returnCurrentPage"
          :page-sizes="returnPageSizesList"
          :page-size="returnPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNumber"
          background
        ></el-pagination>
      </div>
    </div>
    <!--点击退回-弹框 -->
    <el-dialog title="退回原因" :visible.sync="returnDialog">
      <el-form :gutter='20' class='returnForm' v-model='dialogForm'>
        <el-row>
          <el-col :span='11'>
            <el-form-item label='办理人' label-width='5rem'>
              <el-input size='mini' v-model='dialogForm.dealer'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label='办理时间' label-width="5rem">
              <el-date-picker type='datetime' v-model='dialogForm.dealTime' placeholder='请选择' size='mini' style="width:100%"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label='退回原因' label-width='5rem'>
            <el-input type='textarea' v-model='dialogForm.reason' :rows='3'></el-input>
          </el-form-item>
        </el-row>
        <div class="returnBtn">
          <el-button size="mini">取消</el-button>
          <el-button type="primary" size="mini" @click='determine()'>确定</el-button>
        </div>        
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import http from '@/api/housestore'
import titleStyle from '@/components/TitleStyle'
import { mapGetters } from "vuex";
export default {
  name:'toSignUp',
  components:{
    titleStyle
  },
  data(){
    return {
       //房源信息-分页需要的数据
      currentPage: 1,
      pageSize: 20,
      pageSizesList: [20, 50, 100, 200],
      totalDataNumber: 0, //数据的总数
      //退房房源信息-分页需要的数据
      returnCurrentPage: 1,
      returnPageSize: 20,
      returnPageSizesList: [20, 50, 100, 200],
      totalNumber:0,

      tableData: [],
      returnTableData: [],
      firstTitle:'房源信息',
      secondTitle:'退房房源信息',
      returnDialog: false,//退回弹框的显隐
      signGuid:'', //签约标识
      dialogForm:{
        dealer: '',
        dealTime: '',
        reason: ''
      },
      businessName:'',//业务名称
      managedHouseGuid:'',//房源标识
      // mhGuidList: [],//批量退回房源标识集合
      houseObj: {},//批量选择的房源
    }
  },
  computed: {
    ...mapGetters(['getReturnHouseGuid'])
  },
  methods:{
    //查询房源信息
    waitReturn(){
      let params = {
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        signGuid: this.$route.query.val.signGuid
        // signGuid: this.$sto/re.state.returnHouseGuid
      }
      let data = {
        batchCode: this.$route.query.val.batchCode,
        enterpriseGuid: this.$route.query.val.enterpriseGuid,
        returnState: '未退回'
      }
      http.searchList(params, data).then(res => {
        console.log(res)
        this.tableData = res.content
        this.totalDataNumber = res.totalElements
      }).catch(err => {
        console.log(err)
      })
    },
    //查询退房房源信息
    hasReturn(){
      let params = {
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        signGuid: this.$route.query.val.signGuid

      }
      let data = {
        batchCode: this.$route.query.val.batchCode,
        enterpriseGuid: this.$route.query.val.enterpriseGuid,
        returnState: '退回'
      }
      http.searchList(params, data).then(res => {
        console.log(res)
        this.returnTableData = res.content
        this.totalNumber = res.totalElements
      }).catch(err => {
        console.log(err)
      })
    },
    //分页大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.search();
    },
    // 页码改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search();
    },
       //分页大小改变
    returnSizeChange(val) {
      this.pageSize = val;
      this.search();
    },
    // 页码改变
    returnCurrentChange(val) {
      this.currentPage = val;
      this.search();
    },
    //点击退回按钮
    returnHouse(val){
      console.log(val)
      this.houseObj = [val]
      console.log(this.houseObj)
      let params = {}
      http.getUserName(params).then(res => {
        this.returnDialog = true
        this.dialogForm.dealer = res.userName
        this.dialogForm.dealTime = new Date()
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    //房源退回确定按钮
    determine(){
      if(this.dialogForm.reason == ''){
        this.$alert('请填写退回原因', '提示')
      }else{
        // let newdata = this.dialogForm
        // newdata.managedHouseGuid = this.managedHouseGuid
        // newdata.businessName = this.businessName
        // let data = [newdata]
        let arr = []
        console.log(this.houseObj)
        this.houseObj.forEach(element => {
          arr.push({managedHouseGuid: element.managedHouseGuid,businessName: element.businessName,...this.dialogForm})
          console.log(arr)
        });
        // for(let i of Object.keys(this.houseObj)){
        // let self = this
        // console.log(i)
     
          // console.log(i['managedHouseGuid'])
          // Object.keys(this.houseObj)
          // arr.push({managedHouseGuid: this.houseObj['managedHouseGuid'],businessName: this.houseObj['businessName'],...this.dialogForm})
          // console.log(arr)
        // }
        let params = {}
        let data = arr
        http.housingReturn(params, data).then(res => {
          console.log(res)
          this.waitReturn()
          this.hasReturn()
          this.returnDialog = false
          this.$message({
            type: 'success',
            message: '操作成功！'
          })
        }).catch(err => {
          console.log(err)
        })
      }
    },
    //批量退回 - 点击按钮
    returnHouses(){
      
      this.houseObj = this.$refs.multipleTable.selection
      if(this.houseObj.length == 0){
        this.$alert('请勾选所退房源！')
      }else{
      let params = {}
        console.log(this.houseObj)
        http.getUserName(params).then(res => {
          this.returnDialog = true
          this.dialogForm.dealer = res.userName
          this.dialogForm.dealTime = new Date()
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
      // let newdata = this.dialogForm
      // for (let i in oldData){
      //   let newobj = {}
      //   newobj = {...this.dialogForm}
      //   console.log(newobj)
      //   // newdata.managedHouseGuid = this.managedHouseGuid
      //   // newdata.businessName = this.businessName

      //   // this.mhGuidList.push({managedHouseGuid: oldData[i].managedHouseGuid,businessName: oldData[i].businessName})
      //   // console.log(this.mhGuidList)
      // }
    
    }
  },
  mounted(){
    console.log(this.$route.query.val)
    this.signGuid = this.$route.query.val.signGuid
    this.waitReturn()
  }
}
</script>
<style lang="scss">
.planmanage-conten{
  padding-top:5px;
  background: #fff;
}
.el-table__header{
 border-bottom: 1px solid #d0cdc7;
}
.el-table .warning-row {
background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
.el-table /deep/ td,
.el-table /deep/ th {
  text-align: center;
}
.el-table /deep/ th {
  background: #e6f0fc;
  border-right: 1px solid #d0cdc7;
  
}
.el-table /deep/ td {
  border-right: 1px solid #d0cdc7;
  border-bottom: 1px solid #d0cdc7;
}
.el-table {
  border: 1px solid #d0cdc7;
}
.el-pagination{
  margin-top:15px;
}
.returnForm{
  padding:0px 30px 0px 0px;
}
.returnBtn{
  text-align:center;
}
.topBtn{
  margin-bottom:10px;
}
</style>

