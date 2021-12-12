<!--
 * @Author: maxq
 * @Date: 2020-04-08
 * @LastEditors: maxq
 * @Description: 售后查询
 -->
<template>
  <div id="printReply">
        <div class="table" style="padding-top:10px;">
          <el-table :data="tableData" border size="mini" :header-cell-style="headerstyle" :cell-style="cellstyle">
            <el-table-column type="index" label="序号" width="55"></el-table-column>
            <el-table-column prop="XQH" label="小区号" ></el-table-column>
            <el-table-column prop="XQM" label="小区名" ></el-table-column>
            <el-table-column prop="DMC" label="栋号" ></el-table-column>
            <el-table-column prop="FH" label="房号" ></el-table-column>
            <el-table-column prop="HX" label="户型" ></el-table-column>
            <el-table-column prop="MJ" label="面积" ></el-table-column>
            <el-table-column prop="XM" label="姓名" ></el-table-column>
            <el-table-column prop="IDEN" label="身份证" ></el-table-column>
            <el-table-column prop="RYLX" label="人员类型" ></el-table-column>
            <el-table-column prop="HTLX" label="合同类型"  :formatter="contractFormat"></el-table-column>
            <el-table-column prop="HTBH" label="合同编号" ></el-table-column>
            <el-table-column prop="GFSJ" label="购房时间" ></el-table-column>
            <el-table-column prop="SFCF" label="是否查封" ></el-table-column>
            <el-table-column prop="ZT" label="状态" ></el-table-column>
            <el-table-column prop="SFQDQBCQ" label="是否取得全产权" ></el-table-column>
            <el-table-column prop="businessName" label="业务名称" ></el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="newDetail(scope.row, 'view')">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align: right;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="pageSizesList"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalNumber"
              background
            ></el-pagination>
          </div>
        </div>
  </div>
</template>

<script>
import {formatDate} from '@/components/js/date' //时间过滤
import http from '@/api/inquery.js'
import {mapGetters} from 'vuex'
export default {
  name: "AllSaleHouseToDo",
  computed: {
    ...mapGetters(['getDicData'])
  },
  data () {
    return {
      includeHistoryOwner: false,
      houseStateData: [
        {
          name: '已出售',
          value: '已出售'
        },
        {
          name: '已退房',
          value: '已退房'
        },
        {
          name: '已回购',
          value: '已回购'
        },
        {
          name: '已解除合同协议',
          value: '已解除合同协议'
        }
      ],
      headerstyle: {
        'background': '#E6F0FC',
        'color': '#606266',
        'text-align':'center',
        'border-color': '#DBDBDB',
      },
      cellstyle: {
        'text-align':'center',
        'border-color': '#DBDBDB',
      },
      searchForm: {},
      tableData: [],
      currentPage: 1,
      pageSizesList: [10,20,50,100],
      pageSize: 10,
      totalNumber: 0,
      HXData: [],
      TFZTData: [],
      YWLYData: [],
      // 下拉框字典
      // 签约对象
      signData: [{
        name: '个人',
        value: '1'
      },{
        name: '单位',
        value: '2'
      }],
      // 房屋类型
      houseTypeData: [{
        name: '限价商品房',
        value: '限价商品房'
      },{
        name: '经济适用房',
        value: '经济适用房'
      },{
        name: '安居型商品房',
        value: '安居型商品房'
      },{
        name: '其他',
        value: '其他'
      }],
      // 签约状态 - 接口获取
      signStateData: [],
      // 合同类型 - 接口获取
      contractData: [],
      // 办理状态
      dealData: [{
        name: '已出售',
        value: '1'
      },{
        name: '已退房',
        value: '2'
      },{
        name: '已回购',
        value: '3'
      },{
        name: '已解除合同协议',
        value: '4'
      }],
      handleState:[], //退房办理状态
      houseType:[],//户型
      contractType:[],//合同类型
      dicData:{
        HTLX:[]
      }
    }
  },
  filters: {
		formatDate(time) {
      if (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd')
      } else {
        return ''
      }
		},
		formatTime(time) {
			let date = new Date(time)
			return formatDate(date, 'hh:mm')
		},
		formatDateTime(time){
			let date = new Date(time)
			return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    // 重置
    resetfn () {
      this.searchForm = {}
    },
    // 查询
    search () {
      let params = {
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      };
      let data = {
        communityName: this.$parent.params.districtName, //小区名称
        buildingName: this.$parent.params.buildName, //栋名称
        roomNo: this.$parent.params.houseNo//房号
      }
      http.getSignedContract(params, data).then(res => {
        this.tableData = res.content
        this.totalNumber = res.totalElements
      }).catch(err =>{})
      // if (val) {
      //   this.currentPage = 1
      // }
      // for (let key in this.searchForm) {
      //   if (this.searchForm[key] === '' || this.searchForm[key] === null || this.searchForm[key] === undefined) {
      //     delete this.searchForm[key]
      //   } else {
      //     if (key != 'contractSignTimeStart' && key != 'contractSignTimeEnd') {
      //       this.searchForm[key] = this.searchForm[key].replace(/(^\s*)|(\s*$)/g, "")
      //     }
      //     // this.searchForm[key] = this.searchForm[key].replace(/\s+/g,'')
      //   }
      // }
      // let _params = {
      //   pageIndex: this.currentPage,
      //   pageSize: this.pageSize,
      //   includeHistoryOwner: this.includeHistoryOwner
      // }
      // let _data = this.searchForm
      // let timeout = 30000
      // const loading = this.$loading({
      //   lock: true,
      //   text: 'Loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // });
      // api.saleHouseList(_params, _data, timeout).then(res => {
      //   if(res.content){
      //     for (let item of this.getDicData.allHTLX) {
      //       for (let ele of res.content) {
      //         if (item.value === ele.HTLX) {
      //           ele.HTLX = item.name
      //         }
      //       }
      //     }
      //     this.tableData = res.content
      //     this.totalNumber = res.totalElements
      //     loading.close();
      //   } else {
      //     loading.close();
      //   }
      // }).catch(err => {
      //   loading.close();
      //   console.log(err)
      // })
    },
    // 改变页面大小
    handleSizeChange (val) {
      this.pageSize = val
      this.search('size')
    },
    // 获取当前页
    handleCurrentChange (val) {
      this.currentPage = val
      this.search()
    },
    contractFormat(row,column){
      // for(let item of this.contractType){
      //   if(item.value == String(row.HTLX)){
      //     return item.name
      //   }else{
      //     return row.HTLX
      //   }
      // }
    },
		getDictionary(){
			let dictionaryName = ["合同类型"];
			let _params = {names:dictionaryName.toString()};
			// common.getDictionary(_params).then(res => {
      //   let resu = JSON.parse(res);
      //   this.dicData.HTLX = resu.合同类型;
      //   this.dicData.HTLX.forEach(item =>{
      //     if(item.name == '房改'){
      //       this.contractType = item.children
      //     }
      //   })
			// }).catch(err => {
			// 	console.log(err);
			// })
    },
    // 新的查看详情 2020.2.11 yangwj
    newDetail (val, type) {
      // // 1.无签约标识有分户标识
      if (!val.QYBZ && val.FHBZ) {
        this.$parent.openTab({
          id: 'sfcx_01',
          label: val.XM,
          closable: true,
          component: () =>import ('@/views/houseManagement//officeBuildingInquire/HouseNewDetail.vue'),
          meta: {
            guid: val.FHBZ,
            houseGuid: val.houseGuid,
            contractGuid: val.contractGuid,
            fhbz: val.FHBZ
          }
        })
      //   let tab = {
      //     label: val.XM,
      //     name: 'newDetail',
      //     params: {
      //       guid: val.FHBZ,
      //       houseGuid: val.houseGuid,
      //       contractGuid: val.contractGuid,
      //       fhbz: val.FHBZ
      //     },
      //     query: {
      //       state: 'view'
      //     }
      //   }
      //   this.openTopTab(tab)
      //   return
      }
      // // 2.有签约标识无分户标识 
      if (val.QYBZ && !val.FHBZ) {
          this.$parent.openTab({
            id: 'sfcx_02',
            label: val.XM,
            closable: true,
            component: () =>import ('@/views/houseManagement//officeBuildingInquire/HouseSignDetail.vue'),
            meta: {
              guid: val.QYBZ,
              houseGuid: val.houseGuid,
              managedHouseGuid: val.managedHouseGuid
            }
          })
      //   let tab = {
      //     label: val.XM,
      //     name: 'newSignDetail',
      //     params: {
      //       guid: val.QYBZ,
      //       houseGuid: val.houseGuid,
      //       managedHouseGuid: val.managedHouseGuid
      //     },
      //     query: {
      //       state: 'view'
      //     }
      //   }
      //   this.openTopTab(tab)
      //   return
      }
     
    },
  },
  mounted () {
    this.getDictionary()
    this.search()
  },
}
</script>

<style lang="scss" scoped>
.box {
  padding-bottom: 20px;
  ul {
    display: flex;
    li {
      width: 100px;
      background: #fff;
      color: #409eff;
      text-align: center;
      height: 40px;
      line-height: 40px;
      border: 1px solid #f3f3f3;
      margin-left: -1px;
    }
    a.router-link-active {
      li {
        background: #409eff;
        color: #fff;
      }
    }
  }
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: auto !important;
}
</style>
