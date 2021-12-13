<!--
 * @Description: 局建房查询
 * @Author: maxq
 * @Date: 2020-04-07 15:17
 * @LastEditors  :
 * @LastEditTime :
<template>
  <div>
    <!-- 房产资料 fhbz -->
    <title-stylex title="房产资料"></title-stylex>
    <div class="quarterMessage_box">
      <el-form size="mini" label-width="10rem" label-position="right" v-model="realEstateInfo">
        <div class="demo-ruleForm">
          <el-row>
            <el-col :span="24">
              <el-form-item label="房屋坐落">
                <el-input v-model="realEstateInfo.houseLocated" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="框架结构">
                <el-select v-model="realEstateInfo.JZJG" disabled>
                  <el-option v-for="item in getDicData.JZJG" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房型">
                <el-select v-model="realEstateInfo.HX" disabled>
                  <el-option v-for="item in getDicData.houseType" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="建筑面积(㎡)">
                <el-input v-model="realEstateInfo.JZMJ" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="竣工面积(㎡)">
                <el-input v-model="realEstateInfo.JGMJ" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="朝向">
                <el-select v-model="realEstateInfo.CX" disabled>
                  <el-option v-for="item in getDicData.CX" :key="item.id" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="独立平台">
                <el-select v-model="realEstateInfo.PT" disabled>
                  <el-option v-for="item in getDicData.PT" :key="item.id" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所在楼层">
                <el-input v-model="realEstateInfo.LCH" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="裙楼层数">
                <el-input v-model="realEstateInfo.QLCS" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="其他费用">
                <el-input v-model="realEstateInfo.QTFY" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="总楼层">
                <el-input v-model="realEstateInfo.ZLC" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="装修系数">
                <el-input v-model="realEstateInfo.ZXLX" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="土地使用期">
                <el-date-picker v-model="realEstateInfo.SYQX" style="width:100%" disabled></el-date-picker>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="单位造价">
                <el-input v-model="realEstateInfo.a" disabled></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :span="12">
              <el-form-item label="竣工时间">
                <el-date-picker v-model="realEstateInfo.JGSJ" style="width:100%" disabled></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房屋状态">
                <el-select v-model="realEstateInfo.SMZQZT" disabled>
                  <el-option v-for="item in getDicData.FYZT" :key="item.id" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="划分属性">
                <el-select v-model="realEstateInfo.a" disabled>
                  <el-option v-for="item in getDicData.ZC" :key="item.id" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-col :span="12">
              <el-form-item label="是否取得全产权">
                <el-select v-model="realEstateInfo.SFQDQBCQ" disabled>
                  <el-option v-for="(item, index) in fullPropertyData" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注">
                <el-input v-model="realEstateInfo.BZ" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <title-stylex title="当前权利人"></title-stylex>
    <!-- 主权利人 houseGuid -->
    <div class="quarterMessage_box">
      <el-form size="mini" label-width="10rem" label-position="right" v-model="currentRighterMain">
        <div class="demo-ruleForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名">
                <el-input v-model="currentRighterMain.name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别">
                <el-select v-model="currentRighterMain.gender" disabled>
                  <el-option v-for="item in getDicData.sexData" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出生日期">
                <el-date-picker v-model="currentRighterMain.birthday" style="width:100%" disabled></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="当前身份证">
                <el-input v-model="currentRighterMain.iden" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="文化程度">
                <el-select v-model="currentRighterMain.education" disabled>
                  <el-option v-for="item in getDicData.XL" :key="item.id" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="权利获得方式">
                <el-select v-model="currentRighterMain.obtainRightManner" disabled>
                  <el-option v-for="item in getDicData.QLHDFS" :key="item.id" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="工作单位">
                <el-input v-model="currentRighterMain.unitName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="职务">
                <el-select v-model="currentRighterMain.position" disabled>
                  <el-option v-for="(item, index) in getDicData.allZwData" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="职称">
                <el-select v-model="currentRighterMain.professionalTitle" disabled>
                  <el-option v-for="item in getDicData.ZC" :key="item.id" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工作时间">
                <el-date-picker v-model="currentRighterMain.workTime" style="width:100%" disabled></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="迁入特区时间">
                <el-date-picker v-model="currentRighterMain.domicileEntryDate" style="width:100%" disabled></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话一">
                <el-input v-model="currentRighterMain.mobilePhone" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话二">
                <el-input v-model="currentRighterMain.telephone" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <!-- 共同权利人 houseGuid -->
    <div v-for="(ele, index) in personList" :key="index">
      <div class="quarterMessage_box" style="padding-top:10px;">
        <el-form size="mini" label-width="10rem" label-position="right">
          <div class="demo-ruleForm">
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名">
                  <el-input v-model="ele.name" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别">
                  <el-select v-model="ele.gender" disabled>
                    <el-option v-for="item in getDicData.sexData" :key="item.value" :label="item.name" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="出生日期">
                  <el-date-picker v-model="ele.birthday" style="width:100%" disabled></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="当前身份证">
                  <el-input v-model="ele.iden" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="文化程度">
                  <el-select v-model="ele.education" disabled>
                    <el-option v-for="item in getDicData.XL" :key="item.id" :label="item.name" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="权利获得方式">
                  <el-select v-model="ele.obtainRightManner" disabled>
                    <el-option v-for="item in getDicData.QLHDFS" :key="item.id" :label="item.name" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否不共享产权">
                  <el-select v-model="ele.fullProperty" disabled>
                    <el-option v-for="(item,index) in fullPropertyData" :key="index" :label="item.name" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="产权百分比(%)">
                  <el-input v-model="ele.share" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="工作单位">
                  <el-input v-model="ele.unitName" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="职务">
                  <el-select v-model="ele.position" disabled>
                    <el-option v-for="item in getDicData.zwdata" :key="item.id" :label="item.name" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="职称">
                  <el-select v-model="ele.professionalTitle" disabled>
                    <el-option v-for="item in getDicData.ZC" :key="item.id" :label="item.name" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工作时间">
                  <el-date-picker v-model="ele.workTime" style="width:100%" disabled></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="迁入特区时间">
                  <el-date-picker v-model="ele.domicileEntryDate" style="width:100%" disabled></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话一">
                  <el-input v-model="ele.mobilePhone" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话二">
                  <el-input v-model="ele.telephone" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
    </div>
    <!-- 原购房人 houseGuid -->
    <title-stylex title="原购房人"></title-stylex>
    <div class="quarterMessage_box">
      <el-form size="mini" label-width="10rem" label-position="right" v-model="originalPurchaserInfo">
        <div class="demo-ruleForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名">
                <el-input v-model="originalPurchaserInfo.name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证">
                <el-input v-model="originalPurchaserInfo.iden" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别">
                <el-select v-model="originalPurchaserInfo.gender" disabled>
                  <el-option v-for="item in getDicData.sexData" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出生日期">
                <el-date-picker v-model="originalPurchaserInfo.birthday" style="width:100%" disabled></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="文化程度">
                <el-select v-model="originalPurchaserInfo.education" disabled>
                  <el-option v-for="item in getDicData.XL" :key="item.id" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工作单位">
                <el-input v-model="originalPurchaserInfo.unitName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="职务">
                <el-select v-model="originalPurchaserInfo.position" disabled>
                  <el-option v-for="item in getDicData.zwdata" :key="item.id" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="职称">
                <el-select v-model="originalPurchaserInfo.professionalTitle" disabled>
                  <el-option v-for="item in getDicData.ZC" :key="item.id" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工作时间">
                <el-date-picker v-model="originalPurchaserInfo.workTime" style="width:100%" disabled></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="迁入特区时间">
                <el-date-picker v-model="originalPurchaserInfo.domicileEntryDate" style="width:100%" disabled></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话一">
                <el-input v-model="originalPurchaserInfo.mobilePhone" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话二">
                <el-input v-model="originalPurchaserInfo.telephone" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <!-- 历史权利人 houseGuid -->
    <title-stylex title="历史权利人"></title-stylex>
    <div class="table">
     <el-table
        :data="historyTableData" 
        border
        size="mini"
        :header-cell-style="headerstyle"
        :cell-style="cellstyle">
        <el-table-column label="姓名" prop="XM"></el-table-column>
        <el-table-column label="身份证号" prop="ZJHM"></el-table-column>
        <el-table-column label="产权起始日期">
          <template slot-scope="scope">
            <span>{{scope.row.GFHTQDSJ | formatDate}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="原姓名" prop="XM"></el-table-column>
        <el-table-column label="原身份证号" prop="ZJHM"></el-table-column> -->
      </el-table> 
    </div>
    <!-- 购买情况 contractGuid -->
    <title-stylex title="购买情况"></title-stylex>
    <div class="quarterMessage_box">
      <el-form size="mini" label-position="right" label-width="10rem" v-model="buyHouseInfo">
      <div class="demo-ruleForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="总房价(元)">
              <el-input clearable v-model="buyHouseInfo.gfj" disabled></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12" v-if="isCheckOut">
            <el-form-item label="已交保证金(元)">
              <el-input clearable v-model="buyHouseInfo.ensureMoney" disabled></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="付清房款时间">
              <el-date-picker type="date" placeholder="选择日期" v-model="buyHouseInfo.fqsj" disabled style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="付款方式">
              <el-select v-model="buyHouseInfo.fkfs" disabled style="width: 100%;">
                <el-option v-for="item in getDicData.allFkfsData" :key="item.id" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        
          <el-col :span="12">
            <el-form-item label="贷款方式">
              <el-select v-model="buyHouseInfo.loanType" disabled style="width: 100%;">
                <el-option v-for="item in getDicData.DKFS" :key="item.id" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="贷款银行">
              <el-select v-model="buyHouseInfo.loanBank" disabled style="width: 100%;">
                <el-option v-for="item in getDicData.bankData" :key="item.id" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        
          <el-col :span="12">
            <el-form-item label="银行账号">
              <el-input clearable v-model="buyHouseInfo.bankAccount" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="认购协议编号">
              <el-input clearable v-model="buyHouseInfo.agreementNo" disabled></el-input>
            </el-form-item>
          </el-col>
       
          <el-col :span="12">
            <el-form-item label="认购协议签订时间">
              <el-date-picker type="date" placeholder="选择日期" v-model="buyHouseInfo.signAgreementDate" disabled style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同编号">
              <el-input clearable v-model="buyHouseInfo.htbh" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同签订时间">
              <el-date-picker type="date" placeholder="选择日期" v-model="buyHouseInfo.gfhtqdsj" disabled style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="退房时间">
              <el-date-picker type="date" placeholder="选择日期" v-model="buyHouseInfo.tfsj" disabled style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    </div>
  </div>
</template>

<script>
import TitleStylex from "@/components/TitleStylex"
import {mapGetters} from 'vuex'
import http from '@/api/inquery.js'
import {formatDate} from '@/components/js/date' //时间过滤
// import http from "@/api/common"

export default {
  name: "newDetail",
  components: {
    TitleStylex
  },
  computed: {
    ...mapGetters(['getDicData'])
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
  data () {
    return {
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
      fullPropertyData: [{
        name: '是',
        value: 1
      }, {
        name: '否',
        value: 0
      }],
      currentRighterMain: {}, // 当前权利人(主申请人)
      currentRighterOther: {}, // 当前权利人(共同申请人)
      originalPurchaserInfo: {}, // 原购房人信息
      historyTableData: [], // 历史权利人
      realEstateInfo: {}, // 房产资料
      personList: [],
      buyHouseInfo: {}, // 购买情况
    }
  },
  mounted () {
    // 沈家庆
    // this.fgHouseInfo()
    this.getCurrentRighterMain()
    this.getCurrentRighterOther()
    this.getOriginalPurchaser()
    this.historyRighterInfo()
    this.getHomeBuyInformation()
    // this.getDictionary()
  },
  methods: {
    // 获取房产资料(房屋信息接口)
    // fgHouseInfo () {
    //   let params = {
    //     fhbz: this.$parent.params.fhbz
    //   }
    //   http.fgHouseInfo(params).then(res => {
    //     this.realEstateInfo = res
    //     this.realEstateInfo.QMC = this.realEstateInfo.QMC + (this.realEstateInfo.DMC?this.realEstateInfo.DMC:'') + this.realEstateInfo.FH
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    // 通过房屋标志查询当前权利人(主权力人)
    getCurrentRighterMain () {
      let params = {
        houseGuid: this.$parent.params.houseGuid,
        isMain: true
      }
      http.getCurrentOwner(params).then(res => {
        this.currentRighterMain = res[0]
      }).catch(err => {
        console.log(err)
      })
    },
    // 通过房屋标志查询当前权利人(共同权利人)
    getCurrentRighterOther () {
      let params = {
        houseGuid: this.$parent.params.houseGuid,
        isMain: false
      }
      http.getCurrentOwner(params).then(res => {
        // this.currentRighterOther = res[0]
        this.personList = res
      }).catch(err => {
        console.log(err)
      })
    },
    // 查询原购房人
    getOriginalPurchaser () {
      let params = {
        houseGuid: this.$parent.params.houseGuid
      }
      api.getOldBuyer(params).then(res => {
        this.originalPurchaserInfo = res
      }).catch(err => {
        console.log(err)
      })
    },
    // 通过房屋标志获取历史权利人
    historyRighterInfo () {
      let params = {
        houseGuid: this.$parent.params.houseGuid,
      }
      http.getHistoryOwner(params).then(res => {
        this.historyTableData = res
      }).catch(err => {
        console.log(err)
      })
    },
    // 购房信息
    getHomeBuyInformation () {
      let params = {
        contractGuid: this.$parent.params.contractGuid
      }
      api.getContractInfo(params).then(res => {
        this.buyHouseInfo = res
      }).catch(err => {
        console.log(err)
      })
    },
  
  }
}
</script>

<style>

</style>